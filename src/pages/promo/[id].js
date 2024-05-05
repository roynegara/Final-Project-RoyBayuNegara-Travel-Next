import React, { useEffect, useState } from "react";
import axios from "axios";
import useDeletePromo from "@/hooks/useDeletePromo";
import FormDeletePromo from "@/components/FormDeletePromo";
import { useRouter } from "next/router";
import { toast } from "sonner";

import FormEditPromo from "@/components/FormEditPromo";
import useEditPromo from "@/hooks/useEditPromo";

export async function getServerSideProps(context) {
  try {
    const resp = await axios.get(
      `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promo/${context.params.id}`,
      {
        headers: { apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c", keyWord: "Dibimbing API key" },
      }
    );
    return { props: { promo: resp.data.data } };
  } catch (error) {
    console.error("Error fetching promo:", error);
    return { props: { promo: null } };
  }
}

export default function PromoById({ promo }) {
  const { del, loading } = useDeletePromo();
  const { pos, loadingEditPromo } = useEditPromo();
 

  const router = useRouter();

  const handleDeletePromo = () => {
    del(`/delete-promo/${promo?.id}`)
      .then((res) => {
      
        toast.success(`${promo?.title} has been deleted`);
        setTimeout(() => {
          router.push("/promo");
        }, 1000);
      })
      .catch((err) => {
        console.log("resDeletePromoErr", err);        
        toast.error(err?.response?.data?.message);
      });
  };

  const handleEditPromo = ({
    title,
    description,
    imageUrl,
    terms_condition,
    promo_code,
    promo_discount_price,
    minimum_claim_price,
  }) => {
    pos(`/update-promo/${promo?.id}`, {
      title,
      description,
      imageUrl,
      terms_condition,
      promo_code,
      promo_discount_price,
      minimum_claim_price,
    })
      .then((res) => {
        // setNotif("Promo updated successfully");
        toast.success(`${promo?.title} has been edited`);
        setTimeout(() => {
          router.push(`/promo/${promo?.id}`);
          setPopupOpenEdit(false);
        }, 1000);
      })
      .catch((err) => {
        console.log("resEditPromoErr", err);

        if (
          err?.response?.data?.errors &&
          err?.response?.data?.errors.length > 0 &&
          err.response.data.errors[0].message
        ) {
          toast.error(err.response.data.errors[0].message);
        } else {
          toast.error(err?.response?.data?.message);
        }
        
      });
  };

  const [isPopupOpenEdit, setPopupOpenEdit] = useState(false);
  const togglePopupEdit = () => {
    setPopupOpenEdit(!isPopupOpenEdit);
  };

  const [isPopupOpenDelete, setPopupOpenDelete] = useState(false);
  const togglePopupDelete = () => {
    setPopupOpenDelete(!isPopupOpenDelete);
  };

  return (
    <div className="promoid">
      <div className="promoid-card-home">
        <div>
        <h1>{promo.title}</h1>
        <img src={promo?.imageUrl} alt={promo?.title} />
        <p>{promo?.description}</p>
        {/* <h2>This is {promo?.title} Promo</h2> */}
      </div>
      <div>
        <h2>Promo Code : {promo.promo_code}</h2>
      </div>
      <div>
        <h2> Minimum Claim Price : {promo.minimum_claim_price}</h2>
        <h2> Promo Discount Price : {promo.promo_discount_price}</h2>
      </div>
      <div>
        <h2>Read The Term and Condition : {promo.terms_condition}</h2>
      </div>
      <div>
        
        </div>
        </div>

        
      <div>
        {/* <button onClick={togglePopupEdit}> Edit Promo {promo?.title}</button> */}
        {isPopupOpenEdit && (
          <div className="popup-edit-promo">
            <button className="btn-close-popup-edit-promo" onClick={togglePopupEdit}>
              X
            </button>
            <FormEditPromo
              title={`Edit ${promo?.title} Promo ?`}
              defaultName={promo?.title}
              defaultDescription={promo?.description}
              defaultImageUrl={promo?.imageUrl}
              defaultTerms_condition={promo?.terms_condition}
              defaultPromo_code={promo?.promo_code}
              defaultPromo_discount_price={promo?.promo_discount_price}
              defaultMinimum_claim_price={promo?.minimum_claim_price}
              onEdit={handleEditPromo}
              loading={loadingEditPromo}
            />
          </div>
        )}
      </div>

      <div>
        {/* <button onClick={togglePopupDelete}>Delete {promo?.title}</button> */}
        {isPopupOpenDelete && (
          <div>
            <div className="popup-delete-promo">
              <div></div>
              <div>
                <p>Are you sure you want to delete {promo?.title} ?</p>
              </div>

              <div className="popup-delete-promo-btn-yes">
                <FormDeletePromo title={`Yes`} onDelete={handleDeletePromo} loading={loading} />
              </div>


              <div className="popup-delete-promo-btn-no">
                <button className="btn-close-popup-delete-promo" onClick={togglePopupDelete}>
                  Tidak
                </button>
              </div>
            </div>
          </div>
        )}       
      </div>
      <div>
        <button onClick={() => router.back()}>Back</button>        
      </div>
    </div>
  );
}



// // sdh benar
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import useDeletePromo from "@/hooks/useDeletePromo";
// import FormDeletePromo from "@/components/FormDeletePromo";
// import { useRouter } from "next/router";
// import { toast } from "sonner";

// import FormEditPromo from "@/components/FormEditPromo";
// import useEditPromo from "@/hooks/useEditPromo";

// export async function getServerSideProps(context) {
//   try {
//     const resp = await axios.get(
//       `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promo/${context.params.id}`,
//       {
//         headers: { apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c", keyWord: "Dibimbing API key" },
//       }
//     );
//     return { props: { promo: resp.data.data } };
//   } catch (error) {
//     console.error("Error fetching promo:", error);
//     return { props: { promo: null } };
//   }
// }

// export default function PromoById({ promo }) {
//   const { del, loading } = useDeletePromo();
//   const { pos, loadingEditPromo } = useEditPromo();
 

//   const router = useRouter();

//   const handleDeletePromo = () => {
//     del(`/delete-promo/${promo?.id}`)
//       .then((res) => {
      
//         toast.success(`${promo?.title} has been deleted`);
//         setTimeout(() => {
//           router.push("/promo");
//         }, 1000);
//       })
//       .catch((err) => {
//         console.log("resDeletePromoErr", err);        
//         toast.error(err?.response?.data?.message);
//       });
//   };

//   const handleEditPromo = ({
//     title,
//     description,
//     imageUrl,
//     terms_condition,
//     promo_code,
//     promo_discount_price,
//     minimum_claim_price,
//   }) => {
//     pos(`/update-promo/${promo?.id}`, {
//       title,
//       description,
//       imageUrl,
//       terms_condition,
//       promo_code,
//       promo_discount_price,
//       minimum_claim_price,
//     })
//       .then((res) => {
//         // setNotif("Promo updated successfully");
//         toast.success(`${promo?.title} has been edited`);
//         setTimeout(() => {
//           router.push(`/promo/${promo?.id}`);
//           setPopupOpenEdit(false);
//         }, 1000);
//       })
//       .catch((err) => {
//         console.log("resEditPromoErr", err);

//         if (
//           err?.response?.data?.errors &&
//           err?.response?.data?.errors.length > 0 &&
//           err.response.data.errors[0].message
//         ) {
//           toast.error(err.response.data.errors[0].message);
//         } else {
//           toast.error(err?.response?.data?.message);
//         }
        
//       });
//   };

//   const [isPopupOpenEdit, setPopupOpenEdit] = useState(false);
//   const togglePopupEdit = () => {
//     setPopupOpenEdit(!isPopupOpenEdit);
//   };

//   const [isPopupOpenDelete, setPopupOpenDelete] = useState(false);
//   const togglePopupDelete = () => {
//     setPopupOpenDelete(!isPopupOpenDelete);
//   };

//   return (
//     <div className="promo">
//       <div>
//         <h1>{promo.title}</h1>
//         <img src={promo?.imageUrl} alt={promo?.title} />
//         <h1>This is {promo?.title} Promo</h1>
//       </div>
//       <div>
//         <h1>Promo Code : {promo.promo_code}</h1>
//       </div>
//       <div>
//         <h2> Minimum Claim Price : {promo.minimum_claim_price}</h2>
//         <h2> Promo Discount Price : {promo.promo_discount_price}</h2>
//       </div>
//       <div>
//         <h2>Read The Term and Condition : {promo.terms_condition}</h2>
//       </div>
//       <div>
//         <p>{promo?.description}</p>
//       </div>

//       <div>
//         <button onClick={togglePopupEdit}> Edit Promo {promo?.title}</button>
//         {isPopupOpenEdit && (
//           <div className="popup-edit-promo">
//             <button className="btn-close-popup-edit-promo" onClick={togglePopupEdit}>
//               X
//             </button>
//             <FormEditPromo
//               title={`Edit ${promo?.title} Promo ?`}
//               defaultName={promo?.title}
//               defaultDescription={promo?.description}
//               defaultImageUrl={promo?.imageUrl}
//               defaultTerms_condition={promo?.terms_condition}
//               defaultPromo_code={promo?.promo_code}
//               defaultPromo_discount_price={promo?.promo_discount_price}
//               defaultMinimum_claim_price={promo?.minimum_claim_price}
//               onEdit={handleEditPromo}
//               loading={loadingEditPromo}
//             />
//           </div>
//         )}
//       </div>

//       <div>
//         <button onClick={togglePopupDelete}>Delete {promo?.title}</button>
//         {isPopupOpenDelete && (
//           <div>
//             <div className="popup-delete-promo">
//               <div></div>
//               <div>
//                 <p>Are you sure you want to delete {promo?.title} ?</p>
//               </div>

//               <div className="popup-delete-promo-btn-yes">
//                 <FormDeletePromo title={`Yes`} onDelete={handleDeletePromo} loading={loading} />
//               </div>


//               <div className="popup-delete-promo-btn-no">
//                 <button className="btn-close-popup-delete-promo" onClick={togglePopupDelete}>
//                   Tidak
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}       
//       </div>
//     </div>
//   );
// }



