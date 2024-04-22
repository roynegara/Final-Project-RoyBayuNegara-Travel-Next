import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import LogInOut from "./LogInOut/LogInOut";

export default function Navbar() {
  // const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    console.log("open", isOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <a href="/">Luxury Travel</a>
      </div>
      <div className={`navbar-nav ${isOpen ? "active" : ""}`}>
        <Link active href="/">
          Home
        </Link>
        <Link href="/promo">Promo</Link> 
      <LogInOut />
      </div>
      <button className="navbar-toggle" onClick={toggleMenu}>
        <span className="toggle-icon">&#9776;</span>
      </button>
      
    </nav>
  );
}
