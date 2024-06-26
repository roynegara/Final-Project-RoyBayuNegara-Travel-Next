import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/router";

const CreatePromo = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [terms_condition, setTerms_condition] = useState("");
  const [promo_code, setPromo_code] = useState("");
  const [promo_discount_price, setPromo_discount_price] = useState("");
  const [minimum_claim_price, setMinimum_claim_price] = useState("");
  const [file, setFile] = useState("");
  const router = useRouter();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageUrlChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleTerms_conditionChange = (e) => {
    setTerms_condition(e.target.value);
  };

  const handlePromo_codeChange = (e) => {
    setPromo_code(e.target.value);
  };

  const handlePromo_discount_priceChange = (e) => {
    const value = parseFloat(e.target.value);
    setPromo_discount_price(value);
  };

  const handleMinimum_claim_priceChange = (e) => {
    const value = parseFloat(e.target.value);
    setMinimum_claim_price(value);
  };

  const handleUpload = () => {
    const fields = [
      { name: "title", label: "name" },
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
        emptyFields.push(field.label);
      }
    });

    if (emptyFields.length > 0) {
      toast.info(
        `Failed to add promo because ${emptyFields.join(", ")} ${emptyFields.length > 1 ? "are" : "is"} empty`
      );
      return;
    } else if (!file) {
      toast.info("Please select an image");
      return;
    } else {
      // Add promo successful
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

  const handleSubmit = () => {
    if (imageUrl) {
      const payload = {
        title: title,
        description: description,
        imageUrl: imageUrl,
        terms_condition: terms_condition,
        promo_code: promo_code,
        promo_discount_price: promo_discount_price,
        minimum_claim_price: minimum_claim_price,
      };

      const accessToken = localStorage.getItem("access_token");

      axios
        .post("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-promo", payload, {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          props.updatePromosData();
          props.setTrigger(false);
          setImageUrl(res?.data?.url);
          toast.success(`${title} has been created`);
        })
        .catch((err) => {
          console.log(err);
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
    }
  };

  useEffect(() => {
    handleSubmit();
  }, [imageUrl]);

  return props.trigger ? (
    <div className="popup-create-promos-wrap">
      <div className="popup-create-promos">
        <h1>Add Promo</h1>

        <div className="input-addpromos">
          <div className="input-box-create-promos-input">
            <div className="input-box-create-promos">
              <input type="text" name="title" value={title} onChange={handleTitleChange} placeholder="Title" />
            </div>

            <div className="input-box-create-promos">
              <input type="file" name="imageUrl" onChange={handleImageUrlChange} placeholder="Image Url" />
            </div>
            <div className="input-box-create-promos">
              <input
                type="text"
                name="promo_code"
                value={promo_code}
                onChange={handlePromo_codeChange}
                placeholder="Promo Code"
              />
            </div>
            <div className="input-box-create-promos">
              <input
                type="text"
                name="promo_discount_price"
                value={promo_discount_price}
                onChange={handlePromo_discount_priceChange}
                placeholder="Promo Discount Price"
              />
            </div>
            <div className="input-box-create-promos">
              <input
                type="text"
                name="minimum_claim_price"
                value={minimum_claim_price}
                onChange={handleMinimum_claim_priceChange}
                placeholder="Minimum Claim Price"
              />
            </div>
          </div>

          <div className="input-box-create-promos-textarea">
            <div className="input-box-create-promos">
              <textarea
                type="text"
                name="terms_condition"
                value={terms_condition}
                onChange={handleTerms_conditionChange}
                placeholder="Terms Condition"
              />
            </div>

            <div className="input-box-create-promos">
              <textarea
                type="text"
                id="textarea-create-promos-description"
                name="description"
                value={description}
                onChange={handleDescriptionChange}
                placeholder="Description Promo"
              />
            </div>
          </div>
        </div>

        <div className="btn-create-promos-popup">
          <button onClick={handleUpload}>Add Promo</button>
        </div>
        <span className="btn-close-popup-create-promos" onClick={() => props.setTrigger(false)}>
          &times;
        </span>
      </div>
    </div>
  ) : (
    ""
  );
};

export default CreatePromo;
