import React, { useState } from "react";
import axios from "axios";
// import PopupUpdateBanner from "@/components/PopupUpdateBanner";
import useDeleteBanner from "@/hooks/useDeleteBanner";
import { useRouter } from "next/router";
import FormDeleteBanner from "@/components/FormDeleteBanner";

import FormEditBanner from "@/components/FormEditBanner";
import useEditBanner from "@/hooks/useEditBanner";

import { toast } from "sonner";

export async function getServerSideProps(context) {
  try {
    const resp = await axios.get(
      `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/banner/${context.params.id}`,
      {
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
        },
      }
    );

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
  // const [buttonPopupUpdateBanner, setButtonPopupUpdateBanner] = useState(false);
  const { del, loading } = useDeleteBanner();
  const { pos, loadingEditBanner } = useEditBanner();

  const router = useRouter();
  // const [notifEdit, setNotifEdit] = useState(null);
  // const [notifDelete, setNotifDelete] = useState(null);

  const handleDeleteBanner = () => {
    del(`/delete-banner/${banner?.id}`)
      .then((res) => {
        toast.success(`${banner?.name} has been deleted`);
        // setNotifDelete("Banner deleted successfully");
        setTimeout(() => {
          router.push("/banner");
        }, 1000);
      })
      .catch((err) => {
        console.log("resDeleteBannerErr", err);
        // setNotifDelete(err?.response?.data?.message);
        toast.error(err?.response?.data?.message);
      });
  };

  const handleEditBanner = ({ name, imageUrl }) => {
    pos(`/update-banner/${banner?.id}`, { name, imageUrl })
      .then((res) => {
        toast.success(`${banner?.name} has been edited`);
        // setNotifEdit("Banner edited successfully");
        setTimeout(() => {
          router.push("/banner");
        }, 1000);
      })
      .catch((err) => {
        console.log("resEditBannerErr", err);
        
        if (
          err?.response?.data?.errors &&
          err?.response?.data?.errors.length > 0 &&
          err.response.data.errors[0].message
        ) {
          toast.error(err.response.data.errors[0].message);
        } else {
          toast.error(err?.response?.data?.message);
        }  
        // toast.error(err?.response?.data?.message);
        // setNotifEdit(err?.response?.data?.message);
      });
  };

  const [isPopupOpenEdit, setPopupOpenEdit] = useState(false);
  const togglePopupEdit = () => {
    setPopupOpenEdit(!isPopupOpenEdit);
  };

  const [isPopupOpenDelete, setPopupOpenDelete] = useState(false);
  const togglePopupDelete = () => {
    setPopupOpenDelete(!isPopupOpenDelete);
  };

  return (
    <div className="banner">
      <div>
        <img src={banner?.imageUrl} alt={banner?.name} />
        <h1>This is {banner?.name} Banner</h1>
      </div>

      {/* <div>
        { notif && <p style={{ color: notif === "Banner edited successfully" ? "green" : "red" }}>{notif}</p> }
        <FormEditBanner title={`Edit ${banner?.name} Banner ?`} defaultName={banner?.name}  defaultImageUrl={banner?.imageUrl} onEdit={handleEditBanner} loading={loadingEditBanner} />
      </div> */}

      <div>
        <button onClick={togglePopupEdit}>Edit Banner {banner?.name}</button>
        {isPopupOpenEdit && (
          <div className="popup-edit-banner">
            <button className="btn-close-popup-edit-banner" onClick={togglePopupEdit}>
              X
            </button>
            <pre>
              <code>
                {
                  <div>
                    {/* {notifEdit && (
                      <p style={{ color: notifEdit === "Banner edited successfully" ? "green" : "red" }}>{notifEdit}</p>
                    )} */}
                    <FormEditBanner
                      title={`Edit ${banner?.name} Banner ?`}
                      defaultName={banner?.name}
                      defaultImageUrl={banner?.imageUrl}
                      onEdit={handleEditBanner}
                      loading={loadingEditBanner}
                    />
                  </div>
                }
              </code>
            </pre>
          </div>
        )}
      </div>

      <div>
        
        <button onClick={togglePopupDelete}>Delete {banner?.name}</button>
        {isPopupOpenDelete && (
          <div>
          
            
            <div className="popup-delete-banner">
               <div>
            {/* {notifDelete && (
            <p style={{ color: notifDelete === "Banner deleted successfully" ? "green" : "red" }}>{notifDelete}</p>
          )} */}
            </div>
            <div><p>Are you sure you want to delete {banner?.name} ?</p></div>
           

            <div className="popup-delete-banner-btn-yes">              
              
              <FormDeleteBanner title={`Ya`} onDelete={handleDeleteBanner} loading={loading} />
            </div>
            <div className="popup-delete-banner-btn-no">
              <button className="btn-close-popup-delete-banner" onClick={togglePopupDelete}>
                Tidak
              </button>
            </div>
            </div>
          </div>
          
        )}
      </div>
    </div>
  );
}

// // bias popup namun masih eror 505 ketika update banner
// import React, { useState } from "react";
// import axios from "axios";
// import PopupUpdateBanner from "@/components/PopupUpdateBanner";
// import useDeleteBanner from "@/hooks/useDeleteBanner";
// import { useRouter } from "next/router";
// import FormDeleteBanner from "@/components/FormDeleteBanner";

// export async function getServerSideProps(context) {
//   try {
//     const resp = await axios.get(
//       `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/banner/${context.params.id}`,
//       {
//         headers: {
//           apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//         },
//       }
//     );

//     return { props: { banner: resp.data.data } };
//   } catch (error) {
//     console.error("Error fetching banner:", error);
//     return { props: { banner: null } };
//   }
// }

// // export async function getServerSideProps(context) {
// //     const banner = await getBannerById(context.params.id);
// //     return { props: { banner } };
// // }

// export default function BannerById({ banner }) {
//     const [buttonPopupUpdateBanner, setButtonPopupUpdateBanner] = useState(false);
//   const { del, loading } = useDeleteBanner();
//   const router = useRouter();
//   const [notif, setNotif] = useState(null);

//   const handleDeleteBanner = () => {
//     del(`/delete-banner/${banner?.id}`)
//         .then((res) => {
//         setNotif('Banner deleted successfully');
//         setTimeout(() => {
//           router.push("/banner");
//         }, 1000);
//       })
//         .catch((err) => {
//           console.log('resDeleteBannerErr', err)
//         setNotif(err?.response?.data?.message);
//       });
//   };

//   return (
//     <div className="banner">
//       <div>
//         <img src={banner?.imageUrl} alt={banner?.name} />
//         <h1>This is {banner?.name} Banner</h1>
//       </div>

//       <button onClick={() => setButtonPopupUpdateBanner(true)}>Edit This {banner?.name} Banner</button>
//       <PopupUpdateBanner trigger={buttonPopupUpdateBanner} setTrigger={setButtonPopupUpdateBanner} >

//       </PopupUpdateBanner>

//       <div>
//               {/* {notif && <div className={`notif ${notif.type}`}>{notif.message}</div>} */}
//               {/* {notif && <p style={{ color: "red" }}>{notif}</p>} */}
//               {notif && <p style={{ color: notif === "Banner deleted successfully" ? "green" : "red" }}>{notif}</p>}
//         <FormDeleteBanner title={`Delete ${banner?.name} ?`} onDelete={handleDeleteBanner} loading={loading} />
//       </div>
//     </div>
//   );
// }

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
