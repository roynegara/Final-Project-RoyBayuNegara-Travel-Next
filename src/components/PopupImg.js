import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

const Upload = (props) => {
  const [file, setFile] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const router = useRouter();
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);

  const handleClick = () => {
    dispatch({ type: "SET_NOTIFICATION", payload: "Profile picture has been updated" });
  };

  const handleError = () => {
    dispatch({ type: "SET_NOTIFICATION", payload: "Failed to update profile picture" });
  };

  const handleClose = () => {
    dispatch({ type: "SET_NOTIFICATION", payload: "" }); // Menghapus notifikasi saat tombol close diklik
    props.setTrigger(false); // Menutup popup
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
          handleClick(); // Panggil handleClick() saat submit berhasil
          router.push(`/dashboard`, undefined, { shallow: false }).then((success) => {
            if (success) {
              setTimeout(() => {
                window.location.reload();
              }, 1000);
            }
          });
        })
        .catch((err) => {
          console.log("err", err);
          handleError();
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
    if (!file) {
      dispatch({ type: "SET_NOTIFICATION", payload: "Please select an image" });
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
    <div className="popup-update-image-wrap">
      <div className="popup-update-image">
        <h1>Edit Avatar</h1>

        {notification && (
          <p
            style={{
              borderRadius: "10px",
              background: "rgba(0, 0, 0, 0.3)",
              color: notification.includes("Failed") ? "red" : notification.includes("Please select") ? "orange" : "green",
            }}>
            {notification}
          </p>
        )}
        <div className="input-box-update-image">
          <input onChange={handleFileChange} type="file" />
        </div>
        <div className="btn-update-image-popup">
          <button onClick={handleUpload}>Upload</button>
        </div>
        <span className="btn-close-popup-update-image" onClick={handleClose}>
          &times;
        </span>
        {props.children}
      </div>
    </div>
  ) : null;
};

export default Upload;
