// //React Murni

import { useRouter } from "next/router";
import Link from "next/link";

const Logout = () => {
    const router = useRouter();
    const token = localStorage.getItem("access_token");
    console.log("access_token", token);

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        router.push("/authentication/login");
    }
    return (
        <div className="loginout">{token ? <a onClick={handleLogout}> Logout </a> : <Link to="/login"> Login </Link>}</div>
    )
}

export default Logout






// import React, { useEffect } from "react";
// import { useRouter } from "next/router";
// import { logoutUser } from "@/api/authentication";

// export default function Logout() {
//     const router = useRouter();


//     useEffect(() => {
//         const handleLogout = async () => {
//             try {
//                 await logoutUser();
//                 router.push("/authentication/login");
//             } catch (error) {
//                 console.error(error);
//             }
        
//         }
//         handleLogout();
//     }, []);
    
//     return <div>Logging out...</div>
// }