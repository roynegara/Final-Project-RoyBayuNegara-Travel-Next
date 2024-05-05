import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import PopupCreateCategory from "@/components/PopupCreateCategory";
import { toast } from "sonner";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [buttonPopupCreateCategory, setButtonPopupCreateCategory] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState("");
  const [editCategoryImageUrl, setEditCategoryImageUrl] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState(null);
  const [file, setFile] = useState('');
  const [imageUrl, setImageUrl] = useState('');


  const handleUpload = () => {
    if (!file && !editCategoryName) {
      toast.info("Empty name and image not selected");
      return;
    } else if (!editCategoryName) {
      toast.info("Empty name ");
      return;
    } else if (!file) { 
      toast.info("Select an image");
      return;
    }


    // if (!file) {
    //   toast.info("Please select an image");
    //   return;
    // }
        const formData = new FormData();
        formData.append("image", file);
    
        const config = {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k`,
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        };
    
        axios
          .post(
            "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image",
            formData,
            config
          )
          .then((res) => {
            console.log(res);
            setImageUrl(res.data.url);
            // toast.success(res?.data?.message);
           
           
    })
          .catch((err) => {
            console.log(err);
            // toast.error(err?.response?.data?.message)
          });
      };


  const getCategories = () => {
    
    const accessToken = localStorage.getItem("access_token");
    axios
      .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories", {
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setCategories(res.data.data);

      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    getCategories();
  }, []);

  const updateCategoryData = () => {
    getCategories();
  };

  const handleEditClick = (categoryId, categoryName, categoryImageUrl) => {
    setEditCategoryId(categoryId);
    setEditCategoryName(categoryName);
    setEditCategoryImageUrl(categoryImageUrl);
    setEditModalOpen(true);
  };

  const handleUpdateCategory = () => {
    if (imageUrl) {
      const accessToken = localStorage.getItem("access_token");
      axios
        .post(
          `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-category/${editCategoryId}`,
          {
            name: editCategoryName,
            imageUrl: imageUrl,
          },
          {
            headers: {
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((res) => {
          console.log("Category updated successfully:", res.data);
          updateCategoryData();
          setEditModalOpen(false);
          setImageUrl(res?.data?.url);
          toast.success(res.data.message);
        })
        .catch((err) => {
          console.error("Error updating category:", err);
          toast.error(err.response.data.message);
        });
    }
  };

  useEffect(() => {
    handleUpdateCategory()
  }, [imageUrl])

  const handleDeleteCategory = (categoryId) => {
    // Menampilkan modal konfirmasi penghapusan
    setDeleteModalOpen(true);
    setCategoryIdToDelete(categoryId);
  };

  const onDeleteConfirmed = (delcat) => {
    const accessToken = localStorage.getItem("access_token");
    axios
      .delete(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-category/${categoryIdToDelete}`,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        console.log("Category deleted successfully:", res.data);
        updateCategoryData();
        // Menutup modal setelah penghapusan selesai
        setDeleteModalOpen(false);
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.error("Error deleting category:", err);
        toast.error(err.response.data.message);
      });
  };

  const onCancelDelete = () => {
    // Menutup modal tanpa melakukan penghapusan
    setDeleteModalOpen(false);
    setCategoryIdToDelete(null);
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    // Memeriksa apakah pengguna sudah login
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token);
  }, []);


  const categoryToDelete = categories.find(category => category.id === categoryIdToDelete);
  return (
    <div className="categories-page">
      <div className={`${buttonPopupCreateCategory || editModalOpen || deleteModalOpen ? 'blur' : ''}`}>
      <h1 className="categories-title">Category Database</h1>

      {isLoggedIn && (
          <div className="categories-btn-popup-create">
          <button onClick={() => setButtonPopupCreateCategory(true)}>Add Category</button>
        </div>
      )}

    
        <div className="categories">
          {categories.map((category, index) => (
            <div className="categories-card" key={index}>
              <Link href={`/category/${category.id}`}>
                <img src={category.imageUrl} alt={category.name} />
                </Link>
              {/* <p>{category.id}</p> */}
              <h2>{category.name.toUpperCase()}</h2>

              {isLoggedIn && (
                 <div>
                 {/* <Link href={`/category/${category.id}`}>
                   <button>Read More</button>
                 </Link> */}
                 <button onClick={() => handleEditClick(category.id, category.name, category.imageUrl)}>Edit</button>
                 <button onClick={() => handleDeleteCategory(category.id)}>Delete</button>
               </div>
              )}
             
            </div>
          ))}
        </div>
      </div>
      {buttonPopupCreateCategory && <PopupCreateCategory trigger={buttonPopupCreateCategory} setTrigger={setButtonPopupCreateCategory} updateCategoryData={updateCategoryData} />}
      {editModalOpen && (
       <div className="popup-create-banner-wrap">
       <div className="popup-create-banner">
            
            <h2>Edit Category</h2>

            <div className="input-box-create-banner"> 
            <input
              type="text"
              placeholder="Category Name"
              value={editCategoryName}
              onChange={(e) => setEditCategoryName(e.target.value)}
              />
</div>

              <div className="input-box-create-banner"> 
            <input
              type="file"
              placeholder="Image URL"
                onChange={(e) => setFile(e.target.files[0])}
            />
</div>
              
            <div className="btn-create-banner-popup">
            <button onClick={handleUpload}>Update</button>
            </div>

            <span className="btn-close-popup-create-banner" onClick={() => setEditModalOpen(false)}>&times;</span>
          </div>
        </div>
      )}
      {/* Modal konfirmasi penghapusan */}
      {deleteModalOpen && (
         <div className="popup-delete-category-wrap"> 
           <div className="popup-delete-category">
            {/* <h2>Confirm Deletion</h2> */}
            {/* <p>Are you sure you want to delete {deleteModalOpen.name}?</p> */}
            <p>Are you sure you want to delete {categoryToDelete && categoryToDelete.name}?</p>
            <div className="btn-delete-category-popup">
              <button onClick={onDeleteConfirmed}>Yes</button>
              <button onClick={onCancelDelete}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;


// // sdh benar
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Link from "next/link";
// import PopupCreateCategory from "@/components/PopupCreateCategory";
// import { toast } from "sonner";

// const Category = () => {
//   const [categories, setCategories] = useState([]);
//   const [buttonPopupCreateCategory, setButtonPopupCreateCategory] = useState(false);
//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [editCategoryId, setEditCategoryId] = useState(null);
//   const [editCategoryName, setEditCategoryName] = useState("");
//   const [editCategoryImageUrl, setEditCategoryImageUrl] = useState("");
//   const [deleteModalOpen, setDeleteModalOpen] = useState(false);
//   const [categoryIdToDelete, setCategoryIdToDelete] = useState(null);
//   const [file, setFile] = useState('');
//   const [imageUrl, setImageUrl] = useState('');


//   const handleUpload = () => {
//     if (!file) {
//       toast.warning("Please select an image");
//       return;
//     }
//         const formData = new FormData();
//         formData.append("image", file);
    
//         const config = {
//           headers: {
//             "content-type": "multipart/form-data",
//             Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k`,
//             apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//           },
//         };
    
//         axios
//           .post(
//             "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image",
//             formData,
//             config
//           )
//           .then((res) => {
//             console.log(res);
//             setImageUrl(res.data.url);
//             // toast.success(res?.data?.message);
           
           
//     })
//           .catch((err) => {
//             console.log(err);
//             // toast.error(err?.response?.data?.message)
//           });
//       };


//   const getCategories = () => {
    
//     const accessToken = localStorage.getItem("access_token");
//     axios
//       .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories", {
//         headers: {
//           apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//           Authorization: `Bearer ${accessToken}`,
//         },
//       })
//       .then((res) => {
//         setCategories(res.data.data);

//       })
//       .catch((err) => {
//         console.log("err", err);
//       });
//   };

//   useEffect(() => {
//     getCategories();
//   }, []);

//   const updateCategoryData = () => {
//     getCategories();
//   };

//   const handleEditClick = (categoryId, categoryName, categoryImageUrl) => {
//     setEditCategoryId(categoryId);
//     setEditCategoryName(categoryName);
//     setEditCategoryImageUrl(categoryImageUrl);
//     setEditModalOpen(true);
//   };

//   const handleUpdateCategory = () => {
//     if (imageUrl) {
//       const accessToken = localStorage.getItem("access_token");
//       axios
//         .post(
//           `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-category/${editCategoryId}`,
//           {
//             name: editCategoryName,
//             imageUrl: imageUrl,
//           },
//           {
//             headers: {
//               apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//               Authorization: `Bearer ${accessToken}`,
//             },
//           }
//         )
//         .then((res) => {
//           console.log("Category updated successfully:", res.data);
//           updateCategoryData();
//           setEditModalOpen(false);
//           setImageUrl(res?.data?.url);
//           toast.success(res.data.message);
//         })
//         .catch((err) => {
//           console.error("Error updating category:", err);
//           toast.error(err.response.data.message);
//         });
//     }
//   };

//   useEffect(() => {
//     handleUpdateCategory()
//   }, [imageUrl])

//   const handleDeleteCategory = (categoryId) => {
//     // Menampilkan modal konfirmasi penghapusan
//     setDeleteModalOpen(true);
//     setCategoryIdToDelete(categoryId);
//   };

//   const onDeleteConfirmed = (delcat) => {
//     const accessToken = localStorage.getItem("access_token");
//     axios
//       .delete(
//         `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-category/${categoryIdToDelete}`,
//         {
//           headers: {
//             apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       )
//       .then((res) => {
//         console.log("Category deleted successfully:", res.data);
//         updateCategoryData();
//         // Menutup modal setelah penghapusan selesai
//         setDeleteModalOpen(false);
//         toast.success(res.data.message);
//       })
//       .catch((err) => {
//         console.error("Error deleting category:", err);
//         toast.error(err.response.data.message);
//       });
//   };

//   const onCancelDelete = () => {
//     // Menutup modal tanpa melakukan penghapusan
//     setDeleteModalOpen(false);
//     setCategoryIdToDelete(null);
//   };

//   return (
//     <div>
//       <h1 className="categories-title">Category Database</h1>
//       <div className="categories-btn-popup-create">
//         <button onClick={() => setButtonPopupCreateCategory(true)}>Add Category</button>
//       </div>
//       <div className={`${buttonPopupCreateCategory ? 'blur' : ''}`}>
//         <div className="categories">
//           {categories.map((category, index) => (
//             <div className="categories-card" key={index}>
//               <img src={category.imageUrl} alt={category.name} />
//               {/* <p>{category.id}</p> */}
//               <p>{category.name}</p>
//               <div>
//                 {/* <Link href={`/category/${category.id}`}>
//                   <button>Read More</button>
//                 </Link> */}
//                 <button onClick={() => handleEditClick(category.id, category.name, category.imageUrl)}>Edit</button>
//                 <button onClick={() => handleDeleteCategory(category.id)}>Delete</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       {buttonPopupCreateCategory && <PopupCreateCategory trigger={buttonPopupCreateCategory} setTrigger={setButtonPopupCreateCategory} updateCategoryData={updateCategoryData} />}
//       {editModalOpen && (
//        <div className="popup-create-banner-wrap">
//        <div className="popup-create-banner">
            
//             <h2>Edit Category</h2>

//             <div className="input-box-create-banner"> 
//             <input
//               type="text"
//               placeholder="Category Name"
//               value={editCategoryName}
//               onChange={(e) => setEditCategoryName(e.target.value)}
//               />
// </div>

//               <div className="input-box-create-banner"> 
//             <input
//               type="file"
//               placeholder="Image URL"
//                 onChange={(e) => setFile(e.target.files[0])}
//             />
// </div>
              
//             <div className="btn-create-banner-popup">
//             <button onClick={handleUpload}>Update</button>
//             </div>

//             <span className="btn-close-popup-create-banner" onClick={() => setEditModalOpen(false)}>&times;</span>
//           </div>
//         </div>
//       )}
//       {/* Modal konfirmasi penghapusan */}
//       {deleteModalOpen && (
//          <div className="input-box-create-banner"> 
//            <div className="popup-delete-banner">
//             {/* <h2>Confirm Deletion</h2> */}
//             <p>Are you sure you want to delete this category?</p>
//             <div className="btn-create-banner-popup">
//               <button onClick={onDeleteConfirmed}>Yes</button>
//               <button onClick={onCancelDelete}>No</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Category;



// // sdh ad edit dan delete tp masih alert delete
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Link from "next/link";
// import PopupCreateCategory from "@/components/PopupCreateCategory";

// const Category = () => {
//   const [categories, setCategories] = useState([]);
//   const [buttonPopupCreateCategory, setButtonPopupCreateCategory] = useState(false);
//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [editCategoryId, setEditCategoryId] = useState(null);
//   const [editCategoryName, setEditCategoryName] = useState("");
//   const [editCategoryImageUrl, setEditCategoryImageUrl] = useState("");

//   const getCategories = () => {
//     const accessToken = localStorage.getItem("access_token");
//     axios
//       .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories", {
//         headers: {
//           apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//           Authorization: `Bearer ${accessToken}`,
//         },
//       })
//       .then((res) => {
//         setCategories(res.data.data);
//       })
//       .catch((err) => {
//         console.log("err", err);
//       });
//   };

//   useEffect(() => {
//     getCategories();
//   }, []);

//   const updateCategoryData = () => {
//     getCategories();
//   };

//   const handleEditClick = (categoryId, categoryName, categoryImageUrl) => {
//     setEditCategoryId(categoryId);
//     setEditCategoryName(categoryName);
//     setEditCategoryImageUrl(categoryImageUrl);
//     setEditModalOpen(true);
//   };
//   const handleUpdateCategory = () => {
//     const accessToken = localStorage.getItem("access_token");
//     axios
//       .post(
//         `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-category/${editCategoryId}`,
//         {
//           name: editCategoryName,
//           imageUrl: editCategoryImageUrl,
//         },
//         {
//           headers: {
//             apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       )
//       .then((res) => {
//         console.log("Category updated successfully:", res.data);
//         updateCategoryData();
//         setEditModalOpen(false);
//       })
//       .catch((err) => {
//         console.error("Error updating category:", err);
//       });
//   };
  
//   const handleDeleteCategory = (categoryId) => {
//     const accessToken = localStorage.getItem("access_token");
//     if (window.confirm("Are you sure you want to delete this category?")) {
//       axios
//         .delete(
//           `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-category/${categoryId}`,
//           {
//             headers: {
//               apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//               Authorization: `Bearer ${accessToken}`,
//             },
//           }
//         )
//         .then((res) => {
//           console.log("Category deleted successfully:", res.data);
//           updateCategoryData();
//         })
//         .catch((err) => {
//           console.error("Error deleting category:", err);
//         });
//     }
//   };

//   return (
//     <div>
//       <h1 className="categories-title">Category Database</h1>
//       <div className="categories-btn-popup-create">
//         <button onClick={() => setButtonPopupCreateCategory(true)}>Add Category</button>
//       </div>
//       <div className={`${buttonPopupCreateCategory ? 'blur' : ''}`}>
//         <div className="categories">
//           {categories.map((category, index) => (
//             <div className="categories-card" key={index}>
//               <img src={category.imageUrl} alt={category.name} />
//               <p>{category.id}</p>
//               <p>{category.name}</p>
//               <div>
//                 <Link href={`/category/${category.id}`}>
//                   <button>Read More</button>
//                 </Link>
//                 <button onClick={() => handleEditClick(category.id, category.name, category.imageUrl)}>Edit</button>
//                 <button onClick={() => handleDeleteCategory(category.id)}>Delete</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       {buttonPopupCreateCategory && <PopupCreateCategory trigger={buttonPopupCreateCategory} setTrigger={setButtonPopupCreateCategory} updateCategoryData={updateCategoryData} />}
//       {editModalOpen && (
//         <div className="modal">
//           <div className="modal-content">
//             <span className="close" onClick={() => setEditModalOpen(false)}>&times;</span>
//             <h2>Edit Category</h2>
//             <input
//               type="text"
//               placeholder="Category Name"
//               value={editCategoryName}
//               onChange={(e) => setEditCategoryName(e.target.value)}
//             />
//             <input
//               type="text"
//               placeholder="Image URL"
//               value={editCategoryImageUrl}
//               onChange={(e) => setEditCategoryImageUrl(e.target.value)}
//             />
//             <button onClick={handleUpdateCategory}>Update</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Category;



// succes add edit 
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Link from "next/link";
// import PopupCreateCategory from "@/components/PopupCreateCategory";

// const Category = () => {
//   const [categories, setCategories] = useState([]);
//   const [buttonPopupCreateCategory, setButtonPopupCreateCategory] = useState(false);
//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [editCategoryId, setEditCategoryId] = useState(null);
//   const [editCategoryName, setEditCategoryName] = useState("");
//   const [editCategoryImageUrl, setEditCategoryImageUrl] = useState("");

//   const getCategories = () => {
//     const accessToken = localStorage.getItem("access_token");
//     axios
//       .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories", {
//         headers: {
//           apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//           Authorization: `Bearer ${accessToken}`,
//         },
//       })
//       .then((res) => {
//         setCategories(res.data.data);
//       })
//       .catch((err) => {
//         console.log("err", err);
//       });
//   };

//   useEffect(() => {
//     getCategories();
//   }, []);

//   const updateCategoryData = () => {
//     getCategories();
//   };

//   const handleEditClick = (categoryId, categoryName, categoryImageUrl) => {
//     setEditCategoryId(categoryId);
//     setEditCategoryName(categoryName);
//     setEditCategoryImageUrl(categoryImageUrl);
//     setEditModalOpen(true);
//   };

//   const handleUpdateCategory = () => {
//     const accessToken = localStorage.getItem("access_token");
//     axios
//       .post(
//         `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-category/${editCategoryId}`,
//         {
//           name: editCategoryName,
//           imageUrl: editCategoryImageUrl,
//         },
//         {
//           headers: {
//             apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       )
//       .then((res) => {
//         console.log("Category updated successfully:", res.data);
//         updateCategoryData();
//         setEditModalOpen(false);
//       })
//       .catch((err) => {
//         console.error("Error updating category:", err);
//       });
//   };

//   return (
//     <div>
//       <h1 className="categories-title">Category Database</h1>
//       <div className="categories-btn-popup-create">
//         <button onClick={() => setButtonPopupCreateCategory(true)}>Add Category</button>
//       </div>
//       <div className={`${buttonPopupCreateCategory ? 'blur' : ''}`}>
//         <div className="categories">
//           {categories.map((category, index) => (
//             <div className="categories-card" key={index}>
//               <img src={category.imageUrl} alt={category.name} />
//               <p>{category.id}</p>
//               <p>{category.name}</p>
//               <div>
//                 <Link href={`/category/${category.id}`}>
//                   <button>Read More</button>
//                 </Link>
//                 <button onClick={() => handleEditClick(category.id, category.name, category.imageUrl)}>Edit</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       {buttonPopupCreateCategory && <PopupCreateCategory trigger={buttonPopupCreateCategory} setTrigger={setButtonPopupCreateCategory} updateCategoryData={updateCategoryData} />}
//       {editModalOpen && (
//         <div className="modal">
//           <div className="modal-content">
//             <span className="close" onClick={() => setEditModalOpen(false)}>&times;</span>
//             <h2>Edit Category</h2>
//             <input
//               type="text"
//               placeholder="Category Name"
//               value={editCategoryName}
//               onChange={(e) => setEditCategoryName(e.target.value)}
//             />
//             <input
//               type="text"
//               placeholder="Image URL"
//               value={editCategoryImageUrl}
//               onChange={(e) => setEditCategoryImageUrl(e.target.value)}
//             />
//             <button onClick={handleUpdateCategory}>Update</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Category;



// // sdh benar tanpa edit dan delete
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Link from "next/link";
// import PopupCreateCategory from "@/components/PopupCreateCategory";

// const Category = () => {
//   const [categories, setCategories] = useState([]);
//   const [buttonPopupCreateCategory, setButtonPopupCreateCategory] = useState(false);

//   const getCategories = () => {
//     const accessToken = localStorage.getItem("access_token");
//     axios
//       .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories", {
//         headers: {
//           apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//           Authorization: `Bearer ${accessToken}`,
//         },
//       })
//       .then((res) => {
//         setCategories(res.data.data);
//       })
//       .catch((err) => {
//         console.log("err", err);
//       });
//   };

//   useEffect(() => {
//     getCategories();
//   }, []);

//   const updateCategoryData = () => { 
//         getCategories();
//       }

//   return (
//     <div>
//       <h1 className="categories-title">Category Database</h1>
//       <div className="categories-btn-popup-create">
//         <button onClick={() => setButtonPopupCreateCategory(true)}>Add Category</button>
//       </div>
//       <div className={`${buttonPopupCreateCategory ? 'blur' : ''}`}>
//         <div className="categories">
//           {categories.map((category, index) => (
//             <div className="categories-card" key={index}>
//               <img src={category.imageUrl} alt={category.name} />
//               <p>{category.id}</p>
//               <p>{category.name}</p>
//               <div>
//                 <Link href={`/category/${category.id}`}>
//                   <button>Read More</button>
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       {buttonPopupCreateCategory && <PopupCreateCategory trigger={buttonPopupCreateCategory} setTrigger={setButtonPopupCreateCategory} updateCategoryData={updateCategoryData} />}
//     </div>
//   );
// };

// export default Category;


// // sdh benar ada styling sampai add category
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Link from "next/link";
// import PopupCreateCategory from "@/components/PopupCreateCategory";

// const Category = () => {
//   const [categories, setCategories] = useState([]);

//   const [buttonPopupCreateCategory, setButtonPopupCreateCategory] = useState(false);

//   const getCategories = () => {
//     const accessToken = localStorage.getItem("access_token");
//     axios
//       .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories", {
//         headers: {
//           apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//           Authorization: `Bearer ${accessToken}`,
//         },
//       })
//       .then((res) => {
//         console.log("res", res);
//         setCategories(res.data.data);
//       })
//       .catch((err) => {
//         console.log("err", err);
//       });
//   };

//   useEffect(() => {
//     getCategories();
//   }, []);

//   const updateCategoryData = () => { 
//     getCategories();
//   }

//   return (
//     <div>
//       <h1 className="categories-title">Category</h1>

//       <div className="categories-btn-popup-create">
//       <button onClick={() => setButtonPopupCreateCategory(true)}>Create Category</button>
//       </div>
     
//       <div className={`${buttonPopupCreateCategory ? 'blur' : ''}`} >

//       <div className="categories">
//         {categories.map((category, index) => (
//           <div className="categories-card" key={index}>
//             <img src={category.imageUrl} alt={category.name} />
//             <p>{category.id}</p>
//             <p>{category.name}</p>
            
//                 <div>
//                   <Link href={`/category/${category.id}`}>
//                     <button>Read More</button>
//                   </Link>
//                 </div>
//           </div>
          
//         ))}
//         </div>
//         </div>
     
//         {buttonPopupCreateCategory && <PopupCreateCategory trigger={buttonPopupCreateCategory} setTrigger={setButtonPopupCreateCategory} updateCategoryData={updateCategoryData}/>}
//     </div>
//   );
// };

// export default Category;



