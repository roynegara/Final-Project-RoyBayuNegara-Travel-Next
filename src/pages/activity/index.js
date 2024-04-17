import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import PopupCreateActivity from "@/components/PopupCreateActivity";

const Activity = () => {
  const [activities, setActivities] = useState([]);

  const [buttonPopupCreateActivity, setButtonPopupCreateActivity] = useState(false);

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
      <div>
        <h1>Activity</h1>
        <button onClick={() => setButtonPopupCreateActivity(true)}>Create Activity</button>
        <PopupCreateActivity trigger={buttonPopupCreateActivity} setTrigger={setButtonPopupCreateActivity}></PopupCreateActivity>
      </div>

      <div>
        {activities.map((activity, index) => (
          <div className="activities" key={index}>
            <h3>{activity.title}</h3>
            <img
              src={
                activity.imageUrls?.[0] && activity.imageUrls?.[1] ? activity.imageUrls?.[1] : activity.imageUrls?.[0]
              }
              alt={activity.title}
            />
            {/* <img src={activity.imageUrls} alt={activity.title} /> */}

            <h3>Activity id : {activity.id}</h3>
            {/* <p>Activity by Category Id : {activity.categoryId}</p> */}
            {/* <img src={activity.category.imageUrl} alt={activity.category.name} />
            <p>{activity.category.id}</p>
            <p>{activity.category.name}</p> */}
            <div>
              <Link href={`/activity/${activity.id}`}>
                <button>Detail</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activity;
