// batas
import React, { useState } from "react";
import axios from "axios";

const UploadImage = (props) => {
  const [notif, setNotif] = useState("");
  const [selectFile, setSelectFile] = useState(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);

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
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log("res", res);
        setNotif(res.data.message);

        updateProfilImage(res.data.url);
        setProfilePictureUrl(res?.data?.url);
      })
      .catch((err) => {
        console.log("err", err);
        setNotif(err.response.data.message);
      });
  };

  const updateProfilImage = () => {
    const payload = {
      imageUrl: profilePictureUrl,
    };

    const accessToken = localStorage.getItem("access_token");

    axios
      .post("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-profile", payload, {
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log("Avatar updated", res);
      })
      .catch((err) => {
        console.log("Failed updated avatar", err);
      });
  };

  return props.trigger ? (
    <div className="popupImg">
      <h1>Upload Image</h1>

      <input type="file" onChange={handleFileChange} />

      {notif && <p style={{ color: notif === "Upload image success" ? "green" : "red" }}>{notif}</p>}
      <button onClick={handleUpload}>Upload</button>
      <button className="btn-close-popupImg" onClick={() => props.setTrigger(false)}>
        {" "}
        X{" "}
      </button>
      {props.children}
    </div>
  ) : (
    ""
  );
};

export default UploadImage;

//  // batas

// import React, { useState } from "react";
// import axios from "axios";

// const UploadImage = (props) => {
//   const [notif, setNotif] = useState("");
//   const [selectFile, setSelectFile] = useState(null);
//   const [profilePictureUrl, setProfilePictureUrl] = useState(null);

//   const handleFileChange = (e) => {
//     setSelectFile(e.target.files[0]);
//   };

//   const handleUpload = () => {
//     if (!selectFile) {
//       setNotif("Please Select a File ");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("image", selectFile, selectFile.name);

//     const accessToken = localStorage.getItem("access_token");

//     axios
//       .post("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image", formData, {
//         headers: {
//           apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//           "Content-Type ": "multipart/form-data",
//           Authorization: `Bearer ${accessToken}`,
//         },
//       })
//       .then((res) => {
//         console.log("res", res);
//         setNotif(res.data.message);
//       })
//       .catch((err) => {
//         console.log("err", err);
//         setNotif(err.response.data.message);
//       });
//   };

//   const handleProfilePictureUrl = (e) => {
//     setProfilePictureUrl(e.target.value);
//     console.log("profilePictureUrl", e.target.value);
//   };

//   const updateProfilImage = (imageUrl) => {
//     const payload = {
//       profilePictureUrl: profilePictureUrl,
//     };

//     const accessToken = localStorage.getItem("access_token");

//     axios
//       .post("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-profile", payload, {
//         headers: {
//           apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//           Authorization: `Bearer ${accessToken}`,
//         },
//       })
//       .then((res) => {
//         console.log("Avatar updated", res);
//       })
//       .catch((err) => {
//         console.log("Failed updated avatar", err);
//       });
//   };

//   return props.trigger ? (
//     <div className="popupImg">
//       <h1>Upload Image</h1>

//       <input type="file" onChange={handleFileChange} />

//       {notif && <p style={{ color: notif === "Upload image success" ? "green" : "red" }}>{notif}</p>}
//       <button onClick={handleUpload}>Upload</button>
//       <button className="btn-close-popupImg" onClick={() => props.setTrigger(false)}>
//         {" "}
//         X{" "}
//       </button>
//       {props.children}
//     </div>
//   ) : (
//     ""
//   );
// };

// export default UploadImage;
