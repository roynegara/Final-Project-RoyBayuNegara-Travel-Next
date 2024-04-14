import React, { useEffect, useState } from "react";
import axios from "axios";

const Activity = () => {
  const [activities, setActivities] = useState([]);

  const getActivities = () => {
    const accessToken = localStorage.getItem("accessToken");
    axios
      .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activities", {
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log("res", res);
        setActivities(res.data.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    getActivities();
  }, []);

  return (
    <div>
      <h1>Activity</h1>
      <div>
        {activities.map((activity, index) => (
          <div key={index}>
            <h3>{activity.title}</h3>
            <img src={activity.imageUrls} alt={activity.title} />
            <h3>Activity id : {activity.id}</h3>
            {/* <p>Activity by Category Id : {activity.categoryId}</p> */}
            {/* <img src={activity.category.imageUrl} alt={activity.category.name} />
            <p>{activity.category.id}</p>
            <p>{activity.category.name}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activity;
