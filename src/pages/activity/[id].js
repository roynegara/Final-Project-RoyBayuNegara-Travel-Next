import React, { useEffect, useState } from "react";
import axios from "axios";

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
    console.error("Error fetching promo:", error);
    return { props: { activity: null } };
  }
}



export default function ActivityById({ activity }) {
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
    </div>
  );
}
