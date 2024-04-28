import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import PopupCreateActivity from "@/components/PopupCreateActivity";

const Activity = () => {
  const [activities, setActivities] = useState([]);
  const [buttonPopupCreateActivity, setButtonPopupCreateActivity] = useState(false);
  const [editingActivity, setEditingActivity] = useState(''); // State to track the activity being edited
  const [deletingActivity, setDeletingActivity] = useState(''); // State to track the activity being deleted
  const [formData, setFormData] = useState({
    categoryId: "",
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
    location_maps: "",
  });

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

  // Function to handle editing an activity
  const handleEditActivity = (activity) => {
    setEditingActivity(activity);
    setFormData(activity); // Set form data to current activity
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      await axios.post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-activity/${editingActivity.id}`,
        formData,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("Update successful");
      getActivities(); // Refresh activities after update
      setEditingActivity(null); // Clear editing activity
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  // Function to handle deleting an activity
  const handleDeleteActivity = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      await axios.delete(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-activity/${deletingActivity.id}`,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("Delete successful");
      getActivities(); // Refresh activities after deletion
      setDeletingActivity(null); // Clear deleting activity
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  return (
    <div>
      <h1 className="activities-title">Destination Database</h1>
      
      <div className="activities-btn-popup-create">
        <button onClick={() => setButtonPopupCreateActivity(true)}>Add Destination</button>
      </div>

      <div className={`${buttonPopupCreateActivity ? 'blur' : ''}`}>
        <div className="activities">
          {activities.map((activity, index) => (
            <div className="activities-card" key={index}>
              <h3>{activity.title}</h3>
              <img
                src={
                  activity.imageUrls?.[0] && activity.imageUrls?.[1]
                    ? activity.imageUrls?.[1]
                    : activity.imageUrls?.[0]
                }
                alt={activity.title}
              />
              <h3>Activity id: {activity.id}</h3>
              <div>
                <Link href={`/activity/${activity.id}`}>
                  <button>Read More</button>
                </Link>
                <button onClick={() => handleEditActivity(activity)}>Edit</button>
                <button onClick={() => setDeletingActivity(activity)}>Delete</button> {/* Set deleting activity */}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {buttonPopupCreateActivity && (
        <PopupCreateActivity
          trigger={buttonPopupCreateActivity}
          setTrigger={setButtonPopupCreateActivity}
          PopupUpdateActivityData={getActivities} // Changed to function reference
        />
      )}

      {/* Modal for updating activity */}
      {editingActivity && (
        <div className="popup">
          <div className="popup-inner">
            <h2>Edit Activity</h2>
            <form>
              <label>Category ID:</label>
              <input type="text" name="categoryId" value={formData.categoryId} onChange={handleInputChange} />
              
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
              
              <button type="button" onClick={handleSubmit}>Update</button>
              <button type="button" onClick={() => setEditingActivity(null)}>Cancel</button>
            </form>
          </div>
        </div>
      )}

      {/* Modal for confirming delete */}
      {deletingActivity && (
        <div className="popup">
          <div className="popup-inner">
            <h2>Delete Activity</h2>
            <p>Are you sure you want to delete this activity?</p>
            <button onClick={handleDeleteActivity}>Yes</button>
            <button onClick={() => setDeletingActivity(null)}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Activity;



// // benar manual
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

//   const PopupUpdateActivityData = () => {
//     getActivities();
//   }
  
//   return (
//     <div>
//       <h1 className="activities-title">Destination Database</h1>
      
//       <div className="activities-btn-popup-create" >
//         <button onClick={() => setButtonPopupCreateActivity(true)}>Add Destination</button>
//       </div>

//       <div className={`${buttonPopupCreateActivity ? 'blur' : ''}`} >

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
//                 <button>Read More</button>
//               </Link>              
//             </div>
           
//           </div>

          
//         ))}
//         </div>
//         </div>
//         {buttonPopupCreateActivity && <PopupCreateActivity trigger={buttonPopupCreateActivity} setTrigger={setButtonPopupCreateActivity} PopupUpdateActivityData={PopupUpdateActivityData} />}

//     </div>
//   );
// };

// export default Activity;








//kurang form field update
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Link from "next/link";
// import PopupCreateActivity from "@/components/PopupCreateActivity";

// const Activity = () => {
//   const [activities, setActivities] = useState([]);
//   const [buttonPopupCreateActivity, setButtonPopupCreateActivity] = useState(false);
//   const [editActivityId, setEditActivityId] = useState(null);
//   const [editPopup, setEditPopup] = useState(false);
//   const [editFormData, setEditFormData] = useState(null);

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

//   const PopupUpdateActivityData = () => {
//     getActivities();
//   }

//   const handleEditClick = (activityId) => {
//     setEditActivityId(activityId);
//     setEditPopup(true);

//     // Mendapatkan data aktivitas yang akan diedit
//     const activityToEdit = activities.find(activity => activity.id === activityId);
//     setEditFormData(activityToEdit);
//   }

//   const handlePopupUpdateActivity = (updatedData) => {
//     const accessToken = localStorage.getItem("accessToken");
//     axios
//       .post(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-activity/${editActivityId}`, updatedData, {
//         headers: {
//           apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//           Authorization: `Bearer ${accessToken}`,
//         },
//       })
//       .then((res) => {
//         console.log("Activity updated successfully:", res.data);
//         setEditPopup(false);
//         PopupUpdateActivityData();
//       })
//       .catch((err) => {
//         console.error("Failed to update activity:", err);
//       });
//   };

//   // PopupUpdateActivityForm component
//   const PopupUpdateActivityForm = ({ initialFormData, handlePopupUpdateActivity }) => {
//     const [formData, setFormData] = useState(initialFormData);

//     const handleChange = (e) => {
//       const { name, value } = e.target;
//       setFormData({
//         ...formData,
//         [name]: value
//       });
//     };

//     const handleSubmit = (e) => {
//       e.preventDefault();
//       handlePopupUpdateActivity(formData);
//     };

//     return (
//       <form onSubmit={handleSubmit}>
//         {/* Form fields */}
//       </form>
//     );
//   };

//   return (
//     <div>
//       <h1 className="activities-title">Destination Database</h1>
      
//       <div className="activities-btn-popup-create">
//         <button onClick={() => setButtonPopupCreateActivity(true)}>Add Destination</button>
//       </div>

//       <div className={`${buttonPopupCreateActivity ? 'blur' : ''}`}>
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
//                   <button>Read More</button>
//                 </Link>

//                 <button onClick={() => handleEditClick(activity.id)}>Edit</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {editPopup && (
//         <div className="modal">
//           <div className="modal-content">
//             <span className="close" onClick={() => setEditPopup(false)}>&times;</span>
//             {editFormData && (
//               <PopupUpdateActivityForm
//                 initialFormData={editFormData}
//                 handlePopupUpdateActivity={handlePopupUpdateActivity}
//               />
//             )}
//           </div>
//         </div>
//       )}

//       {buttonPopupCreateActivity && (
//         <PopupCreateActivity
//           trigger={buttonPopupCreateActivity}
//           setTrigger={setButtonPopupCreateActivity}
//           PopupUpdateActivityData={PopupUpdateActivityData}
//         />
//       )}
//     </div>
//   );
// };

// export default Activity;





// // bagus tanpa edit dan delete
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

//   const PopupUpdateActivityData = () => {
//     getActivities();
//   }
  
//   return (
//     <div>
//       <h1 className="activities-title">Destination Database</h1>
      
//       <div className="activities-btn-popup-create" >
//         <button onClick={() => setButtonPopupCreateActivity(true)}>Add Destination</button>
//       </div>

//       <div className={`${buttonPopupCreateActivity ? 'blur' : ''}`} >

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
//                 <button>Read More</button>
//               </Link>              
//             </div>
           
//           </div>

          
//         ))}
//         </div>
//         </div>
//         {buttonPopupCreateActivity && <PopupCreateActivity trigger={buttonPopupCreateActivity} setTrigger={setButtonPopupCreateActivity} PopupUpdateActivityData={PopupUpdateActivityData} />}

//     </div>
//   );
// };

// export default Activity;





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
