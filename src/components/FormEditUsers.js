export default function FormEditBanner({
  title,
  defaultRoleAdmin,
  defaultRoleUser,
 
  onEdit,
  loadingEditUsers
}) {
  const handleEditRole = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const role = formData.get("changeRole");


    onEdit({ role });
  };

  return (
    <form onSubmit={handleEditRole}>
      <div className="form-edit-banner">
      <h5>{title}</h5>
          <div>
          <label>Update Role Users</label>
          <select>
            <option>-- Change Role --</option>
            <option defaultValue={defaultRoleAdmin} name="changeRoleAdmin" />
            <option defaultValue={defaultRoleUser} name="changeRoleUser" />
          </select>
          
         </div>
      <div>
        <button type="onSubmit" disabled={loadingEditUsers}>
          {loadingEditUsers ? "Loading..." : title}
        </button>
      </div>
      </div>
    
    </form>
  );
}
