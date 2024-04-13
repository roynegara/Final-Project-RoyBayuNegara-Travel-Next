import React, { useEffect, useState } from "react";
import axios from "axios";

export async function getServerSideProps(context) {
  const resp = await axios.get(
    `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/banner/${context.params.id}`,
    {
      headers: { apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c", keyWord: "Dibimbing API key" },
    }
  );
  return { props: { banner: resp.data.data } };
}

export default function BannerById({ banner }) {
  return (
    <div className="banner">
      <img src={banner.imageUrl} alt={banner.name} />
      <h1>This is {banner.name} Banner</h1>
      {/* <h3>{banner.createdAt}</h3>
            <h3>{banner.updatedAt}</h3> */}
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
