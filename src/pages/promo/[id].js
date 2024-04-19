import React, { useEffect, useState } from "react";
import axios from "axios";
import useDeletePromo from "@/hooks/useDeletePromo";
import FormDeletePromo from "@/components/FormDeletePromo";
import { useRouter } from "next/router";
import { toast } from "sonner";

import FormEditPromo from "@/components/FormEditPromo";
import useEditPromo from "@/hooks/useEditPromo";

export async function getServerSideProps(context) {
  try {
    const resp = await axios.get(
      `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promo/${context.params.id}`,
      {
        headers: { apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c", keyWord: "Dibimbing API key" },
      }
    );
    return { props: { promo: resp.data.data } };
  } catch (error) {
    console.error("Error fetching promo:", error);
    return { props: { promo: null } };
  }
}

export default function PromoById({ promo }) {
  const { del, loading } = useDeletePromo();
  const { pos, loadingEditPromo } = useEditPromo();
  // const [notif, setNotif] = useState(null);

  const router = useRouter();

  const handleDeletePromo = () => {
    del(`/delete-promo/${promo?.id}`)
      .then((res) => {
        setNotif("Promo deleted successfully");
        setTimeout(() => {
          router.push("/promo");
        }, 1000);
      })
      .catch((err) => {
        console.log("resDeletePromoErr", err);
        setNotif(err?.response?.data?.message);
      });
  };

  const handleEditPromo = ({
    title,
    description,
    imageUrl,
    terms_condition,
    promo_code,
    promo_discount_price,
    minimum_claim_price,
  }) => {
    pos(`/update-promo/${promo?.id}`, {
      title,
      description,
      imageUrl,
      terms_condition,
      promo_code,
      promo_discount_price,
      minimum_claim_price,
    })
      .then((res) => {
        // setNotif("Promo updated successfully");
        toast.success(`${promo?.title} has been edited`);
        setTimeout(() => {
          router.push("/promo");
        }, 1000);
      })
      .catch((err) => {
        console.log("resEditPromoErr", err);

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
    <div className="promo">
      <div>
        <h1>{promo.title}</h1>
        <img src={promo?.imageUrl} alt={promo?.title} />
        <h1>This is {promo?.title} Promo</h1>
      </div>

      <div>
        <h1>Promo Code : {promo.promo_code}</h1>
      </div>
      <div>
        <h2> Minimum Claim Price : {promo.minimum_claim_price}</h2>
        <h2> Promo Discount Price : {promo.promo_discount_price}</h2>
      </div>
      <div>
        <h2>Read The Term and Condition : {promo.terms_condition}</h2>
      </div>

      <div>
        <button onClick={togglePopupEdit}> Edit Promo {promo?.title}</button>
        {isPopupOpenEdit && (
          <div className="popup-edit-promo">
            <button className="btn-close-popup-edit-promo" onClick={togglePopupEdit}>
              X
            </button>
            <FormEditPromo
              title={`Edit ${promo?.title} Promo ?`}
              defaultName={promo?.title}
              defaultDescription={promo?.description}
              defaultImageUrl={promo?.imageUrl}
              defaultTerms_condition={promo?.terms_condition}
              defaultPromo_code={promo?.promo_code}
              defaultPromo_discount_price={promo?.promo_discount_price}
              defaultMinimum_claim_price={promo?.minimum_claim_price}
              onEdit={handleEditPromo}
              loading={loadingEditPromo}
            />
          </div>
        )}
      </div>

      <div>
        <button onClick={togglePopupDelete}>Delete {promo?.title}</button>
        {isPopupOpenDelete && (
          <div>
            <div className="popup-delete-promo">
              <div></div>
              <div>
                <p>Are you sure you want to delete {promo?.title} ?</p>
              </div>
              <div className="popup-delete-promo-btn-yes">
                <FormDeletePromo title={`Yes`} onDelete={handleDeletePromo} loading={loading} />
              </div>
              <div className="popup-delete-promo-btn-no">
                <button className="btn-close-popup-delete-promo" onClick={togglePopupDelete}>
                  Tidak
                </button>
              </div>
            </div>
          </div>
        )}

        {/* {notif && <p style={{ color: notif === "Promo deleted successfully" ? "green" : "red" }}>{notif}</p>} */}
        {/* <FormDeletePromo title={`Delete ${promo?.title} ?`} onDelete={handleDeletePromo} loading={loading} /> */}
      </div>
    </div>
  );
}
