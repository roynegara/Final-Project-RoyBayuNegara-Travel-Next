import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import PopupCreateCategory from "@/components/PopupCreateCategory";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [buttonPopupCreateCategory, setButtonPopupCreateCategory] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState("");
  const [editCategoryImageUrl, setEditCategoryImageUrl] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState(null);

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
    const accessToken = localStorage.getItem("access_token");
    axios
      .post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-category/${editCategoryId}`,
        {
          name: editCategoryName,
          imageUrl: editCategoryImageUrl,
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
      })
      .catch((err) => {
        console.error("Error updating category:", err);
      });
  };

  const handleDeleteCategory = (categoryId) => {
    // Menampilkan modal konfirmasi penghapusan
    setDeleteModalOpen(true);
    setCategoryIdToDelete(categoryId);
  };

  const onDeleteConfirmed = () => {
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
      })
      .catch((err) => {
        console.error("Error deleting category:", err);
      });
  };

  const onCancelDelete = () => {
    // Menutup modal tanpa melakukan penghapusan
    setDeleteModalOpen(false);
    setCategoryIdToDelete(null);
  };

  return (
    <div>
      <h1 className="categories-title">Category Database</h1>
      <div className="categories-btn-popup-create">
        <button onClick={() => setButtonPopupCreateCategory(true)}>Add Category</button>
      </div>
      <div className={`${buttonPopupCreateCategory ? 'blur' : ''}`}>
        <div className="categories">
          {categories.map((category, index) => (
            <div className="categories-card" key={index}>
              <img src={category.imageUrl} alt={category.name} />
              <p>{category.id}</p>
              <p>{category.name}</p>
              <div>
                <Link href={`/category/${category.id}`}>
                  <button>Read More</button>
                </Link>
                <button onClick={() => handleEditClick(category.id, category.name, category.imageUrl)}>Edit</button>
                <button onClick={() => handleDeleteCategory(category.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {buttonPopupCreateCategory && <PopupCreateCategory trigger={buttonPopupCreateCategory} setTrigger={setButtonPopupCreateCategory} updateCategoryData={updateCategoryData} />}
      {editModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setEditModalOpen(false)}>&times;</span>
            <h2>Edit Category</h2>
            <input
              type="text"
              placeholder="Category Name"
              value={editCategoryName}
              onChange={(e) => setEditCategoryName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Image URL"
              value={editCategoryImageUrl}
              onChange={(e) => setEditCategoryImageUrl(e.target.value)}
            />
            <button onClick={handleUpdateCategory}>Update</button>
          </div>
        </div>
      )}
      {/* Modal konfirmasi penghapusan */}
      {deleteModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete this category?</p>
            <div className="modal-buttons">
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



