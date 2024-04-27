import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/router";

const UpdateProfil = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const router = useRouter();

 
  

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };


  const handleSubmit = () => {
if(!name && !email && !phoneNumber){
  toast.warning("Name, email, and phone number can't be empty");
  return;
} else if (!name && !email) {
  toast.warning("Name and email can't be empty");
  return
} else if (!email && !phoneNumber) {
  toast.warning("Email and phone number can't be empty");
  return
} else if (!name && !phoneNumber) {
  toast.warning("Name and phone number can't be empty");
  return
} else if (!name) {
  toast.warning("Name can't be empty");
  return;
} else if (!email) {
  toast.warning("Email can't be empty");
  return;
} else if (!phoneNumber) {
  toast.warning("Phone number can't be empty");
  return;
}



    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phoneNumber", phoneNumber);

    const accessToken = localStorage.getItem("access_token");
    axios
      .post("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-profile", formData, {
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        
       
        console.log('res', res)
        toast.success('Profile has been updated');

        setTimeout (() => {
          props.setTrigger(false);
          props.updateProfileData();
        },100)

        // router.push(`/dashboard`, undefined, { shallow: false }).then((success) => {
        //   if (success) {
        //     setTimeout(() => {
              
        //       window.location.reload(); 
        //     },1000)
        //   }
        // });
        
        // props.updateProfileData();
        

      })
      .catch((err) => {
        console.log(err);
        if (
          err?.response?.data?.errors &&
          err?.response?.data?.errors.length > 0 &&
          err.response.data.errors[0].message
        ) {
          toast.error(err.response.data.errors[0].message);
        } else {
          toast.error(err?.response?.data?.message);
        }
      });
  };

  return props.trigger ? (
    <div className="popup-profile-update-wrapper">

      <div className="popup-profile-update">
        
        <h1> Update Profile</h1>
        
      
        <div className="input-box-profil-update">
          <input type="text" name="name" value={name} onChange={handleNameChange} placeholder="Name" />
        </div>

        <div className="input-box-profil-update">
          <input type="email" name="email" value={email} onChange={handleEmailChange} placeholder="Email" />
        </div>

        <div className="input-box-profil-update">
          <input type="text" name="phoneNumber" value={phoneNumber} onChange={handlePhoneNumberChange} placeholder="Phone Number" />
        </div>
       
        <div className="btn-profile-update-popup">         
          <button type="button" onClick={handleSubmit}>
            Update Profile
          </button>
        </div>
      

      <span className="btn-close-profil-update-popup" onClick={() => props.setTrigger(false)}>&times;</span>
      {props.children}
      </div>
      </div>
  ) : (
    ""
  );
};

export default UpdateProfil;



// import React, { useState } from "react";
// import axios from "axios";
// import { toast } from "sonner";

// const UpdateProfil = (props) => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
 
 

//   const handleNameChange = (e) => {
//     setName(e.target.value);
//     console.log("name", e.target.value);
//   };

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//     console.log("email", e.target.value);
//   };

//   const handlePhoneNumberChange = (e) => {
//     setPhoneNumber(e.target.value);
//     console.log("phoneNumber", e.target.value);
//   };

 

//   const handleSubmit = () => {
// if(!name && !email && !phoneNumber){
//   toast.error("Name, email and phone number can't be empty");
//   return;
// } else if (!name) {
//   toast.error("Name can't be empty");
//   return;
// } else if (!email) {
//   toast.error("Email can't be empty");
//   return;
// } else if (!phoneNumber) {
//   toast.error("Phone number can't be empty");
//   return;
// }


//     const payload = {
//       name: name,
//       email: email,
//       phoneNumber: phoneNumber,
      
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
//         toast.success('Profile has been updated');
        
//       })
//       .catch((err) => {
//         console.log("err", err);
//         toast.error(err?.message);
//       });
//   };

//   return props.trigger ? (
//     <div className="popup">
//       <h1> Update Profile</h1>
//       <form>
//         <div>
//           <label>Name:</label>
//           <input type="text" name="name" value={name} onChange={handleNameChange} />
//         </div>
//         <div>
//           <label>Email:</label>
//           <input type="email" name="email" value={email} onChange={handleEmailChange} />
//         </div>
//         <div>
//           <label>Phone Number:</label>
//           <input type="text" name="phoneNumber" value={phoneNumber} onChange={handlePhoneNumberChange} />
//         </div>
        
//         <div>
         
//           <button type="submit" onClick={handleSubmit}>
//             Update
//           </button>
//         </div>
//       </form>

