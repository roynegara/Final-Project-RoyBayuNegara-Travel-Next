import React, { useEffect, useState } from "react";
import axios from "axios";
import PopupCreateActivity from "@/components/PopupCreateActivity";
import { toast } from "sonner";
import Link from "next/link";

const Activity = () => {
  const [activities, setActivities] = useState([]);
  const [buttonPopupCreateActivity, setButtonPopupCreateActivity] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);
  const [deletingActivity, setDeletingActivity] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [editName, setEditName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [price_discount, setPrice_discount] = useState("");
  const [rating, setRating] = useState("");
  const [total_reviews, setTotal_reviews] = useState("");
  const [facilities, setFacilities] = useState("");
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [location_maps, setLocation_maps] = useState("");

  const [file, setFile] = useState("");

  const handleUpload = () => {
    // if (!file) {
    //   toast.warning("Please select an image");
    //   return;
    // }
    const fields = [
      { name: 'editName', label: 'name' },
      { name: 'description', label: 'description' },
      { name: 'price', label: 'price' },
      { name: 'price_discount', label: 'price_discount' },
      { name: 'rating', label: 'rating' },
      { name: 'total_reviews', label: 'total_reviews' },
      { name: 'facilities', label: 'facilities' },
      { name: 'address', label: 'address' },
      { name: 'province', label: 'province' },
      { name: 'city', label: 'city' },
      { name: 'location_maps', label: 'location_maps' },
      { name: 'file', label: 'image' },

    ];

    let emptyFields = [];
    fields.forEach((field) => {
      if (!eval(field.name)) {        
        emptyFields.push(field.label);
      }
    });

    if (emptyFields.length > 0) {
      toast.info(
        `Failed to edit destination because ${emptyFields.join(", ")} ${emptyFields.length > 1 ? "are" : "is"} empty`
      );
      return;
    } else if (!file) {
      toast.info("Please select an image");
      return;
    } else {
      // Add promo successful
    }
    
    const formData = new FormData();
    formData.append("image", file);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k`,
        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
      },
    };
    axios
      .post("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image", formData, config)
      .then((res) => {
        console.log(res);
        setImageUrl(res.data.url);
        // toast.success(res?.data?.message);
      })
      .catch((err) => {
        console.log(err);
        // toast.error(err?.response?.data?.message);
      });
  };

  const getActivities = () => {
    axios
      .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activities", {
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
        },
      })
      .then((res) => {
        console.log("res activities", res);
        setActivities(res.data.data);
      })
      .catch((err) => {
        console.log("err activities", err);
      });
  };
  useEffect(() => {
    getActivities();
  }, []);

  const updateActivityData = () => {
    getActivities();
  };

  const handleEditActivity = (activity) => {
    setEditingActivity(activity);
    setCategoryId(activity.categoryId);
    setEditName(activity.title);
    setDescription(activity.description);
    setPrice(activity.price);
    setPrice_discount(activity.price_discount);
    setRating(activity.rating);
    setTotal_reviews(activity.total_reviews);
    setFacilities(activity.facilities);
    setAddress(activity.address);
    setProvince(activity.province);
    setCity(activity.city);
    setLocation_maps(activity.location_maps);
  };

  const handleDeleteActivity = (activity) => {
    setDeletingActivity(activity);
  };

  const confirmDelete = () => {
    const accessToken = localStorage.getItem("access_token");
    axios
      .delete(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-activity/${deletingActivity.id}`, {
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log("res delete activity", res);
        setDeletingActivity(null);
        updateActivityData();
        toast.success(res?.data?.message);
      })
      .catch((err) => {
        console.log("err delete activity", err);
        toast.error(err?.response?.data?.message);
      });
  };

  const handleSaveEdit = () => {
    if (imageUrl) {
      const accessToken = localStorage.getItem("access_token");
      axios
        .post(
          `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-activity/${editingActivity.id}`,
          {
            categoryId: categoryId,
            title: editName,
            description: description,
            imageUrls: [imageUrl],
            price: price,
            price_discount: price_discount,
            rating: rating,
            total_reviews: total_reviews,
            facilities: facilities,
            address: address,
            province: province,
            city: city,
            location_maps: location_maps,
          },
          {
            headers: {
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )

        .then((res) => {
          console.log("edit activity success", res);
          setEditingActivity(null);
          // setCategoryId("");
          setEditName("");
          setDescription("");
          setPrice("");
          setPrice_discount("");
          setRating("");
          setTotal_reviews("");
          setFacilities("");
          setAddress("");
          setProvince("");
          setCity("");
          setLocation_maps("");
          updateActivityData();
          toast.success(`${editingActivity.title} has been edited`);
        })
        .catch((err) => {
          console.log("edit activity failed", err);
          toast.error(`Failed to edit destination`);
        });
    }
  };

  useEffect(() => {
    if (imageUrl && editingActivity) {
      handleSaveEdit();
      setFile("");
    }
  }, [imageUrl]);

  useEffect(() => {
    if (!editingActivity) {
      // setCategoryId("");
      setEditName("");
      setDescription("");
      setPrice("");
      setPrice_discount("");
      setRating("");
      setTotal_reviews("");
      setFacilities("");
      setAddress("");
      setProvince("");
      setCity("");
      setLocation_maps("");
      setImageUrl("");
    }
  }, [editingActivity]);


  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    // Memeriksa apakah pengguna sudah login
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div>
      <div className={`${buttonPopupCreateActivity || deletingActivity || editingActivity ? "blur" : ""}`}>
        <h1 className="activities-title">Destination Database</h1>

        {isLoggedIn && (
          <div className="activities-btn-popup-create">
          <button onClick={() => setButtonPopupCreateActivity(true)}>Add Destination</button>
        </div>
        )}
        

        <div className="activities">
          {activities.map((activity, index) => (
            <div key={index}>
              <div className="activities-card">
                <h2>{activity.title.toUpperCase()}</h2>

                <Link href={`/activity/${activity.id}`}>
                <img
                  src={
                    activity.imageUrls?.[0] && activity.imageUrls?.[1]
                      ? activity.imageUrls?.[1]
                      : activity.imageUrls?.[0]
                  }
                  alt={activity.title}
                  />
                </Link>
                <p>CategoryId : {activity.categoryId}</p>
                <p>{activity.description}</p>
                <p>
                  Normal Price : <span style={{ textDecoration: "line-through" }}> Rp {activity.price}</span>
                </p>
                <p>Discount Price : Rp {activity.price_discount}</p>
                {/* <p>Rating: {activity.rating <= 5 ? String.fromCharCode(9733).repeat(Math.round(activity.rating)) : '★★★★★'}</p> */}
                <p>
                  Rating :{" "}
                  {String.fromCharCode(9733)
                    .repeat(Math.min(5, Math.round(activity.rating)))
                    .padEnd(5, "☆")}
                </p>
                <p>Total Reviews : ({activity.total_reviews})</p>
                <p>Facilities : {activity.facilities}</p>
                <p>Address : {activity.address}</p>
                <p>Province : {activity.province}</p>
                <p>City : {activity.city}</p>
                {isLoggedIn && (
                  <div>
                  <button onClick={() => handleEditActivity(activity)}>Edit</button>
                  <button onClick={() => handleDeleteActivity(activity)}>Delete</button>
                </div>
                )}
                
                
              </div>
            </div>
          ))}
        </div>
      </div>

      {editingActivity && (
        <div className="popup-edit-activity-wrap">
          <div className="popup-edit-activity">
            <h2>Edit Destination</h2>

            <div className="input-box-edit-activity">
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="Destination Name"
              />
            </div>

            <div className="input-box-edit-activity">
              <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            </div>

            <div className="input-box-edit-activity">
              <textarea
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
              />
            </div>

            <div className="input-box-edit-activity">
              <input
                type="number"
                value={price}
                onChange={(e) => {
                  const value = e.target.value;
                  if (!isNaN(value)) {
                    setPrice(parseFloat(value));
                  }
                }}
                placeholder="Price"
              />
            </div>

            <div className="input-box-edit-activity">
              <input
                type="number"
                value={price_discount}
                onChange={(e) => {
                  const value = e.target.value;
                  if (!isNaN(value)) {
                    setPrice_discount(parseFloat(value));
                  }
                }}
                placeholder="Price Discount"
              />
            </div>

            <div className="input-box-edit-activity">
              <input type="text" value={rating} onChange={(e) => setRating(e.target.value)} placeholder="Rating" />
            </div>

            <div className="input-box-edit-activity">
              <input
                type="text"
                value={total_reviews}
                onChange={(e) => setTotal_reviews(e.target.value)}
                placeholder="Total Reviews"
              />
            </div>

            <div className="input-box-edit-activity">
              <input
                type="text"
                value={facilities}
                onChange={(e) => setFacilities(e.target.value)}
                placeholder="Facilities"
              />
            </div>

            <div className="input-box-edit-activity">
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" />
            </div>

            <div className="input-box-edit-activity">
              <input
                type="text"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                placeholder="Province"
              />
            </div>

            <div className="input-box-edit-activity">
              <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" />
            </div>

            <div className="input-box-edit-activity">
              <input
                type="text"
                value={location_maps}
                onChange={(e) => setLocation_maps(e.target.value)}
                placeholder="Location Maps"
              />
            </div>

            <div className="btn-create-activity-popup">
              <button onClick={handleUpload}>Edit Destination</button>
            </div>

            <span className="btn-close-popup-edit-activity" onClick={() => setEditingActivity(null)}>
              &times;
            </span>
          </div>
        </div>
      )}

      {deletingActivity && (
        <div className="popup-delete-activity-wrap">
          <div className="popup-delete-activity">
            <p>Are you sure you want to delete {deletingActivity?.title}?</p>
            <div className="btn-delete-activity-popup">
              <button onClick={confirmDelete}>Yes</button>
              <button onClick={() => setDeletingActivity(null)}>No</button>
            </div>
          </div>
        </div>
      )}

      {buttonPopupCreateActivity && (
        <PopupCreateActivity
          trigger={buttonPopupCreateActivity}
          setTrigger={setButtonPopupCreateActivity}
          updateActivityData={updateActivityData}
        />
      )}
    </div>
  );
};
export default Activity;


