import { useState } from "react";
import { useRouter} from "next/router";

export default function Navbar() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        console.log('open', isOpen)

    };

    return (
        <nav className="navbar">
        <div className="logo">
          <a href="/">Luxury Travel</a>
        </div>
        <div className={`navbar-nav ${isOpen ? "active" : ""}`}>
          <a href="/home" className={router.pathname === "/" ? "active" : ""}>Home</a>
          <a href="/" className={router.pathname === "/user" ? "active" : ""}>Menu</a>
        <a href="/about" className={router.pathname === "/about" ? "active" : ""}>About</a>
        <a href="/contact" className={router.pathname === "/contact" ? "active" : ""}>Contact</a>        
        </div>
        <button className="navbar-toggle" onClick={toggleMenu}>
          <span className="toggle-icon">&#9776;</span>
            </button>
            
      </nav>
    )
    }