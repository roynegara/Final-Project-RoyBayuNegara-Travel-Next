export default function FormEditBanner({
  title,
  defaultName,
  defaultImageUrl,
    onEdit,
    loadingEditBanner,
}) {
  const handleEditBanner = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("namaBanner");
    const imageUrl = formData.get("gambarBanner");


    onEdit({ name, imageUrl });
  };

  return (
    <form onSubmit={handleEditBanner}>
      <h5>{title}</h5>
      
      <input defaultValue={defaultName} name="namaBanner" placeholder="Masukkan Nama Banner" />
      <input defaultValue={defaultImageUrl} name="gambarBanner" placeholder="Masukkan Gambar Banner"/>


      <button type="onSubmit" disabled={loadingEditBanner}>{loadingEditBanner ? "Loading..." : title}</button>

      
    </form>
  );
}
