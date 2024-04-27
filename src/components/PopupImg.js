import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/router";

const Upload = (props) => {
  const [file, setFile] = useState('');
  const [imageUrl, setImageUrl] = useState("");

  const router = useRouter();
  // const handleImageUrlChange = (e) => {
  //   setImageUrl(e.target.value);
  // };

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
          // toast.success(res?.data?.message);
          toast.success('Profile picture has been updated');
          // router.push(`/dashboard`, undefined, { shallow: false }).then((success) => {
          //   if (success) {
          //     setTimeout(() => {
                
          //       window.location.reload(); 
          //     },1000)
          //   }
          // });
          props.updateImageData();
          props.setTrigger(false);
        })
        .catch((err) => {
          console.log("err", err);
          toast.error(err?.response?.data?.message);
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
      .post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image",
        formData,
        config
      )
      .then((res) => {
        console.log(res);
        setImageUrl(res.data.url);
        // toast.success(res?.data?.message);
       
       
})
      .catch((err) => {
        console.log(err);
        // toast.error(err?.response?.data?.message)
      });
  };

  return props.trigger ? (
    <div className="popup-update-image-wrap">

      <div className="popup-update-image">
        
        <h1>Edit Avatar</h1>
        
        <div className="input-box-update-image">
        <input onChange={handleFileChange} type="file" />
        </div>
        
        <div className="btn-update-image-popup">
      <button onClick={handleUpload}>Upload</button>
</div>

      
      <span className="btn-close-popup-update-image" onClick={() => props.setTrigger(false)}>&times;</span>
      {props.children}
      </div>
      </div>
  ) : (
    ''
  )
};

export default Upload;


// // batas
// import React, { useState } from "react";
// import axios from "axios";


// const UploadImage = (props) => {
//   const [notif, setNotif] = useState("");
//   const [selectFile, setSelectFile] = useState(''); 
 

//   const handleFileChange = (e) => {
//     setSelectFile(e.target.files[0]);
//   };  

//   return props.trigger ? (
//     <div className="popupImg">
//       <h1>Upload Image</h1>

//       <input type="file" onChange={handleFileChange} />

//       {notif && <p style={{ color: notif === "Upload image success" ? "green" : "red" }}>{notif}</p>}
      
//       <button onClick={()=>{props.handleUpload(selectFile)}}>Upload</button>
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
