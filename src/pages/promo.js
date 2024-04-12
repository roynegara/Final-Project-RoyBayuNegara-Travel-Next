import React, { useState, useEffect } from "react";
import axios from "axios";

const Promo = () => {
  const [promos, setPromos] = useState([]);

  const getPromos = () => {
    const accessToken = localStorage.getItem("access_token");
    axios
      .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos", {
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          Authorization: `Bearer ${accessToken}`,
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

  useEffect(() => {
    getPromos();
  }, []);

  return (
    <div>
      <h1>Promo</h1>
      <div>
        {promos.map((promo, index) => (
            <div className="promos" key={index}>
                <img  src={promo.imageUrl} alt={promo.title}/>
            <p>{promo.id}</p>
                <p>{promo.title}</p>
                <p>{promo.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Promo;
