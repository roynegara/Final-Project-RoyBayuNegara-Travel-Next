import React, { useState } from "react";
import axios from "axios";

const UpdateBanner = (props) => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [notif, setNotif] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
    console.log("name", e.target.value);
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
    console.log("imageUrl", e.target.value);
  };

  const handleSubmit = () => {
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
      })
      .catch((err) => {
        console.log("err", err);
        setNotif(err?.message);
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
          <label>Image URL:</label>
          <input type="text" name="imageUrl" value={imageUrl} onChange={handleImageUrlChange} />
        </div>
        <div>
          <p>{notif}</p>
          <button type="submit" onClick={handleSubmit}>
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
      ''
  )
};

export default UpdateBanner;









// import React, { useState } from "react";
// import axios from "axios";

// const EditBanner = (banner) => {
//   const [name, setName] = useState("");
//   const [imageUrl, setImageUrl] = useState("");

//   const [notif, setNotif] = useState("");

//   const handleNameChange = (e) => {
//     setName(e.target.value);
//   };

//   const handleImageUrlChange = (e) => {
//     setImageUrl(e.target.value);
//   };

//   const handleSubmit = () => {
      
//       const payload = {
//           name: name,
//           imageUrl: imageUrl,
//         };
        
//         const accessToken = localStorage.getItem("access_token");
//       axios.post(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-banner/${banner?.id}`, payload, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//         },
//       })
//       .then((res) => {
//         console.log("res", res);
//         setNotif(res.data.message);
//       })
//       .catch((err) => {
//         console.log("Failed updated banner", err);
//         setNotif(err.response.data.message);
//       });
//   };

//   return (
//     <div>
//       <h1>Update Banner</h1>

//       <input type="text" placeholder="Name" value={name} onChange={handleNameChange} />
//       <input type="text" placeholder="Image Url" value={imageUrl} onChange={handleImageUrlChange} />
//       {notif && <p style={{ color: "red" }}>{notif}</p>}
//       <button type="submit" onClick={handleSubmit}>
//         Update
//       </button>
//     </div>
//   );
// };

// export default EditBanner;

// import React, { useState } from "react";

// import useEditBanner from "@/hooks/useEditBanner";
// import FormEditBanner from "@/components/FormEditBanner";

// export default function PopupUpdateBanner({ props }) {
//   const { pos } = useEditBanner(); // Mengambil metode post dari useEditBanner
//   const [notif, setNotif] = useState("");
//   const [name, setName] = useState("");
//   const [imageUrl, setImageUrl] = useState("");

//   const handleNameChange = (e) => {
//     setName(e.target.value);
//   };

//   const handleImageUrlChange = (e) => {
//     setImageUrl(e.target.value);
//   };

//   const handleUpdate = () => {
//     setLoading(true);

//   const handleUpdate = () => {
//     const payload = {
//       name: name,
//       imageUrl: imageUrl,
//       };

//       const accessToken = localStorage.getItem("access_token");

//       pos(`/update-banner/${props?.id}`, payload, {
//         headers: {
//           apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//           Authorization: `Bearer ${accessToken}`,
//         },
//       })
//       .then((res) => {
//         setNotif(res, "Banner updated successfully");
//         setTimeout(() => {
//           setTrigger(false);
//         }, 1000);
//       })
//       .catch((err) => {
//         setNotif(err?.response?.data?.message);
//       });
//     };

// return props.triger ? (
//     <div className="popup">
//         <form>
//             <div>
//                 <label htmlFor="name">Name:</label>
//                 <input type="text" id="name" name="name" value={name} onChange={handleNameChange} />
//             </div>
//             <div>
//                 <label htmlFor="imageUrl">Image Url:</label>
//                 <input type="text" id="imageUrl" name="imageUrl" value={imageUrl} onChange={handleImageUrlChange} />
//             </div>

//             <div>
//                 <p style={{ color: "red" }}>{notif}</p>
//                 <FormEditBanner title={`Edit ${props?.title}`} onSubmit={handleUpdate} loading={loading}/>
//                 {/* <button type="submit" onClick={handleUpdate}>Update</button> */}
//             </div>
//         </form>

//         <button className="btn-close-popup" onClick={() => props.setTrigger(false)}>X</button>
// {props.children}
//     </div>
// ) : ("")

