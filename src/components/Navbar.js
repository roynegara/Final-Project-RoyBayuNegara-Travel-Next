import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import { toast } from "sonner";

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
        setUser(res.data.data);
      })
      .catch((err) => {
        console.log("err", err.message);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    toast.success("Logout successfully");
    setTimeout(() => {
      router.push("/");
      window.location.reload();
    }, 1500);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  console.log("user", user);
  const isLoggedIn = user && Object.keys(user).length > 0;

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link href="/">Luxury Travel</Link>
      </div>
      <div className={`navbar-nav ${isOpen ? "active" : ""}`}>
        <Link href="/">Home</Link>
        <Link href="/promo">Promo</Link>
        <Link href="/activity">Destination</Link>
        {!isLoggedIn ? null : <Link href={"/dashboard"}>Dashboard</Link>}

        {!isLoggedIn ? (
          <a href="/register">Register</a>
        ) : (
          <div className="dropdown" onMouseEnter={toggleDropdown} onMouseLeave={closeDropdown}>
            <div className="profile-navbar">
              <img className="image-profile-navbar" src={user.profilePictureUrl} alt={user.name} />{" "}
              <a className="name-profil-navbar">{user.name}</a>
            </div>
            {isDropdownOpen && (
              <div className="dropdown-content-navbar">
                <a href="/profile">Profile</a>
                <a onClick={handleLogout}>Logout</a>
              </div>
            )}
          </div>
        )}
      </div>

      <button className="navbar-toggle" onClick={toggleMenu}>
        <span className="toggle-icon">&#9776;</span>
      </button>
    </nav>
  );
}