//coba edit url
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// export default function FormEditPromo({
//   title,
//   defaultName,
//   defaultDescription,
//   defaultImageUrl,
//   defaultTerms_condition,
//   defaultPromo_code,
//   defaultPromo_discount_price,
//   defaultMinimum_claim_price,
//   onEdit,
//   loadingEditPromo,
// }) {
//   const [file, setFile] = useState(null);
//   const [imageUrl, setImageUrl] = useState(defaultImageUrl); // State untuk menyimpan URL gambar

//   const handleEditBanner = () => {
//     if (imageUrl) {
//       const formData = new FormData();
//       formData.append("namaBanner", defaultName);
//       formData.append("deskripsiBanner", defaultDescription);
//       formData.append("syaratKetentuan", defaultTerms_condition);
//       formData.append("promoKode", defaultPromo_code);
//       formData.append("promoHargaDiskon", defaultPromo_discount_price);
//       formData.append("klaimHargaMinimum", defaultMinimum_claim_price);
//       formData.append("gambarBanner", imageUrl); // Menggunakan URL gambar yang disimpan

//       onEdit(formData);
//     };
//   }

//   useEffect(() => {
//     handleEditBanner()
//   },imageUrl)

//   const handleUpload = () => {
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
//       )
//       .then((res) => {
//         console.log(res);
//         setImageUrl(res.data.url); // Setelah berhasil upload, simpan URL gambar ke state
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile);
//   };

