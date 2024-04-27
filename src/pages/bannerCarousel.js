import React, { useState, useEffect } from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from "axios";
import Link from "next/link";

const BannerCarousel = () => {
  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, 
    autoplaySpeed: 4000,
  };

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
    <div className="banners-home">
      <h1>From Indonesia To The World</h1>
      <div className="banners-container-home">
        <Slider {...settings}>
          {banners.map((banner, index) => (
            <div className="banners-list" key={index}>
              <Link href={`/banner/${banner.id}`}>
                <img src={banner.imageUrl} alt={banner.name} />
              </Link>
              <p>{banner.name}</p>
              <div className="banner-overlay">
                <a href={`/banner/${banner.id}`}>Discover more about {banner.name}</a>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default BannerCarousel;