//       <button className="btn-close-popup" onClick={() => props.setTrigger(false)}>
//         {" "}
//         X{" "}
//       </button>
//       {props.children}
//     </div>
//   ) : (
//     ""
//   );
// };

// export default UpdateProfil;


// //ada notif jika tdak ada field yg diisi
// import React, { useState } from "react";
// import axios from "axios";
// import { toast } from "sonner";

// const UpdateProfil = (props) => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");


//   const handleNameChange = (e) => {
//     setName(e.target.value);
//     console.log("name", e.target.value);
//   };

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//     console.log("email", e.target.value);
//   };

//   const handlePhoneNumberChange = (e) => {
//     setPhoneNumber(e.target.value);
//     console.log("phoneNumber", e.target.value);
//   };


//   const handleSubmit = () => {
// if(!name && !email && !phoneNumber){
//   toast.error("Name, email and phone number can't be empty");
//   return;
// } else if (!name) {
//   toast.error("Name can't be empty");
//   return;
// } else if (!email) {
//   toast.error("Email can't be empty");
//   return;
// } else if (!phoneNumber) {
//   toast.error("Phone number can't be empty");
//   return;
// }


//     const payload = {
//       name: name,
//       email: email,
//       phoneNumber: phoneNumber,

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

//         toast.success(res?.data?.message);
//       //   router.push(`/dashboard`, undefined, { shallow: false }).then((success) => {
//       //     if (success) {
//       //       setTimeout(() => {
              
//       //         window.location.reload(); 
//       //       },1000)
//       //     }
//       //   });
//       })
//       .catch((err) => {
//         console.log("err", err);
    
//         toast.error(err?.message);
//       });
//   };

//   return props.trigger ? (
//     <div className="popup">
//       <h1> Update Profile</h1>
//       <form>
//         <div>
//           <label>Name:</label>
//           <input type="text" name="name" value={name} onChange={handleNameChange} />
//         </div>
//         <div>
//           <label>Email:</label>
//           <input type="email" name="email" value={email} onChange={handleEmailChange} />
//         </div>
//         <div>
//           <label>Phone Number:</label>
//           <input type="text" name="phoneNumber" value={phoneNumber} onChange={handlePhoneNumberChange} />
//         </div>
      
//         <div>
//           {/* <p>{notif}</p> */}
//           <button type="submit" onClick={handleSubmit}>
//             Update
//           </button>
//         </div>
//       </form>

//       <button className="btn-close-popup" onClick={() => props.setTrigger(false)}>
//         {" "}
//         X{" "}
//       </button>
//       {props.children}
//     </div>
//   ) : (
//     ""
//   );
// };

// export default UpdateProfil;


// cara lain
// import React, { useState } from "react";
// import axios from "axios";

// const UpdateProfil = (props) => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [notif, setNotif] = useState("");
 
  

//   const handleNameChange = (e) => {
//     setName(e.target.value);
//   };

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//   };

//   const handlePhoneNumberChange = (e) => {
//     setPhoneNumber(e.target.value);
//   };

//   const handleUpload = (e) => {
//     const file = e.target.files[0];
//     const formData = new FormData();
//     formData.append("image", file);

//     const accessToken = localStorage.getItem("access_token");
//     const config = {
//       headers: {
//         "Content-Type": "multipart/form-data",
//         Authorization: `Bearer ${accessToken}`,
//         apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//       },
//     };

//     axios
//       .post("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image", formData, config)
//       .then((res) => {
//         setProfilePictureUrl(res.data.url);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const handleSubmit = () => {
//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("email", email);
//     formData.append("phoneNumber", phoneNumber);

//     const accessToken = localStorage.getItem("access_token");
//     axios
//       .post("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-profile", formData, {
//         headers: {
//           apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//           Authorization: `Bearer ${accessToken}`,
//           "Content-Type": "multipart/form-data",
//         },
//       })
//       .then((res) => {
//         const newProfilePictureUrl = res?.data?.url;
//         if (newProfilePictureUrl) {
//           setProfilePictureUrl(newProfilePictureUrl);
//         }
//         setNotif(res?.data?.message);
//       })
//       .catch((err) => {
//         console.log(err);
//         setNotif(err?.message);
//       });
//   };

