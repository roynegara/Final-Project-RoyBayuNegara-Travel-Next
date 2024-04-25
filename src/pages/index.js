import { useRouter } from "next/router";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";
import BannerCarousel from "@/pages/bannerCarousel";
import ActivityList from "@/pages/activity/activitybyCategotyId";

export default function Home() {
  const router = useRouter();
  const [banners, setBanners] = useState([]);
  const [promos, setPromos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activities, setActivities] = useState([]);


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

  const getPromos = () => {
    // const accessToken = localStorage.getItem("access_token");
    axios
      .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos", {
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          // Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log("res", res);
        setPromos(res.data.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const getCategories = () => {
    const accessToken = localStorage.getItem("access_token");
    axios
      .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories", {
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log("res", res);
        setCategories(res.data.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const getActivities = () => {
    const accessToken = localStorage.getItem("accessToken");
    axios
      .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activities", {
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log("res", res);
        setActivities(res.data.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    getBanners();
    getPromos();
    getCategories();
    getActivities();
  }, []);

  

  return (
    <div className="home">

<div className="home-title">
<h1>Luxury Travel</h1>
<h1>With Us Travel Everywere Place To Visit</h1>
<h1>Discover amazing places with promo prices and luxury experience</h1>
</div>
      
      <BannerCarousel />
      <ActivityList />

       {/* <div className="banners-home">
        <h1>From Indonesia To The World</h1>
        <div className="banners-container-home">
          {banners.map((banner, index) => (
            <div className="banners-list" key={index}>
              <Link href={`/banner/${banner.id}`}>
                <img src={banner.imageUrl} alt={banner.name} />
              </Link>
              <p>{banner.name}</p>
            </div>
          ))}
        </div>
      </div>  */}

      
      <div>
        <h1>Enjoy Your Trip With Our Promo</h1>
        <div className="wrapper">
          <i id="left" class="fa-solid fa-angle-left"></i>
          <ul className="carousel">
            {promos.map((promo, index) => (
              <li className="card" key={index}>
                <div className="img">
                  <img src={promo.imageUrl} alt={promo.title} />
                </div>
                <h2>{promo.title}</h2>
                <p>{promo.description}</p>
                <p>{promo.code}</p>
                <p>IDR {promo.promo_discount_price}</p>
              </li>
            ))}
          </ul>
          <i id="right" class="fa-solid fa-angle-right"></i>
        </div>
      </div>

      
      
      {/* <div className="promos-home">
        <h1>Enjoy Your Trip With Our Promo</h1>
        <div className="promos-container">
          {promos.map((promo, index) => (
            <div className="promos" key={index}>
              <Link href={`/promo/${promo.id}`}>
                <img src={promo.imageUrl} alt={promo.title} />
              </Link>
              <p>{promo.title}</p>
            </div>
          ))}
        </div>
      </div> */}

      <div className="categories-home">
        <h1>Explore The World and Enhance Your Trip</h1>
        <div className="categories-container">
          {categories.map((category, index) => (
            <div className="categories" key={index}>
              <Link href={`/category/${category.id}`}>
                <img src={category.imageUrl} alt={category.name} />
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="activities-home">
        <h1>Top Destination</h1>
        <div className="activities-container">
          {activities.map((activity, index) => (
            <div className="activities" key={index}>
              <h3>{activity.title}</h3>
              <Link href={`/activity/${activity.id}`}>
                <img
                  src={
                    activity.imageUrls?.[0] && activity.imageUrls?.[1]
                      ? activity.imageUrls?.[1]
                      : activity.imageUrls?.[0]
                  }
                  alt={activity.title}
                />
              </Link>
            </div>
          ))}
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
