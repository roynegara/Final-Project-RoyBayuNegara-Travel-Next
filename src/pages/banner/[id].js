import React, { useState, useEffect } from "react";
import axios from "axios";
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
export default function BannerById({ banner }) {
  const { del, loading } = useDeleteBanner();
  const { pos, loadingEditBanner } = useEditBanner();
  const router = useRouter();

  const handleDeleteBanner = () => {
    del(`/delete-banner/${banner?.id}`)
      .then((res) => {
        toast.success(`${banner?.name} has been deleted`);
        setTimeout(() => {
          router.push("/banner");
        }, 1000);
      })
      .catch((err) => {
        console.log("resDeleteBannerErr", err);
        toast.error(err?.response?.data?.message);
      });
  };

  const handleEditBanner = ({ name, imageUrl, file }) => {
    pos(`/update-banner/${banner?.id}`, { name, imageUrl })
      .then((res) => {
        toast.success(`${banner?.name} has been edited`);
        setTimeout(() => {
          router.push(`/banner/${banner?.id}`);
          setPopupOpenEdit(false);
        }, 1000);
      })
      .catch((err) => {
        console.log("resEditBannerErr", err);

        if (
          err?.response?.data?.errors &&
          err?.response?.data?.errors?.length > 0 &&
          err.response.data.errors[0].message
        ) {
          toast.error(err.response?.data?.errors[0].message);
        } else {
          toast.error(err?.response?.data?.message);
        }
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

  let bannerName = `This is ${banner?.name} Banner`;
  let upperCaseBannerName = bannerName.toUpperCase();

  return (
    <div className="bannerid">
      <div className="bannerid-card-home">
        <h1>{upperCaseBannerName}</h1>
        <img src={banner?.imageUrl} alt={banner?.name} />
      </div>

      <div>
        {/* <button onClick={togglePopupEdit}>Edit Banner {banner?.name}</button> */}
        {isPopupOpenEdit && (
          <div className="popup-edit-banner">
            <button className="btn-close-popup-edit-banner" onClick={togglePopupEdit}>
              X
            </button>
            <pre>
              <code>
                {
                  <div>
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
        {/* <button onClick={togglePopupDelete}>Delete {banner?.name}</button> */}
        {isPopupOpenDelete && (
          <div>
            <div className="popup-delete-banner">
              <div></div>
              <div>
                <p>Are you sure you want to delete {banner?.name} ?</p>
              </div>

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
      <div className="bannerid-card-home">
        <button onClick={() => router.back()}>Back</button>
      </div>
    </div>
  );
}
