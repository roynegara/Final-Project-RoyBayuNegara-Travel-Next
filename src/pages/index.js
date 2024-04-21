// import Image from "next/image";
// import { Inter } from "next/font/google";

// const inter = Inter({ subsets: ["latin"] });

import { useRouter } from "next/router";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const router = useRouter();
  const [banners, setBanners] = useState([]);

  const getBanners = () => {
    axios
      .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/banners", {
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
        },
      })
      .then((res) => {
        console.log("res", res);
        setBanners(res.data.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    getBanners();
  }, []);

  return (
    <div>
      <h1>Hello</h1>

      <div className="link-home">
        <Link className="home-link" href="/login">
          Login
        </Link>
        <Link className="home-link" href="/register">
          Register
        </Link>
        <Link className="home-link" href="/dashboard">
          Dashboard
        </Link>
        <Link className="home-link" href="/banner">
          Banner
        </Link>
        <Link className="home-link" href={"/promo"}>
          Promo
        </Link>
        <Link className="home-link" href="/category">
          Category
        </Link>
        <Link className="home-link" href="/activity">
          Destination
        </Link>
      </div>

      <div className="banners-home">
        <div className="banners-container">
          <div className="banners-slider ">
            {banners.map((banner, index) => (
              <div className="banners" key={index}>
                <img src={banner.imageUrl} alt={banner.name} />
                <p>{banner.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// import React from "react";
// import ReactDOM from "react-dom/client";
// import { __next_app__ } from "next/dist/build/templates/app-page";
// import { App } from "./_app";
// import { Provider } from "react-redux";
// import store from "../Redux/store";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>
// );
