import React, { useState } from 'react';
import Profile from '@/pages/profile';
import Users from '@/pages/users';
import Banner from '@/pages/banner';
import Promo from '@/pages/promo';
import Category from '@/pages/category';
import Activity from '@/pages/activity';
import { useRouter } from 'next/router';
import { toast } from 'sonner';


const Dashboard = () => {
  const [showProfile, setShowProfile] = useState(true); // Ubah nilai awal menjadi true
  const [showUsers, setShowUsers] = useState(false);
  const [showbanner, setShowBanner] = useState(false);
  const [showPromo, setShowPromo] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
const [showActivity, setShowActivity] = useState(false);
  const router = useRouter();
  
const handleLogout = () => {
  localStorage.removeItem("access_token");
  toast.success("Logout successfully");
  router.push("/login", undefined, { shallow: true }).then((success) => {
    if (success) {
      setTimeout(() => {
        router.push('/')
        window.location.reload()
      },1500);
    }
  });
  };
  
  
  
  const handleProfileClick = () => {
    setShowProfile(true);
    setShowUsers(false);
    setShowBanner(false);
    setShowPromo(false);
    setShowCategory(false);
    setShowActivity(false);
  };

  const handleUsersClick = () => {
    setShowUsers(true);
    setShowProfile(false);
    setShowBanner(false);
    setShowPromo(false);
    setShowCategory(false);
    setShowActivity(false);
  }

  const handleBannerClick = () => {
    setShowBanner(true);
    setShowProfile(false);
    setShowUsers(false);
    setShowPromo(false);
    setShowCategory(false);
    setShowActivity(false);
  }

  const handlePromoClick = () => {
    setShowPromo(true);
    setShowProfile(false);
    setShowUsers(false);
    setShowBanner(false);
    setShowCategory(false);
    setShowActivity(false);
  }

  const handleCategoryClick = () => {
    setShowCategory(true);
    setShowProfile(false);
    setShowUsers(false);
    setShowBanner(false);
    setShowPromo(false);
    setShowActivity(false);
  }

  const handleActivityClick = () => {
    setShowActivity(true);
    setShowProfile(false);
    setShowUsers(false);
    setShowBanner(false);
    setShowPromo(false);
    setShowCategory(false);
  }

  return (
    <div className="dashboard">
      {/* Kolom Kiri (Sidebar Navigasi) */}
      <div className="sidebar">
        <ul>
          <li className='sidebar-position' onClick={handleProfileClick}>  <i class="bi bi-file-person-fill"></i> Profile</li>
          <li className='sidebar-position' onClick={handleUsersClick}> <i class="bi bi-person-check-fill"></i> Users</li>
          <li className='sidebar-position' onClick={handleBannerClick}> <i class="bi bi-credit-card-2-front-fill"></i> Banner</li>
          <li className='sidebar-position' onClick={handlePromoClick}><i class='bx bxs-discount' ></i> Promo</li>
          <li className='sidebar-position' onClick={handleCategoryClick}><i class='bx bx-category'></i> Category</li>
          <li className='sidebar-position' onClick={handleActivityClick}><i class='bx bxs-plane-alt'></i> Destination</li>
          <li className='sidebar-logout' onClick={handleLogout} ><i class="bi bi-box-arrow-right"></i> Logout</li>
        </ul>
      </div>

      {/* Kolom Kanan (Konten Dinamis) */}
      <div className="content">
        {/* <h1>Dashboard Content</h1> */}
        {showProfile && <Profile />}
        {showUsers && <Users />}
        {showbanner && <Banner />}
        {showPromo && <Promo />}
        {showCategory && <Category />}
        {showActivity && <Activity />}

        {/* Tampilkan konten di sini berdasarkan item navigasi */}
      </div>
    </div>
  );
};

export default Dashboard;


// //sdh benar
// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/router";
// import axios from "axios";
// import PopupProfil from "@/components/PopupProfil";
// import PopupImg from "@/components/PopupImg";

