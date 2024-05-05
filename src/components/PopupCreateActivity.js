// sudah bagus belum ada notif lengkap
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/router";

const CreateActivity = (props) => {
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

  // const [notif, setNotif] = useState("");
  const router = useRouter();

  const getCategories = () => {
    axios
      .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories", {
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
        },
      })
      .then((res) => {
        console.log("res Categories in Activity", res);
        // setCategoryId(res.data.data[0].id);
        setCategories(res.data.data);
      })
      .catch((err) => {
        console.log("err Categories in Activity", err);
      });
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleCategoryIdChange = (e) => {
    setCategoryId(e.target.value);
    console.log("categoryId", e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    console.log("title", e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    console.log("description", e.target.value);
  };

  const handleImageUrlsChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handlePriceChange = (e) => {
    const value = parseFloat(e.target.value);
    setPrice(value);
    console.log("price", value);
  };

  const handlePrice_discountChange = (e) => {
    const value = parseFloat(e.target.value);
    setPrice_discount(value);
    console.log("price_discount", value);
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
    console.log("rating", e.target.value);
  };

  const handleTotal_reviewsChange = (e) => {
    setTotal_reviews(e.target.value);
    console.log("total_reviews", e.target.value);
  };

  const handleFacilitiesChange = (e) => {
    setFacilities(e.target.value);
    console.log("facilities", e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
    console.log("address", e.target.value);
  };

  const handleProvinceChange = (e) => {
    setProvince(e.target.value);
    console.log("province", e.target.value);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
    console.log("city", e.target.value);
  };

  const handleLocation_mapsChange = (e) => {
    setLocation_maps(e.target.value);
    console.log("location_maps", e.target.value);
  };

  // const formData = new FormData();
  //       formData.append("image", file);

  const handleSubmit = () => {
    if (imageUrls) {
      // if (!categoryId) {
      //   toast.warning("Please Select Category First");
      //   return;
      // }

      const payload = {
        categoryId: categoryId,
        title: title,
        description: description,
        imageUrls: [imageUrls],
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
        .post("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-activity", payload, {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          console.log("res", res);
          toast.success(`${title} has been created`);
          setImageUrls(res?.data?.url);
          props.updateActivityData();
        props.setTrigger(false);
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  };

  useEffect(() => {
    handleSubmit();
  }, [imageUrls]);

  const handleUpload = () => {
    const fields = [
      { name: "categoryId", label: "categoryId" },
      { name: "categories", label: "categories" },
      { name: "title", label: "title" },
      { name: "description", label: "description" },
      { name: "price", label: "price" },
      { name: "price_discount", label: "price discount" },
      { name: "rating", label: "rating" },
      { name: "total_reviews", label: "total reviews" },
      { name: "facilities", label: "facilities" },
      { name: "address", label: "address" },
      { name: "province", label: "Province" },
      { name: "city", label: "City" },
      { name: "location_maps", label: "maps" },
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
        `Failed to add destination because ${emptyFields.join(", ")} ${emptyFields.length > 1 ? "are" : "is"} empty`
      );
      return;
    } else if (!file) {
      console.log("file", !file);
      toast.info("Please select an image");
      return;
    } else {
      // Add destination successful
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
        setImageUrls(res?.data?.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return props.trigger ? (
    <div className="popup-create-activity-wrap">
      <div className="popup-create-activity">
        <h1>Add Destination</h1>

        <div className="input-box-create-activity-separate">
          <div className="input-box-create-activity-7kiri">
            <select
              className="option-create-activity"
              name="categoryId"
              value={categoryId}
              onChange={handleCategoryIdChange}>
              <option value="">-- Select Category --</option>
              {categories.map((category, index) => (
                <option key={index} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <div className="input-box-create-activity">
              <input type="text" name="title" value={title} onChange={handleTitleChange} placeholder="Title" />
            </div>

            <div className="input-box-create-activity">
              <input
                type="text"
                name="description"
                value={description}
                onChange={handleDescriptionChange}
                placeholder="Description"
              />
            </div>

            <div className="input-box-create-activity">
              <input type="text" name="price" value={price} onChange={handlePriceChange} placeholder="Price" />
            </div>

            <div className="input-box-create-activity">
              <input
                type="text"
                name="price_discount"
                value={price_discount}
                onChange={handlePrice_discountChange}
                placeholder="Price Discount"
              />
            </div>
            <div className="input-box-create-activity">
              <input type="number" name="rating" value={rating} onChange={handleRatingChange} placeholder="Rating" />
            </div>
          </div>

          <div className="input-box-create-activity-7kanan">
            <input
              className="upload-image-create-activity"
              id="file-upload"
              type="file"
              name="imageUrls"
              onChange={handleImageUrlsChange}
              multiple
            />

            <div className="input-box-create-activity">
              <input
                type="text"
                name="total_reviews"
                value={total_reviews}
                onChange={handleTotal_reviewsChange}
                placeholder="Total Reviews"
              />
            </div>

            <div className="input-box-create-activity">
              <input
                type="text"
                name="facilities"
                value={facilities}
                onChange={handleFacilitiesChange}
                placeholder="Facilities"
              />
            </div>

            <div className="input-box-create-activity">
              <input type="text" name="address" value={address} onChange={handleAddressChange} placeholder="Address" />
            </div>

            <div className="input-box-create-activity">
              <input
                type="text"
                name="province"
                value={province}
                onChange={handleProvinceChange}
                placeholder="Province"
              />
            </div>

            <div className="input-box-create-activity">
              <input type="text" name="city" value={city} onChange={handleCityChange} placeholder="City" />
            </div>

            <div className="input-box-create-activity">
              <input
                type="text"
                name="location_maps"
                value={location_maps}
                onChange={handleLocation_mapsChange}
                placeholder="Location Maps"
              />
            </div>
          </div>
        </div>

        <div className="btn-create-activity-popup">
          <button onClick={handleUpload}>Add Destination</button>
        </div>

        <span className="btn-close-popup-create-activity" onClick={() => props.setTrigger(false)}>
          &times;
        </span>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
};

export default CreateActivity;
