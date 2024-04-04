import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { logoutUser } from "@/api/authentication";

export default function Logout() {
    const router = useRouter();


    useEffect(() => {
        const handleLogout = async () => {
            try {
                await logoutUser();
                router.push("/authentication/login");
            } catch (error) {
                console.error(error);
            }
        
        }
        handleLogout();
    }, []);
    
    return <div>Logging out...</div>
}