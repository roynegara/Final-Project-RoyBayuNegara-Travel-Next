// export default function FormEditBanner({
//   title,
//   defaultName,
//   // defaultImageUrl,
//   defaultFileBanner,
//   onEdit,
//   loadingEditBanner

// }) {
//   const handleEditBanner = (e) => {
//     e.preventDefault();

//     const formData = new FormData(e.currentTarget);
//     const name = formData.get("namaBanner");
//     const imageUrl = formData.get("gambarBanner");
//     const file = formData.get("fileBanner");
    

//     onEdit({ name, imageUrl, file });
//   };

//   return (
//     <form onSubmit={handleEditBanner}>
//       <div className="form-edit-banner">
//       <h5>{title}</h5>
//           <div>
        
//         <input defaultValue={defaultName} name="namaBanner" placeholder="Masukkan Nama Banner" />
//           {/* <input defaultValue={defaultImageUrl} name="gambarBanner" placeholder="Masukkan Gambar Banner" /> */}
//           <input defaultValue={defaultFileBanner} name="fileBanner" type="file" name="fileBanner" />
//       </div>
//       <div>
//         <button type="onSubmit" disabled={loadingEditBanner}>
//           {loadingEditBanner ? "Loading..." : title}
//         </button>
//       </div>
//       </div>
    
//     </form>
//   );
// }

export default function FormEditBanner({
  title,
  defaultName,
  defaultImageUrl,
  onEdit,
  loadingEditBanner

}) {
  const handleEditBanner = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("namaBanner");
    const imageUrl = formData.get("gambarBanner");
   
    

    onEdit({ name, imageUrl});
  };

  return (
    <form onSubmit={handleEditBanner}>
      <div className="form-edit-banner">
      <h5>{title}</h5>
          <div>
        
        <input defaultValue={defaultName} name="namaBanner" placeholder="Masukkan Nama Banner" />
        <input defaultValue={defaultImageUrl} name="gambarBanner" placeholder="Masukkan Gambar Banner" />
      </div>
      <div>
        <button type="onSubmit" disabled={loadingEditBanner}>
          {loadingEditBanner ? "Loading..." : title}
        </button>
      </div>
      </div>
    
    </form>
  );
}

