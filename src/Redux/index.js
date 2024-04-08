import React from "react";
import ReactDOM from "react-dom/client";
import _app from "./_app";
import { Provider } from "react-redux";
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <_app />
    </Provider>
  </React.StrictMode>
);