//   return props.trigger ? (
//     <div className="popup">
//       <h1> Update Profile</h1>
//       <form>
//         <div>
//           <label>Name:</label>
//           <input type="text" name="name" value={name} onChange={handleNameChange} />
//         </div>
//         <div>
//           <label>Email:</label>
//           <input type="email" name="email" value={email} onChange={handleEmailChange} />
//         </div>
//         <div>
//           <label>Phone Number:</label>
//           <input type="text" name="phoneNumber" value={phoneNumber} onChange={handlePhoneNumberChange} />
//         </div>
//         <div>
//           <label>Profile Picture:</label>
//           <input type="file" name="profilePictureUrl" onChange={handleUpload} />
//         </div>
//         <div>
//           <p>{notif}</p>
//           <button type="button" onClick={handleSubmit}>
//             Update
//           </button>
//         </div>
//       </form>

//       <button className="btn-close-popup" onClick={() => props.setTrigger(false)}>
//         {" "}
//         X{" "}
//       </button>
//       {props.children}
//     </div>
//   ) : (
//     ""
//   );
// };

// export default UpdateProfil;





// import React, { useState } from "react";
// import axios from "axios";

// const UpdateProfil = (props) => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [notif, setNotif] = useState("");
//   const [profilePictureUrl, setProfilePictureUrl] = useState("");
//   const []

//   const handleNameChange = (e) => {
//     setName(e.target.value);
//   };

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//   };

//   const handlePhoneNumberChange = (e) => {
//     setPhoneNumber(e.target.value);
//   };

//   const handleUpload = (e) => {
//     const file = e.target.files[0];
//     const formData = new FormData();
//     formData.append("image", file);

//     const accessToken = localStorage.getItem("access_token");
//     const config = {
//       headers: {
//         "Content-Type": "multipart/form-data",
//         Authorization: `Bearer ${accessToken}`,
//         apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//       },
//     };

//     axios
//       .post("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image", formData, config)
//       .then((res) => {
//         setProfilePictureUrl(res.data.url);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const handleSubmit = () => {
//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("email", email);
//     formData.append("phoneNumber", phoneNumber);

//     const accessToken = localStorage.getItem("access_token");
//     axios
//       .post("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-profile", formData, {
//         headers: {
//           apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//           Authorization: `Bearer ${accessToken}`,
//           "Content-Type": "multipart/form-data",
//         },
//       })
//       .then((res) => {
//         const newProfilePictureUrl = res?.data?.url;
//         if (newProfilePictureUrl) {
//           setProfilePictureUrl(newProfilePictureUrl);
//         }
//         setNotif(res?.data?.message);
//       })
//       .catch((err) => {
//         console.log(err);
//         setNotif(err?.message);
//       });
//   };

//   return props.trigger ? (
//     <div className="popup">
//       <h1> Update Profile</h1>
//       <form>
//         <div>
//           <label>Name:</label>
//           <input type="text" name="name" value={name} onChange={handleNameChange} />
//         </div>
//         <div>
//           <label>Email:</label>
//           <input type="email" name="email" value={email} onChange={handleEmailChange} />
//         </div>
//         <div>
//           <label>Phone Number:</label>
//           <input type="text" name="phoneNumber" value={phoneNumber} onChange={handlePhoneNumberChange} />
//         </div>
//         <div>
//           <label>Profile Picture:</label>
//           <input type="file" name="profilePictureUrl" onChange={handleUpload} />
//         </div>
//         <div>
//           <p>{notif}</p>
//           <button type="button" onClick={handleSubmit}>
//             Update
//           </button>
//         </div>
//       </form>

//       <button className="btn-close-popup" onClick={() => props.setTrigger(false)}>
//         {" "}
//         X{" "}
//       </button>
//       {props.children}
//     </div>
//   ) : (
//     ""
//   );
// };

// export default UpdateProfil;


// // benar
// import React, { useState } from "react";
// import axios from "axios";

// const UpdateProfil = (props) => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   // const [profilePictureUrl, setProfilePictureUrl] = useState("");

//   const [notif, setNotif] = useState("");

//   const handleNameChange = (e) => {
//     setName(e.target.value);
//     console.log("name", e.target.value);
//   };

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//     console.log("email", e.target.value);
//   };

//   const handlePhoneNumberChange = (e) => {
//     setPhoneNumber(e.target.value);
//     console.log("phoneNumber", e.target.value);
//   };

//   // const handleProfilePictureUrlChange = (e) => {
//   //   setProfilePictureUrl(e.target.value);
//   //   console.log("profilePictureUrl", e.target.value);
//   // }

//   const handleSubmit = () => {
//     const payload = {
//       name: name,
//       email: email,
//       phoneNumber: phoneNumber,
//       // profilePictureUrl: profilePictureUrl,
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
//         setNotif(res?.data?.message);
//         // props.setUser(res?.data?.data);
//       })
//       .catch((err) => {
//         console.log("err", err);
//         setNotif(err?.message);
//       });
//   };

