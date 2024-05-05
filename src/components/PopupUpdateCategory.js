import React, { useState } from "react";
import axios from "axios";

const UpdateBanner = (props) => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [notif, setNotif] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
    console.log("name", e.target.value);
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
    console.log("imageUrl", e.target.value);
  };

  const handleSubmit = () => {
    const payload = {
      name: name,
      imageUrl: imageUrl,
    };

    const accessToken = localStorage.getItem("access_token");
    axios
      .post(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-banner/${id}`, payload, {
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log("res", res);
        setNotif(res?.data?.message);
      })
      .catch((err) => {
        console.log("err", err);
        setNotif(err?.message);
      });
  };

  return props.trigger ? (
    <div className="popup">
      <h1>Update Banner</h1>
      <form>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={name} onChange={handleNameChange} />
        </div>
        <div>
          <label>Image URL:</label>
          <input type="text" name="imageUrl" value={imageUrl} onChange={handleImageUrlChange} />
        </div>
        <div>
          <p>{notif}</p>
          <button type="submit" onClick={handleSubmit}>
            Update
          </button>
        </div>
      </form>
      <button className="btn-close-popup" onClick={() => props.setTrigger(false)}>
        {" "}
        X{" "}
      </button>
      {props.children}
    </div>
  ) : (
    ""
  );
};

export default UpdateBanner;
