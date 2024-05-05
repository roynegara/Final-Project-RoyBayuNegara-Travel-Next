import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";

const CreateBanner = (props) => {
  const [name, setName] = useState("");
  const [file, setFile] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleUpload = () => {
    if (!file && !name) {
      toast.info("Empty name and image not selected");
      return;
    } else if (!name) {
      toast.info("Empty name");
      return;
    } else if (!file) {
      toast.info("Select an image");
      return;
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
        setImageUrl(res?.data?.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    console.log("name", e.target.value);
  };

  const handleImageUrlChange = (e) => {
    setFile(e.target.files[0]);
    console.log("imageUrl", e.target.value);
  };

  const handleSubmit = () => {
    if (imageUrl) {
      const payload = {
        name: name,
        imageUrl: imageUrl,
      };

      const accessToken = localStorage.getItem("access_token");

      axios
        .post("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-banner", payload, {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          console.log("res", res);
          toast.success(`${name} has been created`);
          props.updateBannerData(); // Panggil fungsi updateBannerData dari props
          props.setTrigger(false); // Tutup popup setelah berhasil menambahkan banner
          setImageUrl(res?.data?.url);
        })
        .catch((err) => {
          console.log("err", err);
          toast.error(err.response?.data?.message);
        });
    }
  };

  useEffect(() => {
    handleSubmit();
  }, [imageUrl]);

  return props.trigger ? (
    <div className="popup-create-banner-wrap">
      <div className="popup-create-banner">
        <h1>Add Banner</h1>

        <div className="input-box-create-banner">
          <input type="text" name="name" value={name} onChange={handleNameChange} placeholder="Banner Name" />
        </div>

        <div className="input-box-create-banner">
          <input type="file" onChange={handleImageUrlChange} placeholder="Banner Image Url" />
        </div>

        <div className="btn-create-banner-popup">
          <button type="submit" onClick={handleUpload}>
            Add Banner
          </button>
        </div>

        <span className="btn-close-popup-create-banner" onClick={() => props.setTrigger(false)}>
          &times;
        </span>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
};

export default CreateBanner;
