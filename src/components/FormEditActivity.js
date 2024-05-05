export default function FormEditActivity({
  defaultCategoryId,
  title,
  defaultName,
  defaultDescription,
  defaultImageUrls,
  defaultPrice,
  defaultPrice_Discount,
  defaultRating,
  defaultTotal_Reviews,
  defaultFacilities,
  defaultAddress,
  defaultProvince,
  defaultCity,
defaultLocation_Maps, 
  onEdit,
  loadingEditActivity,
}) {
  const handleEditActivity = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const categoryId = formData.get("categoryId");
    const title = formData.get("namaActivity");
    const description = formData.get("deskripsiActivity");
    
    const imageUrlsArray = formData.get("gambarActivity");
    const imageUrls = imageUrlsArray.split(",");

    const price = parseFloat(formData.get("hargaActivity"));
    const price_discount = formData.get("hargaDiskonActivity");
    const rating = formData.get("ratingActivity");
    const total_reviews = formData.get("totalReviewActivity");
    const facilities = formData.get("fasilitasActivity");
    const address = formData.get("alamatActivity");
    const province = formData.get("provinsiActivity");
    const city = formData.get("kotaActivity");
    const location_maps = formData.get("lokasiActivity");  
    onEdit({ categoryId, title, description, imageUrls, price, price_discount, rating, total_reviews, facilities, address, province, city, location_maps });
  };

  return (
    <form onSubmit={handleEditActivity}>
      <div className="form-edit-activity">
        <h5>{title}</h5>
        <div>
          <input defaultValue={defaultCategoryId} name="categoryId" placeholder="Masukkan Category Id" />
          <input defaultValue={defaultName} name="namaActivity" placeholder="Masukkan Nama Activity" />
          <input defaultValue={defaultDescription} name="deskripsiActivity" placeholder="Masukkan Deskripsi Activity" />
          <input defaultValue={defaultImageUrls} name="gambarActivity" placeholder="Masukkan Gambar Activity" />
          <input defaultValue={defaultPrice} name="hargaActivity" placeholder="Masukkan Harga Activity" />
          <input defaultValue={defaultPrice_Discount} name="hargaDiskonActivity" placeholder="Masukkan Harga Diskon Activity" />
          <input defaultValue={defaultRating} name="ratingActivity" placeholder="Masukkan Rating Activity" />
          <input defaultValue={defaultTotal_Reviews} name="totalReviewActivity" placeholder="Masukkan Total Review Activity" />
          <input defaultValue={defaultFacilities} name="fasilitasActivity" placeholder="Masukkan Fasilitas Activity" />
          <input defaultValue={defaultAddress} name="alamatActivity" placeholder="Masukkan Alamat Activity" />
          <input defaultValue={defaultProvince} name="provinsiActivity" placeholder="Masukkan Provinsi Activity" />
          <input defaultValue={defaultCity} name="kotaActivity" placeholder="Masukkan Kota Activity" />
          <input defaultValue={defaultLocation_Maps} name="lokasiActivity" placeholder="Masukkan Lokasi Activity" />
        </div>
        <div>
          <button type="onSubmit" disabled={loadingEditActivity}>
            {loadingEditActivity ? "Loading..." : title}
          </button>
        </div>
      </div>
    </form>
  );
}

