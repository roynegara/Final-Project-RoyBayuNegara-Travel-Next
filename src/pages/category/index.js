import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import PopupCreateCategory from "@/components/PopupCreateCategory";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [buttonPopupCreateCategory, setButtonPopupCreateCategory] = useState(false);

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
        setCategories(res.data.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    getCategories();
  }, []);

  const updateCategoryData = () => { 
        getCategories();
      }

  return (
    <div>
      <h1 className="categories-title">Category</h1>
      <div className="categories-btn-popup-create">
        <button onClick={() => setButtonPopupCreateCategory(true)}>Add Category</button>
      </div>
      <div className={`${buttonPopupCreateCategory ? 'blur' : ''}`}>
        <div className="categories">
          {categories.map((category, index) => (
            <div className="categories-card" key={index}>
              <img src={category.imageUrl} alt={category.name} />
              <p>{category.id}</p>
              <p>{category.name}</p>
              <div>
                <Link href={`/category/${category.id}`}>
                  <button>Read More</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      {buttonPopupCreateCategory && <PopupCreateCategory trigger={buttonPopupCreateCategory} setTrigger={setButtonPopupCreateCategory} updateCategoryData={updateCategoryData} />}
    </div>
  );
};

export default Category;


// // sdh benar ada styling sampai add category
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Link from "next/link";
// import PopupCreateCategory from "@/components/PopupCreateCategory";

// const Category = () => {
//   const [categories, setCategories] = useState([]);

//   const [buttonPopupCreateCategory, setButtonPopupCreateCategory] = useState(false);

//   const getCategories = () => {
//     const accessToken = localStorage.getItem("access_token");
//     axios
//       .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories", {
//         headers: {
//           apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//           Authorization: `Bearer ${accessToken}`,
//         },
//       })
//       .then((res) => {
//         console.log("res", res);
//         setCategories(res.data.data);
//       })
//       .catch((err) => {
//         console.log("err", err);
//       });
//   };

//   useEffect(() => {
//     getCategories();
//   }, []);

//   const updateCategoryData = () => { 
//     getCategories();
//   }

//   return (
//     <div>
//       <h1 className="categories-title">Category</h1>

//       <div className="categories-btn-popup-create">
//       <button onClick={() => setButtonPopupCreateCategory(true)}>Create Category</button>
//       </div>
     
//       <div className={`${buttonPopupCreateCategory ? 'blur' : ''}`} >

//       <div className="categories">
//         {categories.map((category, index) => (
//           <div className="categories-card" key={index}>
//             <img src={category.imageUrl} alt={category.name} />
//             <p>{category.id}</p>
//             <p>{category.name}</p>
            
//                 <div>
//                   <Link href={`/category/${category.id}`}>
//                     <button>Read More</button>
//                   </Link>
//                 </div>
//           </div>
          
//         ))}
//         </div>
//         </div>
     
//         {buttonPopupCreateCategory && <PopupCreateCategory trigger={buttonPopupCreateCategory} setTrigger={setButtonPopupCreateCategory} updateCategoryData={updateCategoryData}/>}
//     </div>
//   );
// };

// export default Category;



