import React, { useEffect, useState } from "react";
import axios from "axios";
import useDeleteActivity from "@/hooks/useDeleteActivity";
import FormDeleteActivity from "@/components/FormDeleteActivity";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  try {
    const resp = await axios.get(
      `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activity/${context.params.id}`,
      {
        headers: { apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c", keyWord: "Dibimbing API key" },
      }
    );
    return { props: { activity: resp.data.data } };
  } catch (error) {
    console.error("Error fetching activity:", error);
    return { props: { activity: null } };
  }
}

export default function ActivityById({ activity }) {
  const router = useRouter();
  const { del, loading } = useDeleteActivity();
  const [notif, setNotif] = useState(null);

const handleDeleteActivity = () => {
  del(`/delete-activity/${activity?.id}`)
  .then((res) => {
    setNotif("Activity deleted successfully");
    // setTimeout(() => {
    //   router.push("/activity");
    // }, 1000);
  })
  .catch((err) => {
    console.log("resDeleteActivityErr", err);
    setNotif(err?.response?.data?.message);
  })
}

  if(!activity) {
    return (
      <div>
        <h1>No Activity or Destination Here</h1>
        <button onClick={() => router.push("/activity")}>Back to Activity/Destination</button>
      </div>
    
    )
  }
  
  return (
    <div className="activity">
      <div>
        <h1>{activity.title}</h1>
        <img
          src={activity.imageUrls?.[0] && activity.imageUrls?.[1] ? activity.imageUrls?.[1] : activity.imageUrls?.[0]}
          alt={activity.name}
        />
      </div>

      {/* {activity.imageUrls.map((url, index) => (
        <img key={index} src={url} alt={`Image ${index.title}`} />
      ))} */}

      <h3>{activity.description}</h3>
      <h2>Address : {activity.address}</h2>
      <h2>City : {activity.city}</h2>
      <h2>Facilities : {activity.facilities}</h2>
      <h2>Price : {activity.price}</h2>
      <h2> Proce Discount : {activity.price_discount}</h2>
      <h2> Rating : {activity.rating}</h2>
      <h2>Total Review : {activity.total_reviews}</h2>

      <div>
        { notif && <p style={{ color: notif === "Activity deleted successfully" ? "green" : "red" }}>{notif}</p>}
        <FormDeleteActivity title={`Delete ${activity?.title} ?`} onDelete={handleDeleteActivity} loading={loading} />
      </div>
    </div>
  ) 
}