// const Dashboard = () => {
//   const router = useRouter();
//   const [users, setUsers] = useState([]);
//   const [user, setUser] = useState({});
//   const [notif, setNotif] = useState("");
//   const [role, setRole] = useState("");

//   // const [selectFile, setSelectFile] = useState('');

//   const [buttonPopup, setButtonPopup] = useState(false);
//   const [buttonPopupImg, setButtonPopupImg] = useState(false);

//   // const [timedPopup, setTimedPopup] = useState(false);

//   // useEffect(() => {
//   //   setTimeout(() => {
//   //     setTimedPopup(true);
//   //   }, 3000);
//   // }, []);

//   useEffect(() => {
//     const accessToken = localStorage.getItem("access_token");
//     if (!accessToken) {
//       router.push("/login");
//     } else {
//       getUsers();
//       getLoggedUser();
//     }
//   }, []);

//   const getUsers = () => {
//     const accessToken = localStorage.getItem("access_token");
//     axios
//       .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/all-user", {
//         headers: {
//           apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//           Authorization: `Bearer ${accessToken}`,
//         },
//       })
//       .then((res) => {
//         console.log("res", res);
//         setUsers(res.data.data);
//       })
//       .catch((err) => {
//         console.log("err", err);
//       });
//   };

//   const getLoggedUser = () => {
//     const accessToken = localStorage.getItem("access_token");

//     axios
//       .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/user", {
//         headers: {
//           apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//           Authorization: `Bearer ${accessToken}`,
//         },
//       })
//       .then((res) => {
//         console.log("res", res);
//         setUser(res.data.data); //menampilkan user yang sudah login
//       })
//       .catch((err) => {
//         console.log("err", err);
//       });
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("access_token");
//     setNotif("Status : Logout Successfully");
//     setTimeout(() => {
//       router.push("/login");
//     }, 1500);
//   };

//   const handleChangeUserRole = (id, role) => {
//     const accessToken = localStorage.getItem("access_token");
//     axios
//       .post(
//         `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-user-role/${id}`,
//         { role },
//         {
//           headers: {
//             apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       )
//       .then((res) => {
//         console.log("res", res);
//         getUsers();
//       })
//       .catch((err) => {
//         console.log("err", err);
//       });
//   };

//   return (
//     <div>
//       <h1>Dashboard</h1>
//       <div className="profile">
//         <img className="image-profile" src={user.profilePictureUrl} alt={user.name} />

//         <div>
//           <div>
//             <button onClick={() => setButtonPopupImg(true)}>Edit Avatar</button>
//             <PopupImg trigger={buttonPopupImg} setTrigger={setButtonPopupImg}></PopupImg>
//           </div>
//           <div>
//             <button onClick={() => setButtonPopup(true)}> Edit Profile</button>
//             <PopupProfil setUser={setUser} trigger={buttonPopup} setTrigger={setButtonPopup}></PopupProfil>
//           </div>
//         </div>

//         <p>User Id : {user.id}</p>
//         <p>Name : {user.name}</p>
//         <p>Email : {user.email}</p>
//         <p>Role : {user.role}</p>
//         <p>Phone Number : {user.phoneNumber}</p>
//         {notif && <p style={{ color: notif === "Status : Logout Successfully" ? "green" : "red" }}>{notif}</p>}
//         <button onClick={handleLogout}>Logout</button>
//       </div>
//       <div>
//         {users.map((user, index) => (
//           <div key={index}>
//             <img className="image-users" src={user.profilePictureUrl} alt={user.name} />
//             <p>User Id : {user.id}</p>
//             <p>Name : {user.name}</p>
//             <p>Email : {user.email}</p>
//             <p>Role : {user.role}</p>
//             <p>Phone Number : {user.phoneNumber}</p>
//             <div>
//               <label>Update Role : </label>
//               <select name="role" value={role} onChange={(e) => setRole(e.target.value)}>
//                 <option value="">-- Change Role --</option>
//                 <option value={"admin"}>Admin</option>
//                 <option value={"user"}>User</option>
//               </select>
//               <button onClick={() => handleChangeUserRole(user.id, role)}>Change Role</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

