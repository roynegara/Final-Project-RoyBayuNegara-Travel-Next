import React, { useEffect, useState } from "react";
import axios from "axios";

import FormDeleteCategory from "@/components/FormDeleteCategory";
import { useRouter } from "next/router";
import useDeleteCategory from "@/hooks/useDeleteCategory";

import FormEditCategory from "@/components/FormEditCategory";
import useEditCategory from "@/hooks/useEditCategory";

import { toast } from "sonner";

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
  const { pos, loadingEditCategory } = useEditCategory();

  const router = useRouter();
  // const [notif, setNotif] = useState(null);

  const handleDeleteCategory = () => {
    del(`/delete-category/${category?.id}`)
      .then((res) => {
        // setNotif("Category deleted successfully");
        toast.success(`${category?.name} has been deleted`);
        // setTimeout(() => {
        //   router.push("/category");
        // }, 1000);
      })
      .catch((err) => {
        console.log("resDeleteCategoryErr", err);
        // setNotif(err?.response?.data?.message);
        toast.error(err?.response?.data?.message);
      });
  };

  const handleEditCategory = ({ name, imageUrl }) => {
    pos(`/update-category/${category?.id}`, { name, imageUrl })
      .then((res) => {
        toast.success(`${category?.name} has been edited`);
        setTimeout(() => {
          router.push("/category");
        }, 1000);
      })
      .catch((err) => {
        console.log("resEditCategoryErr", err);
        if (
          err?.response?.data?.errors &&
          err?.response?.data?.errors?.length > 0 &&
          err?.response?.data?.errors[0].message
        ) {
          toast.error(err.response?.data?.errors[0].message);
        } else {
          toast.error(err.response?.data?.message);
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

  return (
    <div className="category">
      <div>
        <img src={category?.imageUrl} alt={category?.name} />
        <h3>{category?.id}</h3>
        <h1>This is {category?.name} Category</h1>
      </div>

      <div>
        <button onClick={togglePopupEdit}>Edit Category {category?.name}</button>
        {isPopupOpenEdit && (
          <div className="popup-edit-category">
            <button className="btn-close-popup-edit-category" onClick={togglePopupEdit}>
              X
            </button>
            <FormEditCategory
              title={`Edit ${category?.name} Category ?`}
              defaultName={category?.name}
              defaultImageUrl={category?.imageUrl}
              onEdit={handleEditCategory}
              loadingEditCategory={loadingEditCategory}
            />
          </div>
        )}
      </div>

      <div>
        <button onClick={togglePopupDelete}>Delete {category?.name}</button>
        {isPopupOpenDelete && (
          <div>
            <div className="popup-delete-category">
              <div></div>
              <div>
                <p>Are you sure you want to delete {category?.name} ?</p>
              </div>
            

            <div className="popup-delete-category-btn-yes">
              <FormDeleteCategory
                title={`Delete ${category?.name} ?`}
                onDelete={handleDeleteCategory}
                loading={loading}
              />
            </div>

            <div className="popup-delete-category-btn-no">
              <button className="btn-close-popup-delete-category" onClick={togglePopupDelete}>
                Tidak
              </button>
              </div>
              
              
            </div>
            </div>
        )}
        {/* {notif && <p style={{ color: notif === "Category deleted successfully" ? "green" : "red" }}>{notif}</p>} */}
      </div>
    </div>
  );
}
