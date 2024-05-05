import React, { useState } from "react";
import axios from "axios";

const PopupUpdateActivity = ({ activity, closeModal, PopupUpdateActivityData }) => {
  const [formData, setFormData] = useState({
    title: activity.title,
    description: activity.description,
    imageUrls: activity.imageUrls || [],
    price: activity.price || "",
    price_discount: activity.price_discount || "",
    rating: activity.rating || "",
    total_reviews: activity.total_reviews || "",
    facilities: activity.facilities || "",
    address: activity.address || "",
    province: activity.province || "",
    city: activity.city || "",
    location_maps: activity.location_maps || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      await axios.post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-activity/${activity.id}`,
        formData,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("Update successful");
      PopupUpdateActivityData();
      closeModal();
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Edit Activity</h2>
        <form>
          <label>Title:</label>
          <input type="text" name="title" value={formData.title} onChange={handleInputChange} />

          <label>Description:</label>
          <textarea name="description" value={formData.description} onChange={handleInputChange}></textarea>

          <label>Image URLs:</label>
          <input type="text" name="imageUrls" value={formData.imageUrls} onChange={handleInputChange} />

          <label>Price:</label>
          <input type="number" name="price" value={formData.price} onChange={handleInputChange} />

          <label>Price Discount:</label>
          <input type="number" name="price_discount" value={formData.price_discount} onChange={handleInputChange} />

          <label>Rating:</label>
          <input type="number" name="rating" value={formData.rating} onChange={handleInputChange} />

          <label>Total Reviews:</label>
          <input type="number" name="total_reviews" value={formData.total_reviews} onChange={handleInputChange} />

          <label>Facilities:</label>
          <textarea name="facilities" value={formData.facilities} onChange={handleInputChange}></textarea>

          <label>Address:</label>
          <textarea name="address" value={formData.address} onChange={handleInputChange}></textarea>

          <label>Province:</label>
          <input type="text" name="province" value={formData.province} onChange={handleInputChange} />

          <label>City:</label>
          <input type="text" name="city" value={formData.city} onChange={handleInputChange} />

          <label>Location Maps:</label>
          <textarea name="location_maps" value={formData.location_maps} onChange={handleInputChange}></textarea>

          <button type="button" onClick={handleSubmit}>
            Update
          </button>
          <button type="button" onClick={closeModal}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupUpdateActivity;