//   return props.trigger ? (
//     <div className="popup">
//       <h1> Update Profile</h1>
//       <form>
//         <div>
//           <label>Name:</label>
//           <input type="text" name="name" value={name} onChange={handleNameChange} />
//         </div>
//         <div>
//           <label>Email:</label>
//           <input type="email" name="email" value={email} onChange={handleEmailChange} />
//         </div>
//         <div>
//           <label>Phone Number:</label>
//           <input type="text" name="phoneNumber" value={phoneNumber} onChange={handlePhoneNumberChange} />
//         </div>
//         {/* <div>
//           <label>Profile Picture Url:</label>
//           <input type="text" name="profilePictureUrl" value={profilePictureUrl} onChange={handleProfilePictureUrlChange} />
//         </div> */}
//         <div>
//           <p>{notif}</p>
//           <button type="submit" onClick={handleSubmit}>
//             Update
//           </button>
//         </div>
//       </form>

//       <button className="btn-close-popup" onClick={() => props.setTrigger(false)}>
//         {" "}
//         X{" "}
//       </button>
//       {props.children}
//     </div>
//   ) : (
//     ""
//   );
// };

// export default UpdateProfil;



// import React, { useState } from "react";
// import axios from "axios";

// const UpdateUserData = (props) => {
//   const { userData, onUpdate } = props;
//   const [name, setName] = useState(userData ? userData.name : "");
//   const [email, setEmail] = useState(userData ? userData.email : "");
//   const [phoneNumber, setPhoneNumber] = useState(userData ? userData.phoneNumber : "");
//   const [notif, setNotif] = useState("");

//   const handleUpdate = () => {
//     const accessToken = localStorage.getItem("access_token");

//     axios
//       .post(
//         "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-profile",
//         {
//           name: name,
//           email: email,
//           phoneNumber: phoneNumber,
//         },
//         {
//           headers: {
//             apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       )
//       .then((res) => {
//         console.log(res.data);

//         setNotif(res.data.message);
//         setTimeout(() => {
//           props.setTrigger(false);
//         }, 1500);
//       })
//       .catch((error) => {
//         console.error("Error updating user data:", error);
//         setNotif(error.message); // Mengambil pesan kesalahan dari respons error
//       });
//   };

//   return props.trigger ? (
//     <div className="popup">
//       <h2>Update User Data</h2>
//       <form>
//         <div>
//           <label>
//             Name:
//             <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
//           </label>
//         </div>
//         <div>
//           <label>
//             Email:
//             <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//           </label>
//         </div>
//         <div>
//           <label>
//             Phone Number:
//             <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
//           </label>
//         </div>
//       </form>
//       {notif && <p style={{ color: "red" }}>{notif}</p>}
//       <button type="button" onClick={handleUpdate}>
//         Update
//       </button>
//       <button className="btn-close-popup" onClick={() => props.setTrigger(false)}>
//         {" "}
//         X{" "}
//       </button>
//       {props.children}
//     </div>
//   ) : null; // Menggunakan null sebagai return value jika props.trigger adalah false
// };

// export default UpdateUserData;

// import React, { useState } from "react";
// import axios from "axios";

// const UpdateUserData = (props, { userData, onUpdate }) => {
//   const [name, setName] = useState(userData ? userData.name : "");
//   const [email, setEmail] = useState(userData ? userData.email : "");
//   const [phoneNumber, setPhoneNumber] = useState(userData ? userData.phoneNumber : "");
//   const [notif, setNotif] = useState("");
//   const handleUpdate = () => {
//     const accessToken = localStorage.getItem("access_token");

//     axios
//       .post(
//         "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-profile",
//         {
//           name: name,
//           email: email,
//           phoneNumber: phoneNumber,
//         },
//         {
//           headers: {
//             apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       )
//       .then((response) => {
//         // Menghandle respon dari server jika diperlukan
//         console.log(response.data);
//         // Panggil fungsi onUpdate jika diperlukan
//         onUpdate({ name, email, phoneNumber });
//         setNotif(response.data.message);
//         props.setUser(res?.data?.data);

//         setTimeout(() => {
//           props.setTrigger(false);
//         }, 1500);
//       })
//       .catch((error) => {
//         // Menghandle kesalahan jika diperlukan
//         console.error("Error updating user data:", error);
//         setNotif(error?.message);
//       });
//   };

