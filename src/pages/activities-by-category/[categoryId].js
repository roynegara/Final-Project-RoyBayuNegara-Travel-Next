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
        console.log('activities by categoryId', resp.data.data);
        return { props: { activities: resp.data.data } };
    } catch (error) {
        console.error("Error fetching activities:", error);
        return { props: { activities: [] } };
    }
}



export default function ActivitiesByCategoryId({ activities }) {

    const firstActivity = activities[0];
    return (
        <div className="activitiesByCategoryId">


            {/* <h1>Activities By Category Id</h1> */}
            <div className="activitiesByCategoryIdName">
            {firstActivity && (
                <div>
                    {/* <h1>This is List Activities By Category in {firstActivity.category.name}</h1> */}
                    <h1>Activities or Destination in {firstActivity.category.name}</h1>
                </div>
            )}
            {!firstActivity && <div>No activities found</div>}
            </div>
            
           {activities.length > 0 ? (
               activities.map((activities, index) => (
                   <div key={index}>
                       
                       <h1>{activities.title}</h1>
                       <p>{activities.description}</p>
                   </div>
               ))
           ) : (
               <div>No activities found</div>
           )}
            
          


           {/* {activities.map((activity, index) => (
               <div key={index}>
                   
                   <h1>{activity.title}</h1>
                   <p>{activity.description}</p>
               </div>
           ))} */}
            
        </div>
    )
}