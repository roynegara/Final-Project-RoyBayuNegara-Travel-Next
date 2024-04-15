import axios from "axios";
import { useState } from "react";

export default function useDeletePromo() {
    const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(null);

    const del = async (url) => {
        setLoading(true);
        const accessToken = localStorage.getItem("access_token");
        await axios.delete(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1${url}`, {
            headers: {
                // "Content-Type": " application/json",
                apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                Authorization: `Bearer ${accessToken}`,
            },
        })
            setLoading(false);
    }
    return { del, loading };
}