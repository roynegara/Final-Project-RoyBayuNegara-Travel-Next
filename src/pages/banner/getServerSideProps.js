import axios from "axios";

export async function getBannerById(id) {
  const resp = await axios.get(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-banner/${id}`, {
    headers: { apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c" },
  });
  return resp?.data?.data;
}


// import axios from "axios";

// export async function getServerSideProps(context) {
//   const resp = await axios.get(
//     `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-banner/${context.params.id}`,
//     {
//       headers: { apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c" },
//     }
//   );
//   return { props: { banner: resp?.data?.data } };
// }
