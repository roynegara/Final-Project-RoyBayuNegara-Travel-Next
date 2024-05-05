import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/router";

const UpdatePromo = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [terms_condition, setTerms_condition] = useState("");
  const [promo_code, setPromo_code] = useState("");
  const [promo_discount_price, setPromo_discount_price] = useState(0);
  const [minimum_claim_price, setMinimum_claim_price] = useState(0);
  const [editPromo, setEditPromo] = useState(null);

  const router = useRouter();
  const { id } = router.query;

  const getPromo = () => {
    if (id) {
      axios
        .get(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos`, {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        })
        .then((res) => {
          console.log(promos, res.data);
          setEditPromo(res.data);
          setTitle(res.data.title);
          setDescription(res.data.description);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    getPromo();
  }, [id]);

  const handlePromo_discount_priceChange = (e) => {
    // Memastikan bahwa input adalah nomor atau string kosong
    const value = e.target.value;
    if (!isNaN(value) || value === "") {
      setPromo_discount_price(parseFloat(value));
    }
  };

  const handleMinimum_claim_priceChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) || value === "") {
      setMinimum_claim_price(parseFloat(value));
    }
  };

  const handleSubmit = () => {
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      const payload = {
        title: title,
        description: description,
        terms_condition: terms_condition,
        promo_code: promo_code,
        promo_discount_price: promo_discount_price,
        minimum_claim_price: minimum_claim_price,
      };
      const accessToken = localStorage.getItem("access_token");
      axios
        .post(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-promo/${editPromo?.id}`, payload, {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          console.log(res);
          toast.success(res.data.message);
          props.updatePromosData();
          props.setTrigger(false);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          console.log(err);
        });
    }
  };

  const handleUpload = () => {
    if (!file) {
      toast.warning("Please select an image");
      return;
    }
    const formData = new FormData();
    formData.append("image", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5YWE4MDNjMy1iNTFlLTQ3YTAtOTBkYy0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.UyD13JUWY6bZp2UbYtysyRr6QdjXG6k6TXiGgRCed8o`,
        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
      },
    };
    axios
      .post("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image", formData, config)
      .then((res) => {
        console.log(res);
        setFile(null);
        handleSubmit();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return props.trigger ? (
    <div className="popup-create-promo-wrap">
      <div className="popup-create-promos">
        <h1>Edit Promo</h1>
        <div className="input-box-create-promos">
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
        </div>
        <div className="input-box-create-promos">
          <input
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
        </div>
        <div className="input-box-create-promos">
          <input type="file" name="imageUrl" onChange={(e) => setFile(e.target.files[0])} placeholder="Image Url" />
        </div>
        <div className="input-box-create-promos">
          <input
            type="text"
            name="terms_condition"
            value={terms_condition}
            onChange={(e) => setTerms_condition(e.target.value)}
            placeholder="Terms Condition"
          />
        </div>
        <div className="input-box-create-promos">
          <input
            type="text"
            name="promo_code"
            value={promo_code}
            onChange={(e) => setPromo_code(e.target.value)}
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
        <div className="btn-create-promos-popup">
          <button onClick={handleUpload}>Edit Promo</button>
        </div>
        <span className="btn-close-popup-create-promo" onClick={() => props.setTrigger(false)}>
          &times;
        </span>
      </div>
    </div>
  ) : (
    ""
  );
};

export default UpdatePromo;
