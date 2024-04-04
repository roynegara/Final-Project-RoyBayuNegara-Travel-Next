import { updateUserProfile } from "@/api/user";
import React, { useState } from "react";

const UpdateProfilePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profilPictureUrl: "",
    phoneNumber: "",
  });

  const [showNotification, setShowNotification] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateUserProfile(formData);
      console.log(res.data);
      setShowNotification("Successfully updated");
    } catch (error) {
      console.error(error);
      setShowNotification(error?.message);
    }
  };

  return (
    <div>
      <h1>Update Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>

        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>

        <div>
          <label>Profil Picture Url:</label>
          <input type="text" name="profilPictureUrl" value={formData.profilPictureUrl} onChange={handleChange} />
        </div>
        <div>
          <label>Phone Number:</label>
          <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
        </div>

        {showNotification && <p style={{ color: "red" }}>{showNotification}</p>}
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateProfilePage;
