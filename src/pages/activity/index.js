//berhasil membuat blur background
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

  const handleCreateActivityClick = () => {
    setButtonPopupCreateActivity(true);
  };

  const handlePopupClose = () => {
    setButtonPopupCreateActivity(false);
  };

  return (
    <div>
      <div>
        <h1 className="activities-title">Activity</h1>
        <button onClick={handleCreateActivityClick}>Create Activity</button>
        <PopupCreateActivity trigger={buttonPopupCreateActivity} setTrigger={handlePopupClose} />
      </div>

      <div className={buttonPopupCreateActivity ? "blur" : ""}> {/* Tambahkan class blur jika popup create aktif */}
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

              <div>
                <Link href={`/activity/${activity.id}`}>
                  <button>Detail Activity By Id</button>
                </Link>
              </div>
              <div>
                <Link href={`/activities-by-category/${activity.categoryId}`}>
                  <button>Detail Activities By Category Id</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
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
