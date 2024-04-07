import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const Login = () => {
  const router = useRouter();
  const [notif, setNotif] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    console.log("email", e.target.value);
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    console.log("password", e.target.value);
  };

  const handleLogin = () => {
    const payload = {
      email: email,
      password: password,
    };

    axios
      .post("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/login", payload, {
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
        },
      })
      .then((res) => {
        console.log("response", res);
        setNotif("Status : ", res?.data?.message + " >> Login Successfully, Please Wait...");
        const token = res?.data?.token;
        localStorage.setItem("access_token", token);
        setTimeout(() => {
          router.push("/user");
        }, 1500);
      })
      .catch((err) => {
        console.log("error", err?.response?.data);
        setNotif("Status : ", err?.response?.data?.message + ", Please Check Again Your Email or Password");
      });
  };

  return (
    <div>
      <h1>Login</h1>
      {notif && <p style={{ color: "red" }}>{notif}</p>}
      <input type="email" name="email" placeholder="Email" value={email} onChange={handleEmailChange} />
      <input type="password" name="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
