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
import React, { useState } from "react";
import axios from "axios";

const UpdateProfil = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profilePictureUrl, setProfilePictureUrl] = useState("");

  const [notif, setNotif] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
    console.log("name", e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    console.log("email", e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
    console.log("phoneNumber", e.target.value);
  };

  const handleProfilePictureUrlChange = (e) => {
    setProfilePictureUrl(e.target.value);
    console.log("profilePictureUrl", e.target.value);
  }

  const handleSubmit = () => {
    const payload = {
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      profilePictureUrl: profilePictureUrl,
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
        console.log("res", res);
        setNotif(res?.data?.message);
        // props.setUser(res?.data?.data);
      })
      .catch((err) => {
        console.log("err", err);
        setNotif(err?.message);
      });
  };

  return props.trigger ? (
    <div className="popup">
      <h1> Update Profile</h1>
      <form>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={name} onChange={handleNameChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={email} onChange={handleEmailChange} />
        </div>
        <div>
          <label>Phone Number:</label>
          <input type="text" name="phoneNumber" value={phoneNumber} onChange={handlePhoneNumberChange} />
        </div>
        <div>
          <label>Profile Picture Url:</label>
          <input type="text" name="profilePictureUrl" value={profilePictureUrl} onChange={handleProfilePictureUrlChange} />
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
    ""
  );
};

export default UpdateProfil;

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