//   return (
//     <form onSubmit={(e) => {e.preventDefault(); handleUpload();}}>
//       <div className="form-edit-banner">
//         <h5>{title}</h5>
//         <div>
//           <input defaultValue={defaultName} name="namaBanner" placeholder="Masukkan Nama Banner" />
//           <input defaultValue={defaultDescription} name="deskripsiBanner" placeholder="Masukkan Deskripsi Banner" />
//           <input defaultValue={defaultTerms_condition} name="syaratKetentuan" placeholder="Masukkan Syarat & Ketentuan" />
//           <input defaultValue={defaultPromo_code}  name="promoKode" placeholder="Masukkan Promo Code" />
//           <input defaultValue={defaultPromo_discount_price}  name="promoHargaDiskon" placeholder="Masukkan Promo Harga Diskon" />
//           <input defaultValue={defaultMinimum_claim_price}  name="klaimHargaMinimum" placeholder="Masukkan Klaim Harga Minimum" />
//           <input type="file" onChange={handleFileChange} accept="image/*" />
//         </div>
//         <div>
//           <button type="submit" disabled={loadingEditPromo}>
//             {loadingEditPromo ? "Loading..." : title}
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// }




// // murni 
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import useDeletePromo from "@/hooks/useDeletePromo";
// import FormDeletePromo from "@/components/FormDeletePromo";
// import { useRouter } from "next/router";
// import { toast } from "sonner";

// import FormEditPromo from "@/components/FormEditPromo";
// import useEditPromo from "@/hooks/useEditPromo";

// export async function getServerSideProps(context) {
//   try {
//     const resp = await axios.get(
//       `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promo/${context.params.id}`,
//       {
//         headers: { apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c", keyWord: "Dibimbing API key" },
//       }
//     );
//     return { props: { promo: resp.data.data } };
//   } catch (error) {
//     console.error("Error fetching promo:", error);
//     return { props: { promo: null } };
//   }
// }

// export default function PromoById({ promo }) {
//   const { del, loading } = useDeletePromo();
//   const { pos, loadingEditPromo } = useEditPromo();
//   // const [notif, setNotif] = useState(null);

//   const router = useRouter();

