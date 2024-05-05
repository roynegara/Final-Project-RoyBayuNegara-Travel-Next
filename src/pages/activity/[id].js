import React, { useEffect, useState } from "react";
import axios from "axios";
import useDeleteActivity from "@/hooks/useDeleteActivity";
import FormDeleteActivity from "@/components/FormDeleteActivity";
import { useRouter } from "next/router";
import { toast } from "sonner";
import FormEditActivity from "@/components/FormEditActivity";
import useEditActivity from "@/hooks/useEditActivity";

export async function getServerSideProps(context) {
  try {
    const resp = await axios.get(
      `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activity/${context.params.id}`,
      {
        headers: { apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c", keyWord: "Dibimbing API key" },
      }
    );
    return { props: { activity: resp.data.data } };
  } catch (error) {
    console.error("Error fetching activity:", error);
    return { props: { activity: null } };
  }
}

export default function ActivityById({ activity }) {
  const { del, loading } = useDeleteActivity();
  const { pos, loadingEditActivity } = useEditActivity();
  const router = useRouter();

  const handleDeleteActivity = () => {
    del(`/delete-activity/${activity?.id}`)
      .then((res) => {
        toast.success(`${activity?.title} has been deleted`);
        setTimeout(() => {
          router.push("/activity");
        }, 1000);
      })
      .catch((err) => {
        console.log("resDeleteActivityErr", err);
        toast.error(err?.response?.data?.message);
      });
  };

  const handleEditActivity = ({
    categoryId,
    title,
    description,
    imageUrls,
    price,
    price_discount,
    rating,
    total_reviews,
    facilities,
    address,
    province,
    city,
    location_maps,
  }) => {
    pos(`/update-activity/${activity?.id}`, {
      categoryId,
      title,
      description,
      imageUrls,
      price,
      price_discount,
      rating,
      total_reviews,
      facilities,
      address,
      province,
      city,
      location_maps,
    })
      .then((res) => {
        toast.success(`${activity?.title} has been updated`);
        setTimeout(() => {
          router.push(`/activity/${activity?.id}`);
          setPopupOpenEdit(false);
        }, 1000);
      })
      .catch((err) => {
        console.log("resEditActivityErr", err);
        if (
          err?.response?.data?.errors &&
          err?.response?.data?.errors.length > 0 &&
          err.response.data.errors[0].message
        ) {
          toast.error(err.response.data.errors[0].message);
        } else {
          toast.error(err?.response?.data?.message);
        }
      });
  };

  if (!activity) {
    return (
      <div>
        <h1>No Activity or Destination Here</h1>
        <button onClick={() => router.push("/activity")}>Back to Activity/Destination</button>
      </div>
    );
  }

  const [isPopupOpenEdit, setPopupOpenEdit] = useState(false);
  const togglePopupEdit = () => {
    setPopupOpenEdit(!isPopupOpenEdit);
  };

  const [isPopupOpenDelete, setPopupOpenDelete] = useState(false);
  const togglePopupDelete = () => {
    setPopupOpenDelete(!isPopupOpenDelete);
  };

  return (
    <div className="activityid">
      <div className="activityid-card-home">
        <div>
          <h1>{activity.title}</h1>
          <img
            src={activity.imageUrls?.[0] && activity.imageUrls?.[1] ? activity.imageUrls?.[1] : activity.imageUrls?.[0]}
            alt={activity.name}
          />
        </div>

        <div>
          <h3>{activity.description}</h3>
          <h2>Address : {activity.address}</h2>
          <h2>City : {activity.city}</h2>
          <h2>Facilities : {activity.facilities}</h2>
          <h2>Price : {activity.price}</h2>
          <h2> Proce Discount : {activity.price_discount}</h2>
          <h2> Rating : {activity.rating}</h2>
          <h2>Total Review : {activity.total_reviews}</h2>
        </div>
      </div>

      <div>
        {/* <button onClick={togglePopupEdit}>Edit Destination {activity?.title}</button> */}
        {isPopupOpenEdit && (
          <div className="popup-edit-activity">
            <button className="btn-close-popup-edit-activity" onClick={togglePopupEdit}>
              X
            </button>
            <FormEditActivity
              defaultCategoryId={activity?.categoryId}
              title={` Edit ${activity?.title} Destination ?`}
              defaultName={activity?.title}
              defaultDescription={activity?.description}
              defaultImageUrls={activity?.imageUrls}
              defaultPrice={activity?.price}
              defaultPrice_Discount={activity?.price_discount}
              defaultRating={activity?.rating}
              defaultTotal_Reviews={activity?.total_reviews}
              defaultFacilities={activity?.facilities}
              defaultAddress={activity?.address}
              defaultProvince={activity?.province}
              defaultCity={activity?.city}
              defaultLocation_Maps={activity?.location_maps}
              onEdit={handleEditActivity}
              loading={loadingEditActivity}
            />
          </div>
        )}
      </div>

      <div>
        {/* <button onClick={togglePopupDelete}>Delete {activity?.title}</button> */}
        {isPopupOpenDelete && (
          <div className="popup-delete-activity">
            <div></div>
            <div>
              <p>Are you sure you want to delete {activity?.title} ?</p>
            </div>

            <div className="popup-delete-activity-btn-yes">
              <FormDeleteActivity title={`Yes`} onDelete={handleDeleteActivity} loading={loading} />
            </div>

            <div className="popup-delete-activity-btn-no">
              <button onClick={togglePopupDelete}>Tidak</button>
            </div>
          </div>
        )}
      </div>
      <div>
        <button onClick={() => router.back()}>Back</button>
      </div>
    </div>
  );
}
