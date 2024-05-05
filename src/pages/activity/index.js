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
    const fields = [
      { name: "editName", label: "name" },
      { name: "description", label: "description" },
      { name: "price", label: "price" },
      { name: "price_discount", label: "price_discount" },
      { name: "rating", label: "rating" },
      { name: "total_reviews", label: "total_reviews" },
      { name: "facilities", label: "facilities" },
      { name: "address", label: "address" },
      { name: "province", label: "province" },
      { name: "city", label: "city" },
      { name: "location_maps", label: "location_maps" },
      { name: "file", label: "image" },
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
      })
      .catch((err) => {
        console.log(err);
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
            <h1>Edit Destination</h1>

            <div className="input-box-edit-activity-separate">
              <div className="input-box-edit-activity-7kiri">
                <div className="input-box-edit-activity">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="Destination Name"
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
              </div>

              <div className="input-box-edit-activity-7kanan">
                <div className="input-box-edit-activity">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Address"
                  />
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
                    value={description}
                    id="textarea-edit-activity-description"
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                  />
                </div>

                <div className="input-box-edit-activity">
                  <input
                    type="text"
                    value={location_maps}
                    onChange={(e) => setLocation_maps(e.target.value)}
                    placeholder="Location Maps"
                  />
                </div>
                <input
                  className="upload-image-edit-activity"
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
            </div>

            <div className="btn-edit-activity-popup">
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
