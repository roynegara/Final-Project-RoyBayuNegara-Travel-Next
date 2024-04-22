import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

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
        setNotif("Status : " + res?.data?.message);
        const token = res?.data?.token;
        localStorage.setItem("access_token", token);

        setTimeout(() => {
          router.push('/')
          window.location.reload()
        },1000)
        // router.}push("/", undefined, { shallow: true }).then((success) => {
        //   if (success) {
        //     setTimeout(() => {
        //       window.location.reload()
        //     },1000)
        //   }
        // })
      })
      .catch((err) => {
        console.log("error", err?.response);
        setNotif("Status : " + err?.response?.data?.message);
      });
  };

  return (
    <div className="login">
      <h1>Login</h1>
      {notif && <p style={{ color: notif === "Status : Authentication successful" ? "green" : "red" }}>{notif}</p>}

      <input type="text" name="email" placeholder="Email" value={email} onChange={handleEmailChange} />
      <input type="password" name="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
      <button onClick={handleLogin} disabled={loading ? true : false}>
        {loading ? "Loading..." : "Login"}
      </button>
      {/* <button onClick={handleLogin} disabled={email === "" || password === "" || loading ? true : false}>
        {loading ? "Loading..." : "Login"}
      </button> */}
      <p>
        Not have an account? <a href="/register">Register</a>
      </p>
    </div>
  );
};

export default Login;

// import React, { useState } from "react";
// import { useRouter } from "next/router";
// import { loginUser } from "@/api/authentication";
// import axios from "axios";

// export default function Login() {
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [showNotification, setShowNotification] = useState("");

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//   //   axios.post("https://travel-journal-api-bootcamp.do.dibimbing.id//api/v1/login", {
//   //     headers: {
//   //       apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c"
//   //   })
//   //     .then(res => {
//   //       console.log(res.status);

//   //       setShowNotification("Status : " + data?.message);
//   //       const token = res?.data?.token;
//   //       localStorage.setItem("access_token", token);
//   //       if (token) {
//   //         setTimeout(() => {
//   //           router.push("/user");
//   //         }, 1500);
//   //       }
//   //       })
//   //     .catch(error => {
//   //         console.error(error);
//   //         setShowNotification("Status : " + error?.message);
//   //       })
//   // }

//     try {
//       const res = await axios.post('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/login', formData,
//         { headers = { apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c' } });
//       console.log(res.data);
//       console.log('token', res?.token);
//       setShowNotification("Status : " + data?.message);
//       const token = res?.token;
//       localStorage.getItem("access_token", token);
//     try {
//       const res = await loginUser(formData);
//       console.log(res.data);
//       console.log('token', res?.token);
//       setShowNotification("Status : " + data?.message);
//       const token = res?.token;
//       localStorage.getItem("access_token", token);

//       if (token) {
//         setTimeout(() => {
//           router.push("/user");
//         }, 1500);
//       }
//     } catch (error) {
//       console.error(error);
//       setShowNotification("Status : " + error?.message);
//     }
//   }

//   return (
//     <div>
//       <h1>Login</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Email:</label>
//           <input type="email" name="email" value={formData.email} onChange={handleChange} />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input type="password" name="password" value={formData.password} onChange={handleChange} />
//         </div>
//         {showNotification && <p style={{ color: "red" }}>{showNotification}</p>}
//         <button type="submit" onClick={handleSubmit}>Login</button>
//       </form>
//     </div>
//   );
// }

// //Login ok
// import React, { useState } from "react";
// import { useRouter } from "next/router";
// import { loginUser } from "@/api/authentication";

// export default function Login() {
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const [errors, setErrors] = useState("");

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await loginUser(formData);
//       console.log(res.data);
//       router.push("/");
//     } catch (error) {
//       console.error(error);
//       setErrors(error.message);
//     }
//   };

//   return (
//     <div>
//       <h1>Login</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Email:</label>
//           <input type="email" name="email" value={formData.email} onChange={handleChange} />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input type="password" name="password" value={formData.password} onChange={handleChange} />
//         </div>
//         {errors && <p style={{ color: "red" }}>{errors}</p>}
//         <button type="submit">Login</button>

//       </form>
//     </div>
//   );
// }
