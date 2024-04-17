import React, { useEffect, useState } from "react";
import axios from "axios";


export async function getServerSideProps(context) {
    try {
        const resp = await axios.get(
            `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activities-by-category/${context.params.categoryId}`,
            {
                headers: {
                    apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                },
            }
        );
        return { props: { activities: resp.data.data } };
    } catch (error) {
        console.error("Error fetching activities:", error);
        return { props: { activities: null } };
    }
}



export default function ActivitiesByCategoryId({ activities }) {
    return (
        <div className="activitiesByCategoryId">
           {/* {activities.length > 0 ? (
               activities.map((activity, index) => (
                   <div key={index}>
                       <h1>{activity.name}</h1>
                       <p>{activity.description}</p>
                   </div>
               ))
           ) : (
               <div>No activities found</div>
           )} */}

           {activities.map((activity, index) => (
               <div key={index}>
                   <h1>{activity.title}</h1>
                   <p>{activity.description}</p>
               </div>
           ))}
            
        </div>
    )
}