import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "sonner";

const Login = () => {
  const router = useRouter();
  const [notif, setNotif] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e) => {
    console.log("email", e.target.value);
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    console.log("password", e.target.value);
  };

  const handleLogin = () => {
    if (email === "" && password === "") {
      toast.info("Failed to login because email and password are empty");
      return;
    } else if (!email) {
      toast.info("Failed to login because your email is emtpy");
      return;
    } else if (!password) {
      toast.info("Failed to login because your password is empty");
      return;
    }

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
        toast.success("Login Successfully");
        const token = res?.data?.token;
        localStorage.setItem("access_token", token);

        setTimeout(() => {
          router.push("/dashboard", undefined, { shallow: true }).then((success) => {
            if (success) {
              setTimeout(() => {
                window.location.reload();
              });
            }
          });
        }, 1500);
      })
      .catch((err) => {
        console.log("error", err?.response);
        if (
          err?.response?.data?.errors &&
          err?.response?.data?.errors.length > 0 &&
          err.response.data.errors[0].message
        ) {
          toast.error("Failed to login because " + err.response.data.errors[0].message);
        } else {
          toast.error("Failed to login because " + err?.response?.data?.message);
        }
      });
  };

  return (
    <div className="login-wrap">
      <div className="login">
        <h1>Login</h1>
        {notif && <p style={{ color: notif === "Status : Authentication successful" ? "green" : "red" }}>{notif}</p>}

        <div className="input-box-login">
          <input type="text" name="email" placeholder="Email" value={email} onChange={handleEmailChange} />
        </div>
        <div className="input-box-login">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>

        <div className="btn-login">
          <button onClick={handleLogin} disabled={loading ? true : false}>
            {loading ? "Loading..." : "Login"}
          </button>
          <p>
            Not have an account? <a href="/register">Register</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
