export default function FormEditCategory({ title, defaultName, defaultImageUrl, onEdit, loadingEditCategory }) {
  const handleEditCategory = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("namaCategory");
    const imageUrl = formData.get("gambarCategory");

    onEdit({ name, imageUrl });
  };

  return (
    <form onSubmit={handleEditCategory}>
      <div className="form-edit-category">
        <h5>{title}</h5>
        <div>
          <input defaultValue={defaultName} name="namaCategory" placeholder="Masukkan Nama Category" />
          <input defaultValue={defaultImageUrl} name="gambarCategory" placeholder="Masukkan Gambar Category" />
        </div>
        <div>
          <button type="onSubmit" disabled={loadingEditCategory}>
            {loadingEditCategory ? "Loading..." : title}
          </button>
        </div>
      </div>
    </form>
  );
}
