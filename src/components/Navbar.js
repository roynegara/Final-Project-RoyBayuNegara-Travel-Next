import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";
// import LogInOut from "./LogInOut/LogInOut";

export default function Navbar() {
  const router = useRouter();

  const [user, setUser] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    getLoggedUser();
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
        console.log("err", err.message);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    router.push("/login", undefined, { shallow: true }).then((success) => {
      if (success) {
        setTimeout(() => {
          window.location.reload();
        });
      }
    });
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  console.log("user", user);
  // const accessToken = localStorage.getItem("access_token");
  const isLoggedIn = user && Object.keys(user).length > 0;

  return (
    <nav className="navbar">
      <div className="logo">
        <a href="/">Luxury Travel</a>
      </div>
      <div className="navbar-nav">
        <Link href="/">Home</Link>
        <Link href="/promo">Promo</Link>
        <Link href="/activity">Destination</Link>

        {!isLoggedIn ? (
          <a href="/login">Login</a>
        ) : (
          <div className="dropdown" onMouseEnter={toggleDropdown} onMouseLeave={closeDropdown}>            
            <div className="profile-navbar">              
              <img className="image-profile-navbar" src={user.profilePictureUrl} alt={user.name} />{" "}
              <a className="name-profil-navbar">{user.name}</a>
            </div>
            {isDropdownOpen && (
                <div className="dropdown-content-navbar">
                  <a href="/dashboard">Profile</a>
                <a onClick={handleLogout}>Logout</a>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

// import { useState } from "react";
// import { useRouter } from "next/router";
// import Link from "next/link";
// import LogInOut from "./LogInOut/LogInOut";

// export default function Navbar() {
//   // const router = useRouter();
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//     console.log("open", isOpen);
//   };

//   return (
//     <nav className="navbar">
//       <div className="logo">
//         <a href="/">Luxury Travel</a>
//       </div>
//       <div className={`navbar-nav ${isOpen ? "active" : ""}`}>
//         <Link active href="/">
//           Home
//         </Link>
//         <Link href="/promo">Promo</Link>
//         <Link href="/activity">Destination</Link>
//       {/* <LogInOut /> */}
//       </div>
//       <button className="navbar-toggle" onClick={toggleMenu}>
//         <span className="toggle-icon">&#9776;</span>
//       </button>

//     </nav>
//   );
// }

////Benar
// import { useState } from "react";
// import { useRouter } from "next/router";
// import Link from "next/link";
// import LogInOut from "./LogInOut/LogInOut";

// export default function Navbar() {
//   // const router = useRouter();
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//     console.log("open", isOpen);
//   };

//   return (
//     <nav className="navbar">
//       <div className="logo">
//         <a href="/">Luxury Travel</a>
//       </div>
//       <div className={`navbar-nav ${isOpen ? "active" : ""}`}>
//         <Link active href="/">
//           Home
//         </Link>
//         <Link href="/promo">Promo</Link>
//       <LogInOut />
//       </div>
//       <button className="navbar-toggle" onClick={toggleMenu}>
//         <span className="toggle-icon">&#9776;</span>
//       </button>

//     </nav>
//   );
// }
