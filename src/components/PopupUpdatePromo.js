import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/router";

const UpdatePromo = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [terms_condition, setTerms_condition] = useState("");
  const [promo_code, setPromo_code] = useState("");
  const [promo_discount_price, setPromo_discount_price] = useState(0);
  const [minimum_claim_price, setMinimum_claim_price] = useState(0);
  const [editPromo, setEditPromo] = useState(null);

  const router = useRouter();
  const { id } = router.query; // Mengambil ID promo dari parameter URL

  const getPromo = () => {
    // Pastikan ID promo sudah didefinisikan
    if (id) {
      axios
        .get(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos`, {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        })
          .then((res) => {
            console.log(promos, res.data);
          setEditPromo(res.data); // Set data promo yang ingin diedit
          setTitle(res.data.title); // Isi state title dengan data judul promo
          setDescription(res.data.description); // Isi state description dengan data deskripsi promo
          // Isi state lainnya sesuai kebutuhan
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    getPromo();
  }, [id]); // Efek hanya dijalankan saat nilai id berubah

  // Fungsi untuk menangani perubahan input harga diskon promo
  const handlePromo_discount_priceChange = (e) => {
    // Memastikan bahwa input adalah nomor atau string kosong
    const value = e.target.value;
    if (!isNaN(value) || value === "") {
      setPromo_discount_price(parseFloat(value));
    }
  };

  // Fungsi untuk menangani perubahan input harga minimum klaim promo
  const handleMinimum_claim_priceChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) || value === "") {
      setMinimum_claim_price(parseFloat(value));
    }
  };

  // Fungsi untuk menangani submit form edit promo
  const handleSubmit = () => {
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      const payload = {
        title: title,
        description: description,
        terms_condition: terms_condition,
        promo_code: promo_code,
        promo_discount_price: promo_discount_price,
        minimum_claim_price: minimum_claim_price,
      };
      const accessToken = localStorage.getItem("access_token");
      axios
        .post(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-promo/${editPromo?.id}`, payload, {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          console.log(res);
          toast.success(res.data.message);
          props.updatePromosData();
          props.setTrigger(false);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          console.log(err);
        });
    }
  };

  // Fungsi untuk menangani upload gambar promo
  const handleUpload = () => {
    if (!file) {
      toast.warning("Please select an image");
      return;
    }
    const formData = new FormData();
    formData.append("image", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5YWE4MDNjMy1iNTFlLTQ3YTAtOTBkYy0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.UyD13JUWY6bZp2UbYtysyRr6QdjXG6k6TXiGgRCed8o`,
        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
      },
    };
    axios
      .post("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image", formData, config)
      .then((res) => {
        console.log(res);
        setFile(null); // Reset file state after successful upload
        handleSubmit(); // Call handleSubmit after successful upload
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return props.trigger ? (
    <div className="popup-create-promo-wrap">
      <div className="popup-create-promos">
        <h1>Edit Promo</h1>
        <div className="input-box-create-promos">
          <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
        </div>
        <div className="input-box-create-promos">
          <input
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
        </div>
        <div className="input-box-create-promos">
          <input type="file" name="imageUrl" onChange={(e) => setFile(e.target.files[0])} placeholder="Image Url" />
        </div>
        <div className="input-box-create-promos">
          <input
            type="text"
            name="terms_condition"
            value={terms_condition}
            onChange={(e) => setTerms_condition(e.target.value)}
            placeholder="Terms Condition"
          />
        </div>
        <div className="input-box-create-promos">
          <input
            type="text"
            name="promo_code"
            value={promo_code}
            onChange={(e) => setPromo_code(e.target.value)}
            placeholder="Promo Code"
          />
        </div>
        <div className="input-box-create-promos">
          <input
            type="text"
            name="promo_discount_price"
            value={promo_discount_price}
            onChange={handlePromo_discount_priceChange}
            placeholder="Promo Discount Price"
          />
        </div>
        <div className="input-box-create-promos">
          <input
            type="text"
            name="minimum_claim_price"
            value={minimum_claim_price}
            onChange={handleMinimum_claim_priceChange}
            placeholder="Minimum Claim Price"
          />
        </div>
        <div className="btn-create-promos-popup">
          <button onClick={handleUpload}>Edit Promo</button>
        </div>
        <span className="btn-close-popup-create-promo" onClick={() => props.setTrigger(false)}>
          &times;
        </span>
      </div>
    </div>
  ) : (
    ""
  );
};

export default UpdatePromo;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "sonner";
// import { useRouter } from "next/router";

// const UpdatePromo = (props) => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [file, setFile] = useState(null);
//   const [terms_condition, setTerms_condition] = useState("");
//   const [promo_code, setPromo_code] = useState("");
//   const [promo_discount_price, setPromo_discount_price] = useState(0);
//   const [minimum_claim_price, setMinimum_claim_price] = useState(0);
//   const [editPromo, setEditPromo] = useState(null);

//     const router = useRouter();
    
//     const { id } = router.query

//   const getPromo = () => {
//     axios
//       .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos", {
//         headers: {
//           apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//         },
//       })
//       .then((res) => {
//         setEditPromo(res.data.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   useEffect(() => {
//     getPromo();
//   }, []);

//   const handleTitleChange = (e) => {
//     setTitle(e.target.value);
//   };
//   const handleDescriptionChange = (e) => {
//     setDescription(e.target.value);
//   };
//   const handleImageUrlsChange = (e) => {
//     setFile(e.target.files[0]);
//   };
//   const handleTerms_conditionChange = (e) => {
//     setTerms_condition(e.target.value);
//   };
//   const handlePromo_codeChange = (e) => {
//     setPromo_code(e.target.value);
//   };
//   //   const handlePromo_discount_priceChange = (e) => {
//   //     setPromo_discount_price(e.target.value);
//   //   };

//   const handlePromo_discount_priceChange = (e) => {
//     // Memastikan bahwa input adalah nomor atau string kosong
//     const value = e.target.value;
//     if (!isNaN(value) || value === "") {
//       setPromo_discount_price(parseFloat(value));
//     }
//   };
//   const handleMinimum_claim_priceChange = (e) => {
//       const value = e.target.value;
//       if (!isNaN(value) || value === "") {
//         setMinimum_claim_price(parseFloat(value));
//       }
    
//   };

//   const handleSubmit = () => {
//     if (file) {
//       const formData = new FormData();
//       formData.append("image", file);

//       const payload = {
//         title: title,
//         description: description,
//         terms_condition: terms_condition,
//         promo_code: promo_code,
//         promo_discount_price: promo_discount_price,
//         minimum_claim_price: minimum_claim_price,
//       };
//       const accessToken = localStorage.getItem("access_token");
//       axios
//         .post(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-promo/${editPromo?.id}`, payload, {
//           headers: {
//             apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//             Authorization: `Bearer ${accessToken}`,
//           },
//         })
//         .then((res) => {
//           console.log(res);
//           toast.success(res.data.message);
//           props.updatePromosData();
//           props.setTrigger(false);
//         })
//         .catch((err) => {
//           toast.error(err.response.data.message);
//           console.log(err);
//         });
//     }
//   };

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
//         Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5YWE4MDNjMy1iNTFlLTQ3YTAtOTBkYy0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.UyD13JUWY6bZp2UbYtysyRr6QdjXG6k6TXiGgRCed8o`,
//         apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//       },
//     };
//     axios
//       .post("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image", formData, config)
//       .then((res) => {
//         console.log(res);
//         setFile(null); // Reset file state after successful upload
//         handleSubmit(); // Call handleSubmit after successful upload
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   return props.trigger ? (
//     <div className="popup-create-promo-wrap">
//       <div className="popup-create-promos">
//         <h1>Edit Promo</h1>
//         <div className="input-box-create-promos">
//           <input type="text" name="title" value={title} onChange={handleTitleChange} placeholder="Title" />
//         </div>
//         <div className="input-box-create-promos">
//           <input
//             type="text"
//             name="description"
//             value={description}
//             onChange={handleDescriptionChange}
//             placeholder="Description"
//           />
//         </div>
//         <div className="input-box-create-promos">
//           <input type="file" name="imageUrl" onChange={handleImageUrlsChange} placeholder="Image Url" />
//         </div>
//         <div className="input-box-create-promos">
//           <input
//             type="text"
//             name="terms_condition"
//             value={terms_condition}
//             onChange={handleTerms_conditionChange}
//             placeholder="Terms Condition"
//           />
//         </div>
//         <div className="input-box-create-promos">
//           <input
//             type="text"
//             name="promo_code"
//             value={promo_code}
//             onChange={handlePromo_codeChange}
//             placeholder="Promo Code"
//           />
//         </div>
//         <div className="input-box-create-promos">
//           <input
//             type="text"
//             name="promo_discount_price"
//             value={promo_discount_price}
//             onChange={handlePromo_discount_priceChange}
//             placeholder="Promo Discount Price"
//           />
//         </div>
//         <div className="input-box-create-promos">
//           <input
//             type="text"
//             name="minimum_claim_price"
//             value={minimum_claim_price}
//             onChange={handleMinimum_claim_priceChange}
//             placeholder="Minimum Claim Price"
//           />
//         </div>
//         <div className="btn-create-promos-popup">
//           <button onClick={handleUpload}>Edit Promo</button>
//         </div>
//         <span className="btn-close-popup-create-promo" onClick={() => props.setTrigger(false)}>
//           &times;
//         </span>
//       </div>
//     </div>
//   ) : (
//     ""
//   );
// };

// export default UpdatePromo;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "sonner";
// import { useRouter } from "next/router";

// const UpdatePromo =(props) => {

//     const [title, setTitle] = useState("");
//     const [description, setDescription] = useState("");
//     const [imageUrls, setImageUrls] = useState([]);
//     const [terms_condition, setTerms_condition] = useState("");
//     const [promo_code, setPromo_code] = useState("");
//     const [promo_discount_price, setPromo_discount_price] = useState("");
//     const [minimum_claim_price, setMinimum_claim_price] = useState('')
//     const [editPromo, setEditPromo] = useState('');
//     const [file, setFile] = useState([]);
//     const router = useRouter();

// const getPromo = () => {
//     axios
//       .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos", {
//         headers: {
//           apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//         },
//       })
//       .then((res) => {
//         setCategories(res.data.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//     };

//     useEffect(() => {
//         getPromo();
//       }, []);

//     const handleTitleChange = (e) => {
//         setTitle(e.target.value);
//     }
//     const handleDescriptionChange = (e) => {
//         setDescription(e.target.value);
//     }
//     const handleImageUrlsChange = (e) => {
//     setFile(e.target.files[0]);
//     }
//     const handleTerms_conditionChange = (e) => {
//         setTerms_condition(e.target.value);
//     }
//     const handlePromo_codeChange = (e) => {
//         setPromo_code(e.target.value);
//     }
//     const handlePromo_discount_priceChange = (e) => {
//         setPromo_discount_price(e.target.value);
//     }
//     const handleMinimum_claim_priceChange = (e) => {
//         setMinimum_claim_price(e.target.value);
//     }

//       const formData = new FormData();
//             formData.append("image", file);

//     const handleSubmit =  () => {
//         if (imageUrls) {
// const payload = {
//     title: title,
//  description : description,
//  imageUrls: [imageUrls],
// terms_condition: terms_condition,
//   promo_code : promo_code,
//  promo_discount_price : promo_discount_price,
// minimum_claim_price: minimum_claim_price,
// }
//             const accessToken = localStorage.getItem("access_token");
//             axios.post(` https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-promo/${editPromo?.id}`, payload, {
//                 headers: {
//                     apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//                     Authorization: `Bearer ${accessToken}`,
//                 },
//             }).then((res) => {
//                 console.log(res)
//                 toast.success(res.data.message)
//                 props.updatePromosData();
//                 props.setTrigger(false);
//             }).catch ((err) => {
//                 toast.error(err.response.data.message)
//                 console.log(err)
//             })

//         }
//     }

//     useEffect(() => {
//         handleSubmit()
//     }, [imageUrls])

//     const handleUpload = () => {
//         if (!file) {
//           toast.warning("Please select an image");
//           return;
//         }
//             const config = {
//               headers: {
//                 "content-type": "multipart/form-data",
//                 Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k`,
//                 apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//               },
//             };
//             axios
//               .post(
//                 "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image",
//                 formData,
//                 config
//               )
//               .then((res) => {
//                 console.log(res);
//                 setImageUrls(res.data.url);             ;

//         })
//               .catch((err) => {
//                 console.log(err);
//               });
//           };
//           return props.trigger ? (
//             <div className="popup-create-promo-wrap">
//               <div className="popup-create-promos">
//                 <h1>Edit Promo</h1>
//                 <div className="input-box-create-promos">
//                   <input type="text" name="title" value={title} onChange={handleTitleChange} placeholder="Title" />
//                 </div>
//                 <div className="input-box-create-promos">
//                   <input type="text" name="description" value={description} onChange={handleDescriptionChange} placeholder="Description" />
//                 </div>
//                 <div className="input-box-create-promos">
//                   <input type="file" name="imageUrl"  onChange={handleImageUrlsChange} placeholder="Image Url" />
//                 </div>
//                 <div className="input-box-create-promos">
//                   <input type="text" name="terms_condition" value={terms_condition} onChange={handleTerms_conditionChange} placeholder="Terms Condition" />
//                 </div>
//                 <div className="input-box-create-promos">
//                   <input type="text" name="promo_code" value={promo_code} onChange={handlePromo_codeChange} placeholder="Promo Code" />
//                 </div>
//                 <div className="input-box-create-promos">
//                   <input type="text" name="promo_discount_price" value={promo_discount_price} onChange={handlePromo_discount_priceChange} placeholder="Promo Discount Price" />
//                 </div>
//                 <div className="input-box-create-promos">
//                   <input type="text" name="minimum_claim_price" value={minimum_claim_price} onChange={handleMinimum_claim_priceChange} placeholder="Minimum Claim Price" />
//                 </div>
//                 <div className="btn-create-promos-popup">
//                   <button onClick={handleUpload}>Edit Promo</button>
//                 </div>
//                 <span className="btn-close-popup-create-promo" onClick={() => props.setTrigger(false)}>&times;</span>
//               </div>
//             </div>
//           ) : (
//             ""
//           );
// };

// export default UpdatePromo

// import React, { useState } from "react";
// import axios from "axios";

// function UpdatePromo() {
//     const [name, setName] = useState("");
//     const [imageUrl, setImageUrl] = useState("");

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setPromo(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const accessToken = localStorage.getItem('access_token');

// try {
//     const response = await axios.post(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-promo/${promo?.id}`, {
//         title: promo.title,
//         imageUrl: promo.imageUrl,
//         description: promo.description,
//         promo_code: promo.promo_code,
//         minimum_claim_price: promo.minimum_claim_price,
//         promo_discount_price: promo.promo_discount_price,
//         terms_condition: promo.terms_condition
//     }, {
//         headers: {
//             apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//             Authorization: `Bearer ${accessToken}`
//         }
//     });
//     console.log('Update promo success:', response.data);
// } catch (error) {
//     console.error('Failed update promo:', error);
// }
//     }

//     return (
//         <div>
//             <h1>Update Promo</h1>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>Title:</label>
//                     <input
//                         type="text"
//                         name="title"
//                         value={promo.title}
//                         onChange={handleChange}
//                     />
//                 </div>

//                 <div>
//                     <label>Description:</label>
//                     <input
//                         type="text"
//                         name="description"
//                         value={promo.description}
//                         onChange={handleChange}
//                     />
//                 </div>

//                 <div>
//                     <label>Image Url:</label>
//                     <input
//                         type="text"
//                         name="imageUrl"
//                         value={promo.imageUrl}
//                         onChange={handleChange}
//                     />
//                 </div>

//                 <div>
//                     <label>Promo Code:</label>
//                     <input
//                         type="text"
//                         name="promo_code"
//                         value={promo.promo_code}
//                         onChange={handleChange}
//                     />
//                 </div>

//                 <div>
//                     <label>Minimum Claim Price:</label>
//                     <input
//                         type="text"
//                         name="minimum_claim_price"
//                         value={promo.minimum_claim_price}
//                         onChange={handleChange}
//                     />
//                 </div>

//                 <div>
//                     <label>Promo Discount Price:</label>
//                     <input
//                         type="text"
//                         name="promo_discount_price"
//                         value={promo.promo_discount_price}
//                         onChange={handleChange}
//                     />
//                 </div>

//                 <div>
//                     <label>Terms Condition:</label>
//                     <input
//                         type="text"
//                         name="terms_condition"
//                         value={promo.terms_condition}
//                         onChange={handleChange}
//                     />
//                 </div>

//                 <button type="submit">Update</button>

//             </form>
//         </div>
//     )
// }

// export default UpdatePromo