//   return props.trigger ? (
//     <div className="popup">
//       <h2>Update User Data</h2>
//       <form>
//         <div>
//           <label>
//             Name:
//             <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
//           </label>
//         </div>
//         <div>
//           <label>
//             Email:
//             <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//           </label>
//         </div>
//         <div>
//           <label>
//             Phone Number:
//             <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
//           </label>
//         </div>
//       </form>
//       {notif && <p style={{ color: "red" }}>{notif}</p>}
//       <button type="submit" onClick={handleUpdate}>
//         Update
//       </button>
//       <button className="btn-close-popup" onClick={() => props.setTrigger(false)}>
//         {" "}
//         X{" "}
//       </button>
//       {props.children}
//     </div>
//   ) : (
//     ""
//   );
// };

// export default UpdateUserData;

// =============== Bisa dipakai
// import React, { useState } from "react";
// import axios from "axios";

// const UpdateProfil = (props) => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [profilePictureUrl, setProfilePictureUrl] = useState("");

//   const [notif, setNotif] = useState("");

//   const handleNameChange = (e) => {
//     setName(e.target.value);
//     console.log("name", e.target.value);
//   };

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//     console.log("email", e.target.value);
//   };

//   const handlePhoneNumberChange = (e) => {
//     setPhoneNumber(e.target.value);
//     console.log("phoneNumber", e.target.value);
//   };

//   const handleProfilePictureUrlChange = (e) => {
//     setProfilePictureUrl(e.target.value);
//     console.log("profilePictureUrl", e.target.value);
//   }

//   const handleSubmit = () => {
//     const payload = {
//       name: name,
//       email: email,
//       phoneNumber: phoneNumber,
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
//         console.log("res", res);
//         setNotif(res?.data?.message);
//         // props.setUser(res?.data?.data);
//       })
//       .catch((err) => {
//         console.log("err", err);
//         setNotif(err?.message);
//       });
//   };

//   return props.trigger ? (
//     <div className="popup">
//       <h1> Update Profile</h1>
//       <form>
//         <div>
//           <label>Name:</label>
//           <input type="text" name="name" value={name} onChange={handleNameChange} />
//         </div>
//         <div>
//           <label>Email:</label>
//           <input type="email" name="email" value={email} onChange={handleEmailChange} />
//         </div>
//         <div>
//           <label>Phone Number:</label>
//           <input type="text" name="phoneNumber" value={phoneNumber} onChange={handlePhoneNumberChange} />
//         </div>
//         <div>
//           <label>Profile Picture Url:</label>
//           <input type="text" name="profilePictureUrl" value={profilePictureUrl} onChange={handleProfilePictureUrlChange} />
//         </div>
//         <div>
//           <p>{notif}</p>
//           <button type="submit" onClick={handleSubmit}>
//             Update
//           </button>
//         </div>
//       </form>

//       <button className="btn-close-popup" onClick={() => props.setTrigger(false)}>
//         {" "}
//         X{" "}
//       </button>
//       {props.children}
//     </div>
//   ) : (
//     ""
//   );
// };

// export default UpdateProfil;

// ===============

// import { updateUserProfile } from "@/api/user";

// import React, { useState } from "react";

// const UpdateProfilePage = (props) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     profilPictureUrl: "",
//     phoneNumber: "",
//   });

//   const [showNotification, setShowNotification] = useState("");

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await updateUserProfile(formData);
//       console.log(res.data);
//       setShowNotification("Status : " + data?.message);
//     } catch (error) {
//       console.error(error);
//       setShowNotification("Status : " + error?.message);
//     }
//   };

//   return props.trigger ? (
//     <div className="popup">
//       <h1>Update Profile</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Name:</label>
//           <input type="text" name="name" value={formData.name} onChange={handleChange} />
//         </div>

//         <div>
//           <label>Email:</label>
//           <input type="email" name="email" value={formData.email} onChange={handleChange} />
//         </div>

//         <div>
//           <label>Profil Picture Url:</label>
//           <input type="text" name="profilPictureUrl" value={formData.profilPictureUrl} onChange={handleChange} />
//         </div>
//         <div>
//           <label>Phone Number:</label>
//           <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
//         </div>

//         {showNotification && <p style={{ color: "red" }}>{showNotification}</p>}
//         <button type="submit">Update</button>
//         <button className="btn-close-popup" onClick={() => props.setTrigger(false)}> X </button>
//         {props.children}
//       </form>
//     </div>
//   ) : (
//     ""
//   );
// };

// export default UpdateProfilePage;
