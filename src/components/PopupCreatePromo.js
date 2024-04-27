import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/router";

const CreatePromo = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [terms_condition, setTerms_condition] = useState("");
  const [promo_code, setPromo_code] = useState("");
  const [promo_discount_price, setPromo_discount_price] = useState("");
  const [minimum_claim_price, setMinimum_claim_price] = useState("");

  const router = useRouter();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleTerms_conditionChange = (e) => {
    setTerms_condition(e.target.value);
  };

  const handlePromo_codeChange = (e) => {
    setPromo_code(e.target.value);
  };

  const handlePromo_discount_priceChange = (e) => {
    const value = parseFloat(e.target.value);
    setPromo_discount_price(value);
  };

  const handleMinimum_claim_priceChange = (e) => {
    const value = parseFloat(e.target.value);
    setMinimum_claim_price(value);
  };

  const handleSubmit = () => {
    const payload = {
      title: title,
      description: description,
      imageUrl: imageUrl,
      terms_condition: terms_condition,
      promo_code: promo_code,
      promo_discount_price: promo_discount_price,
      minimum_claim_price: minimum_claim_price,
    };

    const accessToken = localStorage.getItem("access_token");

    axios
      .post("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-promo", payload, {
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        toast.success(`${title} has been created`);
        props.updatePromosData(); // Update promo data in parent component
        props.setTrigger(false);
      })
      .catch((err) => {
        toast.error(err.response?.data?.message);
      });
  };

  return props.trigger ? (
    <div className="popup-create-promo-wrap">
      <div className="popup-create-promos">
        <h1>Add Promo</h1>
        <div className="input-box-create-promos">
          <input type="text" name="title" value={title} onChange={handleTitleChange} placeholder="Title" />
        </div>
        <div className="input-box-create-promos">
          <input type="text" name="description" value={description} onChange={handleDescriptionChange} placeholder="Description" />
        </div>
        <div className="input-box-create-promos">
          <input type="text" name="imageUrl" value={imageUrl} onChange={handleImageUrlChange} placeholder="Image Url" />
        </div>
        <div className="input-box-create-promos">
          <input type="text" name="terms_condition" value={terms_condition} onChange={handleTerms_conditionChange} placeholder="Terms Condition" />
        </div>
        <div className="input-box-create-promos">
          <input type="text" name="promo_code" value={promo_code} onChange={handlePromo_codeChange} placeholder="Promo Code" />
        </div>
        <div className="input-box-create-promos">
          <input type="text" name="promo_discount_price" value={promo_discount_price} onChange={handlePromo_discount_priceChange} placeholder="Promo Discount Price" />
        </div>
        <div className="input-box-create-promos">
          <input type="text" name="minimum_claim_price" value={minimum_claim_price} onChange={handleMinimum_claim_priceChange} placeholder="Minimum Claim Price" />
        </div>
        <div className="btn-create-promos-popup">
          <button onClick={handleSubmit}>Add Promo</button>
        </div>
        <span className="btn-close-popup-create-promo" onClick={() => props.setTrigger(false)}>&times;</span>
      </div>
    </div>
  ) : (
    ""
  );
};

export default CreatePromo;


// // sudah oke belum auto change data
// import React, { useState } from "react";
// import axios from "axios";
// import { toast } from "sonner";
// import { useRouter } from "next/router";

// const CreatePromo = (props) => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [imageUrl, setImageUrl] = useState("");
//   const [terms_condition, setTerms_condition] = useState("");
//   const [promo_code, setPromo_code] = useState("");
//   const [promo_discount_price, setPromo_discount_price] = useState("");
//   const [minimum_claim_price, setMinimum_claim_price] = useState("");

//   const router = useRouter();

//   // const [notif, setNotif] = useState("");

//   const handleTitleChange = (e) => {
//     setTitle(e.target.value);
//     console.log("title", e.target.value);
//   };

//   const handleDescriptionChange = (e) => {
//     setDescription(e.target.value);
//     console.log("description", e.target.value);
//   };

