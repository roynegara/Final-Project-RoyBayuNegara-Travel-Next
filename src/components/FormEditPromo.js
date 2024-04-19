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
    const name = formData.get("namaBanner");
    const description = formData.get("deskripsiBanner");
    const imageUrl = formData.get("gambarBanner");
    const terms_condition = formData.get("syaratKetentuan");
    const promo_code = formData.get("promoKode");
    const promo_discount_price = parseFloat(formData.get("promoHargaDiskon"));
    const minimum_claim_price = parseFloat(formData.get("klaimHargaMinimum"));

    onEdit({ name, description, imageUrl, terms_condition, promo_code, promo_discount_price, minimum_claim_price });
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
