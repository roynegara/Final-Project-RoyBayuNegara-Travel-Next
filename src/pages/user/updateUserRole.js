import React, { useState } from "react";
import { updateUserRole } from "@/api/user";

const UpdateUserRolePage = () => {
  const [formData, setFormData] = useState({
    role: "",
  });

  const [showNotification, setShowNotification] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventdefault();
    try {
      const res = await updateUserRole(formData);
      console.log(res.data);
      setShowNotification("Status : " + data?.message);
    } catch (error) {
      console.error(error);
      setShowNotification("Status : " + error?.message);
    }
  };

  return (
    <div>
      <h1>Update User Role</h1>
      <form onSubmit={handleSubmit}>
        <label>Role:</label>
        <input type="text" name="role" value={formData.role} onChange={handleChange} />
        {showNotification && <p style={{ color: "red" }}>{showNotification}</p>}
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateUserRolePage;