//  // sdh benaeeerrr
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import PopupCreateActivity from "@/components/PopupCreateActivity";
// import { toast } from "sonner";
// import Link from "next/link";

// const Activity = () => {
//   const [activities, setActivities] = useState([]);
//   const [buttonPopupCreateActivity, setButtonPopupCreateActivity] = useState(false);
//   const [editingActivity, setEditingActivity] = useState(null);
//   const [deletingActivity, setDeletingActivity] = useState(null);
//   const [categoryId, setCategoryId] = useState("");
//   const [editName, setEditName] = useState("");
//   const [description, setDescription] = useState("");
//   const [imageUrl, setImageUrl] = useState("");
//   const [price, setPrice] = useState("");
//   const [price_discount, setPrice_discount] = useState("");
//   const [rating, setRating] = useState("");
//   const [total_reviews, setTotal_reviews] = useState("");
//   const [facilities, setFacilities] = useState("");
//   const [address, setAddress] = useState("");
//   const [province, setProvince] = useState("");
//   const [city, setCity] = useState("");
//   const [location_maps, setLocation_maps] = useState("");

//   const [file, setFile] = useState("");

//   const handleUpload = () => {
//     if (!file) {
//       toast.warning("Please select an image");
//       return;
//     }
//     const formData = new FormData();
//     formData.append("image", file);
//     const config = {
//       headers: {
//         "content-type": "multipart/form-data",
//         Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k`,
//         apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//       },
//     };
//     axios
//       .post("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image", formData, config)
//       .then((res) => {
//         console.log(res);
//         setImageUrl(res.data.url);
//         toast.success(res?.data?.message);
//       })
//       .catch((err) => {
//         console.log(err);
//         toast.error(err?.response?.data?.message);
//       });
//   };

