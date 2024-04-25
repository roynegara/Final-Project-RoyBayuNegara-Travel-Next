import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/router";

function UpdateActivity  ()  {
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPromo(prevState => ({
        ...prevState,
        [name]: value
    }));
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("access_token");
    try {
      const response = await axios.post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-activity/${activity?.id}`,
        {
          categoryId: activity.categoryId,
          categories: activity.categories,
          title: activity.title,
          description: activity.description,
          imageUrls: activity.imageUrls,
          price: activity.price,
          price_discount: activity.price_discount,
          rating: activity.rating,
          total_reviews: activity.total_reviews,
          facilities: activity.facilities,
          address: activity.address,
          province: activity.province,
          city: activity.city,
          location_maps: activity.location_maps,
          file: activity.file,
        },
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("Update activity success:", response.data);
      toast.success("Update activity success");
      router.push("/admin");
    } catch (error) {
      console.error("Failed update activity:", error);
      toast.error(error.response.data.message);
    }
  }

  return (
  
    <div>
      <h1>Update Destination</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Category Id</label>
          <input
            type="text"
            name="categoryId"
            value={activity?.categoryId}
            onChange={handleChange}           
                    />
        </div>
        </form>
    </div>
)


}


export default UpdateActivity



