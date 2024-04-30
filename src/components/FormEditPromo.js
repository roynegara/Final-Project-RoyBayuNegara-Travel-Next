
export default function FormEditPromo({
  title,
  defaultName,
  defaultDescription,
  defaultImageUrl,
  defaultTerms_condition,
  defaultPromo_code,
  defaultPromo_discount_price,
  defaultMinimum_claim_price,
  onEdit,
  loadingEditPromo,
}) {
  const handleEditBanner = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = formData.get("namaBanner");
    const description = formData.get("deskripsiBanner");
    const imageUrl = formData.get("gambarBanner");
    const terms_condition = formData.get("syaratKetentuan");
    const promo_code = formData.get("promoKode");
    const promo_discount_price = parseFloat(formData.get("promoHargaDiskon"));
    const minimum_claim_price = parseFloat(formData.get("klaimHargaMinimum"));

    onEdit({ title, description, imageUrl, terms_condition, promo_code, promo_discount_price, minimum_claim_price });
  };

  return (
    <form onSubmit={handleEditBanner}>
      <div className="form-edit-banner">
        <h5>{title}</h5>
        <div>
          <input defaultValue={defaultName} name="namaBanner" placeholder="Masukkan Nama Banner" />
          <input defaultValue={defaultDescription} name="deskripsiBanner" placeholder="Masukkan Deskripsi Banner" />
          <input defaultValue={defaultImageUrl} name="gambarBanner" placeholder="Masukkan Gambar Banner" />
          <input defaultValue={defaultTerms_condition} name="syaratKetentuan" placeholder="Masukkan Syarat & Ketentuan" />
          <input defaultValue={defaultPromo_code}  name="promoKode" placeholder="Masukkan Promo Code" />
          <input defaultValue={defaultPromo_discount_price}  name="promoHargaDiskon" placeholder="Masukkan Promo Harga Diskon" />
          <input defaultValue={defaultMinimum_claim_price}  name="klaimHargaMinimum" placeholder="Masukkan Klaim Harga Minimum" />

        </div>
        <div>
          <button type="onSubmit" disabled={loadingEditPromo}>
            {loadingEditPromo ? "Loading..." : title}
          </button>
        </div>
      </div>
    </form>
  );
}


// //coba edit file image
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
//   const [imageUrl, setImageUrl] = useState(defaultImageUrl);

//   const handleEditPromo = () => {
//     const formData = new FormData();
//     formData.append("namaBanner", defaultName);
//     formData.append("deskripsiBanner", defaultDescription);
//     formData.append("syaratKetentuan", defaultTerms_condition);
//     formData.append("promoKode", defaultPromo_code);
//     formData.append("promoHargaDiskon", defaultPromo_discount_price);
//     formData.append("klaimHargaMinimum", defaultMinimum_claim_price);
//     formData.append("gambarBanner", imageUrl); // Menggunakan URL gambar yang disimpan

//     onEdit(formData);
//   };

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
//   }

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile);
//   };

//   return (
//     <form onSubmit={(e) => {e.preventDefault(); handleEditPromo();}}>
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





// import React, { useState, useEffect } from "react";

// export default function FormEditPromo({
//   title,
//   defaultName,
//   defaultImageUrl,
//   defaultDescription,  
//   defaultTerms_condition,
//   defaultPromo_code,
//   defaultPromo_discount_price,
//   defaultMinimum_claim_price,
//   onEdit,
//   loadingEditPromo,
// }) {
//   const [file, setFile] = useState(null);
  

//   const handleEditBanner = (e) => {
//     e.preventDefault();

//     const formData = new FormData(e.currentTarget);
//     const title = formData.get("namaBanner");
//     const description = formData.get("deskripsiBanner");
//     const terms_condition = formData.get("syaratKetentuan");
//     const promo_code = formData.get("promoKode");
//     const promo_discount_price = parseFloat(formData.get("promoHargaDiskon"));
//     const minimum_claim_price = parseFloat(formData.get("klaimHargaMinimum"));
//     // const imageFile = formData.get("gambarBanner"); // Get the image file

