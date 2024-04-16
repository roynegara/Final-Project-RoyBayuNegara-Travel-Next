export default function FormDeleteCategory({
    title,
    onDelete,
    loading,
}) {
  const handleDeleteCategory = (e) => {
    e.preventDefault();
    onDelete();
  };

  return (
    <form onSubmit={handleDeleteCategory}>
      <button type="onSubmit" disabled={loading}>{loading ? "Loading..." : title}</button>
    </form>
  );
}
