// import Image from "next/image";
// import { Inter } from "next/font/google";

// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <h1>Hello</h1>
      <button>
        <a href="/login">Login</a>
      </button>
      <button>
        <a href="/register">Register</a>
      </button>
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