//     if (file) { 
//       formData.append('gambarBanner', file);
//     }

//     // Buat objek data baru untuk mengirimkan ke fungsi onEdit
//     const newData = {
//       title,
//       description,
//       terms_condition,
//       promo_code,
//       promo_discount_price,
//       minimum_claim_price,
//       imageUrl: defaultImageUrl
//     };

//     onEdit(newData);
//   };

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile);
//   }

//   return (
//     <form onSubmit={handleEditBanner}>
//       <div className="form-edit-banner">
//         <h5>{title}</h5>
//         <div>
//           <input defaultValue={defaultName} name="namaBanner" placeholder="Masukkan Nama Banner" />
//           <input defaultValue={defaultDescription} name="deskripsiBanner" placeholder="Masukkan Deskripsi Banner" />
//           {/* Ganti input dengan type "file" */}
//           <input type="file" name="gambarBanner" onChange={handleFileChange} accept="image/*" /> {/* Menerima semua jenis gambar */}
//           <input defaultValue={defaultTerms_condition} name="syaratKetentuan" placeholder="Masukkan Syarat & Ketentuan" />
//           <input defaultValue={defaultPromo_code}  name="promoKode" placeholder="Masukkan Promo Code" />
//           <input defaultValue={defaultPromo_discount_price}  name="promoHargaDiskon" placeholder="Masukkan Promo Harga Diskon" />
//           <input defaultValue={defaultMinimum_claim_price}  name="klaimHargaMinimum" placeholder="Masukkan Klaim Harga Minimum" />
//         </div>
//         <div>
//           <button type="submit" disabled={loadingEditPromo}> {/* Perbaiki "onSubmit" menjadi "submit" */}
//             {loadingEditPromo ? "Loading..." : title}
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// }



// // murni
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
//   const handleEditBanner = (e) => {
//     e.preventDefault();

//     const formData = new FormData(e.currentTarget);
//     const title = formData.get("namaBanner");
//     const description = formData.get("deskripsiBanner");
//     const imageUrl = formData.get("gambarBanner");
//     const terms_condition = formData.get("syaratKetentuan");
//     const promo_code = formData.get("promoKode");
//     const promo_discount_price = parseFloat(formData.get("promoHargaDiskon"));
//     const minimum_claim_price = parseFloat(formData.get("klaimHargaMinimum"));

//     onEdit({ title, description, imageUrl, terms_condition, promo_code, promo_discount_price, minimum_claim_price });
//   };

//   return (
//     <form onSubmit={handleEditBanner}>
//       <div className="form-edit-banner">
//         <h5>{title}</h5>
//         <div>
//           <input defaultValue={defaultName} name="namaBanner" placeholder="Masukkan Nama Banner" />
//           <input defaultValue={defaultDescription} name="deskripsiBanner" placeholder="Masukkan Deskripsi Banner" />
//           <input defaultValue={defaultImageUrl} name="gambarBanner" placeholder="Masukkan Gambar Banner" />
//           <input defaultValue={defaultTerms_condition} name="syaratKetentuan" placeholder="Masukkan Syarat & Ketentuan" />
//           <input defaultValue={defaultPromo_code}  name="promoKode" placeholder="Masukkan Promo Code" />
//           <input defaultValue={defaultPromo_discount_price}  name="promoHargaDiskon" placeholder="Masukkan Promo Harga Diskon" />
//           <input defaultValue={defaultMinimum_claim_price}  name="klaimHargaMinimum" placeholder="Masukkan Klaim Harga Minimum" />

//         </div>
//         <div>
//           <button type="onSubmit" disabled={loadingEditPromo}>
//             {loadingEditPromo ? "Loading..." : title}
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// }
