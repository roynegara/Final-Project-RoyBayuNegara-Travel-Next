import axios from "axios";
import { useState } from "react";
export default function useEditBanner() {
    const [loading, setLoading] = useState(false);
  
  const pos = async (url, body) => {
      const accessToken = localStorage.getItem("access_token");
      setLoading(true);
      await axios.post(`https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1${url}`, body, {
        headers: {
          "Content-Type": " application/json",
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          Authorization:
            `Bearer ${accessToken}`,
        },
      });
      setLoading(false);
      
    };
  
    return { pos, loading };
  }