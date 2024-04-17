export default function FormDeleteActivity({ title, onDelete, loading }) {
    const handleDeleteActivity = (e) => {
      e.preventDefault();
      onDelete();
    };
  
    return (
      <form onSubmit={handleDeleteActivity}>
        <button type="onSubmit" disabled={loading}>
          {loading ? "Loading..." : title}
        </button>
      </form>
    );
  }
  