// }

// import React, { useState } from "react";
// import axios from "axios";

// const UpdateBanner = (props) => {

//   const [name, setName] = useState("");
//   const [imageUrl, setImageUrl] = useState("");
//   const [notif, setNotif] = useState("");

//   const handleNameChange = (e) => {
//     setName(e.target.value);
//   };

//   const handleImageUrlChange = (e) => {
//     setImageUrl(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault(); // Prevent default form behavior
//     const payload = {
//       name: name,
//       imageUrl: imageUrl,
//     };

//     const accessToken = localStorage.getItem("access_token");
//     axios
//       .post(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-banner/${props?.id}`, payload, {
//         headers: {
//           apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//           Authorization: `Bearer ${accessToken}`,
//         },
//       })
//       .then((res) => {
//         setNotif(res.data.message);
//       })
//       .catch((err) => {
//         setNotif(err.response.data.message);
//       });
//   };

//   return props.trigger ? (
//     <div>
//       <h1>Update Banner</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Name</label>
//           <input type="text" name="name" value={name} onChange={handleNameChange} />
//         </div>

//         <div>
//           <label>Image Url</label>
//           <input type="text" name="imageUrl" value={imageUrl} onChange={handleImageUrlChange} />
//         </div>

//         <div>
//           <p style={{ color: "red" }}>{notif}</p>
//           <button type="submit">Update</button>
//         </div>
//       </form>
//       <button onClick={() => props.setTrigger(false)}>X</button>
//     </div>
//   ) : (
//     ""
//   );
// };

// export default UpdateBanner;

// import React, { useState } from "react";
// import axios from "axios";

// function UpdateBanner(props) {
//   const [banner, setBanner] = useState({
//     // id: '', // Kamu perlu mengisi id banner yang akan diupdate
//     name: "", // Nama baru untuk banner
//     imageUrl: "", // URL gambar baru untuk banner
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setBanner((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     const accessToken = localStorage.getItem("access_token");

//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-banner/${banner?.id}`,
//         {
//           name: banner.name,
//           imageUrl: banner.imageUrl,
//         },
//         {
//           headers: {
//             apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );
//       console.log("Update berhasil:", response.data);
//     } catch (error) {
//       console.error("Gagal melakukan update:", error);
//     }
//   };

//   return props.trigger ? (
//     <div>
//       <h2>Update/Edit Banner</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="nama">Nama:</label>
//           <input type="text" id="name" name="name" value={banner.nama} onChange={handleChange} />
//         </div>
//         <div>
//           <label htmlFor="imageUrl">URL Gambar:</label>
//           <input type="text" id="imageUrl" name="imageUrl" value={banner.imageUrl} onChange={handleChange} />
//         </div>
//         <button type="submit">Update Banner</button>

//         <button className="btn-close-popup-update-promo" onClick={() => props.setTrigger(false)}>
//           X
//         </button>
//         {props.children}
//       </form>
//     </div>
//   ) : (
//     ""
//   );
// }

// export default UpdateBanner;

// batas

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useRouter } from "next/router";

// export async function getServerSideProps(context) {
//     try {
//       const resp = await axios.get(
//         `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activity/${context.params.id}`,
//         {
//           headers: { apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c", keyWord: "Dibimbing API key" },
//         }
//       );
//       return { props: { banner: resp.data.data } };
//     } catch (error) {
//       console.error("Error fetching activity:", error);
//       return { props: { banner: null } };
//     }
//   }

// export default function BannerById({ banner }) {
//   const [notif, setNotif] = useState("");
//   const router = useRouter();

//   const handleUpdate = () => {
//     const accessToken = localStorage.getItem("access_token");
//     axios
//       .post(
//         `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-banner/${banner?.id}`,
//         { name: banner?.name, imageUrl: banner?.imageUrl },
//         {
//           headers: {
//             apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       )
//       .then((res) => {
//         console.log("res", res);
//         setNotif(res.data.message);
//         // router.push("/banner"); // Pindahkan navigasi ke sini
//       })
//       .catch((err) => {
//         console.log("Failed updated banner", err);
//         setNotif(err.response.data.message);
//       });
//   };

//   const handleNameChange = (e) => {
//     handleUpdate({ name: e.target.value });
//   };

//   const handleImageUrlChange = (e) => {
//     handleUpdate({ imageUrl: e.target.value });
//   };

//   return props.trigger ? (
//     <div className="banner">
//       <img src={banner?.imageUrl} alt={banner?.name} />
//       <h1>This is {banner?.name} Banner</h1>
//       <input type="text" name="name" value={banner?.name} onChange={handleNameChange} placeholder="Banner Name" />
//       <input
//         type="text"
//         name="imageUrl"
//         value={banner?.imageUrl}
//         onChange={handleImageUrlChange}
//         placeholder="Banner Image Url"
//       />
//       {notif && <p style={{ color: "red" }}>{notif}</p>}
//           <button onClick={handleUpdate}>Update</button>
//           {props.children}
//     </div>
//   ) : (
//     ""
//   )
// }

// batas
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useRouter } from "next/router";

