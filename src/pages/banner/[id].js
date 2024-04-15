// import React, { useState } from "react";
import axios from "axios";
// import PopupUpdateBanner from "@/components/PopupUpdateBanner";
import useDeleteBanner from "@/hooks/useDeleteBanner";
import { useRouter } from "next/router";
import FormDeleteBanner from "@/components/FormDeleteBanner";

export async function getServerSideProps(context) {
    try {
      const resp = await axios.get(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/banner/${context.params.id}`, {
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
        },
      });
  
      return { props: { banner: resp.data.data } };
    } catch (error) {
      console.error("Error fetching banner:", error);
      return { props: { banner: null } };
    }
  }


// export async function getServerSideProps(context) {
//     const banner = await getBannerById(context.params.id);
//     return { props: { banner } };
// }

export default function BannerById({ banner }) {
  //   const [buttonPopupUpdateBanner, setButtonPopupUpdateBanner] = useState(false);
  const { del, loading } = useDeleteBanner();
  const router = useRouter();

  const handleDeleteBanner = async () => {
    del(`/delete-banner/${banner?.id}`);
    router.push("/banner");
  };

  return (
    <div className="banner">
      <div>
        <img src={banner?.imageUrl} alt={banner?.name} />
        <h1>This is {banner?.name} Banner</h1>
      </div>

      <button onClick={() => PopupUpdateBanner(true)}>Update/Edit </button>
      {/* <PopupUpdateBanner trigger={buttonPopupUpdateBanner} setTrigger={setButtonPopupUpdateBanner}>
        Edit
      </PopupUpdateBanner> */}

      <div>
        <FormDeleteBanner title={`Delete ${banner?.name} ?`} onDelete={handleDeleteBanner} loading={loading} />
      </div>
    </div>
  );
}

// batas
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const BannerComponent = ({ id }) => {
//   const [bannerData, setBannerData] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/banner/${id}`,
//           {
//             headers: {
//               apiKey: `24405e01-fbc1-45a5-9f5a-be13afcd757c`,
//             },
//           }
//         );
//         setBannerData(response.data);
//       } catch (error) {
//         setError(error.message || 'An error occurred while fetching banner data.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();

//   }, [id]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div>
//       {bannerData && (
//         <div>
//           <h2>{bannerData.name}</h2>
//           <img src={bannerData.imageUrl} alt={bannerData.name} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default BannerComponent;