//mas muhsin
// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/router";
// import axios from "axios";
// import PopupProfil from "@/components/PopupProfil";
// import PopupImg from "@/components/PopupImg";

// const Dashboard = () => {
//   const router = useRouter();
//   const [users, setUsers] = useState([]);
//   const [user, setUser] = useState({});
//   const [notif, setNotif] = useState("");
//   const [role, setRole] = useState("");
//   const [imageUrl, setImageUrl] = useState('');
//   const [selectFile, setSelectFile] = useState('');

//   const [buttonPopup, setButtonPopup] = useState(false);
//   const [buttonPopupImg, setButtonPopupImg] = useState(false);

//   // const [timedPopup, setTimedPopup] = useState(false);

//   // useEffect(() => {
//   //   setTimeout(() => {
//   //     setTimedPopup(true);
//   //   }, 3000);
//   // }, []);

//   useEffect(() => {
//     const accessToken = localStorage.getItem("access_token");
//     if (!accessToken) {
//       router.push("/login");
//     } else {
//       getUsers();
//       getLoggedUser();
//     }
//   }, []);

//   const getUsers = () => {
//     const accessToken = localStorage.getItem("access_token");
//     axios
//       .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/all-user", {
//         headers: {
//           apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//           Authorization: `Bearer ${accessToken}`,
//         },
//       })
//       .then((res) => {
//         console.log("res", res);
//         setUsers(res.data.data);
//       })
//       .catch((err) => {
//         console.log("err", err);
//       });
//   };

//   const getLoggedUser = () => {
//     const accessToken = localStorage.getItem("access_token");

//     axios
//       .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/user", {
//         headers: {
//           apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//           Authorization: `Bearer ${accessToken}`,
//         },
//       })
//       .then((res) => {
//         console.log("res", res);
//         setUser(res.data.data);
//       })
//       .catch((err) => {
//         console.log("err", err);
//       });
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("access_token");
//     setNotif("Status : Logout Successfully");
//     setTimeout(() => {
//       router.push("/login");
//     }, 1500);
//   };

//   const handleChangeUserRole = (id, role) => {
//     const accessToken = localStorage.getItem("access_token");
//     axios
//       .post(
//         `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-user-role/${id}`,
//         { role },
//         {
//           headers: {
//             apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       )
//       .then((res) => {
//         console.log("res", res);
//         getUsers();
//       })
//       .catch((err) => {
//         console.log("err", err);
//       });
//   };

