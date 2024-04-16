import React, { useState } from "react";
import axios from "axios";

function UpdatePromo() { 
    const [promo, setPromo] = useState({
        title: "",
        imageUrl: "",
        promo_code: "",
        minimum_claim_price: "",
        promo_discount_price: "",
        terms_condition: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPromo(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const accessToken = localStorage.getItem('access_token');

try {
    const response = await axios.post(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-promo/${promo?.id}`, {
        title: promo.title,
        imageUrl: promo.imageUrl,
        promo_code: promo.promo_code,
        minimum_claim_price: promo.minimum_claim_price,
        promo_discount_price: promo.promo_discount_price,
        terms_condition: promo.terms_condition
    }, {
        headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${accessToken}`
        }
    });
    console.log('Update promo success:', response.data);
} catch (error) {
    console.error('Failed update promo:', error);
}
    }

    return (
        <div>
            <h1>Update Promo</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={promo.title}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Image Url:</label>
                    <input
                        type="text"
                        name="imageUrl"
                        value={promo.imageUrl}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Promo Code:</label>
                    <input
                        type="text"
                        name="promo_code"
                        value={promo.promo_code}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Minimum Claim Price:</label>
                    <input
                        type="text"
                        name="minimum_claim_price"
                        value={promo.minimum_claim_price}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Promo Discount Price:</label>
                    <input
                        type="text"
                        name="promo_discount_price"
                        value={promo.promo_discount_price}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Terms Condition:</label>
                    <input
                        type="text"
                        name="terms_condition"
                        value={promo.terms_condition}
                        onChange={handleChange}
                    />
                </div>

                <button type="submit">Update</button>

            </form>
        </div>
    )
}

export default UpdatePromo