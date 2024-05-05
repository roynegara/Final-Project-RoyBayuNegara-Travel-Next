import axios from "axios";
import React, { useState, useEffect } from "react";
import PopupProfil from "@/components/PopupProfil";
import PopupImg from "@/components/PopupImg";
import { useRouter } from "next/router";

const Profile = () => {
  const [user, setUser] = useState({});
  const [buttonPopup, setButtonPopup] = useState(false);
  const [buttonPopupImg, setButtonPopupImg] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      router.push("/login");
    }
  }, []);

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
  useEffect(() => {
    getLoggedUser();
  }, []);

  const updateImageData = () => {
    getLoggedUser();
  };

  const updateProfileData = (profile) => {
    getLoggedUser();
  };

  return (
    <div className="profile-main">
      <h1 className="profile-title">My Profile</h1>

      <div className={`${buttonPopupImg || buttonPopup ? "blur" : ""}`}>
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
          </div>

          <div>
            <button onClick={() => setButtonPopup(true)}> Edit Profile</button>
          </div>
        </div>
      </div>

      {buttonPopupImg && (
        <PopupImg trigger={buttonPopupImg} setTrigger={setButtonPopupImg} updateImageData={updateImageData} />
      )}
      {buttonPopup && (
        <PopupProfil trigger={buttonPopup} setTrigger={setButtonPopup} updateProfileData={updateProfileData} />
      )}
    </div>
  );
};

export default Profile;
