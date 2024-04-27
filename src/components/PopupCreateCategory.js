import React, { useState } from "react";
import axios from "axios";
// import PopupImg from "./PopupImg";
import { toast } from "sonner";
import { useRouter } from "next/router";

const CreateCategory = (props) => {
  // const [notif, setNotif] = useState("");
  //   const [selectFile, setSelectFile] = useState(null);
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const router = useRouter();

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
        router.push("/category", undefined, { shallow: false }).then((success) => {
          if (success) {
            setTimeout(() => {
              
              window.location.reload(); // Refresh halaman jika perpindahan halaman berhasil
            },1000)
          }
        });

      })
      .catch((err) => {
        console.log("err", err);
        // setNotif(err.response.data.message);
        toast.error(err.response?.data?.message);
      });
  };

  return props.trigger ? (
    <div className="popup-create-category-wrap">
   
      <div className="popup-create-category">
        
      <h1>Add Category</h1>

        <div className="input-box-create-category">
      <input type="text" name="name" value={name} onChange={handleNameChange} placeholder="Category Name" />
        </div>

      <div className="input-box-create-category">
      <input
        type="text"
        name="imageUrl"
        value={imageUrl}
        onChange={handleImageUrlChange}
        placeholder="Category Image Url"
      />
        </div>
        
        <div className="btn-create-category-popup">
        <button type="submit" onClick={handleSubmit}>Add Category</button>
      </div>
      
      <span className="btn-close-popup-create-category" onClick={() => props.setTrigger(false)}>&times;</span>
      {props.children}
      </div>
      </div>
  ) : (
    ""
  );
};

export default CreateCategory;

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