//   const handleDeletePromo = () => {
//     del(`/delete-promo/${promo?.id}`)
//       .then((res) => {
//         // setNotif("Promo deleted successfully");
//         toast.success(`${promo?.title} has been deleted`);
//         setTimeout(() => {
//           router.push("/promo");
//         }, 1000);
//       })
//       .catch((err) => {
//         console.log("resDeletePromoErr", err);
//         // setNotif(err?.response?.data?.message);
//         toast.error(err?.response?.data?.message);
//       });
//   };

//   const handleEditPromo = ({
//     title,
//     description,
//     imageUrl,
//     terms_condition,
//     promo_code,
//     promo_discount_price,
//     minimum_claim_price,
//   }) => {
//     pos(`/update-promo/${promo?.id}`, {
//       title,
//       description,
//       imageUrl,
//       terms_condition,
//       promo_code,
//       promo_discount_price,
//       minimum_claim_price,
//     })
//       .then((res) => {
//         // setNotif("Promo updated successfully");
//         toast.success(`${promo?.title} has been edited`);
//         setTimeout(() => {
//           router.push(`/promo/${promo?.id}`);
//           setPopupOpenEdit(false);
//         }, 1000);
//       })
//       .catch((err) => {
//         console.log("resEditPromoErr", err);

//         if (
//           err?.response?.data?.errors &&
//           err?.response?.data?.errors.length > 0 &&
//           err.response.data.errors[0].message
//         ) {
//           toast.error(err.response.data.errors[0].message);
//         } else {
//           toast.error(err?.response?.data?.message);
//         }
//         // toast.error(err?.response?.data?.message);
//         // setNotifEdit(err?.response?.data?.message);
//       });
//   };

//   const [isPopupOpenEdit, setPopupOpenEdit] = useState(false);
//   const togglePopupEdit = () => {
//     setPopupOpenEdit(!isPopupOpenEdit);
//   };

//   const [isPopupOpenDelete, setPopupOpenDelete] = useState(false);
//   const togglePopupDelete = () => {
//     setPopupOpenDelete(!isPopupOpenDelete);
//   };

//   return (
//     <div className="promo">
//       <div>
//         <h1>{promo.title}</h1>
//         <img src={promo?.imageUrl} alt={promo?.title} />
//         <h1>This is {promo?.title} Promo</h1>
//       </div>

//       <div>
//         <h1>Promo Code : {promo.promo_code}</h1>
//       </div>
//       <div>
//         <h2> Minimum Claim Price : {promo.minimum_claim_price}</h2>
//         <h2> Promo Discount Price : {promo.promo_discount_price}</h2>
//       </div>
//       <div>
//         <h2>Read The Term and Condition : {promo.terms_condition}</h2>
//       </div>
//       <div>
//         <p>{promo?.description}</p>
//       </div>

//       <div>
//         <button onClick={togglePopupEdit}> Edit Promo {promo?.title}</button>
//         {isPopupOpenEdit && (
//           <div className="popup-edit-promo">
//             <button className="btn-close-popup-edit-promo" onClick={togglePopupEdit}>
//               X
//             </button>
//             <FormEditPromo
//               title={`Edit ${promo?.title} Promo ?`}
//               defaultName={promo?.title}
//               defaultDescription={promo?.description}
//               defaultImageUrl={promo?.imageUrl}
//               defaultTerms_condition={promo?.terms_condition}
//               defaultPromo_code={promo?.promo_code}
//               defaultPromo_discount_price={promo?.promo_discount_price}
//               defaultMinimum_claim_price={promo?.minimum_claim_price}
//               onEdit={handleEditPromo}
//               loading={loadingEditPromo}
//             />
//           </div>
//         )}
//       </div>

//       <div>
//         <button onClick={togglePopupDelete}>Delete {promo?.title}</button>
//         {isPopupOpenDelete && (
//           <div>
//             <div className="popup-delete-promo">
//               <div></div>
//               <div>
//                 <p>Are you sure you want to delete {promo?.title} ?</p>
//               </div>

//               <div className="popup-delete-promo-btn-yes">
//                 <FormDeletePromo title={`Yes`} onDelete={handleDeletePromo} loading={loading} />
//               </div>


//               <div className="popup-delete-promo-btn-no">
//                 <button className="btn-close-popup-delete-promo" onClick={togglePopupDelete}>
//                   Tidak
//                 </button>
//               </div>


//             </div>
//           </div>
//         )}

//         {/* {notif && <p style={{ color: notif === "Promo deleted successfully" ? "green" : "red" }}>{notif}</p>} */}
//         {/* <FormDeletePromo title={`Delete ${promo?.title} ?`} onDelete={handleDeletePromo} loading={loading} /> */}
//       </div>
//     </div>
//   );
// }
