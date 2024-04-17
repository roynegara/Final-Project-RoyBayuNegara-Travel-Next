import React, { useState, useEffect } from "react";
import axios from "axios";


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

    const [notif, setNotif] = useState("");

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
    }

    useEffect(() => {
        getCategories();
    }, []);

    const handleCategoryIdChange = (e) => {
        setCategoryId(e.target.value);
        console.log("categoryId", e.target.value);
    }
    

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
        console.log("title", e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
        console.log("description", e.target.value);
    };

    // const handleImageUrlsChange = (e) => {
    //     setImageUrls(e.target.value);
    //     console.log("imageUrls", e.target.value);
    // };

    const handleImageUrlsChange = (e) => {
        const files = e.target.files;
        const urls = [];
        for (let i = 0; i< files.length; i++) {
            const url = URL.createObjectURL(files[i]);
            urls.push(url);
        }
        setImageUrls(urls);
        console.log("imageUrls", urls);
    }

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

    const handleSubmit = () => {
        if (!categoryId) {
            setNotif("Error: Please select a category");
            return;
        }

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
        .post("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-activity", payload, {
            headers: {
                apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                Authorization: `Bearer ${accessToken}`,
            },
        })
        .then ((res) => {
            console.log("res", res);
            setNotif("Status : Activity Created");
            // setTimeout(() => {
            //     props.setShowPopup(false);
            // }, 1500);
        })
        .catch((err) => {
            console.log("err", err);
            setNotif(err?.response?.data?.message);
        })

    }
    
return props.trigger ? (
    <div className="popup-create-activity">
        <h1>Create Activity</h1>

        
        <select name="categoryId" value={categoryId} onChange={handleCategoryIdChange}>
            <option value="">-- Select Category --</option>
            {categories.map((category,index) => (
                <option key={index} value={category.id}>{category.name}</option>
            ))}

        </select>

        <input type="text" name="title" value={title} onChange={handleTitleChange} placeholder="Title" />
        <input type="text" name="description" value={description} onChange={handleDescriptionChange} placeholder="Description" />
        {/* <input type="text" name="imageUrls" value={imageUrls} onChange={handleImageUrlsChange} placeholder="Image Urls" /> */}
        <input type="file" name="imageUrls" onChange={handleImageUrlsChange} multiple />
        <input type="text" name="price" value={price} onChange={handlePriceChange} placeholder="Price" />
        <input type="text" name="price_discount" value={price_discount} onChange={handlePrice_discountChange} placeholder="Price Discount" />
        <input type="text" name="rating" value={rating} onChange={handleRatingChange} placeholder="Rating" />
        <input type="text" name="total_reviews" value={total_reviews} onChange={handleTotal_reviewsChange} placeholder="Total Reviews" />
        <input type="text" name="facilities" value={facilities} onChange={handleFacilitiesChange} placeholder="Facilities" />
        <input type="text" name="address" value={address} onChange={handleAddressChange} placeholder="Address" />
        <input type="text" name="province" value={province} onChange={handleProvinceChange} placeholder="Province" />
        <input type="text" name="city" value={city} onChange={handleCityChange} placeholder="City" />
        <input type="text" name="location_maps" value={location_maps} onChange={handleLocation_mapsChange} placeholder="Location Maps" />

        {notif && <p style={{ color: "red" }}>{notif}</p>}
        <button onClick={handleSubmit}>Submit</button>

        <button className="btn-close-popup-create-activity" onClick={() => props.setTrigger(false)}>
           X </button>
        {props.children}

    </div>
) : (
    ''
)

    }
    

export default CreateActivity