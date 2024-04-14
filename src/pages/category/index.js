import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const Category = () => {
  const [categories, setCategories] = useState([]);

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

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
      <h1>Category</h1>
      <div>
        {categories.map((category, index) => (
          <div className="categories" key={index}>
            <img src={category.imageUrl} alt={category.name} />
            <p>{category.id}</p>
                <p>{category.name}</p>
                <div>
                  <Link href={`/category/${category.id}`}>
                    <button>View Details</button>
                  </Link>
                </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
