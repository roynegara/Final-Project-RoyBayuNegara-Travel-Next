import React, { useState, useEffect } from "react";
import axios from "axios";
import PopupCreatePromo from "@/components/PopupCreatePromo";
import { toast } from "sonner";
import Link from "next/link";

const Promo = () => {
  const [promos, setPromos] = useState([]);
  const [buttonPopupCreatePromo, setButtonPopupCreatePromo] = useState(false);
  const [editingPromo, setEditingPromo] = useState(null);
  const [deletingPromo, setDeletingPromo] = useState(null);
  const [editName, setEditName] = useState("");
  const [description, setDescription] = useState("");
  const [terms_condition, setTerms_condition] = useState("");
  const [promo_code, setPromo_code] = useState("");
  const [promo_discount_price, setPromo_discount_price] = useState("");
  const [minimum_claim_price, setMinimum_claim_price] = useState("");
  const [file, setFile] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleUpload = () => {
    const fields = [
      { name: "editName", label: "name" },
      { name: "file", label: "image" },
      { name: "description", label: "description" },
      { name: "terms_condition", label: "terms and conditions" },
      { name: "promo_code", label: "promo code" },
      { name: "promo_discount_price", label: "promo discount price" },
      { name: "minimum_claim_price", label: "minimum claim price" },
    ];

    let emptyFields = [];
    fields.forEach((field) => {
      if (!eval(field.name)) {
        // Using eval here for simplicity, though it's generally not recommended
        emptyFields.push(field.label);
      }
    });

    if (emptyFields.length > 0) {
      toast.info(
        `Failed to edit promo because ${emptyFields.join(", ")} ${emptyFields.length > 1 ? "are" : "is"} empty`
      );
      return;
    } else if (!file) {
      toast.info("Please select an image");
      return;
    } else {
      // Edit promo successful
    }



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
      .post("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image", formData, config)
      .then((res) => {
        console.log(res);
        setImageUrl(res.data.url);
        // toast.success(res?.data?.message);
      })
      .catch((err) => {
        console.log(err);
        // toast.error(err?.response?.data?.message);
      });
  };

  const getPromos = () => {
    axios
      .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos", {
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
        },
      })
      .then((res) => {
        console.log("res", res);
        setPromos(res.data.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  useEffect(() => {
    getPromos();
  }, []);

  const updatePromoData = () => {
    getPromos();
  };

  const handleEditPromo = (promo) => {
    setEditingPromo(promo);
    setEditName(promo.title);
    setDescription(promo.description);
    setTerms_condition(promo.terms_condition);
    setPromo_code(promo.promo_code);
    setPromo_discount_price(promo.promo_discount_price);
    setMinimum_claim_price(promo.minimum_claim_price);
  };

  const handleDeletePromo = (promo) => {
    setDeletingPromo(promo);
  };

  const confirmDelete = () => {
    const accessToken = localStorage.getItem("access_token");
    axios
      .delete(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-promo/${deletingPromo.id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
        },
      })
      .then((res) => {
        console.log("promo delete success", res);
        setDeletingPromo(null);
        updatePromoData();
        toast.success(res?.data?.message);
      })
      .catch((err) => {
        console.log("promo delete error", err);
        toast.error(err?.response?.data?.message);
      });
  };

  const handleSaveEdit = () => {
    if (imageUrl) {
      const accessToken = localStorage.getItem("access_token");
      axios
        .post(
          `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-promo/${editingPromo.id}`,
          {
            title: editName,
            imageUrl: imageUrl,
            description: description,
            terms_condition: terms_condition,
            promo_code: promo_code,
            promo_discount_price: promo_discount_price,
            minimum_claim_price: minimum_claim_price,
          },
          {
            headers: {
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )

        .then((res) => {
          console.log("promo edit success", res);
          setEditingPromo(null);
          setEditName("");
          setDescription("");
          setTerms_condition("");
          setPromo_code("");
          setPromo_discount_price("");
          setMinimum_claim_price("");
          setImageUrl("");
          updatePromoData();
          toast.success(`Updated ${editingPromo.title}  successfully`);
        })
        .catch((err) => {
          console.log("promo Edit error", err);
          // toast.error(err?.response?.data?.message);
        });
    }
  };

  useEffect(() => {
    if (imageUrl && editingPromo) {
      handleSaveEdit();
      setFile(""); // Reset file state after upload
    }
  }, [imageUrl]);

  useEffect(() => {
    // Cleanup state when editingPromo changes
    if (!editingPromo) {
      setEditName("");
      setDescription("");
      setTerms_condition("");
      setPromo_code("");
      setPromo_discount_price("");
      setMinimum_claim_price("");
      setImageUrl("");
      setFile("");
    }
  }, [editingPromo]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Memeriksa apakah pengguna sudah login
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token);
  }, []);

  // useEffect(() => {
  //   // Memperbarui nilai accessToken saat komponen dimuat di sisi klien
  //   const token = localStorage.getItem("access_token") || "";
  //   setAccessToken(token);
  // }, []);

  // const isLoggedIn = accessToken !== null;
  // console.log('accessToken', accessToken);

  

  return (
    <div>
      <div className={`${buttonPopupCreatePromo || editingPromo || deletingPromo ? "blur" : ""}`}>
        <h1 className="promos-title">Promo Database</h1>

        {isLoggedIn && (
          <div className="promos-btn-popup-create">
            <button onClick={() => setButtonPopupCreatePromo(true)}>Add Promo</button>
          </div>
        )}

        <div className="promos">
          {promos.map((promo, index) => (
            <div key={index}>
              <div className="promos-card">
              <Link href={`/promo/${promo.id}`}>
                  <img src={promo.imageUrl} alt={promo.title} />
                  </Link>
                <h2>{promo.title.toUpperCase()}</h2>
                <p>{promo.description}</p>
                {isLoggedIn && (
                  <div>
                    <button onClick={() => handleEditPromo(promo)}>Edit</button>
                    <button onClick={() => handleDeletePromo(promo)}>Delete</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {editingPromo && (
        <div className="popup-edit-promos-wrap">
          <div className="popup-edit-promos">
            <h1>Edit Promo</h1>

          <div className="input-editpromos">

              <div className="input-box-edit-promos-input">
                
            <div className="input-box-edit-promos">
              <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} placeholder="Name" />
            </div>
                
            <div className="input-box-edit-promos">
              <input type="file" onChange={(e) => setFile(e.target.files[0])} placeholder="Image URL" />
            </div>
          
            <div className="input-box-edit-promos">
              <input
                type="text"
                value={promo_code}
                onChange={(e) => setPromo_code(e.target.value)}
                placeholder="Promo Code"
              />
            </div>
            <div className="input-box-edit-promos">
              <input
                type="number"
                value={promo_discount_price}
                onChange={(e) => {
                  const value = e.target.value;
                  // Validasi apakah nilai yang dimasukkan adalah nomor
                  if (!isNaN(value)) {
                    setPromo_discount_price(parseFloat(value));
                  }
                }}
                placeholder="Promo Discount Price"
              />
            </div>

            <div className="input-box-edit-promos">
              <input
                type="number"
                value={minimum_claim_price}
                onChange={(e) => {
                  const value = e.target.value;
                  // Validasi apakah nilai yang dimasukkan adalah nomor
                  if (!isNaN(value)) {
                    setMinimum_claim_price(parseFloat(value));
                  }
                }}
                placeholder="Minimum Claim Price"
              />
              </div>
            </div>
                
            <div className="input-box-edit-promos-textarea">
              <div className="input-box-edit-promos">
              <textarea
                type="text"
                value={terms_condition}
                onChange={(e) => setTerms_condition(e.target.value)}
                placeholder="Terms and Condition"
              />
                </div>
                
              <div className="input-box-edit-promos">
              <textarea
                type="text"
                    value={description}
                    id="textarea-edit-promos-description"
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
              />
              </div>            
            </div>
          </div>

            <div className="btn-edit-promos-popup">
              <button onClick={handleUpload}>Edit Promo</button>
            </div>

            <span className="btn-close-popup-edit-promos" onClick={() => setEditingPromo(null)}>
              &times;
            </span>
          </div>
        </div>
      )}

      {deletingPromo && (
        <div className="popup-delete-promo-wrap">
          <div className="popup-delete-promo">
          <p>Are you sure you want to delete {deletingPromo.id}?</p>
            <div className="btn-delete-promo-popup">
              <button onClick={confirmDelete}>Yes</button>
              <button onClick={() => setDeletingPromo(null)}>No</button>
            </div>
          </div>
        </div>
      )}

      {buttonPopupCreatePromo && (
        <PopupCreatePromo
          trigger={buttonPopupCreatePromo}
          setTrigger={setButtonPopupCreatePromo}
          updatePromosData={updatePromoData}
        />
      )}
    </div>
  );
};
export default Promo;

// // sdh  benar
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import PopupCreatePromo from "@/components/PopupCreatePromo";
// import { toast } from "sonner";

// const Promo = () => {
//   const [promos, setPromos] = useState([]);
//   const [buttonPopupCreatePromo, setButtonPopupCreatePromo] = useState(false);
//   const [editingPromo, setEditingPromo] = useState(null);
//   const [deletingPromo, setDeletingPromo] = useState(null);
//   const [editName, setEditName] = useState("");
//   const [description, setDescription] = useState("");
//   const [terms_condition, setTerms_condition] = useState("");
//   const [promo_code, setPromo_code] = useState("");
//   const [promo_discount_price, setPromo_discount_price] = useState("");
//   const [minimum_claim_price, setMinimum_claim_price] = useState("");
//   const [file, setFile] = useState("");
//   const [imageUrl, setImageUrl] = useState("");

//   const handleUpload = () => {
//     if (!file) {
//       toast.warning("Please select an image");
//       return;
//     }
//     const formData = new FormData();
//     formData.append("image", file);
//     const config = {
//       headers: {
//         "content-type": "multipart/form-data",
//         Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k`,
//         apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//       },
//     };
//     axios
//       .post("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image", formData, config)
//       .then((res) => {
//         console.log(res);
//         setImageUrl(res.data.url);
//         toast.success(res?.data?.message);
//       })
//       .catch((err) => {
//         console.log(err);
//         toast.error(err?.response?.data?.message);
//       });
//   };

//   const getPromos = () => {
//     axios
//       .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos", {
//         headers: {
//           apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//         },
//       })
//       .then((res) => {
//         console.log("res", res);
//         setPromos(res.data.data);
//       })
//       .catch((err) => {
//         console.log("err", err);
//       });
//   };
//   useEffect(() => {
//     getPromos();
//   }, []);

//   const updatePromoData = () => {
//     getPromos();
//   };

//   const handleEditPromo = (promo) => {
//     setEditingPromo(promo);
//     setEditName(promo.title);
//     setDescription(promo.description);
//     setTerms_condition(promo.terms_condition);
//     setPromo_code(promo.promo_code);
//     setPromo_discount_price(promo.promo_discount_price);
//     setMinimum_claim_price(promo.minimum_claim_price);
//   };

//   const handleDeletePromo = (promo) => {
//     setDeletingPromo(promo);
//   };

//   const confirmDelete = () => {
//     const accessToken = localStorage.getItem("access_token");
//     axios
//       .delete(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-promo/${deletingPromo.id}`, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//         },
//       })
//       .then((res) => {
//         console.log("promo delete success", res);
//         setDeletingPromo(null);
//         updatePromoData();
//         toast.success(res?.data?.message);
//       })
//       .catch((err) => {
//         console.log("promo delete error", err);
//         toast.error(err?.response?.data?.message);
//       });
//   };

//   const handleSaveEdit = () => {
//     if (imageUrl) {
//       const accessToken = localStorage.getItem("access_token");
//       axios
//         .post(
//           `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-promo/${editingPromo.id}`,
//           {
//             title: editName,
//             imageUrl: imageUrl,
//             description: description,
//             terms_condition: terms_condition,
//             promo_code: promo_code,
//             promo_discount_price: promo_discount_price,
//             minimum_claim_price: minimum_claim_price,
//           },
//           {
//             headers: {
//               apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//               Authorization: `Bearer ${accessToken}`,
//             },
//           }
//         )

//         .then((res) => {
//           console.log("promo edit success", res);
//           setEditingPromo(null);
//           setEditName("");
//           setDescription("");
//           setTerms_condition("");
//           setPromo_code("");
//           setPromo_discount_price("");
//           setMinimum_claim_price("");
//           setImageUrl("");
//           updatePromoData();
//           toast.success(res?.data?.message);
//         })
//         .catch((err) => {
//           console.log("promo Edit error", err);
//           toast.error(err?.response?.data?.message);
//         });
//     }
//   };

//   useEffect(() => {
//     if (imageUrl && editingPromo) {
//       handleSaveEdit();
//       setFile(""); // Reset file state after upload
//     }
//   }, [imageUrl]);

//   useEffect(() => {
//     // Cleanup state when editingPromo changes
//     if (!editingPromo) {
//       setEditName("");
//       setDescription("");
//       setTerms_condition("");
//       setPromo_code("");
//       setPromo_discount_price("");
//       setMinimum_claim_price("");
//       setImageUrl("");
//       setFile("");
//     }
//   }, [editingPromo]);

//   return (
//     <div>
//       <div className={`${buttonPopupCreatePromo || editingPromo || deletingPromo ? "blur" : ""}`}>
//       <h1 className="promos-title">Promo Database</h1>

//       <div className="promos-btn-popup-create">
//         <button onClick={() => setButtonPopupCreatePromo(true)}>Add Promo</button>
//       </div>

//         <div className="promos">
//           {promos.map((promo, index) => (
//             <div key={index}>
//               <div className="promos-card">
//                 <img src={promo.imageUrl} alt={promo.title} />
//                 <p>{promo.title}</p>
//                 <p>{promo.description}</p>
//                 <div>
//                   <button onClick={() => handleEditPromo(promo)}>Edit</button>
//                   <button onClick={() => handleDeletePromo(promo)}>Delete</button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {editingPromo && (
//         <div className="popup-edit-promo-wrap">
//           <div className="popup-edit-promo">
//             <h2>Edit Promo</h2>

//             <div className="input-box-edit-promo">
//               <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} placeholder="Name" />
//             </div>

//             <div className="input-box-edit-promo">
//               <input type="file" onChange={(e) => setFile(e.target.files[0])} placeholder="Image URL" />
//             </div>

//             <div>
//               <textarea
//                 type="text"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 placeholder="Description"
//               />
//             </div>

//             <div>
//               <input
//                 type="text"
//                 value={terms_condition}
//                 onChange={(e) => setTerms_condition(e.target.value)}
//                 placeholder="Terms and Condition"
//               />
//             </div>

//             <div>
//               <input
//                 type="text"
//                 value={promo_code}
//                 onChange={(e) => setPromo_code(e.target.value)}
//                 placeholder="Promo Code"
//               />
//             </div>

//             <div>
//               <input
//                 type="number"
//                 value={promo_discount_price}
//                 onChange={(e) => {
//                   const value = e.target.value;
//                   // Validasi apakah nilai yang dimasukkan adalah nomor
//                   if (!isNaN(value)) {
//                     setPromo_discount_price(parseFloat(value));
//                   }
//                 }}
//                 placeholder="Promo Discount Price"
//               />
//             </div>

//             <div>
//               <input
//                 type="number"
//                 value={minimum_claim_price}
//                 onChange={(e) => {
//                   const value = e.target.value;
//                   // Validasi apakah nilai yang dimasukkan adalah nomor
//                   if (!isNaN(value)) {
//                     setMinimum_claim_price(parseFloat(value));
//                   }
//                 }}
//                 placeholder="Minimum Claim Price"
//               />
//             </div>

//             <div className="btn-create-promo-popup">
//               <button onClick={handleUpload}>Edit Promo</button>
//             </div>

//             <span className="btn-close-popup-edit-promo-" onClick={() => setEditingPromo(null)}>
//               &times;
//             </span>
//           </div>
//         </div>
//       )}

//       {deletingPromo && (
//         <div className="popup-delete-promo-wrap">
//           <div className="popup-delete-promo">
//             <p>Are you sure you want to delete {deletingPromo.title}?</p>
//             <div className="btn-delete-promo-popup">
//               <button onClick={confirmDelete}>Yes</button>
//               <button onClick={() => setDeletingPromo(null)}>No</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {buttonPopupCreatePromo && (
//         <PopupCreatePromo
//           trigger={buttonPopupCreatePromo}
//           setTrigger={setButtonPopupCreatePromo}
//           updatePromosData={updatePromoData}
//         />
//       )}
//     </div>
//   );
// };
// export default Promo;

// // kode menyamkan dengan banner
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import PopupCreatePromo from "@/components/PopupCreatePromo";
// import { toast } from "sonner";

// const Promo = () => {
//   const [promos, setPromos] = useState([]);
//   const [buttonPopupCreatePromo, setButtonPopupCreatePromo] = useState(false);
//   const [editingPromo, setEditingPromo] = useState(null);
//   const [deletingPromo, setDeletingPromo] = useState(null);
//   const [editName, setEditName] = useState("");
//   const [imageUrl, setImageUrl] = useState("");
//   const [description, setDescription] = useState("");
//   const [terms_condition, setTerms_condition] = useState("");
//   const [promo_code, setPromo_code] = useState("");
//   const [promo_discount_price, setPromo_discount_price] = useState("");
//   const [minimum_claim_price, setMinimum_claim_price] = useState("");
//   const [file, setFile] = useState('');

//   const handleUpload = () => {
//     if (!file) {
//       toast.warning("Please select an image");
//       return;
//     }
//     const formData = new FormData();
//     formData.append("image", file);
//     const config = {
//       headers: {
//         "content-type": "multipart/form-data",
//         Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k`,
//         apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//       },
//     };
//     axios
//       .post(
//         "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image",
//         formData,
//         config
//       ).then((res) => {
//         console.log(res);
//         setImageUrl(res.data.url);
//         toast.success(res?.data?.message);
//       }).catch((err) => {
//         console.log(err);
//         toast.error(err?.response?.data?.message);
//       });
//   };

//   const getPromos = () => {
//     axios
//       .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos", {
//         headers: {
//           apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//         },
//       })
//       .then((res) => {
//         setPromos(res.data.data);
//       })
//       .catch((err) => {
//         console.log("err", err);
//       });
//   };
//   useEffect(() => {
//     getPromos();
//   }, []);

//   const updatePromoData = () => {
//     getPromos();
//   }

// // berfungsi untuk menampilkan di form
//   const handleEditPromo = (promo) => {
//     setEditingPromo(promo);
//     setEditName(promo.title);
//     setDescription(promo.description);
//     setTerms_condition(promo.terms_condition);
//     setPromo_code(promo.promo_code);
//     setPromo_discount_price(promo.promo_discount_price);
//     setMinimum_claim_price(promo.minimum_claim_price);
//   }

//   const handleDeletePromo = (promo) => {
//     setDeletingPromo(promo);
//   }

//   const confirmDelete = () => {
//     const accessToken = localStorage.getItem("accessToken");
//     axios.delete(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-promo/${deletingPromo.id}`, {
//       headers: {
//         apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//         Authorization: `Bearer ${accessToken}`
//       }
//     }).then((res) => {
//       console.log('promo delete success', res);
//       setDeletingPromo(null);
//       updatePromoData();
//       toast.success(res?.data?.message);
//     }).catch((err) => {
//       console.log('promo delete error', err);
//       toast.error(err?.response?.data?.message);
//     })
//   }

//   const handleSaveEdit = () => {
//     if (imageUrl) {
//       const accessToken = localStorage.getItem("accessToken");
//       axios.post(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-promo/${editingPromo.id}`, {
//         title: editName,
//         imageUrl: imageUrl,
//         description: description,
//         terms_condition: terms_condition,
//         promo_code: promo_code,
//         promo_discount_price: promo_discount_price,
//         minimum_claim_price: minimum_claim_price

//       }, {
//         headers: {
//           apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//           Authorization: `Bearer ${accessToken}`
//         }
//       }).then((res) => {
//         console.log('promo edit success', res);
//         setEditingPromo(null);
//         setEditName("");
//         setDescription("");
//         setTerms_condition("");
//         setPromo_code("");
//         setPromo_discount_price("");
//         setMinimum_claim_price("");
//         setImageUrl("");
//         updatePromoData();
//         setImageUrl(res?.data?.url);
//         toast.success(res?.data?.message);
//       }).catch((err) => {
//         console.log('promo Edit error', err);
//         toast.error(err?.response?.data?.message);
//       })
//     }
//   }
// useEffect(() => {
//   if (imageUrl) {
//     handleSaveEdit();
//   }
// },[imageUrl])

//   return (
//     <div>
//       <h1 className="promos-title">Promo Database</h1>

//       <div className="promos-btn-popup-create">
//         <button onClick={() => setButtonPopupCreatePromo(true)}>Add Promo</button>
//       </div>

//       <div className={`${buttonPopupCreatePromo ? 'blur' : ''}`}>
//         <div className="promos">
//           {promos.map((promo, index) => (
//             <div key={index}>
//               <div className="promos-card">
//                 <img src={promo.imageUrl} alt={promo.title} />
//                 <p>{promo.title}</p>
//                 <p>{promo.description}</p>
//                 <div>
//                   <button onClick={() => handleEditPromo(promo)}>Edit</button>
//                   <button onClick={() => handleDeletePromo(promo)}>Delete</button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {editingPromo && (
//         <div className="popup-create-promo-wrap">
//           <div className="popup-create-promo">

//             <h2>Edit Promo</h2>

//             <div className="input-box-create-promo">
//               <input
//                 type="text"
//                 value={editName}
//                 onChange={(e) => setEditName(e.target.value)}
//                 placeholder="Name"
//               />
//             </div>

//             <div className="input-box-create-promo">
//               <input
//                 type="file"
//                 onChange={(e) => setFile(e.target.files[0])}
//                 placeholder="Image URL"
//               />
//             </div>

//             <div>
//               <input
//                 type="text"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 placeholder="Description"
//               />
//             </div>

//             <div>
//               <input
//                 type="text"
//                 value={terms_condition}
//                 onChange={(e) => setTerms_condition(e.target.value)}
//                 placeholder="Terms and Condition"
//               />
//             </div>

//             <div>
//               <input
//                 type="text"
//                 value={promo_code}
//                 onChange={(e) => setPromo_code(e.target.value)}
//                 placeholder="Promo Code"
//               />
//             </div>

//             <div>
//               <input
//                 type="text"
//                 value={promo_discount_price}
//                 onChange={(e) => setPromo_discount_price(e.target.value)}
//                 placeholder="Promo Discount Price"
//               />
//             </div>

//             <div>
//               <input
//                 type="text"
//                 value={minimum_claim_price}
//                 onChange={(e) => setMinimum_claim_price(e.target.value)}
//                 placeholder="Minimum Claim Price"
//               />
//             </div>

//             <div className="btn-create-promo-popup">
//               <button onClick={handleUpload}>Edit Promo</button>
//             </div>

//           </div>
//         </div>
//       )}

//       {deletingPromo && (
//         <div className="popup-delete-promo-wrap">
//           <div className="popup-delete-promo">
//             <p>Are you sure you want to delete this promo?</p>
//             <div className="btn-delete-promo-popup">
//               <button onClick={confirmDelete}>Yes</button>
//               <button onClick={() => setDeletingPromo(null)}>No</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {buttonPopupCreatePromo && (
//         <PopupCreatePromo trigger={buttonPopupCreatePromo} setTrigger={setButtonPopupCreatePromo} updatePromosData={updatePromoData} />
//       )}
//     </div>
//   )
// }
// export default Promo

// // default
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Link from "next/link";
// import PopupCreatePromo from "@/components/PopupCreatePromo";

// const Promo = () => {
//   const [promos, setPromos] = useState([]);
//   const [buttonPopupCreatePromo, setButtonPopupCreatePromo] = useState(false);

//   const getPromos = () => {
//     axios
//       .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos", {
//         headers: {
//           apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//         },
//       })
//       .then((res) => {
//         setPromos(res.data.data);
//       })
//       .catch((err) => {
//         console.log("err", err);
//       });
//   };

//   useEffect(() => {
//     getPromos();
//   }, []);

//   const updatePromosData = () => {
//     getPromos();
//   };

//   return (
//     <div>
//       <h1 className="promos-title">Promo's Database</h1>

//       <div className="promos-btn-popup-create">
//         <button onClick={() => setButtonPopupCreatePromo(true)}>Add Promo</button>
//       </div>

//       <div className={`promos-container ${buttonPopupCreatePromo ? 'blur' : ''}`}>
//         <div className="promos">
//           {promos.map((promo, index) => (
//             <div className="promos-card" key={index}>
//               <img src={promo.imageUrl} alt={promo.title} />
//               {/* <p>{promo.id}</p> */}
//               <h1>{promo.title}</h1>
//               <p>{promo.description}</p>
//               <div>
//                 <Link href={`/promo/${promo.id}`}>
//                   <button>Read More</button>
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {buttonPopupCreatePromo && <PopupCreatePromo trigger={buttonPopupCreatePromo} setTrigger={setButtonPopupCreatePromo} updatePromosData={updatePromosData} />}
//     </div>
//   );
// };

// export default Promo;

// //sdh bner cm eror di add
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import PopupCreatePromo from "@/components/PopupCreatePromo";

// const Promo = () => {
//   const [promos, setPromos] = useState([]);
//   const [buttonPopupCreatePromo, setButtonPopupCreatePromo] = useState(false);
//   const [selectedPromo, setSelectedPromo] = useState(null);
//   const [deleteConfirmation, setDeleteConfirmation] = useState(false);
//   const [showSelectedPromoModal, setShowSelectedPromoModal] = useState(true); // State baru untuk mengontrol modal selectedPromo

//   const getPromos = () => {
//     axios
//       .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos", {
//         headers: {
//           apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//         },
//       })
//       .then((res) => {
//         setPromos(res.data.data);
//       })
//       .catch((err) => {
//         console.log("err", err);
//       });
//   };

//   useEffect(() => {
//     getPromos();
//   }, []);

//   const updatePromosData = () => {
//     getPromos();
//   };

//   const handleEditClick = (promo) => {
//     setSelectedPromo(promo);
//   };

//   const updatePromo = (updatedPromo) => {
//     const accessToken = localStorage.getItem("access_token");
//     axios
//       .post(
//         `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-promo/${updatedPromo.id}`,
//         updatedPromo,
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//             apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//           },
//         }
//       )
//       .then((res) => {
//         console.log("Promo updated successfully:", res.data);
//         updatePromosData();
//         setSelectedPromo(null);
//       })
//       .catch((err) => {
//         console.log("Error updating promo:", err);
//       });
//   };

//   useEffect(() => {
//     if (!selectedPromo) {
//       setButtonPopupCreatePromo(false);
//     }
//   }, [selectedPromo]);

//   const handleCreatePromo = (newPromo) => {
//     const accessToken = localStorage.getItem("access_token");
//     axios
//       .post(
//         "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos",
//         newPromo,
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//             apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//           },
//         }
//       )
//       .then((res) => {
//         console.log("Promo created successfully:", res.data);
//         updatePromosData(); // Reload promos data
//         setButtonPopupCreatePromo(false); // Close the modal
//       })
//       .catch((err) => {
//         console.log("Error creating promo:", err);
//       });
//   };

//   const handleDeleteClick = (promo) => {
//     setSelectedPromo(promo); // Set selectedPromo to the promo being deleted
//     setDeleteConfirmation(true);
//     setShowSelectedPromoModal(false); // Sembunyikan modal selectedPromo saat tombol delete diklik
//   };

//   const deletePromo = () => {
//     if (selectedPromo) {
//       const accessToken = localStorage.getItem("access_token");
//       axios
//         .delete(
//           `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-promo/${selectedPromo.id}`,
//           {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//               apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//             },
//           }
//         )
//         .then((res) => {
//           console.log("Promo deleted successfully:", res.data);
//           updatePromosData();
//           setDeleteConfirmation(false);
//           setSelectedPromo(null); // Set selectedPromo to null after deletion
//         })
//         .catch((err) => {
//           console.log("Error deleting promo:", err);
//         });
//     }
//   };

//   return (
//     <div>
//       <h1 className="promos-title">Promo's Database</h1>

//       <div className="promos-btn-popup-create">
//         <button onClick={() => setButtonPopupCreatePromo(true)}>
//           Add Promo
//         </button>
//       </div>

//       <div className={`promos-container ${buttonPopupCreatePromo ? "blur" : ""}`}>
//         <div className="promos">
//           {promos.map((promo, index) => (
//             <div className="promos-card" key={index}>
//               <img src={promo.imageUrl} alt={promo.title} />
//               <h1>{promo.title}</h1>
//               <p>{promo.description}</p>
//               <div>
//                 <button onClick={() => handleEditClick(promo)}>Edit</button>
//                 <button onClick={() => handleDeleteClick(promo)}>Delete</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {buttonPopupCreatePromo && (
//         <PopupCreatePromo
//           trigger={buttonPopupCreatePromo}
//           setTrigger={setButtonPopupCreatePromo}
//           createPromo={handleCreatePromo}
//         />
//       )}

//       {deleteConfirmation && (
//         <div className="popup">
//           <div className="popup-inner">
//             <h2>Delete Promo</h2>
//             <p>Are you sure you want to delete this promo?</p>
//             <button onClick={deletePromo}>Yes</button>
//             <button onClick={() => setDeleteConfirmation(false)}>No</button>
//           </div>
//         </div>
//       )}

//       {/* Tampilkan modal selectedPromo hanya jika tidak sedang ada konfirmasi delete */}
//       {selectedPromo && showSelectedPromoModal && (
//         <div className="popup">
//           <div className="popup-inner">
//             <h2>Edit Promo</h2>
//             <label>Title:</label>
//             <input type="text" name="title" value={selectedPromo.title} onChange={(e) => setSelectedPromo({...selectedPromo, title: e.target.value})} />
//             <label>Description:</label>
//             <textarea name="description" value={selectedPromo.description} onChange={(e) => setSelectedPromo({...selectedPromo, description: e.target.value})}></textarea>
//             <label>Image URL:</label>
//             <input type="text" name="imageUrl" value={selectedPromo.imageUrl} onChange={(e) => setSelectedPromo({...selectedPromo, imageUrl: e.target.value})} />
//             <label>Terms & Conditions:</label>
//             <textarea name="terms_condition" value={selectedPromo.terms_condition} onChange={(e) => setSelectedPromo({...selectedPromo, terms_condition: e.target.value})}></textarea>
//             <label>Promo Code:</label>
//             <input type="text" name="promo_code" value={selectedPromo.promo_code} onChange={(e) => setSelectedPromo({...selectedPromo, promo_code: e.target.value})} />
//             <label>Promo Discount Price:</label>
//             <input type="number" name="promo_discount_price" value={selectedPromo.promo_discount_price} onChange={(e) => setSelectedPromo({...selectedPromo, promo_discount_price: e.target.value})} />
//             <label>Minimum Claim Price:</label>
//             <input type="number" name="minimum_claim_price" value={selectedPromo.minimum_claim_price} onChange={(e) => setSelectedPromo({...selectedPromo, minimum_claim_price: e.target.value})} />
//             <button onClick={() => updatePromo(selectedPromo)}>Update Promo</button>
//             <button onClick={() => setSelectedPromo(null)}>Close</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Promo;

// // sudah benar cuma ketika dele diklik edit jg muncul
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import PopupCreatePromo from "@/components/PopupCreatePromo";

// const Promo = () => {
//   const [promos, setPromos] = useState([]);
//   const [buttonPopupCreatePromo, setButtonPopupCreatePromo] = useState(false);
//   const [selectedPromo, setSelectedPromo] = useState(null);
//   const [deleteConfirmation, setDeleteConfirmation] = useState(false);

//   const getPromos = () => {
//     axios
//       .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos", {
//         headers: {
//           apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//         },
//       })
//       .then((res) => {
//         setPromos(res.data.data);
//       })
//       .catch((err) => {
//         console.log("err", err);
//       });
//   };

//   useEffect(() => {
//     getPromos();
//   }, []);

//   const updatePromosData = () => {
//     getPromos();
//   };

//   const handleEditClick = (promo) => {
//     setSelectedPromo(promo);
//   };

//   const updatePromo = (updatedPromo) => {
//     const accessToken = localStorage.getItem("access_token");
//     axios
//       .post(
//         `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-promo/${updatedPromo.id}`,
//         updatedPromo,
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//             apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//           },
//         }
//       )
//       .then((res) => {
//         console.log("Promo updated successfully:", res.data);
//         updatePromosData();
//         setSelectedPromo(null);
//       })
//       .catch((err) => {
//         console.log("Error updating promo:", err);
//       });
//   };

//   useEffect(() => {
//     if (!selectedPromo) {
//       setButtonPopupCreatePromo(false);
//     }
//   }, [selectedPromo]);

//   const handleCreatePromo = (newPromo) => {
//     const accessToken = localStorage.getItem("access_token");
//     axios
//       .post(
//         "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos",
//         newPromo,
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//             apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//           },
//         }
//       )
//       .then((res) => {
//         console.log("Promo created successfully:", res.data);
//         updatePromosData();
//         setButtonPopupCreatePromo(false);
//       })
//       .catch((err) => {
//         console.log("Error creating promo:", err);
//       });
//   };

//   const handleDeleteClick = (promo) => {
//     setSelectedPromo(promo); // Set selectedPromo to the promo being deleted
//     setDeleteConfirmation(true);
//   };

//   const deletePromo = () => {
//     if (selectedPromo) {
//       const accessToken = localStorage.getItem("access_token");
//       axios
//         .delete(
//           `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-promo/${selectedPromo.id}`,
//           {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//               apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//             },
//           }
//         )
//         .then((res) => {
//           console.log("Promo deleted successfully:", res.data);
//           updatePromosData();
//           setDeleteConfirmation(false);
//           setSelectedPromo(null); // Set selectedPromo to null after deletion
//         })
//         .catch((err) => {
//           console.log("Error deleting promo:", err);
//         });
//     }
//   };

//   return (
//     <div>
//       <h1 className="promos-title">Promo's Database</h1>

//       <div className="promos-btn-popup-create">
//         <button onClick={() => setButtonPopupCreatePromo(true)}>
//           Add Promo
//         </button>
//       </div>

//       <div className={`promos-container ${buttonPopupCreatePromo ? "blur" : ""}`}>
//         <div className="promos">
//           {promos.map((promo, index) => (
//             <div className="promos-card" key={index}>
//               <img src={promo.imageUrl} alt={promo.title} />
//               <h1>{promo.title}</h1>
//               <p>{promo.description}</p>
//               <div>
//                 <button onClick={() => handleEditClick(promo)}>Edit</button>
//                 <button onClick={() => handleDeleteClick(promo)}>Delete</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {buttonPopupCreatePromo && (
//         <PopupCreatePromo
//           trigger={buttonPopupCreatePromo}
//           setTrigger={setButtonPopupCreatePromo}
//           createPromo={handleCreatePromo}
//         />
//       )}

//       {deleteConfirmation && (
//         <div className="popup">
//           <div className="popup-inner">
//             <h2>Delete Promo</h2>
//             <p>Are you sure you want to delete this promo?</p>
//             <button onClick={deletePromo}>Yes</button>
//             <button onClick={() => setDeleteConfirmation(false)}>No</button>
//           </div>
//         </div>
//       )}

//       {selectedPromo && (
//         <div className="popup">
//           <div className="popup-inner">
//             <h2>Edit Promo</h2>
//             <label>Title:</label>
//             <input type="text" name="title" value={selectedPromo.title} onChange={(e) => setSelectedPromo({...selectedPromo, title: e.target.value})} />
//             <label>Description:</label>
//             <textarea name="description" value={selectedPromo.description} onChange={(e) => setSelectedPromo({...selectedPromo, description: e.target.value})}></textarea>
//             <label>Image URL:</label>
//             <input type="text" name="imageUrl" value={selectedPromo.imageUrl} onChange={(e) => setSelectedPromo({...selectedPromo, imageUrl: e.target.value})} />
//             <label>Terms & Conditions:</label>
//             <textarea name="terms_condition" value={selectedPromo.terms_condition} onChange={(e) => setSelectedPromo({...selectedPromo, terms_condition: e.target.value})}></textarea>
//             <label>Promo Code:</label>
//             <input type="text" name="promo_code" value={selectedPromo.promo_code} onChange={(e) => setSelectedPromo({...selectedPromo, promo_code: e.target.value})} />
//             <label>Promo Discount Price:</label>
//             <input type="number" name="promo_discount_price" value={selectedPromo.promo_discount_price} onChange={(e) => setSelectedPromo({...selectedPromo, promo_discount_price: e.target.value})} />
//             <label>Minimum Claim Price:</label>
//             <input type="number" name="minimum_claim_price" value={selectedPromo.minimum_claim_price} onChange={(e) => setSelectedPromo({...selectedPromo, minimum_claim_price: e.target.value})} />
//             <button onClick={() => updatePromo(selectedPromo)}>Update Promo</button>
//             <button onClick={() => setSelectedPromo(null)}>Close</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Promo;

// // bisa delete saja
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Link from "next/link";
// import PopupCreatePromo from "@/components/PopupCreatePromo";

// const Promo = () => {
//   const [promos, setPromos] = useState([]);
//   const [buttonPopupCreatePromo, setButtonPopupCreatePromo] = useState(false);
//   const [selectedPromo, setSelectedPromo] = useState(null);
//   const [deleteConfirmation, setDeleteConfirmation] = useState(false);
//   const [editModalOpen, setEditModalOpen] = useState(false);

//   const getPromos = () => {
//     axios
//       .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos", {
//         headers: {
//           apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//         },
//       })
//       .then((res) => {
//         setPromos(res.data.data);
//       })
//       .catch((err) => {
//         console.log("err", err);
//       });
//   };

//   useEffect(() => {
//     getPromos();
//   }, []);

//   const updatePromosData = () => {
//     getPromos();
//   };

//   const handleEditClick = (promo) => {
//     setSelectedPromo(promo);
//     setEditModalOpen(true);
//   };

//   const updatePromo = (updatedPromo) => {
//     const accessToken = localStorage.getItem("access_token");
//     axios
//       .post(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-promo/${updatedPromo.id}`, updatedPromo, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//         },
//       })
//       .then((res) => {
//         console.log("Promo updated successfully:", res.data);
//         updatePromosData();
//         setSelectedPromo(null);
//         setEditModalOpen(false);
//       })
//       .catch((err) => {
//         console.log("Error updating promo:", err);
//       });
//   };

//   const handleCreatePromo = (newPromo) => {
//     const accessToken = localStorage.getItem("access_token");
//     axios
//       .post("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos", newPromo, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//         },
//       })
//       .then((res) => {
//         console.log("Promo created successfully:", res.data);
//         updatePromosData();
//         setButtonPopupCreatePromo(false);
//       })
//       .catch((err) => {
//         console.log("Error creating promo:", err);
//       });
//   };

//   const handleDeleteClick = (promo) => {
//     setSelectedPromo(promo);
//     setDeleteConfirmation(true);
//   };

//   const deletePromo = () => {
//     const accessToken = localStorage.getItem("access_token");
//     axios
//       .delete(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-promo/${selectedPromo.id}`, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//         },
//       })
//       .then((res) => {
//         console.log("Promo deleted successfully:", res.data);
//         updatePromosData();
//         setSelectedPromo(null);
//         setDeleteConfirmation(false);
//       })
//       .catch((err) => {
//         console.log("Error deleting promo:", err);
//       });
//   };

//   return (
//     <div>
//       <h1 className="promos-title">Promo's Database</h1>

//       <div className="promos-btn-popup-create">
//         <button onClick={() => setButtonPopupCreatePromo(true)}>Add Promo</button>
//       </div>

//       <div className={`promos-container ${buttonPopupCreatePromo ? 'blur' : ''}`}>
//         <div className="promos">
//           {promos.map((promo, index) => (
//             <div className="promos-card" key={index}>
//               <img src={promo.imageUrl} alt={promo.title} />
//               <h1>{promo.title}</h1>
//               <p>{promo.description}</p>
//               <div>
//                 <Link href={`/promo/${promo.id}`}>
//                   <button>Read More</button>
//                 </Link>
//                 <button onClick={() => handleEditClick(promo)}>Edit</button>
//                 <button onClick={() => handleDeleteClick(promo)}>Delete</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {buttonPopupCreatePromo && <PopupCreatePromo trigger={buttonPopupCreatePromo} setTrigger={setButtonPopupCreatePromo} createPromo={handleCreatePromo} />}

//       {editModalOpen && (
//         <div className="popup">
//           <div className="popup-inner">
//             <EditPromoModal promo={selectedPromo} updatePromo={updatePromo} closePopup={() => setEditModalOpen(false)} />
//           </div>
//         </div>
//       )}

//       {deleteConfirmation && (
//         <div className="popup">
//           <div className="popup-inner">
//             <h2>Delete Promo</h2>
//             <p>Are you sure you want to delete this promo?</p>
//             <button onClick={deletePromo}>Yes</button>
//             <button onClick={() => setDeleteConfirmation(false)}>No</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Promo;

// // sudah oke ada edit
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Link from "next/link";
// import PopupCreatePromo from "@/components/PopupCreatePromo";

// const Promo = () => {
//   const [promos, setPromos] = useState([]);
//   const [buttonPopupCreatePromo, setButtonPopupCreatePromo] = useState(false);
//   const [selectedPromo, setSelectedPromo] = useState(null);

//   const getPromos = () => {
//     axios
//       .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos", {
//         headers: {
//           apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//         },
//       })
//       .then((res) => {
//         setPromos(res.data.data);
//       })
//       .catch((err) => {
//         console.log("err", err);
//       });
//   };

//   useEffect(() => {
//     getPromos();
//   }, []);

//   const updatePromosData = () => {
//     getPromos();
//   };

//   const handleEditClick = (promo) => {
//     setSelectedPromo(promo);
//   };

//   const updatePromo = (updatedPromo) => {
//     const accessToken = localStorage.getItem("access_token");
//     axios
//       .post(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-promo/${updatedPromo.id}`, updatedPromo, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//         },
//       })
//       .then((res) => {
//         console.log("Promo updated successfully:", res.data);
//         updatePromosData();
//         setSelectedPromo(null);
//       })
//       .catch((err) => {
//         console.log("Error updating promo:", err);
//       });
//   };

//   const handleCreatePromo = (newPromo) => {
//     const accessToken = localStorage.getItem("access_token");
//     axios
//       .post("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos", newPromo, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//         },
//       })
//       .then((res) => {
//         console.log("Promo created successfully:", res.data);
//         updatePromosData();
//         setButtonPopupCreatePromo(false);
//       })
//       .catch((err) => {
//         console.log("Error creating promo:", err);
//       });
//   };

//   return (
//     <div>
//       <h1 className="promos-title">Promo's Database</h1>

//       <div className="promos-btn-popup-create">
//         <button onClick={() => setButtonPopupCreatePromo(true)}>Add Promo</button>
//       </div>

//       <div className={`promos-container ${buttonPopupCreatePromo ? 'blur' : ''}`}>
//         <div className="promos">
//           {promos.map((promo, index) => (
//             <div className="promos-card" key={index}>
//               <img src={promo.imageUrl} alt={promo.title} />
//               <h1>{promo.title}</h1>
//               <p>{promo.description}</p>
//               <div>
//                 <Link href={`/promo/${promo.id}`}>
//                   <button>Read More</button>
//                 </Link>
//                 <button onClick={() => handleEditClick(promo)}>Edit</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {buttonPopupCreatePromo && <PopupCreatePromo trigger={buttonPopupCreatePromo} setTrigger={setButtonPopupCreatePromo} createPromo={handleCreatePromo} />}

//       {selectedPromo && (
//         <div className="popup">
//           <div className="popup-inner">
//             <h2>Edit Promo</h2>
//             <label>Title:</label>
//             <input type="text" name="title" value={selectedPromo.title} onChange={(e) => setSelectedPromo({...selectedPromo, title: e.target.value})} />
//             <label>Description:</label>
//             <textarea name="description" value={selectedPromo.description} onChange={(e) => setSelectedPromo({...selectedPromo, description: e.target.value})}></textarea>
//             <label>Image URL:</label>
//             <input type="text" name="imageUrl" value={selectedPromo.imageUrl} onChange={(e) => setSelectedPromo({...selectedPromo, imageUrl: e.target.value})} />
//             <label>Terms & Conditions:</label>
//             <textarea name="terms_condition" value={selectedPromo.terms_condition} onChange={(e) => setSelectedPromo({...selectedPromo, terms_condition: e.target.value})}></textarea>
//             <label>Promo Code:</label>
//             <input type="text" name="promo_code" value={selectedPromo.promo_code} onChange={(e) => setSelectedPromo({...selectedPromo, promo_code: e.target.value})} />
//             <label>Promo Discount Price:</label>
//             <input type="number" name="promo_discount_price" value={selectedPromo.promo_discount_price} onChange={(e) => setSelectedPromo({...selectedPromo, promo_discount_price: e.target.value})} />
//             <label>Minimum Claim Price:</label>
//             <input type="number" name="minimum_claim_price" value={selectedPromo.minimum_claim_price} onChange={(e) => setSelectedPromo({...selectedPromo, minimum_claim_price: e.target.value})} />
//             <button onClick={() => updatePromo(selectedPromo)}>Update Promo</button>
//             <button onClick={() => setSelectedPromo(null)}>Close</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Promo;

// // sudah oke sekali cuma belum edit dan delete
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Link from "next/link";
// import PopupCreatePromo from "@/components/PopupCreatePromo";

// const Promo = () => {
//   const [promos, setPromos] = useState([]);
//   const [buttonPopupCreatePromo, setButtonPopupCreatePromo] = useState(false);

//   const getPromos = () => {
//     axios
//       .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos", {
//         headers: {
//           apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//         },
//       })
//       .then((res) => {
//         setPromos(res.data.data);
//       })
//       .catch((err) => {
//         console.log("err", err);
//       });
//   };

//   useEffect(() => {
//     getPromos();
//   }, []);

//   const updatePromosData = () => {
//     getPromos();
//   };

//   return (
//     <div>
//       <h1 className="promos-title">Promo's Database</h1>

//       <div className="promos-btn-popup-create">
//         <button onClick={() => setButtonPopupCreatePromo(true)}>Add Promo</button>
//       </div>

//       <div className={`promos-container ${buttonPopupCreatePromo ? 'blur' : ''}`}>
//         <div className="promos">
//           {promos.map((promo, index) => (
//             <div className="promos-card" key={index}>
//               <img src={promo.imageUrl} alt={promo.title} />
//               {/* <p>{promo.id}</p> */}
//               <h1>{promo.title}</h1>
//               <p>{promo.description}</p>
//               <div>
//                 <Link href={`/promo/${promo.id}`}>
//                   <button>Read More</button>
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {buttonPopupCreatePromo && <PopupCreatePromo trigger={buttonPopupCreatePromo} setTrigger={setButtonPopupCreatePromo} updatePromosData={updatePromosData} />}
//     </div>
//   );
// };

// export default Promo;

// // sudah oke belum auto change data
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Link from "next/link";
// import PopupCreatePromo from "@/components/PopupCreatePromo";

// const Promo = () => {
//   const [promos, setPromos] = useState([]);

//   const [buttonPopupCreatePromo, setButtonPopupCreatePromo] = useState(false);

//   const getPromos = () => {
//     // const accessToken = localStorage.getItem("access_token");
//     axios
//       .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos", {
//         headers: {
//           apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//           // Authorization: `Bearer ${accessToken}`,
//         },
//       })
//       .then((res) => {
//         console.log("res", res);
//         setPromos(res.data.data);
//       })
//       .catch((err) => {
//         console.log("err", err);
//       });
//   };

//   useEffect(() => {
//     getPromos();
//   }, []);

//   const updatePromosData = () => {
//     getPromos();
//   };

//   return (
//     <div>
//       <h1 className="promos-title">Promo's Database</h1>

//       <div className="promos-btn-popup-create">
//       <button onClick={() => setButtonPopupCreatePromo(true)}>Add Promo</button>
//       </div>

//       <div className={`promos-container ${buttonPopupCreatePromo ? 'blur' : ''}`} >

//       <div className="promos">
//         {promos.map((promo, index) => (
//             <div className="promos-card" key={index}>
//                 <img  src={promo.imageUrl} alt={promo.title}/>
//             <p>{promo.id}</p>
//                 <p>{promo.title}</p>
//                 <p>{promo.description}</p>

//                 <div>
//                     <Link href={`/promo/${promo.id}`}><button>Read More</button></Link>

//                 </div>

//           </div>
//         ))}
//       </div>
//       </div>
//           {buttonPopupCreatePromo && <PopupCreatePromo trigger={buttonPopupCreatePromo} setTrigger={setButtonPopupCreatePromo} updatePromosData={updatePromosData} />}
//       </div>
//   );
// };

// export default Promo;
