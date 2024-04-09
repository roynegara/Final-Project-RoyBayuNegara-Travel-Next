import React, { useState } from 'react';
import axios from 'axios';

const UpdateUserData = ({ userData, onUpdate }) => {
  const [name, setName] = useState(userData ? userData.name : '');
  const [email, setEmail] = useState(userData ? userData.email : '');
  const [phoneNumber, setPhoneNumber] = useState(userData ? userData.phoneNumber : '');

  const handleUpdate = () => {
    const accessToken = localStorage.getItem("access_token");

    axios.post(
      "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-profile",
      {
        name: name,
        email: email,
        phoneNumber: phoneNumber
      },
      {
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          Authorization: `Bearer ${accessToken}`
        }
      }
    )
    .then(response => {
      // Menghandle respon dari server jika diperlukan
      console.log(response.data);
      // Panggil fungsi onUpdate jika diperlukan
      onUpdate({ name, email, phoneNumber });
    })
    .catch(error => {
      // Menghandle kesalahan jika diperlukan
      console.error('Error updating user data:', error);
    });
  };

  return (
    <div>
      <h2>Update User Data</h2>
      <div>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Phone Number:
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </label>
      </div>
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default UpdateUserData;


// import React, { useState } from "react";
// import axios from "axios";

// const UpdateProfil = () => {

//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [phoneNumber, setPhoneNumber] = useState("");

//     const [notif, setNotif] = useState("");

// const handleNameChange = (e) => {
//     setName(e.target.value);
//     console.log("name", e.target.value);
//     };

//     const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//     console.log("email", e.target.value);
//     };

//     const handlePhoneNumberChange = (e) => {
//     setPhoneNumber(e.target.value);
//     console.log("phoneNumber", e.target.value);
//     };

//     const handleSubmit = () => {
//         const payload = {
//         name: name,
//         email: email,
//         phoneNumber: phoneNumber,
//         };

//         const accessToken = localStorage.getItem("access_token");
//         axios.post("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-profile", payload, {
//         headers: {
//                 apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//             Authorization : `Bearer ${accessToken}`,
//         },
//         })
//         .then((res) => {
//         console.log("res", res);
//             setNotif(res?.data?.message);
//             props.setUser(res?.data?.data);
//         })
//         .catch((err) => {
//         console.log("err", err);
//         setNotif(err?.response?.data?.error);
//         })
//     }

//     return  (
//         <div className="popup">
//             <h1> Update Profile</h1>
//             <form>
//                 <div>
//                     <label>Name:</label>
//                     <input type="text" name="name" value={name} onChange={handleNameChange} />
//                 </div>
//                 <div>
//                     <label>Email:</label>
//                     <input type="email" name="email" value={email} onChange={handleEmailChange} />
//                 </div>
//                 <div>
//                     <label>Phone Number:</label>
//                     <input type="text" name="phoneNumber" value={phoneNumber} onChange={handlePhoneNumberChange} />
//                 </div>
//             {notif && <p style={{ color: "red" }}>{notif}</p>}
//                 <button type="submit" onClick={handleSubmit}>Update</button>
//             </form>

//         </div>
//     )
// }

// export default UpdateProfil
