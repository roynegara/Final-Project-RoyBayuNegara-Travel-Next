import React, { useEffect, useState } from "react";
import axios from "axios";

const Banner = () => {
  const [banners, setBanners] = useState([]);

  const getBanner = () => {
    const accessToken = localStorage.getItem("access_token");
    axios
      .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/banners", {
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          Authorization: `Bearer ${accessToken}`,
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
        getBanner();
    }, [])
    
  return (
    <div>
          <h1>Banner</h1>
          <div>
              {banners.map((banner,index) => (
                  <div key={index}>
                      <img src={banner.imageUrl} alt={banner.name} />
                      <p>{banner.name}</p>
                 </div>
              ))}
          </div>
    </div>
  );
};

export default Banner;

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const BannerManager = () => {
//   const [banners, setBanners] = useState([]);
//   const [newBanner, setNewBanner] = useState({
//     name: "",
//     imageUrl: "",
//   });
//   const [updateBanner, setUpdateBanner] = useState({
//     name: "",
//     imageUrl: "",
//   });
//   const [bannerIdToDelete, setBannerIdToDelete] = useState("");
//   const [bannerIdToFetch, setBannerIdToFetch] = useState("");

//   useEffect(() => {
//     fetchBanners();
//   });

//   const fetchBanners = () => {
//     axios
//       .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/banners", {
//         headers: {
//           apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//         },
//       })
//       .then((res) => {
//         console.log("fetchBanners sukses", res.data.data);
//         // console.log("fetchBanners sukses");
//         // setBanners(res.data.data);
//       })
//       .catch((err) => {
//         console.log("fetchBanners eror", err);
//       });
//   };

//   const createBanner = () => {
//     const accessToken = localStorage.getItem("access_token");
//     axios
//       .post("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-banner", newBanner, {
//         headers: {
//           apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//           Authorization: `Bearer ${accessToken}`,
//         },
//       })
//       .then((res) => {
//         console.log("createBanner sukses");
//         fetchBanners();
//       })
//       .catch((err) => {
//         console.log("createBanner eror", err);
//       });
//   };

//   const updateBannerById = () => {
//     const accessToken = localStorage.getItem("access_token");
//     axios
//       .post(
//         `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-banner/${updateBanner.id}`,
//         updateBanner,
//         {
//           headers: {
//             apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       )
//       .then((res) => {
//         console.log("updateBannerById sukses");
//         fetchBanners();
//       })
//       .catch((err) => {
//         console.log("updateBannerById eror", err);
//       });
//   };

//   const deleteBannerById = () => {
//     const accessToken = localStorage.getItem("access_token");
//     axios
//       .delete(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-banner/${bannerIdToDelete}`, {
//         headers: {
//           apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//           Authorization: `Bearer ${accessToken}`,
//         },
//       })
//       .then((res) => {
//         console.log("deleteBannerById sukses");
//         fetchBanners();
//       })
//       .catch((err) => {
//         console.log("deleteBannerById eror", err);
//       });
//   };

//   const fetchBannerById = () => {
//     const accessToken = localStorage.getItem("access_token");
//     axios
//       .get(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/banner/${bannerIdToFetch}`, {
//         headers: {
//           apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//           Authorization: `Bearer ${accessToken}`,
//         },
//       })
//       .then((res) => {
//         console.log("fetchBannerById sukses");
//         // setUpdateBanner(res.data.data);
//       })
//       .catch((err) => {
//         console.log("fetchBannerById eror", err);
//       });
//   };

//   return (
//     <div>
//       <h1>Banner Manager</h1>
//       <div>
//         <h3>Create New Banner</h3>
//         <input
//           type="text"
//           placeholder="Name"
//           value={newBanner.name}
//           onChange={(e) => setNewBanner({ ...newBanner, name: e.target.value })}
//         />
//         <input
//           type="text"
//           placeholder="Image Url"
//           value={newBanner.imageUrl}
//           onChange={(e) => setNewBanner({ ...newBanner, imageUrl: e.target.value })}
//         />
//         <button onClick={createBanner}>Create</button>
//       </div>

//       <div>
//         <h3>Update Banner</h3>
//         <input
//           type="text"
//           placeholder="Banner Id"
//           value={updateBanner.id}
//           onChange={(e) => setUpdateBanner({ ...updateBanner, id: e.target.value })}
//         />
//         <input
//           type="text"
//           placeholder="Name"
//           value={updateBanner.name}
//           onChange={(e) => setUpdateBanner({ ...updateBanner, name: e.target.value })}
//         />
//         <input
//           type="text"
//           placeholder="Image Url"
//           value={updateBanner.imageUrl}
//           onChange={(e) => setUpdateBanner({ ...updateBanner, imageUrl: e.target.value })}
//         />
//         <button onClick={updateBannerById}>Update</button>
//       </div>

//       <div>
//         <h3>Delete Banner</h3>
//         <input
//           type="text"
//           placeholder="Banner Id"
//           value={bannerIdToDelete}
//           onChange={(e) => setBannerIdToDelete(e.target.value)}
//         />
//         <button onClick={deleteBannerById}>Delete</button>
//       </div>

//       <div>
//         <h3>Fetch Banner by Id</h3>
//         <input
//           type="text"
//           placeholder="Banner Id"
//           value={bannerIdToFetch}
//           onChange={(e) => setBannerIdToFetch(e.target.value)}
//         />
//         <button onClick={fetchBannerById}>Fetch</button>
//       </div>

//       <div>
//         <h3>All Banners</h3>
//         {banners.map((banner) => (
//           <li key={banner.id}>
//             {banner.name}
//           </li>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BannerManager;
