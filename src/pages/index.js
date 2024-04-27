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
<div className="home-title">
        <a className="home-title-main">Luxury Travel</a>
        <br/>
        <h1>With Us Travel Everywere Place To Visit</h1>
        <br/>
        <h1>Discover amazing places with promo prices and luxury experience</h1>
        
        <div className="home-title-btn" >
        <Link className="home-title-btn-inner" href="/login">Login</Link>
        <Link className="home-title-btn-inner" href="/register">Register</Link>
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

        
          <h1><FontAwesomeIcon icon="fa-regular fa-tag" />Enjoy Your Trip With Our Promo</h1>
          
       

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
        <h1>Explore The World and Enhance Your Trip</h1>
        
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
        <h1>Top Destination</h1>
        
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
          <Link className="see-more-promos-home" href="/activity">See All Destinations &gt;  </Link>
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