//   const handleUpload = (selectFile) => {

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
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${accessToken}`,
//         },
//       })
//       .then((res) => {
//         console.log("res", res);
//         setImageUrl(res.data.url);
//         setNotif(res.data.message);
//               })
//       .catch((err) => {
//         console.log("err", err);
//         setNotif(err.response.data.message);
//       });
//   };

//   return (
//     <div>
//       <h1>Dashboard</h1>
//       <div className="profile">
//         <img  className="image-profile" src={user.profilePictureUrl} alt={user.name} />
//         {imageUrl && <img src={imageUrl} />}
//         <div>
//           <main>
//             <h1>Edit Avatar</h1>
//           {/* <img
//             className="image-profile"
//             src={user.profilePictureUrl}
//             alt={user.name}
//             onClick={() => setButtonPopupImg(true)}
//           /> */}
//             <button onClick={() => setButtonPopupImg(true)}>Edit Avatar</button>
//           <PopupImg trigger={buttonPopupImg} handleUpload={handleUpload} setTrigger={setButtonPopupImg}>
//             Edit Profil
//             </PopupImg>
//           </main>

//         </div>

//         <p>User Id : {user.id}</p>
//         <p>Name : {user.name}</p>
//         <p>Email : {user.email}</p>
//         <p>Role : {user.role}</p>
//         <p>Phone Number : {user.phoneNumber}</p>
//         {notif && <p style={{ color: notif === "Status : Logout Successfully" ? "green" : "red" }}>{notif}</p>}
//         <button onClick={handleLogout}>Logout</button>

//         <div>
//           <main>
//             <h1>Edit Your Profile</h1>
//             <button onClick={() => setButtonPopup(true)}> Popup Edit Here</button>
//             <PopupProfil setUser={setUser} trigger={buttonPopup} setTrigger={setButtonPopup}>

//             </PopupProfil>

//             {/* <Popup trigger={timedPopup} setTrigger={setTimedPopup}>
//               My Timed Profile
//             </Popup> */}
//           </main>
//         </div>
//       </div>
//       <div>
//         {users.map((user, index) => (
//           <div key={index}>
//             <img className="image-users" src={user.profilePictureUrl} alt={user.name} />
//             <p>User Id : {user.id}</p>
//             <p>Name : {user.name}</p>
//             <p>Email : {user.email}</p>
//             <p>Role : {user.role}</p>
//             <p>Phone Number : {user.phoneNumber}</p>
//             <div>
//               <label>Update Role : </label>
//               <select name="role" value={role} onChange={(e) => setRole(e.target.value)}>
//                 <option value="">-- Change Role --</option>
//                 <option value={"admin"}>Admin</option>
//                 <option value={"user"}>User</option>
//               </select>
//               <button onClick={() => handleChangeUserRole(user.id, role)}>Change Role</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// //sdh betul
// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/router";
// import axios from "axios";

// const Dashboard = () => {
//   const router = useRouter();
//   const [users, setUsers] = useState([]);
//   const [user, setUser] = useState({});
//   const [notif, setNotif] = useState("");
//   const [role, setRole] = useState("");

//   useEffect(() => {
//     const accessToken = localStorage.getItem("access_token");
//     if (!accessToken) {
//       router.push("/login");
//     } else {
//       getUsers();
//       getLoggedUser();
//     }
//   }, []);

//   const getUsers = () => {
//     const accessToken = localStorage.getItem("access_token");
//     axios
//       .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/all-user", {
//         headers: {
//           apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//           Authorization: `Bearer ${accessToken}`,
//         },
//       })
//       .then((res) => {
//         console.log("res", res);
//         setUsers(res.data.data);
//       })
//       .catch((err) => {
//         console.log("err", err);
//       });
//   };

//   const getLoggedUser = () => {
//     const accessToken = localStorage.getItem("access_token");

//     axios
//       .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/user", {
//         headers: {
//           apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//           Authorization: `Bearer ${accessToken}`,
//         },
//       })
//       .then((res) => {
//         console.log("res", res);
//         setUser(res.data.data);
//       })
//       .catch((err) => {
//         console.log("err", err);
//       });
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("access_token");
//     setNotif("Status : Logout Successfully");
//     setTimeout(() => {
//       router.push("/login");
//     }, 1500);
//   };

//   const handleChangeUserRole = (id, role) => {
//     const accessToken = localStorage.getItem("access_token");
//     axios
//       .post(
//         `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-user-role/${id}`,
//         { role },
//         {
//           headers: {
//             apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       )
//       .then((res) => {
//         console.log("res", res);
//         getUsers();
//       })
//       .catch((err) => {
//         console.log("err", err);
//       });
//   };

//   return (
//     <div>
//       <h1>Dashboard</h1>
//       <div className="profile">
//         <img className="image-profile" src={user.profilePictureUrl} alt={user.name} />
//         <p>User Id : {user.id}</p>
//         <p>Name : {user.name}</p>
//         <p>Email : {user.email}</p>
//         <p>Role : {user.role}</p>
//         <p>Phone Number : {user.phoneNumber}</p>
//         {notif && <p style={{ color: notif === "Status : Logout Successfully" ? "green" : "red" }}>{notif}</p>}
//         <button onClick={handleLogout}>Logout</button>

//       </div>
//       <div>
//         {users.map((user, index) => (
//           <div key={index}>
//             <img className="image-users" src={user.profilePictureUrl} alt={user.name} />
//             <p>User Id : {user.id}</p>
//             <p>Name : {user.name}</p>
//             <p>Email : {user.email}</p>
//             <p>Role : {user.role}</p>
//             <p>Phone Number : {user.phoneNumber}</p>
//             <div>
//               <label>Update Role : </label>
//               <select name="role" value={role} onChange={(e) => setRole(e.target.value)}>
//                 <option value="">-- Change Role --</option>
//                 <option value={"admin"}>Admin</option>
//                 <option value={"user"}>User</option>
//               </select>
//               <button onClick={() => handleChangeUserRole(user.id, role)}>Change Role</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { setLoggedInUser, setAuthStatus } from '../Redux/action';
// import axios from 'axios';

// const Dashboard = () => {
//   const dispatch = useDispatch();
//   const loggedInUser = useSelector((state) => state.loggedInUser);
//   const isAuthenticated = useSelector((state) => state.isAuthenticated);

//   useEffect(() => {
//     const getUserData = async () => {
//       try {
//         const response = await axios.get('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/user', {
//           headers: {
//             apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
//             Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k',
//           },
//         });
//         const userData = response.data.data;
//         dispatch(setLoggedInUser(userData));
//         dispatch(setAuthStatus(true));
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//         dispatch(setAuthStatus(false));
//       }
//     };

//     if (!isAuthenticated) {
//       getUserData();
//     }
//   }, [dispatch, isAuthenticated]);

//   return (
//     <div>
//       <h1>Dashboard</h1>
//       <div>
//         <img className="image-dashboard" src={loggedInUser.profilePictureUrl} alt={loggedInUser.name} />
//         <p>User Id : {loggedInUser.id}</p>
//         <p>Name : {loggedInUser.name}</p>
//         <p>Email : {loggedInUser.email}</p>
//         <p>Role : {loggedInUser.role}</p>
//         <p>Phone Number : {loggedInUser.phoneNumber}</p>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/router";
// import axios from "axios";

// const Dashboard = () => {
//   const router = useRouter();
//   const [users, setUsers] = useState([]);
//   const [user, setUser] = useState({});

//   const getUsers = () => {
//     axios
//       .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/all-user", {
//         headers: {
//           apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//           Authorization:
//             "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k",
//         },
//       })
//       .then((res) => {
//         console.log("res", res);
//         setUsers(res.data.data);
//       })
//       .catch((err) => {
//         console.log("err", err);
//       });
//   };

//   useEffect(() => {
//     getUsers();
//   }, []);

//   const getLoggedUser = () => {
//     axios
//       .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/user", {
//         headers: {
//           apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//           Authorization:
//             "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k",
//         },
//       })
//       .then((res) => {
//         console.log("res", res);
//         setUser(res.data.data);
//       })
//       .catch((err) => {
//         console.log("err", err);
//       });
//   };

//   useEffect(() => {
//     getLoggedUser();
//   }, []);

//   return (
//     <div>
//           <h1>Dashboard</h1>
//           <div>
//             <img className="image-dashboard" src={user.profilePictureUrl} alt={user.name} />
//             <p>User Id : {user.id}</p>
//             <p>Name : {user.name}</p>
//             <p>Email : {user.email}</p>
//             <p>Role : {user.role}</p>
//             <p>Phone Number : {user.phoneNumber}</p>

//           </div>
//       <div>
//         {users.map((user, index) => (
//           <div key={index}>
//             <img className="image-dashboard" src={user.profilePictureUrl} alt={user.name} />
//             <p>User Id : {user.id}</p>
//             <p>Name : {user.name}</p>
//             <p>Email : {user.email}</p>
//             <p>Role : {user.role}</p>
//             <p>Phone Number : {user.phoneNumber}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
