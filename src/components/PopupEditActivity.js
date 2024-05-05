import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/router";

const PopupEditActivity = (props) => {
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [price, setPrice] = useState("");
  const [price_discount, setPrice_discount] = useState("");
  const [rating, setRating] = useState("");
  const [total_reviews, setTotal_reviews] = useState("");
  const [facilities, setFacilities] = useState("");
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [location_maps, setLocation_maps] = useState("");

  const [file, setFile] = useState([]);
  const [activityId, setActivityId] = useState(""); // Menambah state untuk menyimpan ID aktivitas yang akan diperbarui

  const router = useRouter();

  const getActivityDetails = (activityId) => {
    const accessToken = localStorage.getItem("accessToken");
    axios
      .get(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activity/${activityId}`, {
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log("res Activity Details", res);
        const activityData = res.data.data;
        setCategoryId(activityData.categoryId);
        setTitle(activityData.title);
        setDescription(activityData.description);
        setImageUrls(activityData.imageUrls);
        setPrice(activityData.price);
        setPrice_discount(activityData.price_discount);
        setRating(activityData.rating);
        setTotal_reviews(activityData.total_reviews);
        setFacilities(activityData.facilities);
        setAddress(activityData.address);
        setProvince(activityData.province);
        setCity(activityData.city);
        setLocation_maps(activityData.location_maps);
      })
      .catch((err) => {
        console.log("err Activity Details", err);
      });
  };

  useEffect(() => {
    if (props.activityId) {
      getActivityDetails(props.activityId);
      setActivityId(props.activityId);
    }
  }, [props.activityId]);

  const handleCategoryIdChange = (e) => {
    setCategoryId(e.target.value);
  };

  const handleUpload = () => {};

  const handleSubmit = () => {
    const payload = {
      categoryId: categoryId,
      title: title,
      description: description,
      imageUrls: imageUrls,
      price: price,
      price_discount: price_discount,
      rating: rating,
      total_reviews: total_reviews,
      facilities: facilities,
      address: address,
      province: province,
      city: city,
      location_maps: location_maps,
    };

    const accessToken = localStorage.getItem("access_token");

    axios
      .put(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-activity/${activityId}`, payload, {
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log("res", res);
        toast.success(`${title} has been updated`);

        router.push("/activity", undefined, { shallow: true }).then((success) => {
          if (success) {
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }
        });
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return props.trigger ? (
    <div className="popup-create-activity">
      <h1>Update Activity</h1>
      <button onClick={handleUpload}>Upload Image</button>

      <div>
        <button onClick={handleSubmit}>Submit Update</button>
      </div>

      <button className="btn-close-popup-create-activity" onClick={() => props.setTrigger(false)}>
        Close
      </button>
      {props.children}
    </div>
  ) : (
    ""
  );
};

export default PopupEditActivity;
