import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "sonner";

const Activity = () => {
  const [activities, setActivities] = useState([]);
  const [buttonPopupCreateActivity, setButtonPopupCreateActivity] = useState(false);
  const [editActivityData, setEditActivityData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrls: [],
    price: "",
    price_discount: "",
    rating: "",
    total_reviews: "",
    facilities: "",
    address: "",
    province: "",
    city: "",
    location_maps: ""
  });
  const router = useRouter();

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

  const handleCreateActivityClick = () => {
    setButtonPopupCreateActivity(true);
  };

  const handlePopupClose = () => {
    setButtonPopupCreateActivity(false);
  };

  const handleEdit = (activity) => {
    setEditActivityData(activity);
    setIsEditing(true);
    setFormData({
      title: activity.title,
      description: activity.description,
      imageUrls: activity.imageUrls,
      price: activity.price,
      price_discount: activity.price_discount,
      rating: activity.rating,
      total_reviews: activity.total_reviews,
      facilities: activity.facilities,
      address: activity.address,
      province: activity.province,
      city: activity.city,
      location_maps: activity.location_maps
    });
  };

  const handleDelete = (activityId) => {
    const accessToken = localStorage.getItem("accessToken");
    axios
      .delete(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-activity/${activityId}`, {
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        toast.success("Activity deleted successfully!");
        getActivities();
      })
      .catch((err) => {
        console.log("err", err);
        toast.error("Failed to delete activity");
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("accessToken");
    axios
      .post(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-activity/${editActivityData.id}`, formData, {
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        toast.success("Activity updated successfully!");
        setIsEditing(false);
        getActivities();
      })
      .catch((err) => {
        console.log("err", err);
        toast.error("Failed to update activity");
      });
  };

  return (
    <div>
      <div>
        <h1 className="activities-title">Activity</h1>
        <button onClick={handleCreateActivityClick}>Create Activity</button>
      </div>

      <div className={buttonPopupCreateActivity ? "blur" : ""}>
        <div className="activities">
          {activities.map((activity, index) => (
            <div className="activities-card" key={index}>
              <h3>{activity.title}</h3>
              <img
                src={
                  activity.imageUrls?.[0] && activity.imageUrls?.[1] ? activity.imageUrls?.[1] : activity.imageUrls?.[0]
                }
                alt={activity.title}
              />
              <h3>Activity id : {activity.id}</h3>
              <h3>City : {activity.city}</h3>
              <div>
                <Link href={`/activity/${activity.id}`}>
                  <button>Read More</button>
                </Link>
                <button onClick={() => handleEdit(activity.id)}>Edit</button>
                <button onClick={() => handleDelete(activity.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isEditing && (
        <div className="edit-activity-modal">
          <form onSubmit={handleEditSubmit}>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Title"
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Description"
            />
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Price"
            />
            {/* Add input fields for other activity data */}
            <button type="submit">Update</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Activity;




// ////berhasil hide belakang jika popup dilakukan
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Link from "next/link";
// import PopupCreateActivity from "@/components/PopupCreateActivity";

// const Activity = () => {
//   const [activities, setActivities] = useState([]);
//   const [buttonPopupCreateActivity, setButtonPopupCreateActivity] = useState(false);
//   const [otherComponentsVisible, setOtherComponentsVisible] = useState(true); // State untuk mengatur visibilitas komponen lain

//   const getActivities = () => {
//     const accessToken = localStorage.getItem("accessToken");
//     axios
//       .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activities", {
//         headers: {
//           apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//           Authorization: `Bearer ${accessToken}`,
//         },
//       })
//       .then((res) => {
//         console.log("res", res);
//         setActivities(res.data.data);
//       })
//       .catch((err) => {
//         console.log("err", err);
//       });
//   };

//   useEffect(() => {
//     getActivities();
//   }, []);

//   const handleCreateActivityClick = () => {
//     setButtonPopupCreateActivity(true);
//     setOtherComponentsVisible(false); // Sembunyikan komponen lain saat popup create aktif
//   };

//   const handlePopupClose = () => {
//     setButtonPopupCreateActivity(false);
//     setOtherComponentsVisible(true); // Tampilkan kembali komponen lain saat popup create ditutup
//   };

//   return (
//     <div>
//       <div>
//         <h1 className="activities-title">Activity</h1>
//         <button onClick={handleCreateActivityClick}>Create Activity</button>
//         <PopupCreateActivity trigger={buttonPopupCreateActivity} setTrigger={handlePopupClose} />
//       </div>

//       {/* Hanya tampilkan komponen lain jika otherComponentsVisible true */}
//       {otherComponentsVisible && (
//         <div className="activities">
//           {activities.map((activity, index) => (
//             <div className="activities-card" key={index}>
//               <h3>{activity.title}</h3>

//               <img
//                 src={
//                   activity.imageUrls?.[0] && activity.imageUrls?.[1] ? activity.imageUrls?.[1] : activity.imageUrls?.[0]
//                 }
//                 alt={activity.title}
//               />

//               <h3>Activity id : {activity.id}</h3>

//               <div>
//                 <Link href={`/activity/${activity.id}`}>
//                   <button>Detail Activity By Id</button>
//                 </Link>
//               </div>
//               <div>
//                 <Link href={`/activities-by-category/${activity.categoryId}`}>
//                   <button>Detail Activities By Category Id</button>
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Activity;





//sudah distyling tapi masih menutupi popup
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Link from "next/link";
// import PopupCreateActivity from "@/components/PopupCreateActivity";

// const Activity = () => {
//   const [activities, setActivities] = useState([]);

//   const [buttonPopupCreateActivity, setButtonPopupCreateActivity] = useState(false);

//   const getActivities = () => {
//     const accessToken = localStorage.getItem("accessToken");
//     axios
//       .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activities", {
//         headers: {
//           apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//           Authorization: `Bearer ${accessToken}`,
//         },
//       })
//       .then((res) => {
//         console.log("res", res);
//         setActivities(res.data.data);
//       })
//       .catch((err) => {
//         console.log("err", err);
//       });
//   };

//   useEffect(() => {
//     getActivities();
//   }, []);

  
//   return (
//     <div>
//       <div >
//         <h1 className="activities-title">Activity</h1>
//         <button onClick={() => setButtonPopupCreateActivity(true)}>Create Activity</button>
//         <PopupCreateActivity trigger={buttonPopupCreateActivity} setTrigger={setButtonPopupCreateActivity}></PopupCreateActivity>
//       </div>

//       <div className="activities">
//         {activities.map((activity, index) => (
//           <div className="activities-card" key={index}>
//             <h3>{activity.title}</h3>

//             <img
//               src={
//                 activity.imageUrls?.[0] && activity.imageUrls?.[1] ? activity.imageUrls?.[1] : activity.imageUrls?.[0]
//               }
//               alt={activity.title}
//             />
          

//             <h3>Activity id : {activity.id}</h3>
            
//             <div>
//               <Link href={`/activity/${activity.id}`}>
//                 <button>Detail Activity By Id</button>
//               </Link>              
//             </div>
//             <div>
//               <Link href={`/activities-by-category/${activity.categoryId}`}><button>Detail Activities By Category Id</button></Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Activity;

////benar belum di styling
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Link from "next/link";
// import PopupCreateActivity from "@/components/PopupCreateActivity";

// const Activity = () => {
//   const [activities, setActivities] = useState([]);

//   const [buttonPopupCreateActivity, setButtonPopupCreateActivity] = useState(false);

//   const getActivities = () => {
//     const accessToken = localStorage.getItem("accessToken");
//     axios
//       .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activities", {
//         headers: {
//           apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//           Authorization: `Bearer ${accessToken}`,
//         },
//       })
//       .then((res) => {
//         console.log("res", res);
//         setActivities(res.data.data);
//       })
//       .catch((err) => {
//         console.log("err", err);
//       });
//   };

//   useEffect(() => {
//     getActivities();
//   }, []);

  
//   return (
//     <div>
//       <div>
//         <h1>Activity</h1>
//         <button onClick={() => setButtonPopupCreateActivity(true)}>Create Activity</button>
//         <PopupCreateActivity trigger={buttonPopupCreateActivity} setTrigger={setButtonPopupCreateActivity}></PopupCreateActivity>
//       </div>

//       <div>
//         {activities.map((activity, index) => (
//           <div className="activities" key={index}>
//             <h3>{activity.title}</h3>
//             <img
//               src={
//                 activity.imageUrls?.[0] && activity.imageUrls?.[1] ? activity.imageUrls?.[1] : activity.imageUrls?.[0]
//               }
//               alt={activity.title}
//             />
//             {/* <img src={activity.imageUrls} alt={activity.title} /> */}

//             <h3>Activity id : {activity.id}</h3>
//             {/* <p>Activity by Category Id : {activity.categoryId}</p> */}
//             {/* <img src={activity.category.imageUrl} alt={activity.category.name} />
//             <p>{activity.category.id}</p>
//             <p>{activity.category.name}</p> */}
//             <div>
//               <Link href={`/activity/${activity.id}`}>
//                 <button>Detail Activity By Id</button>
//               </Link>              
//             </div>
//             <div>
//               <Link href={`/activities-by-category/${activity.categoryId}`}><button>Detail Activities By Category Id</button></Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Activity;


// // benar ori tanpa category id tp menggunakannya diluar
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Link from "next/link";
// import PopupCreateActivity from "@/components/PopupCreateActivity";

// const Activity = () => {
//   const [activities, setActivities] = useState([]);

//   const [buttonPopupCreateActivity, setButtonPopupCreateActivity] = useState(false);

//   const getActivities = () => {
//     const accessToken = localStorage.getItem("accessToken");
//     axios
//       .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activities", {
//         headers: {
//           apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//           Authorization: `Bearer ${accessToken}`,
//         },
//       })
//       .then((res) => {
//         console.log("res", res);
//         setActivities(res.data.data);
//       })
//       .catch((err) => {
//         console.log("err", err);
//       });
//   };

//   useEffect(() => {
//     getActivities();
//   }, []);

//   return (
//     <div>
//       <div>
//         <h1>Activity</h1>
//         <button onClick={() => setButtonPopupCreateActivity(true)}>Create Activity</button>
//         <PopupCreateActivity trigger={buttonPopupCreateActivity} setTrigger={setButtonPopupCreateActivity}></PopupCreateActivity>
//       </div>

//       <div>
//         {activities.map((activity, index) => (
//           <div className="activities" key={index}>
//             <h3>{activity.title}</h3>
//             <img
//               src={
//                 activity.imageUrls?.[0] && activity.imageUrls?.[1] ? activity.imageUrls?.[1] : activity.imageUrls?.[0]
//               }
//               alt={activity.title}
//             />
//             {/* <img src={activity.imageUrls} alt={activity.title} /> */}

//             <h3>Activity id : {activity.id}</h3>
//             {/* <p>Activity by Category Id : {activity.categoryId}</p> */}
//             {/* <img src={activity.category.imageUrl} alt={activity.category.name} />
//             <p>{activity.category.id}</p>
//             <p>{activity.category.name}</p> */}
//             <div>
//               <Link href={`/activity/${activity.id}`}>
//                 <button>Detail Activity By Id</button>
//               </Link>              
//             </div>
//             <div>
//               <Link href={`/activities-by-category/${activity.categoryId}`}><button>Detail Activities By Category Id</button></Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Activity;