//   const handleImageUrlChange = (e) => {
//     setImageUrl(e.target.value);
//     console.log("imageUrl", e.target.value);
//   };

//   const handleTerms_conditionChange = (e) => {
//     setTerms_condition(e.target.value);
//     console.log("terms_condition", e.target.value);
//   };

//   const handlePromo_codeChange = (e) => {
//     setPromo_code(e.target.value);
//     console.log("promo_code", e.target.value);
//   };

//   const handlePromo_discount_priceChange = (e) => {
//     const value = parseFloat(e.target.value);
//     setPromo_discount_price(value);
//     console.log("promo_discount_price", value);
//   };

//   const handleMinimum_claim_priceChange = (e) => {
//     const value = parseFloat(e.target.value);
//     setMinimum_claim_price(value);
//     console.log("minimum_claim_price", value);
//   };

//   const handleSubmit = () => {
//     const payload = {
//       title: title,
//       description: description,
//       imageUrl: imageUrl,
//       terms_condition: terms_condition,
//       promo_code: promo_code,
//       promo_discount_price: promo_discount_price,
//       minimum_claim_price: minimum_claim_price,
//     };

//     const accessToken = localStorage.getItem("access_token");

//     axios
//       .post("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-promo", payload, {
//         headers: {
//           apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//           Authorization: `Bearer ${accessToken}`,
//         },
//       })
//       .then((res) => {
//         console.log("res", res);
//         // setNotif("Create Promo Success");
//         // setNotif(res.data.message);
//         toast.success(`${title} has been created`);

//         router.push("/promo", undefined, { shallow: true }).then((success) => {
//           if (success) {
//             setTimeout(() => {
//               window.location.reload()
//             },1000)
//           }
//         })
//         // setTimeout(() => {
//         //     props.onClose();
//         // }, 1500);
//       })
//       .catch((err) => {
//         console.log("err", err);
//         // setNotif("Create Promo Failed");
//         // setNotif(err.response.data.message);
//         toast.error(err.response?.data?.message);
//       });
//   };

//   return props.trigger ? (
//     <div className="popup-create-promo-wrap">
    
//       <div className="popup-create-promos">
        
//       <h1>Add Promo</h1>

//       <div className="input-box-create-promos">
//       <input type="text" name="title" value={title} onChange={handleTitleChange} placeholder="Title" />
//       </div>
        
//       <div className="input-box-create-promos">
//       <input
//         type="text"
//         name="description"
//         value={description}
//         onChange={handleDescriptionChange}
//         placeholder="Description"
//           />
//           </div>
        
//         <div className="input-box-create-promos">
//       <input type="text" name="imageUrl" value={imageUrl} onChange={handleImageUrlChange} placeholder="Image Url" />
//       </div>
            
//       <div className="input-box-create-promos">
//             <input
//         type="text"
//         name="terms_condition"
//         value={terms_condition}
//         onChange={handleTerms_conditionChange}
//         placeholder="Terms Condition"
//               />
//               </div>
              
//               <div className="input-box-create-promos">
//       <input
//         type="text"
//         name="promo_code"
//         value={promo_code}
//         onChange={handlePromo_codeChange}
//         placeholder="Promo Code"
//               />
//               </div>
                
//      <div className="input-box-create-promos">
//       <input
//         type="text"
//         name="promo_discount_price"
//         value={promo_discount_price}
//         onChange={handlePromo_discount_priceChange}
//         placeholder="Promo Discount Price"
//               />
//      </div>
                
//       <div className="input-box-create-promos">
//       <input
//         type="text"
//         name="minimum_claim_price"
//         value={minimum_claim_price}
//         onChange={handleMinimum_claim_priceChange}
//         placeholder="Minimum Claim Price"
//       />
//         </div>
        
//         <div className="btn-create-promos-popup">
//       <button onClick={handleSubmit}>Add Promo</button>
//         </div>
     

//       <span className="btn-close-popup-create-promo" onClick={() => props.setTrigger(false)}>&times;</span>
//       {props.children}
//       </div>
//       </div>
//   ) : (
//     ""
//   );
// };

// export default CreatePromo;
