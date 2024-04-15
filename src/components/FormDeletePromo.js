export default function FormDeletePromo({
    title,
    onDelete,
    loading
}) {
    const handleDeletePromo = (e) => {
        e.preventDefault();
        onDelete();
    };

    return (
        <form onSubmit={handleDeletePromo}>
            <button type="onSubmit" disabled={loading}>{loading ? "Loading..." : title}</button>
    </form>
)
}