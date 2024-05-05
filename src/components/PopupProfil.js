import React, { useState, useEffect } from "react";
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
