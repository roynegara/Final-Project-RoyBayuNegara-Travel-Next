import React from "react";
import Link from "next/link";

export default function LogInOut({isLoggedIn}) {
    return (
        <div>
            {isLoggedIn ? (
                <Link href="/authentication/logout">
                    <a>Logout</a>
                </Link>
            ) : (
                <Link href="/authentication/login">
                    <a>Login</a>
                </Link>
            )}
       </div>
    );
}