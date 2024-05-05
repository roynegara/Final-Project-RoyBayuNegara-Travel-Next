import React, { useState, useEffect } from "react";
import axios from "axios";

const Upload = () => {
  const [file, setFile] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleSubmit = () => {
    if (imageUrl) {
      const payload = { profilePictureUrl: imageUrl };
      const accessToken = localStorage.getItem("access_token");
      axios
        .post("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-profile", payload, {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          console.log("res", res);
          setImageUrl(res?.data?.url);
        })
        .catch((err) => {
          console.log("err", err);
        });
    }
  };

  useEffect(() => {
    handleSubmit();
  }, [imageUrl]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
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

  return (
    <div>
      <h1>Upload</h1>
      <img src={imageUrl} alt="Uploaded" />
      <input onChange={handleFileChange} type="file" />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default Upload;
