import React, { useState, useEffect } from "react";
import axios from "axios";
import PopupCreatePromo from "@/components/PopupCreatePromo";
import { toast } from "sonner";
import Link from "next/link";

const Promo = () => {
  const [promos, setPromos] = useState([]);
  const [buttonPopupCreatePromo, setButtonPopupCreatePromo] = useState(false);
  const [editingPromo, setEditingPromo] = useState(null);
  const [deletingPromo, setDeletingPromo] = useState(null);
  const [editName, setEditName] = useState("");
  const [description, setDescription] = useState("");
  const [terms_condition, setTerms_condition] = useState("");
  const [promo_code, setPromo_code] = useState("");
  const [promo_discount_price, setPromo_discount_price] = useState("");
  const [minimum_claim_price, setMinimum_claim_price] = useState("");
  const [file, setFile] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleUpload = () => {
    const fields = [
      { name: "editName", label: "name" },
      { name: "file", label: "image" },
      { name: "description", label: "description" },
      { name: "terms_condition", label: "terms and conditions" },
      { name: "promo_code", label: "promo code" },
      { name: "promo_discount_price", label: "promo discount price" },
      { name: "minimum_claim_price", label: "minimum claim price" },
    ];

    let emptyFields = [];
    fields.forEach((field) => {
      if (!eval(field.name)) {
        // Using eval here for simplicity, though it's generally not recommended
        emptyFields.push(field.label);
      }
    });

    if (emptyFields.length > 0) {
      toast.info(
        `Failed to edit promo because ${emptyFields.join(", ")} ${emptyFields.length > 1 ? "are" : "is"} empty`
      );
      return;
    } else if (!file) {
      toast.info("Please select an image");
      return;
    } else {
      // Edit promo successful
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

  const getPromos = () => {
    axios
      .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos", {
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
        },
      })
      .then((res) => {
        console.log("res", res);
        setPromos(res.data.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  useEffect(() => {
    getPromos();
  }, []);

  const updatePromoData = () => {
    getPromos();
  };

  const handleEditPromo = (promo) => {
    setEditingPromo(promo);
    setEditName(promo.title);
    setDescription(promo.description);
    setTerms_condition(promo.terms_condition);
    setPromo_code(promo.promo_code);
    setPromo_discount_price(promo.promo_discount_price);
    setMinimum_claim_price(promo.minimum_claim_price);
  };

  const handleDeletePromo = (promo) => {
    setDeletingPromo(promo);
  };

  const confirmDelete = () => {
    const accessToken = localStorage.getItem("access_token");
    axios
      .delete(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-promo/${deletingPromo.id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
        },
      })
      .then((res) => {
        console.log("promo delete success", res);
        setDeletingPromo(null);
        updatePromoData();
        toast.success(res?.data?.message);
      })
      .catch((err) => {
        console.log("promo delete error", err);
        toast.error(err?.response?.data?.message);
      });
  };

  const handleSaveEdit = () => {
    if (imageUrl) {
      const accessToken = localStorage.getItem("access_token");
      axios
        .post(
          `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-promo/${editingPromo.id}`,
          {
            title: editName,
            imageUrl: imageUrl,
            description: description,
            terms_condition: terms_condition,
            promo_code: promo_code,
            promo_discount_price: promo_discount_price,
            minimum_claim_price: minimum_claim_price,
          },
          {
            headers: {
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )

        .then((res) => {
          console.log("promo edit success", res);
          setEditingPromo(null);
          setEditName("");
          setDescription("");
          setTerms_condition("");
          setPromo_code("");
          setPromo_discount_price("");
          setMinimum_claim_price("");
          setImageUrl("");
          updatePromoData();
          toast.success(`Updated ${editingPromo.title}  successfully`);
        })
        .catch((err) => {
          console.log("promo Edit error", err);          
        });
    }
  };

  useEffect(() => {
    if (imageUrl && editingPromo) {
      handleSaveEdit();
      setFile(""); 
    }
  }, [imageUrl]);

  useEffect(() => {   
    if (!editingPromo) {
      setEditName("");
      setDescription("");
      setTerms_condition("");
      setPromo_code("");
      setPromo_discount_price("");
      setMinimum_claim_price("");
      setImageUrl("");
      setFile("");
    }
  }, [editingPromo]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {   
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div>
      <div className={`${buttonPopupCreatePromo || editingPromo || deletingPromo ? "blur" : ""}`}>
        <h1 className="promos-title">Promo Database</h1>

        {isLoggedIn && (
          <div className="promos-btn-popup-create">
            <button onClick={() => setButtonPopupCreatePromo(true)}>Add Promo</button>
          </div>
        )}

        <div className="promos">
          {promos.map((promo, index) => (
            <div key={index}>
              <div className="promos-card">
              <Link href={`/promo/${promo.id}`}>
                  <img src={promo.imageUrl} alt={promo.title} />
                  </Link>
                <h2>{promo.title.toUpperCase()}</h2>
                <p>{promo.description}</p>
                {isLoggedIn && (
                  <div>
                    <button onClick={() => handleEditPromo(promo)}>Edit</button>
                    <button onClick={() => handleDeletePromo(promo)}>Delete</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {editingPromo && (
        <div className="popup-edit-promos-wrap">
          <div className="popup-edit-promos">
            <h1>Edit Promo</h1>

          <div className="input-editpromos">

              <div className="input-box-edit-promos-input">
                
            <div className="input-box-edit-promos">
              <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} placeholder="Name" />
            </div>
                
            <div className="input-box-edit-promos">
              <input type="file" onChange={(e) => setFile(e.target.files[0])} placeholder="Image URL" />
            </div>
          
            <div className="input-box-edit-promos">
              <input
                type="text"
                value={promo_code}
                onChange={(e) => setPromo_code(e.target.value)}
                placeholder="Promo Code"
              />
            </div>
            <div className="input-box-edit-promos">
              <input
                type="number"
                value={promo_discount_price}
                onChange={(e) => {
                  const value = e.target.value;                 
                  if (!isNaN(value)) {
                    setPromo_discount_price(parseFloat(value));
                  }
                }}
                placeholder="Promo Discount Price"
              />
            </div>

            <div className="input-box-edit-promos">
              <input
                type="number"
                value={minimum_claim_price}
                onChange={(e) => {
                  const value = e.target.value;                 
                  if (!isNaN(value)) {
                    setMinimum_claim_price(parseFloat(value));
                  }
                }}
                placeholder="Minimum Claim Price"
              />
              </div>
            </div>
                
            <div className="input-box-edit-promos-textarea">
              <div className="input-box-edit-promos">
              <textarea
                type="text"
                value={terms_condition}
                onChange={(e) => setTerms_condition(e.target.value)}
                placeholder="Terms and Condition"
              />
                </div>
                
              <div className="input-box-edit-promos">
              <textarea
                type="text"
                    value={description}
                    id="textarea-edit-promos-description"
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
              />
              </div>            
            </div>
          </div>

            <div className="btn-edit-promos-popup">
              <button onClick={handleUpload}>Edit Promo</button>
            </div>

            <span className="btn-close-popup-edit-promos" onClick={() => setEditingPromo(null)}>
              &times;
            </span>
          </div>
        </div>
      )}

      {deletingPromo && (
        <div className="popup-delete-promo-wrap">
          <div className="popup-delete-promo">
          <p>Are you sure you want to delete {deletingPromo.title}?</p>
            <div className="btn-delete-promo-popup">
              <button onClick={confirmDelete}>Yes</button>
              <button onClick={() => setDeletingPromo(null)}>No</button>
            </div>
          </div>
        </div>
      )}

      {buttonPopupCreatePromo && (
        <PopupCreatePromo
          trigger={buttonPopupCreatePromo}
          setTrigger={setButtonPopupCreatePromo}
          updatePromosData={updatePromoData}
        />
      )}
    </div>
  );
};
export default Promo;
