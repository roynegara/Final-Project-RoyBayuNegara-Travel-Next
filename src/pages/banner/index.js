// sdh benar
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner"; // Menggunakan react-toastify
import PopupCreateBanner from "@/components/PopupCreateBanner";
import Link from "next/link";

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const [buttonPopupCreateBanner, setButtonPopupCreateBanner] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [deletingBanner, setDeletingBanner] = useState(null);
  const [editName, setEditName] = useState("");
  const [file, setFile] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleUpload = () => {
    if (!file && !editName) {
      toast.info("Empty name and image not selected");
      return;
    } else if (!editName) {
      toast.info("Empty name ");
      return;
    } else if (!file) {
      toast.info("Select an image");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k`,
        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
      },
    };

    axios
      .post("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image", formData, config)
      .then((res) => {
        console.log(res);
        setImageUrl(res.data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getBanners = () => {
    axios
      .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/banners", {
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
        },
      })
      .then((res) => {
        console.log("res", res);
        setBanners(res.data.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    getBanners();
  }, []);

  const updateBannerData = () => {
    getBanners();
  };

  const handleEditBanner = (banner) => {
    setEditingBanner(banner);
    setEditName(banner.name);
  };

  const handleDeleteBanner = (banner) => {
    setDeletingBanner(banner);
  };

  const confirmDelete = () => {
    const accessToken = localStorage.getItem("access_token");
    axios
      .delete(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-banner/${deletingBanner.id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
        },
      })
      .then((res) => {
        console.log("Delete success:", res);
        setDeletingBanner(null);
        updateBannerData();
        toast.success(`${deletingBanner.name} has been deleted`);
      })
      .catch((err) => {
        console.error("Delete error:", err);
        toast.error(err.response.data.message);
      });
  };

  const handleSaveEdit = () => {
    if (imageUrl) {
      const accessToken = localStorage.getItem("access_token");
      axios
        .post(
          `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-banner/${editingBanner.id}`,
          {
            name: editName,
            imageUrl: imageUrl,
          },
          {
            headers: {
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((res) => {
          console.log("Edit success:", res);
          setEditingBanner(null);
          setEditName("");
          updateBannerData();
          setImageUrl(res?.data?.url);
          toast.success(`${editingBanner.name} has been updated`);
        })
        .catch((err) => {
          console.error("Edit error:", err);
        });
    }
  };

  useEffect(() => {
    if (imageUrl) {
      handleSaveEdit();
    }
  }, [imageUrl]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className="banners-main">
      <div className={`${buttonPopupCreateBanner || deletingBanner || editingBanner ? "blur" : ""}`}>
        <h1 className="banners-title">Banner Database</h1>

        {isLoggedIn && (
          <div className="banners-btn-popup-create">
            <button onClick={() => setButtonPopupCreateBanner(true)}>Add Banner</button>
          </div>
        )}

        <div className="banners">
          {banners.map((banner, index) => (
            <div key={index}>
              <div className="banners-card">
                <Link href={`/banner/${banner.id}`}>
                  <img src={banner.imageUrl} alt={banner.name} />
                </Link>
                <h2>{banner.name.toUpperCase()}</h2>
                {isLoggedIn && (
                  <div>
                    <button onClick={() => handleEditBanner(banner)}>Edit</button>
                    <button onClick={() => handleDeleteBanner(banner)}>Delete</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {editingBanner && (
        <div className="popup-create-banner-wrap">
          <div className="popup-create-banner">
            <h2>Edit Banner</h2>

            <div className="input-box-create-banner">
              <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} placeholder="Name" />
            </div>

            <div className="input-box-create-banner">
              <input type="file" onChange={(e) => setFile(e.target.files[0])} placeholder="Image URL" />
            </div>

            <div className="btn-create-banner-popup">
              <button onClick={handleUpload}>Edit Banner</button>
            </div>

            <span className="btn-close-popup-create-banner" onClick={() => setEditingBanner(null)}>
              &times;
            </span>
          </div>
        </div>
      )}

      {deletingBanner && (
        <div className="popup-delete-banner-wrap">
          <div className="popup-delete-banner">
            <p>Are you sure you want to delete {deletingBanner.name}?</p>
            <div className="btn-delete-banner-popup">
              <button onClick={confirmDelete}>Yes</button>
              <button onClick={() => setDeletingBanner(null)}>No</button>
            </div>
          </div>
        </div>
      )}

      {buttonPopupCreateBanner && (
        <PopupCreateBanner
          trigger={buttonPopupCreateBanner}
          setTrigger={setButtonPopupCreateBanner}
          updateBannerData={updateBannerData}
        />
      )}
    </div>
  );
};

export default Banner;
