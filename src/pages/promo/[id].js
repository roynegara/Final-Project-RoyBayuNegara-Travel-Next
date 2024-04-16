import React, { useEffect, useState } from "react";
import axios from "axios";
import useDeletePromo from "@/hooks/useDeletePromo";
import FormDeletePromo from "@/components/FormDeletePromo";
import { useRouter } from "next/router";

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
  const router = useRouter();
  const { del, loading } = useDeletePromo();
  const [notif, setNotif] = useState(null);

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

  return (
    <div className="promo">
      <div>
        <h1>{promo.title}</h1>
        <img src={promo?.imageUrl} alt={promo?.name} />
        <h1>This is {promo?.name} Banner</h1>
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
        {notif && <p style={{ color: notif === "Promo deleted successfully" ? "green" : "red" }}>{notif}</p>}
        <FormDeletePromo title={`Delete ${promo?.title} ?`} onDelete={handleDeletePromo} loading={loading} />
      </div>
    </div>
  );
}