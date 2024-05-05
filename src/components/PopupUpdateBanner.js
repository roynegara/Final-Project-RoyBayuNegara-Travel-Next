import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/router";

const UpdateBanner = (props) => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [notif, setNotif] = useState("");

  const router = useRouter();
  const [file, setFile] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
    console.log("name", e.target.value);
  };

  const handleSubmit = () => {
    if (!imageUrl) {
      const payload = {
        name: name,
        imageUrl: imageUrl,
      };

      const accessToken = localStorage.getItem("access_token");
      // {props.id}; // Ganti dengan ID banner yang sesuai
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
          setImageUrl(res?.data?.url);
        })
        .catch((err) => {
          console.log("err", err);
          setNotif(err?.message);
        });
    }
  };

  useEffect(() => {
    handleSubmit();
  }, [imageUrl]);

  const handleImageUrlChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      toast.warning("Please select an image");
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
        setImageUrl(res.data.url);
      })
      .catch((err) => {
        console.log(err);
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
          <input type="file" name="imageUrl" value={imageUrl} onChange={handleImageUrlChange} />
        </div>
        <div>
          <p>{notif}</p>
          <button type="submit" onClick={handleUpload}>
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
