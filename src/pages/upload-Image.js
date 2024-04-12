import React, { useState } from "react";
import axios from "axios";

const UploadImage = () => {
  const [notif, setNotif] = useState("");
  const [selectFile, setSelectFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectFile) {
      setNotif("Please Select a File ");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectFile, selectFile.name);

    const accessToken = localStorage.getItem("access_token");

    axios
      .post("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image", formData, {
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          "Content-Type ": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log("res", res);
        setNotif(res.data.message);
      })
      .catch((err) => {
        console.log("err", err);
        setNotif(err.response.data.message);
      });
  };
  return (
    <div>
      <h1>Upload Image</h1>
      <input type="file" onChange={handleFileChange} />

      {notif && <p style={{ color: notif === "Upload image success" ? "green" : "red" }}>{notif}</p>}
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadImage;