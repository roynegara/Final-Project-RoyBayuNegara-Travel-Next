import React, { useState, useEffect } from "react";
import axios from "axios";
import PopupCreatePromo from "@/components/PopupCreatePromo";

const Promo = () => {
  const [promos, setPromos] = useState([]);
  const [buttonPopupCreatePromo, setButtonPopupCreatePromo] = useState(false);
  const [selectedPromo, setSelectedPromo] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [showSelectedPromoModal, setShowSelectedPromoModal] = useState(true); // State baru untuk mengontrol modal selectedPromo

  const getPromos = () => {
    axios
      .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos", {
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
        },
      })
      .then((res) => {
        setPromos(res.data.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    getPromos();
  }, []);

  const updatePromosData = () => {
    getPromos();
  };

  const handleEditClick = (promo) => {
    setSelectedPromo(promo);
  };

  const updatePromo = (updatedPromo) => {
    const accessToken = localStorage.getItem("access_token");
    axios
      .post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-promo/${updatedPromo.id}`,
        updatedPromo,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      )
      .then((res) => {
        console.log("Promo updated successfully:", res.data);
        updatePromosData();
        setSelectedPromo(null);
      })
      .catch((err) => {
        console.log("Error updating promo:", err);
      });
  };

  useEffect(() => {
    if (!selectedPromo) {
      setButtonPopupCreatePromo(false);
    }
  }, [selectedPromo]);

  const handleCreatePromo = (newPromo) => {
    const accessToken = localStorage.getItem("access_token");
    axios
      .post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos",
        newPromo,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      )
      .then((res) => {
        console.log("Promo created successfully:", res.data);
        updatePromosData(); // Reload promos data
        setButtonPopupCreatePromo(false); // Close the modal
      })
      .catch((err) => {
        console.log("Error creating promo:", err);
      });
  };

  const createPromosData = () => { 
    getPromos();
  }


 

  const handleDeleteClick = (promo) => {
    setSelectedPromo(promo); // Set selectedPromo to the promo being deleted
    setDeleteConfirmation(true);
    setShowSelectedPromoModal(false); // Sembunyikan modal selectedPromo saat tombol delete diklik
  };

  const deletePromo = () => {
    if (selectedPromo) {
      const accessToken = localStorage.getItem("access_token");
      axios
        .delete(
          `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-promo/${selectedPromo.id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            },
          }
        )
        .then((res) => {
          console.log("Promo deleted successfully:", res.data);
          updatePromosData();
          setDeleteConfirmation(false);
          setSelectedPromo(null); // Set selectedPromo to null after deletion
        })
        .catch((err) => {
          console.log("Error deleting promo:", err);
        });
    }
  };

  return (
    <div>
      <h1 className="promos-title">Promo's Database</h1>

      <div className="promos-btn-popup-create">
        <button onClick={() => setButtonPopupCreatePromo(true)}>
          Add Promo
        </button>
      </div>

      <div className={`promos-container ${buttonPopupCreatePromo ? "blur" : ""}`}>
        <div className="promos">
          {promos.map((promo, index) => (
            <div className="promos-card" key={index}>
              <img src={promo.imageUrl} alt={promo.title} />
              <h1>{promo.title}</h1>
              <p>{promo.description}</p>
              <div>
                <button onClick={() => handleEditClick(promo)}>Edit</button>
                <button onClick={() => handleDeleteClick(promo)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {buttonPopupCreatePromo && (
        <PopupCreatePromo
          trigger={buttonPopupCreatePromo}
          setTrigger={setButtonPopupCreatePromo}
          createPromo={handleCreatePromo}
          createPromosData={createPromosData}
        />
      )}

      {deleteConfirmation && (
        <div className="popup">
          <div className="popup-inner">
            <h2>Delete Promo</h2>
            <p>Are you sure you want to delete this promo?</p>
            <button onClick={deletePromo}>Yes</button>
            <button onClick={() => setDeleteConfirmation(false)}>No</button>
          </div>
        </div>
      )}

      {/* Tampilkan modal selectedPromo hanya jika tidak sedang ada konfirmasi delete */}
      {selectedPromo && showSelectedPromoModal && (
        <div className="popup">
          <div className="popup-inner">
            <h2>Edit Promo</h2>
            <label>Title:</label>
            <input type="text" name="title" value={selectedPromo.title} onChange={(e) => setSelectedPromo({...selectedPromo, title: e.target.value})} />
            <label>Description:</label>
            <textarea name="description" value={selectedPromo.description} onChange={(e) => setSelectedPromo({...selectedPromo, description: e.target.value})}></textarea>
            <label>Image URL:</label>
            <input type="text" name="imageUrl" value={selectedPromo.imageUrl} onChange={(e) => setSelectedPromo({...selectedPromo, imageUrl: e.target.value})} />
            <label>Terms & Conditions:</label>
            <textarea name="terms_condition" value={selectedPromo.terms_condition} onChange={(e) => setSelectedPromo({...selectedPromo, terms_condition: e.target.value})}></textarea>
            <label>Promo Code:</label>
            <input type="text" name="promo_code" value={selectedPromo.promo_code} onChange={(e) => setSelectedPromo({...selectedPromo, promo_code: e.target.value})} />
            <label>Promo Discount Price:</label>
            <input type="number" name="promo_discount_price" value={selectedPromo.promo_discount_price} onChange={(e) => setSelectedPromo({...selectedPromo, promo_discount_price: e.target.value})} />
            <label>Minimum Claim Price:</label>
            <input type="number" name="minimum_claim_price" value={selectedPromo.minimum_claim_price} onChange={(e) => setSelectedPromo({...selectedPromo, minimum_claim_price: e.target.value})} />
            <button onClick={() => updatePromo(selectedPromo)}>Update Promo</button>
            <button onClick={() => setSelectedPromo(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Promo;


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
