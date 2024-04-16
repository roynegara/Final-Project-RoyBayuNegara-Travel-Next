import React, { useEffect, useState } from "react";
import axios from "axios";

import FormDeleteCategory from "@/components/FormDeleteCategory";
import { useRouter } from "next/router";
import useDeleteCategory from "@/hooks/useDeleteCategory";

export async function getServerSideProps(context) {
  try {
    const resp = await axios.get(
      `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/category/${context.params.id}`,
      {
        headers: { apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c", keyWord: "Dibimbing API key" },
      }
    );
    return { props: { category: resp.data.data } };
  } catch (error) {
    console.error("Error fetching category:", error);
    return { props: { category: null } };
  }
}

export default function CategoryById({ category }) {
  const { del, loading } = useDeleteCategory();
  const router = useRouter();
  const [notif, setNotif] = useState(null);

  const handleDeleteCategory = () => {
    del(`/delete-category/${category?.id}`)
      .then((res) => {
        setNotif("Category deleted successfully");
        setTimeout(() => {
          router.push("/category");
        }, 1000);
      })
      .catch((err) => {
        console.log("resDeleteCategoryErr", err);
        setNotif(err?.response?.data?.message);
      });
  };

  return (
    <div className="category">
      <div>
        <img src={category?.imageUrl} alt={category?.name} />
        <h3>{category?.id}</h3>
        <h1>This is {category?.name} Category</h1>
      </div>

      <div>
        {notif && <p style={{ color: notif === "Category deleted successfully" ? "green" : "red" }}>{notif}</p>}
        <FormDeleteCategory title={`Delete ${category?.name} ?`} onDelete={handleDeleteCategory} loading={loading} />
      </div>
    </div>
  );
}
