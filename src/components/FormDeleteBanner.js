export default function FormDeleteBanner({ title, onDelete, loading }) {
  const handleDeleteBanner = (e) => {
    e.preventDefault();
    onDelete();
  };

  return (
    <form onSubmit={handleDeleteBanner}>
      <div>
        <button type="onSubmit" disabled={loading}>
          {loading ? "Loading..." : title}
        </button>
      </div>
    </form>
  );
}
