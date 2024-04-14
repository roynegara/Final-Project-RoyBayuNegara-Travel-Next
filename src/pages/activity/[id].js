import React, { useEffect, useState } from "react";
import axios from "axios";

export async function getServerSideProps(context) {

    const resp = await axios.get(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activity/${context.params.id}`,
        {
            headers: { apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c", keyWord: "Dibimbing API key" },
        }
    );
    return { props: { activity: resp.data.data } };
}

export default function ActivityById({ activity }) {

    return (
        <div>
            <h1>{activity.title}</h1>
            <img src={activity.imageUrls} alt={activity.name} />
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