import { useRouter } from "next/router";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";
import BannerCarousel from "@/pages/bannerCarousel";
import ActivityList from "@/pages/activity/activitybyCategotyId";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
    <div>
<div className="home-title" >
        <a className="home-title-main">Luxury Travel</a>
        <br/>
        <h1>With Us Travel Everywere Place To Visit</h1>
        <br/>
        <h1>Discover amazing places with promo prices and luxury experience</h1>
        
        <div className="home-title-btn" >
        <a className="home-title-btn-inner" href="/login">Login</a>
        <a className="home-title-btn-inner" href="/register">Register</a>
        </div>
</div>
    <div className="home">

      
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


        <div className="promos-home-wrapper">

        
          <h1><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-cash-stack" viewBox="0 0 16 16">
  <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm7 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4"/>
  <path d="M0 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V7a2 2 0 0 1-2-2z"/>
</svg> Enjoy your trip with our promo</h1>
          
       

        <div className="promos-container-home">
          {promos.map((promo, index) => (
            <div className="promos-card-home" key={index}>
              <Link href={`/promo/${promo.id}`}>
                <img src={promo.imageUrl} alt={promo.title} />
              </Link>
              <p>{promo.title}</p>              
            </div>
          ))}
          </div>
          
          <div className="see-more-promo" >
          <Link className="see-more-promos-home" href="/promo">See All Promos &gt; </Link>
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

<div className="categories-home-wrapper">
        <h1><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-tags" viewBox="0 0 16 16">
  <path d="M3 2v4.586l7 7L14.586 9l-7-7zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586z"/>
  <path d="M5.5 5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M1 7.086a1 1 0 0 0 .293.707L8.75 15.25l-.043.043a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 0 7.586V3a1 1 0 0 1 1-1z"/>
</svg> Explore the world and enhance your trip</h1>
        
        <div className="categories-container-home">
          {categories.map((category, index) => (
            <div className="categories-card-home" key={index}>
              <Link href={`/category/${category.id}`}>
                <img src={category.imageUrl} alt={category.name} />
              </Link>
              <p>{category.name}</p>
            </div>
          ))}
          </div>
          <div className="see-more-promo" >
            <Link className="see-more-promos-home" href="/category">See All Categorys &gt; </Link>
          </div>
      </div>


      {/* <div className="categories-home">
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
      </div> */}

      
<div className="activities-home-wrapper">
        <h1><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-airplane-engines" viewBox="0 0 16 16">
  <path d="M8 0c-.787 0-1.292.592-1.572 1.151A4.35 4.35 0 0 0 6 3v3.691l-2 1V7.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.191l-1.17.585A1.5 1.5 0 0 0 0 10.618V12a.5.5 0 0 0 .582.493l1.631-.272.313.937a.5.5 0 0 0 .948 0l.405-1.214 2.21-.369.375 2.253-1.318 1.318A.5.5 0 0 0 5.5 16h5a.5.5 0 0 0 .354-.854l-1.318-1.318.375-2.253 2.21.369.405 1.214a.5.5 0 0 0 .948 0l.313-.937 1.63.272A.5.5 0 0 0 16 12v-1.382a1.5 1.5 0 0 0-.83-1.342L14 8.691V7.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v.191l-2-1V3c0-.568-.14-1.271-.428-1.849C9.292.591 8.787 0 8 0M7 3c0-.432.11-.979.322-1.401C7.542 1.159 7.787 1 8 1s.458.158.678.599C8.889 2.02 9 2.569 9 3v4a.5.5 0 0 0 .276.447l5.448 2.724a.5.5 0 0 1 .276.447v.792l-5.418-.903a.5.5 0 0 0-.575.41l-.5 3a.5.5 0 0 0 .14.437l.646.646H6.707l.647-.646a.5.5 0 0 0 .14-.436l-.5-3a.5.5 0 0 0-.576-.411L1 11.41v-.792a.5.5 0 0 1 .276-.447l5.448-2.724A.5.5 0 0 0 7 7z"/>
</svg> Top destination for your travels</h1>
        
        <div className="activities-container-home">
          {activities.map((activity, index) => (
            <div className="activities-card-home" key={index}>
             
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
              <p>{activity.title}</p>
            </div>
          ))}
          </div>
          <div className="see-more-promo" >
          <Link className="see-more-promos-home" href="/activity">See All Destinations   </Link>
            </div>
      </div>


      {/* <div className="activities-home">
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
      </div> */}
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