//   const getActivities = () => {
//     axios
//       .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activities", {
//         headers: {
//           apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//         },
//       })
//       .then((res) => {
//         console.log("res activities", res);
//         setActivities(res.data.data);
//       })
//       .catch((err) => {
//         console.log("err activities", err);
//       });
//   };
//   useEffect(() => {
//     getActivities();
//   }, []);

//   const updateActivityData = () => {
//     getActivities();
//   };

//   const handleEditActivity = (activity) => {
//     setEditingActivity(activity);
//     setCategoryId(activity.categoryId);
//     setEditName(activity.title);
//     setDescription(activity.description);
//     setPrice(activity.price);
//     setPrice_discount(activity.price_discount);
//     setRating(activity.rating);
//     setTotal_reviews(activity.total_reviews);
//     setFacilities(activity.facilities);
//     setAddress(activity.address);
//     setProvince(activity.province);
//     setCity(activity.city);
//     setLocation_maps(activity.location_maps);
//   };

//   const handleDeleteActivity = (activity) => {
//     setDeletingActivity(activity);
//   };

//   const confirmDelete = () => {
//     const accessToken = localStorage.getItem("access_token");
//     axios
//       .delete(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-activity/${deletingActivity.id}`, {
//         headers: {
//           apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//           Authorization: `Bearer ${accessToken}`,
//         },
//       })
//       .then((res) => {
//         console.log("res delete activity", res);
//         setDeletingActivity(null);
//         updateActivityData();
//         toast.success(res?.data?.message);
//       })
//       .catch((err) => {
//         console.log("err delete activity", err);
//         toast.error(err?.response?.data?.message);
//       });
//   };

//   const handleSaveEdit = () => {
//     if (imageUrl) {
//       const accessToken = localStorage.getItem("access_token");
//       axios
//         .post(
//           `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-activity/${editingActivity.id}`,
//           {
//             categoryId: categoryId,
//             title: editName,
//             description: description,
//             imageUrls: [imageUrl],
//             price: price,
//             price_discount: price_discount,
//             rating: rating,
//             total_reviews: total_reviews,
//             facilities: facilities,
//             address: address,
//             province: province,
//             city: city,
//             location_maps: location_maps,
//           },
//           {
//             headers: {
//               apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//               Authorization: `Bearer ${accessToken}`,
//             },
//           }
//         )

//         .then((res) => {
//           console.log("edit activity success", res);
//           setEditingActivity(null);
//           // setCategoryId("");
//           setEditName("");
//           setDescription("");
//           setPrice("");
//           setPrice_discount("");
//           setRating("");
//           setTotal_reviews("");
//           setFacilities("");
//           setAddress("");
//           setProvince("");
//           setCity("");
//           setLocation_maps("");
//           updateActivityData();
//           toast.success(res?.data?.message);
//         })
//         .catch((err) => {
//           console.log("edit activity failed", err);
//           toast.error(err?.response?.data?.message);
//         });
//     }
//   };

//   useEffect(() => {
//     if (imageUrl && editingActivity) {
//       handleSaveEdit();
//       setFile("");
//     }
//   }, [imageUrl]);

//   useEffect(() => {
//     if (!editingActivity) {
//       // setCategoryId("");
//       setEditName("");
//       setDescription("");
//       setPrice("");
//       setPrice_discount("");
//       setRating("");
//       setTotal_reviews("");
//       setFacilities("");
//       setAddress("");
//       setProvince("");
//       setCity("");
//       setLocation_maps("");
//       setImageUrl("");
//     }
//   }, [editingActivity]);


//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   useEffect(() => {
//     // Memeriksa apakah pengguna sudah login
//     const token = localStorage.getItem("access_token");
//     setIsLoggedIn(!!token);
//   }, []);

//   return (
//     <div>
//       <div className={`${buttonPopupCreateActivity || deletingActivity || editingActivity ? "blur" : ""}`}>
//         <h1 className="activities-title">Destination Database</h1>

//         {isLoggedIn && (
//           <div className="activities-btn-popup-create">
//           <button onClick={() => setButtonPopupCreateActivity(true)}>Add Destination</button>
//         </div>
//         )}
        

//         <div className="activities">
//           {activities.map((activity, index) => (
//             <div key={index}>
//               <div className="activities-card">
//                 <h2>{activity.title.toUpperCase()}</h2>

