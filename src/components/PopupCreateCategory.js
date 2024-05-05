import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/router";

const CreateCategory = (props) => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState("");
  const router = useRouter();

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
        setImageUrl(res.data.url);
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
      if (!name && !imageUrl) {
        toast.warning("Name and Image Url cannot be empty");
        return;
      } else if (!name) {
        toast.warning("Name cannot be empty");
        return;
      } else if (!imageUrl) {
        toast.warning("Image Url cannot be empty");
        return;
      }

      const payload = {
        name: name,
        imageUrl: imageUrl,
      };

      const accessToken = localStorage.getItem("access_token");

      axios
        .post("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-category", payload, {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          console.log("res", res);
          toast.success(`${name} has been created`);
          // setNotif(res.data.message);
          props.updateCategoryData();
          props.setTrigger(false);
          setImageUrl(res?.data?.url);
        })
        .catch((err) => {
          console.log("err", err);
          // setNotif(err.response.data.message);
          toast.error(err.response?.data?.message);
        });
    }
  };

  useEffect(() => {
    handleSubmit();
  }, [imageUrl]);

  return props.trigger ? (
    <div className="popup-create-category-wrap">
      <div className="popup-create-category">
        <h1>Add Category</h1>

        <div className="input-box-create-category">
          <input type="text" name="name" value={name} onChange={handleNameChange} placeholder="Category Name" />
        </div>

        <div className="input-box-create-category">
          <input type="file" name="imageUrl" onChange={handleImageUrlChange} placeholder="Category Image Url" />
        </div>

        <div className="btn-create-category-popup">
          <button type="submit" onClick={handleUpload}>
            Add Category
          </button>
        </div>

        <span className="btn-close-popup-create-category" onClick={() => props.setTrigger(false)}>
          &times;
        </span>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
};

export default CreateCategory;