// export default function BannerById({ banner }) {
//   const [notif, setNotif] = useState("");
//   const [name, setName] = useState("");
//   const [imageUrl, setImageUrl] = useState("");
//   const router = useRouter();

//   const handleNameChange = (e) => {
//     setName(e.target.value);
//     console.log("name", e.target.value);
//   };

//   const handleImageUrlChange = (e) => {
//     setImageUrl(e.target.value);
//     console.log("imageUrl", e.target.value);
//   };

//   const handleUpdate = () => {
//     const payload = {
//       name: name,
//       imageUrl: imageUrl
//     };

//     const accessToken = localStorage.getItem("access_token");
//     axios
//       .post(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-banner/${banner?.id}`, payload, {
//         headers: {
//           apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//           Authorization: `Bearer ${accessToken}`,
//         },
//       })
//       .then((res) => {
//         console.log("res", res);
//         setNotif(res.data.message);
//       })
//       .catch((err) => {
//         console.log("Failed updated banner", err);
//         setNotif(err.response.data.message);
//       });
//   };

//   return (
//     <div className="banner">
//       <img src={banner?.imageUrl} alt={banner?.name} />
//       <h1>This is {banner?.name} Banner</h1>
//       <input type="text" name="name" value={name} onChange={handleNameChange} />
//       <input type="text" name="imageUrl" value={imageUrl} onChange={handleImageUrlChange} />
//       {notif && <p style={{ color: "red" }}>{notif}</p>}
//       <button onClick={handleUpdate}>Update</button>
//     </div>
//   );
// }

//batas

// import React, { useState } from "react";
// import axios from "axios";

// const UpdateBanner = (props) => {
//   const [name, setName] = useState("");
//   const [imageUrl, setImageUrl] = useState("");

//   const [notif, setNotif] = useState("");

//   const handleNameChange = (e) => {
//     setName(e.target.value);
//     console.log("name", e.target.value);
//   };

//   const handleImageUrlChange = (e) => {
//     setImageUrl(e.target.value);
//     console.log("imageUrl", e.target.value);
//   };

//     const handleUpdateBanner = () => {
//         const id = props; // asumsikan prop bannerId tersedia

//     const payload = {
//       name: name,
//       imageUrl: imageUrl,
//     };

//     const accessToken = localStorage.getItem("access_token");
//     axios
//         .post(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-banner/${id}`, payload, {
//         headers: {
//           apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//           Authorization: `Bearer ${accessToken}`,
//         },
//       })
//       .then((res) => {
//         console.log("res", res);
//         setNotif(res?.data?.message);

//       })
//       .catch((err) => {
//         console.log("Failed updated banner", err);
//         setNotif(err?.response?.data?.message);
//       });
//   };

//   return props.trigger ? (
//     <div className="popup-update-banner">
//       <h1>Update Banner</h1>
//       <input type="text" name="name" value={name} onChange={handleNameChange} placeholder="Banner Name" />
//       <input
//         type="text"
//         name="imageUrl"
//         value={imageUrl}
//         onChange={handleImageUrlChange}
//         placeholder="Banner Image Url"
//       />
//       {notif && <p style={{ color: "red" }}>{notif}</p>}
//       <button onClick={handleUpdateBanner}>Update</button>
//       <button className="btn-close-popup-update-banner" onClick={() => props.setTrigger(false)}>
//         X
//       </button>
//       {props.children}
//     </div>
//   ) : (
//     ""
//   );
// };

// export default UpdateBanner;
