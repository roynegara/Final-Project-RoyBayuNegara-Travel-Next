import React, { useState } from "react";
import axios from "axios";
import PopupImg from "./PopupImg";

const CreateBanner = (props) => {
  const [notif, setNotif] = useState("");
  //   const [selectFile, setSelectFile] = useState(null);
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  //   const handleFileChange = (e) => {
  //     setSelectFile(e.target.files[0]);
  //   };

  const handleNameChange = (e) => {
    setName(e.target.value);
    console.log("name", e.target.value);
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
    console.log("imageUrl", e.target.value);
  };

  const handleSubmit = () => {
    // if (!selectFile) {
    //   setNotif("Please Select a File ");
    //   return;
    // }

    // //upload gambar
    // const formData = new FormData();
    // formData.append("image", selectFile);

    //upload nama

    const payload = {
      name: name,
      imageUrl: imageUrl,
    };

    const accessToken = localStorage.getItem("access_token");

    axios
      .post("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-banner", payload, {
        headers: {
          // "Content-Type": " application/json",
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          //   "Content-Type": "multipart/form-data",

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

  return props.trigger ? (
    <div className="popup-create-banner">
      <h1>Create Banner</h1>

      {/* <input type="file" onChange={handleFileChange} /> */}
      <input type="text" name="name" value={name} onChange={handleNameChange} placeholder="Banner Name" />
      <input
        type="text"
        name="imageUrl"
        value={imageUrl}
        onChange={handleImageUrlChange}
        placeholder="Banner Image Url"
      />

      {notif && <p style={{ color: "red" }}>{notif}</p>}
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>

      <button className="btn-close-popup-create-banner" onClick={() => props.setTrigger(false)}>
        X
      </button>
      {props.children}
    </div>
  ) : (
    ""
  );
};

export default CreateBanner;

// import React, { useState } from "react";
// import axios from "axios";

// const CreateBanner = (props) => {
//   const [notif, setNotif] = useState("");
//   const [selectFile, setSelectFile] = useState(null);
//   const [name, setName] = useState("");

//   const handleFileChange = (e) => {
//     setSelectFile(e.target.files[0]);
//   };

//   const handleNameChange = (e) => {
//     setName(e.target.value);
//     console.log("name", e.target.value);
//   };

//   const handleUpload = () => {
//     if (!selectFile) {
//       setNotif("Please Select a File ");
//       return;
//     }

//     //upload gambar
//     const formData = new FormData();
//     formData.append("image", selectFile);

//     //upload nama

//     const accessToken = localStorage.getItem("access_token");

//     axios
//         .post("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-banner", formData, name , {
//         headers: {
//               "Content-Type": "multipart/form-data",

//               apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//               Authorization: `Bearer ${accessToken}`,
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

//   return props.trigger ? (
//     <div className="popup-create-banner">
//       <h1>Create Banner</h1>

//       <input type="file" onChange={handleFileChange} />
//       <input type="text" name="name" value={name} onChange={handleNameChange} placeholder="Banner Name" />

//       {notif && <p style={{ color: "red" }}>{notif}</p>}
//       <button onClick={handleUpload}>
//         Upload
//       </button>

//       <button className="btn-close-popup-create-banner" onClick={() => props.setTrigger(false)}>
//         X
//       </button>
//       {props.children}
//     </div>
//   ) : (
//     ""
//   );
// };

// export default CreateBanner;