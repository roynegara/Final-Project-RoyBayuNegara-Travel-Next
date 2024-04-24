import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ActivityList = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [activities, setActivities] = useState([]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories', {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          }
        });
        setCategories(response.data.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch activities based on selected category
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activities-by-category/${selectedCategory}`, {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          }
        });
        setActivities(response.data.data);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    if (selectedCategory) {
      fetchActivities();
    }
  }, [selectedCategory]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div className='activity-by-categoryId'>
      <h1>Activity List</h1>
      <label htmlFor="categorySelect">Choose a category:</label>
      <select id="categorySelect" value={selectedCategory} onChange={handleCategoryChange}>
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>{category.name}</option>
        ))}
      </select>
      
      <h2>Activities</h2>
      <ul>
        {activities.map((activity) => (
          <li key={activity.id}>
            <h3>{activity.title}</h3>
            <p>{activity.description}</p>
            <img src={activity.imageUrls[0]} alt={activity.title} />
            {/* Render other activity details here */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityList;



////gagal
// import { useState } from 'react';
// import axios from 'axios';

// export default function MyComponent({ categories }) {
//   const [selectedCategoryId, setSelectedCategoryId] = useState('');
//   const [activities, setActivities] = useState([]);

//   const handleChange = async (e) => {
//     const categoryId = e.target.value;
//     setSelectedCategoryId(categoryId);

//     try {
//       const resp = await axios.get(
//         `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activities-by-category/${categoryId}`,
//         {
//           headers: {
//             apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//           },
//         }
//       );
//       console.log('activities by categoryId', resp.data.data);
//       setActivities(resp.data.data);
//     } catch (error) {
//       console.error("Error fetching activities:", error);
//       setActivities([]);
//     }
//   };

//   return (
//     <div>
//       <select value={selectedCategoryId} onChange={handleChange}>
//         <option value="">Select a category</option>
//         {categories.map(category => (
//           <option key={category.id} value={category.id}>{category.name}</option>
//         ))}
//       </select>
//       {activities.length > 0 && (
//         <div>
//           <h2>Activities:</h2>
//           <ul>
//             {activities.map(activity => (
//               <li key={activity.id}>
//                 <h3>{activity.title}</h3>
//                 <p>{activity.description}</p>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }





// berhasil untuk categories
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function Home() {
//   const [categories, setCategories] = useState([]);
//   const [selectedCategoryImage, setSelectedCategoryImage] = useState("");

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = () => {
//     const accessToken = localStorage.getItem("access_token");
//     axios
//       .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories", {
//         headers: {
//           apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//           Authorization: `Bearer ${accessToken}`,
//         },
//       })
//       .then((res) => {
//         setCategories(res.data.data);
//       })
//       .catch((err) => console.log(err));
//     }; 




//   const handleSelectChange = (event) => {
//     const selectedValue = event.target.value;
//     // Cari kategori yang sesuai berdasarkan ID
//     const selectedCategory = categories.find((category) => category.id === selectedValue);
//     // Jika kategori ditemukan, atur gambar kategori
//     if (selectedCategory) {
//       setSelectedCategoryImage(selectedCategory.imageUrl);
//     } else {
//       setSelectedCategoryImage(""); // Jika tidak ditemukan, atur gambar menjadi kosong
//     }
//   };

//   return (
//     <div>
//       <h1>Category list</h1>
//       <select onChange={handleSelectChange}>
//         <option value="">Pilih Category</option>
//         {categories.map((category) => (
//           <option key={category.id} value={category.id}>
//             {category.name}
//           </option>
//         ))}
//       </select>
//       {selectedCategoryImage && (
//         <div>
//           <h1>Selected Category Image:</h1>
//           <img src={selectedCategoryImage} alt="Selected Category" />
//         </div>
//       )}
//     </div>
//   );
// }

// export default Home;



