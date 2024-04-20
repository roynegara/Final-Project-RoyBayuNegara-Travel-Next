import React, { useState, useEffect } from "react";
import axios from "axios";

const Upload = () => {
  const [file, setFile] = useState('');
  const [imageUrl, setImageUrl] = useState("");

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleSubmit = () => {
    if (imageUrl) {
      const payload = { profilePictureUrl: imageUrl };
      const accessToken = localStorage.getItem("access_token");
      axios
        .post(
          "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-profile",
          payload,
          {
            headers: {
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
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
      .post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image",
        formData,
        config
      )
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





// //berhasil tapi masih upload manual, automaticnya untuk masukkin url saja 
// import React, { useState } from "react";
// import axios from "axios";

// const Upload = () => {
//   const [file, setFile] = useState('');
//   const [profilePictureUrl, setProfilePictureUrl] = useState('');
//   const [imageUrl, setImageUrl] = useState("");

//   const handleImageUrlChange = (e) => {
//     setImageUrl(e.target.value);
//   };

//   const handleSubmit = () => {
//     const payload = {    
//       profilePictureUrl: imageUrl, // Menggunakan imageUrl sebagai nilai profilePictureUrl
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
//         console.log("res", res);
//         setProfilePictureUrl(res?.data?.url); // Memperbarui profilePictureUrl dengan URL gambar yang diunggah
//       })
//       .catch((err) => {
//         console.log("err", err);
//       });
//   };

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleUpload = () => {
//     const formData = new FormData();
//     formData.append("image", file);

//     const config = {
//       headers: {
//         "content-type": "multipart/form-data",
//         Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k`,
//         apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//       },
//     };

//     axios
//       .post(
//         "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image",
//         formData,
//         config
//       )
//       .then((res) => {
//         console.log(res);
//         setImageUrl(res.data.url); // Memperbarui imageUrl dengan URL gambar yang diunggah
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   return (
//     <div>
//       <h1>Upload</h1>
//       <img src={imageUrl} alt="Uploaded" />
//       <input onChange={handleFileChange} type="file" />
//       <button onClick={handleUpload}>Upload</button>

//       <div>
//         <label> Profile Picture Url:</label>
//         <input type="text" value={imageUrl} onChange={handleImageUrlChange} placeholder="Profile Picture Url" />
//         <button onClick={handleSubmit}>Update</button>
//       </div>
//     </div>
//   );
// };

// export default Upload;



// import React, { useState } from "react";
// import axios from "axios";

// const UploadImage = () => {
//   const [notif, setNotif] = useState("");
//   const [selectFile, setSelectFile] = useState(null);
//   const [imageUrl, setImageUrl] = useState(""); // State untuk menyimpan URL gambar

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
//           "Content-Type": "multipart/form-data", // Removed extra space after "Content-Type"
//           Authorization: `Bearer ${accessToken}`,
//         },
//       })
//       .then((res) => {
//         console.log("res", res);
//         setNotif(res.data.message);
//         // Set URL gambar ke dalam state
//         setImageUrl(res.data.url);
//         // Panggil fungsi handleImageUrlChange secara otomatis
//         handleImageUrlChange({ target: { value: res.data.url } });
//       })
//       .catch((err) => {
//         console.log("err", err);
//         setNotif(err.response.data.message);
//       });
//   };

//   // Fungsi untuk mengganti URL gambar
//   const handleImageUrlChange = (e) => {
//     setImageUrl(e.target.value);
//     console.log("imageUrl", e.target.value);
//   };

//   return (
//     <div>
//       <h1>Upload Image</h1>
//       <input type="file" onChange={handleFileChange} />

//       {notif && <p style={{ color: notif === "Upload image success" ? "green" : "red" }}>{notif}</p>}
//       <button onClick={handleUpload}>Upload</button>

//       {/* Tampilkan input untuk URL gambar */}
//       <input type="text" value={imageUrl} onChange={handleImageUrlChange} />
//     </div>
//   );
// };

// export default UploadImage;




// import React, { useState } from "react";
// import axios from "axios";

// const UploadImage = () => {
//   const [notif, setNotif] = useState("");
//   const [selectFile, setSelectFile] = useState(null);

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
//   return (
//     <div>
//       <h1>Upload Image</h1>
//       <input type="file" onChange={handleFileChange} />

//       {notif && <p style={{ color: notif === "Upload image success" ? "green" : "red" }}>{notif}</p>}
//       <button onClick={handleUpload}>Upload</button>
//     </div>
//   );
// };

// export default UploadImage;
