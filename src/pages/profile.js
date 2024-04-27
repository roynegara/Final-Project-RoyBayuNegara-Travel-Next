import axios from "axios";
import React, { useState, useEffect } from "react";
import PopupProfil from "@/components/PopupProfil";
import PopupImg from "@/components/PopupImg";
import { toast } from "sonner";

const Profile = () => {
  const [user, setUser] = useState({});
  const [buttonPopup, setButtonPopup] = useState(false);
  const [buttonPopupImg, setButtonPopupImg] = useState(false);

  const getLoggedUser = () => {
    const accessToken = localStorage.getItem("access_token");

    axios
      .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/user", {
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log("res", res);
        setUser(res.data.data); //menampilkan user yang sudah login
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    toast.success("Status : Logout Successfully");
    setTimeout(() => {
      router.push("/login");
    }, 1500);
  };

  useEffect(() => {
    getLoggedUser();
  });

  const updateImageData = () => {
    getLoggedUser();
  }

  return (
      <div className="profile-main">
          <h1 className="profile-title">My Profile</h1>
      <div className="profile-card">
        <div>
          <img className="image-profile" src={user.profilePictureUrl} alt={user.name} />
        </div>

        <div className="profile-user">
          {/* <p>User Id : {user.id}</p> */}
          <p>Name : {user.name}</p>
          <p>Email : {user.email}</p>
          <p>Role : {user.role}</p>
          <p>Phone Number : {user.phoneNumber}</p>
        </div>
      </div>

      <div className="btn-profile">
        <div>
          <button onClick={() => setButtonPopupImg(true)}>Edit Avatar</button>
          { buttonPopupImg && <PopupImg trigger={buttonPopupImg} setTrigger={setButtonPopupImg} updateImageData={updateImageData}/>}
        </div>

        <div>
          <button onClick={() => setButtonPopup(true)}> Edit Profile</button>
          <PopupProfil setUser={setUser} trigger={buttonPopup} setTrigger={setButtonPopup}></PopupProfil>
        </div>

        <div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
