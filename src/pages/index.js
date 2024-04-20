// import Image from "next/image";
// import { Inter } from "next/font/google";

// const inter = Inter({ subsets: ["latin"] });

import { useRouter } from "next/router";
import Link from "next/link";

export default function Home() {
const router = useRouter();

  return (
    <div>
      <h1>Hello</h1>
   

      <div className="link-home">    
        <Link className="home-link" href="/login">Login</Link>
        <Link className="home-link" href="/register">Register</Link>  
        <Link className="home-link" href="/dashboard">Dashboard</Link>
        <Link className="home-link" href="/banner">Banner</Link>
        <Link className="home-link" href={"/promo"}>Promo</Link>
        <Link className="home-link" href="/category">Category</Link>
        <Link className="home-link" href="/activity">Destination</Link>
      </div>
    </div>
  );
}

// import React from "react";
// import ReactDOM from "react-dom/client";
// import { __next_app__ } from "next/dist/build/templates/app-page";
// import { App } from "./_app";
// import { Provider } from "react-redux";
// import store from "../Redux/store";


// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>
// );