//                 <Link href={`/activity/${activity.id}`}>
//                 <img
//                   src={
//                     activity.imageUrls?.[0] && activity.imageUrls?.[1]
//                       ? activity.imageUrls?.[1]
//                       : activity.imageUrls?.[0]
//                   }
//                   alt={activity.title}
//                   />
//                 </Link>
//                 <p>CategoryId : {activity.categoryId}</p>
//                 <p>{activity.description}</p>
//                 <p>
//                   Normal Price : <span style={{ textDecoration: "line-through" }}> Rp {activity.price}</span>
//                 </p>
//                 <p>Discount Price : Rp {activity.price_discount}</p>
//                 {/* <p>Rating: {activity.rating <= 5 ? String.fromCharCode(9733).repeat(Math.round(activity.rating)) : '★★★★★'}</p> */}
//                 <p>
//                   Rating :{" "}
//                   {String.fromCharCode(9733)
//                     .repeat(Math.min(5, Math.round(activity.rating)))
//                     .padEnd(5, "☆")}
//                 </p>
//                 <p>Total Reviews : ({activity.total_reviews})</p>
//                 <p>Facilities : {activity.facilities}</p>
//                 <p>Address : {activity.address}</p>
//                 <p>Province : {activity.province}</p>
//                 <p>City : {activity.city}</p>
//                 {isLoggedIn && (
//                   <div>
//                   <button onClick={() => handleEditActivity(activity)}>Edit</button>
//                   <button onClick={() => handleDeleteActivity(activity)}>Delete</button>
//                 </div>
//                 )}
                
                
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {editingActivity && (
//         <div className="popup-edit-activity-wrap">
//           <div className="popup-edit-activity">
//             <h2>Edit Destination</h2>

//             <div className="input-box-edit-activity">
//               <input
//                 type="text"
//                 value={editName}
//                 onChange={(e) => setEditName(e.target.value)}
//                 placeholder="Destination Name"
//               />
//             </div>

//             <div className="input-box-edit-activity">
//               <input type="file" onChange={(e) => setFile(e.target.files[0])} />
//             </div>

//             <div className="input-box-edit-activity">
//               <textarea
//                 type="text"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 placeholder="Description"
//               />
//             </div>

//             <div className="input-box-edit-activity">
//               <input
//                 type="number"
//                 value={price}
//                 onChange={(e) => {
//                   const value = e.target.value;
//                   if (!isNaN(value)) {
//                     setPrice(parseFloat(value));
//                   }
//                 }}
//                 placeholder="Price"
//               />
//             </div>

//             <div className="input-box-edit-activity">
//               <input
//                 type="number"
//                 value={price_discount}
//                 onChange={(e) => {
//                   const value = e.target.value;
//                   if (!isNaN(value)) {
//                     setPrice_discount(parseFloat(value));
//                   }
//                 }}
//                 placeholder="Price Discount"
//               />
//             </div>

//             <div className="input-box-edit-activity">
//               <input type="text" value={rating} onChange={(e) => setRating(e.target.value)} placeholder="Rating" />
//             </div>

//             <div className="input-box-edit-activity">
//               <input
//                 type="text"
//                 value={total_reviews}
//                 onChange={(e) => setTotal_reviews(e.target.value)}
//                 placeholder="Total Reviews"
//               />
//             </div>

//             <div className="input-box-edit-activity">
//               <input
//                 type="text"
//                 value={facilities}
//                 onChange={(e) => setFacilities(e.target.value)}
//                 placeholder="Facilities"
//               />
//             </div>

//             <div className="input-box-edit-activity">
//               <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" />
//             </div>

//             <div className="input-box-edit-activity">
//               <input
//                 type="text"
//                 value={province}
//                 onChange={(e) => setProvince(e.target.value)}
//                 placeholder="Province"
//               />
//             </div>

//             <div className="input-box-edit-activity">
//               <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" />
//             </div>

//             <div className="input-box-edit-activity">
//               <input
//                 type="text"
//                 value={location_maps}
//                 onChange={(e) => setLocation_maps(e.target.value)}
//                 placeholder="Location Maps"
//               />
//             </div>

//             <div className="btn-create-activity-popup">
//               <button onClick={handleUpload}>Edit Destination</button>
//             </div>

//             <span className="btn-close-popup-edit-activity" onClick={() => setEditingActivity(null)}>
//               &times;
//             </span>
//           </div>
//         </div>
//       )}

//       {deletingActivity && (
//         <div className="popup-delete-activity-wrap">
//           <div className="popup-delete-activity">
//             <p>Are you sure you want to delete {deletingActivity?.title}?</p>
//             <div className="btn-delete-activity-popup">
//               <button onClick={confirmDelete}>Yes</button>
//               <button onClick={() => setDeletingActivity(null)}>No</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {buttonPopupCreateActivity && (
//         <PopupCreateActivity
//           trigger={buttonPopupCreateActivity}
//           setTrigger={setButtonPopupCreateActivity}
//           updateActivityData={updateActivityData}
//         />
//       )}
//     </div>
//   );
// };
// export default Activity;


// // sdh benar
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import PopupCreateActivity from "@/components/PopupCreateActivity";
// import { toast } from "sonner";

// const Activity = () => {
//   const [activities, setActivities] = useState([]);
//   const [buttonPopupCreateActivity, setButtonPopupCreateActivity] = useState(false);
//   const [editingActivity, setEditingActivity] = useState(null);
//   const [deletingActivity, setDeletingActivity] = useState(null);
//   const [categoryId, setCategoryId] = useState("");
//   const [editName, setEditName] = useState("");
//   const [description, setDescription] = useState("");
//   const [imageUrl, setImageUrl] = useState("");
//   const [price, setPrice] = useState("");
//   const [price_discount, setPrice_discount] = useState("");
//   const [rating, setRating] = useState("");
//   const [total_reviews, setTotal_reviews] = useState("");
//   const [facilities, setFacilities] = useState("");
//   const [address, setAddress] = useState("");
//   const [province, setProvince] = useState("");
//   const [city, setCity] = useState("");
//   const [location_maps, setLocation_maps] = useState("");

//   const [file, setFile] = useState("");

//   const handleUpload = () => {
//     if (!file) {
//       toast.warning("Please select an image");
//       return;
//     }
//     const formData = new FormData();
//     formData.append("image", file);
//     const config = {
//       headers: {
//         "content-type": "multipart/form-data",
//         Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k`,
//         apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//       },
//     };
//     axios
//       .post("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image", formData, config)
//       .then((res) => {
//         console.log(res);
//         setImageUrl(res.data.url);
//         toast.success(res?.data?.message);
//       })
//       .catch((err) => {
//         console.log(err);
//         toast.error(err?.response?.data?.message);
//       });
//   };

//   const getActivities = () => {
//     axios
//       .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activities", {
//         headers: {
//           apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//         },
//       })
//       .then((res) => {
//         console.log("res activities", res);
//         setActivities(res.data.data);
//       })
//       .catch((err) => {
//         console.log("err activities", err);
//       });
//   };
//   useEffect(() => {
//     getActivities();
//   }, []);

//   const updateActivityData = () => {
//     getActivities();
//   };

//   const handleEditActivity = (activity) => {
//     setEditingActivity(activity);
//     setCategoryId(activity.categoryId);
//     setEditName(activity.title);
//     setDescription(activity.description);
//     setPrice(activity.price);
//     setPrice_discount(activity.price_discount);
//     setRating(activity.rating);
//     setTotal_reviews(activity.total_reviews);
//     setFacilities(activity.facilities);
//     setAddress(activity.address);
//     setProvince(activity.province);
//     setCity(activity.city);
//     setLocation_maps(activity.location_maps);
//   };

//   const handleDeleteActivity = (activity) => {
//     setDeletingActivity(activity);
//   };

//   const confirmDelete = () => {
//     const accessToken = localStorage.getItem("accessToken");
//     axios
//       .delete(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-activity/${deletingActivity.id}`, {
//         headers: {
//           apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//           Authorization: `Bearer ${accessToken}`,
//         },
//       })
//       .then((res) => {
//         console.log("res delete activity", res);
//         setDeletingActivity(null);
//         updateActivityData();
//         toast.success(res?.data?.message);
//       })
//       .catch((err) => {
//         console.log("err delete activity", err);
//         toast.error(err?.response?.data?.message);
//       });
//   };

//   const handleSaveEdit = () => {
//     if (imageUrl) {
//       const accessToken = localStorage.getItem("access_token");
//       axios
//         .post(
//           `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-activity/${editingActivity.id}`,
//           {
//             categoryId: categoryId,
//             title: editName,
//             description: description,
//             imageUrls: [imageUrl],
//             price: price,
//             price_discount: price_discount,
//             rating: rating,
//             total_reviews: total_reviews,
//             facilities: facilities,
//             address: address,
//             province: province,
//             city: city,
//             location_maps: location_maps,
//           },
//           {
//             headers: {
//               apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//               Authorization: `Bearer ${accessToken}`,
//             },
//           }
//         )

//         .then((res) => {
//           console.log("edit activity success", res);
//           setEditingActivity(null);
//           // setCategoryId("");
//           setEditName("");
//           setDescription("");
//           setPrice("");
//           setPrice_discount("");
//           setRating("");
//           setTotal_reviews("");
//           setFacilities("");
//           setAddress("");
//           setProvince("");
//           setCity("");
//           setLocation_maps("");
//           updateActivityData();
//           toast.success(res?.data?.message);
//         })
//         .catch((err) => {
//           console.log("edit activity failed", err);
//           toast.error(err?.response?.data?.message);
//         });
//     }
//   };

//   useEffect(() => {
//     if (imageUrl && editingActivity) {
//       handleSaveEdit();
//       setFile("");
//     }
//   }, [imageUrl]);

//   useEffect(() => {
//     if (!editingActivity) {
//       // setCategoryId("");
//       setEditName("");
//       setDescription("");
//       setPrice("");
//       setPrice_discount("");
//       setRating("");
//       setTotal_reviews("");
//       setFacilities("");
//       setAddress("");
//       setProvince("");
//       setCity("");
//       setLocation_maps("");
//       setImageUrl("");
//     }
//   }, [editingActivity]);

//   return (
//     <div>
//       <div className={`${buttonPopupCreateActivity || deletingActivity || editingActivity ? "blur" : ""}`}>
//         <h1 className="activities-title">Destination Database</h1>

//         <div className="activities-btn-popup-create">
//           <button onClick={() => setButtonPopupCreateActivity(true)}>Add Destination</button>
//         </div>

//         <div className="activities">
//           {activities.map((activity, index) => (
//             <div key={index}>
//               <div className="activities-card">
//                 <h2>{activity.title.toUpperCase()}</h2>
//                 <img
//                   src={
//                     activity.imageUrls?.[0] && activity.imageUrls?.[1]
//                       ? activity.imageUrls?.[1]
//                       : activity.imageUrls?.[0]
//                   }
//                   alt={activity.title}
//                 />
//                 <p>CategoryId : {activity.categoryId}</p>
//                 <p>{activity.description}</p>
//                 <p>
//                   Normal Price : <span style={{ textDecoration: "line-through" }}> Rp {activity.price}</span>
//                 </p>
//                 <p>Discount Price : Rp {activity.price_discount}</p>
//                 {/* <p>Rating: {activity.rating <= 5 ? String.fromCharCode(9733).repeat(Math.round(activity.rating)) : '★★★★★'}</p> */}
//                 <p>
//                   Rating :{" "}
//                   {String.fromCharCode(9733)
//                     .repeat(Math.min(5, Math.round(activity.rating)))
//                     .padEnd(5, "☆")}
//                 </p>
//                 <p>Total Reviews : ({activity.total_reviews})</p>
//                 <p>Facilities : {activity.facilities}</p>
//                 <p>Address : {activity.address}</p>
//                 <p>Province : {activity.province}</p>
//                 <p>City : {activity.city}</p>
//                 <div>
//                   <button onClick={() => handleEditActivity(activity)}>Edit</button>
//                   <button onClick={() => handleDeleteActivity(activity)}>Delete</button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {editingActivity && (
//         <div className="popup-edit-activity-wrap">
//           <div className="popup-edit-activity">
//             <h2>Edit Destination</h2>

//             <div className="input-box-edit-activity">
//               <input
//                 type="text"
//                 value={editName}
//                 onChange={(e) => setEditName(e.target.value)}
//                 placeholder="Destination Name"
//               />
//             </div>

//             <div className="input-box-edit-activity">
//               <input type="file" onChange={(e) => setFile(e.target.files[0])} />
//             </div>

//             <div className="input-box-edit-activity">
//               <textarea
//                 type="text"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 placeholder="Description"
//               />
//             </div>

//             <div className="input-box-edit-activity">
//               <input
//                 type="number"
//                 value={price}
//                 onChange={(e) => {
//                   const value = e.target.value;
//                   if (!isNaN(value)) {
//                     setPrice(parseFloat(value));
//                   }
//                 }}
//                 placeholder="Price"
//               />
//             </div>

//             <div className="input-box-edit-activity">
//               <input
//                 type="number"
//                 value={price_discount}
//                 onChange={(e) => {
//                   const value = e.target.value;
//                   if (!isNaN(value)) {
//                     setPrice_discount(parseFloat(value));
//                   }
//                 }}
//                 placeholder="Price Discount"
//               />
//             </div>

//             <div className="input-box-edit-activity">
//               <input type="text" value={rating} onChange={(e) => setRating(e.target.value)} placeholder="Rating" />
//             </div>

//             <div className="input-box-edit-activity">
//               <input
//                 type="text"
//                 value={total_reviews}
//                 onChange={(e) => setTotal_reviews(e.target.value)}
//                 placeholder="Total Reviews"
//               />
//             </div>

//             <div className="input-box-edit-activity">
//               <input
//                 type="text"
//                 value={facilities}
//                 onChange={(e) => setFacilities(e.target.value)}
//                 placeholder="Facilities"
//               />
//             </div>

//             <div className="input-box-edit-activity">
//               <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" />
//             </div>

//             <div className="input-box-edit-activity">
//               <input
//                 type="text"
//                 value={province}
//                 onChange={(e) => setProvince(e.target.value)}
//                 placeholder="Province"
//               />
//             </div>

//             <div className="input-box-edit-activity">
//               <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" />
//             </div>

//             <div className="input-box-edit-activity">
//               <input
//                 type="text"
//                 value={location_maps}
//                 onChange={(e) => setLocation_maps(e.target.value)}
//                 placeholder="Location Maps"
//               />
//             </div>

//             <div className="btn-create-activity-popup">
//               <button onClick={handleUpload}>Edit Destination</button>
//             </div>

//             <span className="btn-close-popup-edit-activity" onClick={() => setEditingActivity(null)}>
//               &times;
//             </span>
//           </div>
//         </div>
//       )}

//       {deletingActivity && (
//         <div className="popup-delete-activity-wrap">
//           <div className="popup-delete-activity">
//             <p>Are you sure you want to delete {deletingActivity?.title}?</p>
//             <div className="btn-delete-activity-popup">
//               <button onClick={confirmDelete}>Yes</button>
//               <button onClick={() => setDeletingActivity(null)}>No</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {buttonPopupCreateActivity && (
//         <PopupCreateActivity
//           trigger={buttonPopupCreateActivity}
//           setTrigger={setButtonPopupCreateActivity}
//           updateActivityData={updateActivityData}
//         />
//       )}
//     </div>
//   );
// };
// export default Activity;

// // sdh benar dari mas adhito saya bingung nganu imgurlnya
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Link from "next/link";
// import PopupCreateActivity from "@/components/PopupCreateActivity";
// import FormEditActivity from "@/components/FormEditActivity";
// import FormDeleteActivity from "@/components/FormDeleteActivity";
// import { toast } from "sonner";
// import useDeleteActivity from "@/hooks/useDeleteActivity";
// import useEditActivity from "@/hooks/useEditActivity";

// const Activity = () => {
//   const [activities, setActivities] = useState([]);
//   const [buttonPopupCreateActivity, setButtonPopupCreateActivity] = useState(false);
//   const [editActivity, setEditActivity] = useState(null);
//   const [deleteActivity, setDeleteActivity] = useState(null);
//   const { del, loading: deleteLoading } = useDeleteActivity();
//   const { pos, loading: editLoading } = useEditActivity();

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

//   const handleDeleteActivity = () => {
//     del(`/delete-activity/${deleteActivity?.id}`)
//       .then((res) => {
//         toast.success(`${deleteActivity?.title} has been deleted`);
//         setActivities(prevActivities => prevActivities.filter(activity => activity.id !== deleteActivity.id));
//         setDeleteActivity(null);
//       })
//       .catch((err) => {
//         console.log("resDeleteActivityErr", err);
//         toast.error(err?.response?.data?.message);
//       });
//   };

//   const handleEditActivity = ({
//     categoryId,
//     title,
//     description,
//     imageUrls,
//     price,
//     price_discount,
//     rating,
//     total_reviews,
//     facilities,
//     address,
//     province,
//     city,
//     location_maps,
//   }) => {
//     pos(`/update-activity/${editActivity?.id}`, {
//       categoryId,
//       title,
//       description,
//       imageUrls,
//       price,
//       price_discount,
//       rating,
//       total_reviews,
//       facilities,
//       address,
//       province,
//       city,
//       location_maps,
//     })
//     .then ((res) => {
//       toast.success(`${editActivity?.title} has been updated`);
//       setActivities(prevActivities => {
//         const updatedActivities = prevActivities.map(activity => {
//           if (activity.id === editActivity.id) {
//             return { ...activity, title, description, imageUrls, price, price_discount, rating, total_reviews, facilities, address, province, city, location_maps };
//           }
//           return activity;
//         });
//         return updatedActivities;
//       });
//       setEditActivity(null);
//     })
//     .catch ((err) => {
//       console.log("resEditActivityErr", err);
//       if (
//         err?.response?.data?.errors &&
//         err?.response?.data?.errors.length > 0 &&
//         err.response.data.errors[0].message
//       ) {
//         toast.error(err.response.data.errors[0].message);
//       } else {
//         toast.error(err?.response?.data?.message);
//       }
//     })
//   }

//   const togglePopupEdit = () => {
//     setEditActivity(null);
//   };

//   const togglePopupDelete = () => {
//     setDeleteActivity(null);
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
//                 src={activity.imageUrls?.[0] && activity.imageUrls?.[1] ? activity.imageUrls?.[1] : activity.imageUrls?.[0]}
//                 alt={activity.title}
//               />
//               <h3>Activity id : {activity.id}</h3>
//               <div>
//                 <Link href={`/activity/${activity.id}`}>
//                   <button>Read More</button>
//                 </Link>
//                 <button onClick={() => setEditActivity(activity)}>Edit</button>
//                 <button onClick={() => setDeleteActivity(activity)}>Delete</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       {buttonPopupCreateActivity && <PopupCreateActivity trigger={buttonPopupCreateActivity} setTrigger={setButtonPopupCreateActivity} />}
//       {editActivity && (
//         <div className="popup-edit-activity">
//           <button className="btn-close-popup-edit-activity" onClick={togglePopupEdit}>X</button>
//           <FormEditActivity
//             defaultCategoryId={editActivity?.categoryId}
//             title={` Edit ${editActivity?.title} Destination ?`}
//             defaultName={editActivity?.title}
//             defaultDescription={editActivity?.description}
//             defaultImageUrls={editActivity?.imageUrls}
//             defaultPrice={editActivity?.price}
//             defaultPrice_Discount={editActivity?.price_discount}
//             defaultRating={editActivity?.rating}
//             defaultTotal_Reviews={editActivity?.total_reviews}
//             defaultFacilities={editActivity?.facilities}
//             defaultAddress={editActivity?.address}
//             defaultProvince={editActivity?.province}
//             defaultCity={editActivity?.city}
//             defaultLocation_Maps={editActivity?.location_maps}
//             onEdit={handleEditActivity}
//             loading={editLoading}
//           />
//         </div>
//       )}
//       {deleteActivity && (
//         <div className="popup-delete-activity">
//           <div></div>
//           <div>
//             <p>Are you sure you want to delete {deleteActivity?.title} ?</p>
//           </div>
//           <div className="popup-delete-activity-btn-yes">
//             <FormDeleteActivity title={`Yes`} onDelete={handleDeleteActivity} loading={deleteLoading} />
//           </div>
//           <div className="popup-delete-activity-btn-no">
//             <button onClick={togglePopupDelete}>Tidak</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Activity;

// // sdh benar masih router.push
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Link from "next/link";
// import PopupCreateActivity from "@/components/PopupCreateActivity";
// import FormEditActivity from "@/components/FormEditActivity";
// import FormDeleteActivity from "@/components/FormDeleteActivity";
// import { useRouter } from "next/router";
// import { toast } from "sonner";
// import useDeleteActivity from "@/hooks/useDeleteActivity";
// import useEditActivity from "@/hooks/useEditActivity";

// const Activity = () => {
//   const [activities, setActivities] = useState([]);
//   const [buttonPopupCreateActivity, setButtonPopupCreateActivity] = useState(false);
//   const [editActivity, setEditActivity] = useState(null);
//   const [deleteActivity, setDeleteActivity] = useState(null);
//   const { del, loading: deleteLoading } = useDeleteActivity();
//   const { pos, loading: editLoading } = useEditActivity();
//   const router = useRouter();

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

//   const handleDeleteActivity = () => {
//     del(`/delete-activity/${deleteActivity?.id}`)
//       .then((res) => {
//         toast.success(`${deleteActivity?.title} has been deleted`);
//         setTimeout(() => {
//           router.push("/activity");
//         }, 1000);
//       })
//       .catch((err) => {
//         console.log("resDeleteActivityErr", err);
//         toast.error(err?.response?.data?.message);
//       });
//   };

//   const handleEditActivity = ({
//     categoryId,
//     title,
//     description,
//     imageUrls,
//     price,
//     price_discount,
//     rating,
//     total_reviews,
//     facilities,
//     address,
//     province,
//     city,
//     location_maps,
//   }) => {
//     pos(`/update-activity/${editActivity?.id}`, {
//       categoryId,
//       title,
//       description,
//       imageUrls,
//       price,
//       price_discount,
//       rating,
//       total_reviews,
//       facilities,
//       address,
//       province,
//       city,
//       location_maps,
//     })
//     .then ((res) => {
//       toast.success(`${editActivity?.title} has been updated`);
//       setTimeout(() => {
//         router.push(`/activity/${editActivity?.id}`);
//         setEditActivity(null);
//       }, 1000);
//     })
//     .catch ((err) => {
//       console.log("resEditActivityErr", err);
//       if (
//         err?.response?.data?.errors &&
//         err?.response?.data?.errors.length > 0 &&
//         err.response.data.errors[0].message
//       ) {
//         toast.error(err.response.data.errors[0].message);
//       } else {
//         toast.error(err?.response?.data?.message);
//       }
//     })
//   }

//   const togglePopupEdit = () => {
//     setEditActivity(null);
//   };

//   const togglePopupDelete = () => {
//     setDeleteActivity(null);
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
//                 src={activity.imageUrls?.[0] && activity.imageUrls?.[1] ? activity.imageUrls?.[1] : activity.imageUrls?.[0]}
//                 alt={activity.title}
//               />
//               <h3>Activity id : {activity.id}</h3>
//               <div>
//                 <Link href={`/activity/${activity.id}`}>
//                   <button>Read More</button>
//                 </Link>
//                 <button onClick={() => setEditActivity(activity)}>Edit</button>
//                 <button onClick={() => setDeleteActivity(activity)}>Delete</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       {buttonPopupCreateActivity && <PopupCreateActivity trigger={buttonPopupCreateActivity} setTrigger={setButtonPopupCreateActivity} />}
//       {editActivity && (
//         <div className="popup-edit-activity">
//           <button className="btn-close-popup-edit-activity" onClick={togglePopupEdit}>X</button>
//           <FormEditActivity
//             defaultCategoryId={editActivity?.categoryId}
//             title={` Edit ${editActivity?.title} Destination ?`}
//             defaultName={editActivity?.title}
//             defaultDescription={editActivity?.description}
//             defaultImageUrls={editActivity?.imageUrls}
//             defaultPrice={editActivity?.price}
//             defaultPrice_Discount={editActivity?.price_discount}
//             defaultRating={editActivity?.rating}
//             defaultTotal_Reviews={editActivity?.total_reviews}
//             defaultFacilities={editActivity?.facilities}
//             defaultAddress={editActivity?.address}
//             defaultProvince={editActivity?.province}
//             defaultCity={editActivity?.city}
//             defaultLocation_Maps={editActivity?.location_maps}
//             onEdit={handleEditActivity}
//             loading={editLoading}
//           />
//         </div>
//       )}
//       {deleteActivity && (
//         <div className="popup-delete-activity">
//           <div></div>
//           <div>
//             <p>Are you sure you want to delete {deleteActivity?.title} ?</p>
//           </div>
//           <div className="popup-delete-activity-btn-yes">
//             <FormDeleteActivity title={`Yes`} onDelete={handleDeleteActivity} loading={deleteLoading} />
//           </div>
//           <div className="popup-delete-activity-btn-no">
//             <button onClick={togglePopupDelete}>Tidak</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Activity;

// // sdh jalan tp tidak eror 505
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Link from "next/link";
// import PopupCreateActivity from "@/components/PopupCreateActivity";
// import { toast } from "sonner";

// const Activity = () => {
//   const [activities, setActivities] = useState([]);
//   const [buttonPopupCreateActivity, setButtonPopupCreateActivity] = useState(false);
//   const [editingActivity, setEditingActivity] = useState(''); // State to track the activity being edited
//   const [deletingActivity, setDeletingActivity] = useState(''); // State to track the activity being deleted
//   const [formData, setFormData] = useState({
//     categoryId: "",
//     title: "",
//     description: "",
//     imageUrls: [],
//     price: "",
//     price_discount: "",
//     rating: "",
//     total_reviews: "",
//     facilities: "",
//     address: "",
//     province: "",
//     city: "",
//     location_maps: "",
//   });

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

//   // Function to handle editing an activity
//   const handleEditActivity = (activity) => {
//     setEditingActivity(activity);
//     setFormData(activity); // Set form data to current activity
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async () => {
//     try {
//       const accessToken = localStorage.getItem("accessToken");
//       await axios.post(
//         `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-activity/${editingActivity.id}`,
//         formData,
//         {
//           headers: {
//             apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );
//       console.log("Update successful");
//       getActivities(); // Refresh activities after update
//       setEditingActivity(null); // Clear editing activity
//       toast.success("Activity updated successfully");
//     } catch (error) {
//       console.error("Update failed", error);
//       toast.error("Failed to update activity");
//     }
//   };

//   // Function to handle deleting an activity
//   const handleDeleteActivity = async () => {
//     try {
//       const accessToken = localStorage.getItem("accessToken");
//       await axios.delete(
//         `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-activity/${deletingActivity.id}`,
//         {
//           headers: {
//             apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );
//       console.log("Delete successful");
//       getActivities(); // Refresh activities after deletion
//       setDeletingActivity(null); // Clear deleting activity
//       toast.success("Activity deleted successfully");

//     } catch (error) {
//       console.error("Delete failed", error);
//       toast.error("Failed to delete activity");
//     }
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
//                   activity.imageUrls?.[0] && activity.imageUrls?.[1]
//                     ? activity.imageUrls?.[1]
//                     : activity.imageUrls?.[0]
//                 }
//                 alt={activity.title}
//               />
//               <h3>Activity id: {activity.id}</h3>
//               <div>
//                 {/* <Link href={`/activity/${activity.id}`}>
//                   <button>Read More</button>
//                 </Link> */}
//                 <button onClick={() => handleEditActivity(activity)}>Edit</button>
//                 <button onClick={() => setDeletingActivity(activity)}>Delete</button> {/* Set deleting activity */}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {buttonPopupCreateActivity && (
//         <PopupCreateActivity
//           trigger={buttonPopupCreateActivity}
//           setTrigger={setButtonPopupCreateActivity}
//           PopupUpdateActivityData={getActivities} // Changed to function reference
//         />
//       )}

//       {/* Modal for updating activity */}
//       {editingActivity && (

//         <div className="popup-create-activity-wrap">

//           <div className="popup-create-activity">

//             <h1>Edit Activity</h1>

//             <div className="input-box-create-activity-separate">
//               <div className="input-box-create-activity-7kiri">

//               <div className="input-box-create-activity">
//               <input type="text" name="categoryId" value={formData.categoryId} onChange={handleInputChange}  />
//                 </div>

//               <div className="input-box-create-activity">
//               <input type="text" name="title" value={formData.title} onChange={handleInputChange} />
//                   </div>

//               <div className="input-box-create-activity">
//               {/* <textarea name="description" value={formData.description} onChange={handleInputChange}></textarea> */}
//               <input name="description" value={formData.description} onChange={handleInputChange}></input>
//                     </div>

//               <div className="input-box-create-activity">
//               <input type="text" name="imageUrls" value={formData.imageUrls} onChange={handleInputChange} />
//                       </div>

//               <div className="input-box-create-activity">
//               <input type="number" name="price" value={formData.price} onChange={handleInputChange} />
//                         </div>

//               <div className="input-box-create-activity">
//               <input type="number" name="price_discount" value={formData.price_discount} onChange={handleInputChange} />
//                           </div>

//               </div>

//               <div className="input-box-create-activity-7kanan">

//               <div className="input-box-create-activity">
//               <input type="number" name="rating" value={formData.rating} onChange={handleInputChange} />
//                             </div>

//               <div className="input-box-create-activity">
//               <input type="number" name="total_reviews" value={formData.total_reviews} onChange={handleInputChange} />
//                               </div>

//               <div className="input-box-create-activity">
//               <input name="facilities" value={formData.facilities} onChange={handleInputChange}></input>
//                                 </div>

//               <div className="input-box-create-activity">
//               <input name="address" value={formData.address} onChange={handleInputChange}></input>
//                                   </div>

//               <div className="input-box-create-activity">
//               <input type="text" name="province" value={formData.province} onChange={handleInputChange} />
//                                     </div>

//               <div className="input-box-create-activity">
//               <input type="text" name="city" value={formData.city} onChange={handleInputChange} />
//               </div>

//               <div className="input-box-create-activity">
//               <input name="location_maps" value={formData.location_maps} onChange={handleInputChange}></input>
//                                         </div>

//               </div>
//             </div>

//               <div className="btn-create-activity-popup">
//                 <button  onClick={handleSubmit}>Update</button>
//               </div>

//               <span className="btn-close-popup-create-activity" onClick={() => setEditingActivity(null)}>&times;</span>
//               {/* <button type="button" onClick={() => setEditingActivity(null)}>Cancel</button> */}
//           </div>
//         </div>
//       )}

//       {/* Modal for confirming delete */}
//       {deletingActivity && (
//         <div className="input-box-create-banner">
//         <div className="popup-delete-banner">
//             {/* <h2>Delete Activity</h2> */}
//             <p>Are you sure you want to delete this activity?</p>
//             <div className="btn-create-banner-popup">
//             <button onClick={handleDeleteActivity}>Yes</button>
//               <button onClick={() => setDeletingActivity(null)}>No</button>
//               </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Activity;

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
