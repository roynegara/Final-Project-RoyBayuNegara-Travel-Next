import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";

const ActivityList = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [activities, setActivities] = useState([]);
  const [notif, setNotif] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories", {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        });
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    setActivities([]);
    setNotif("");

    const fetchActivities = async () => {
      try {
        const response = await axios.get(
          `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activities-by-category/${selectedCategory}`,
          {
            headers: {
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            },
          }
        );
        if (response.data.data.length === 0) {
          toast.warning("This category is empty");
          setNotif("This category is empty");
        } else {
          setActivities(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    if (selectedCategory) {
      fetchActivities();
    }
  }, [selectedCategory]);

  useEffect(() => {
    setSelectedCategory("");
  }, [categories]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div className="activity-by-categoryId">
      <h1>Category List</h1>
      <select className="activity-option" id="categorySelect" value={selectedCategory} onChange={handleCategoryChange}>
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      {notif && <h1>{notif}</h1>}
      <ul className="activity-option-wrapper">
        {activities.map((activity) => (
          <li className="activity-option-card" key={activity.id}>
            <img src={activity.imageUrls[0]} alt={activity.title} />
            <div className="activity-option-card-body">
              <h3 className="activity-option-card-title">{activity.title}</h3>
              <p className="activity-option-card-description">{activity.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityList;
