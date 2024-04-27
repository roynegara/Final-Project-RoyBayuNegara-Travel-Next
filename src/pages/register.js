import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import {toast} from 'sonner'

const Register = () => {
  const router = useRouter();
  // const [notif, setNotif] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [role, setRole] = useState("admin");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [loading, setLoading] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
    console.log("name", e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    console.log("email", e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    console.log("password", e.target.value);
  };

  const handlePasswordRepeatChange = (e) => {
    setPasswordRepeat(e.target.value);
    console.log("passwordRepeat", e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    console.log("role", e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
    console.log("phoneNumber", e.target.value);
  };

  const handleRegister = () => {
    const payload = {
      name: name,
      email: email,
      password: password,
      passwordRepeat: passwordRepeat,
      role: role,
      phoneNumber: phoneNumber,
    };

    axios
      .post("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/register", payload, {
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
        },
      })
      .then((res) => {
        console.log("response", res);
        toast.success("Status : " + res?.data?.message);
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      })
      .catch((err) => {
        console.log("error", err.response);
        // toast.error("Status : " + err?.response?.data?.message);

        if (
          err?.response?.data?.errors &&
          err?.response?.data?.errors.length > 0 &&
          err.response.data.errors[0].message
        ) {
          toast.error(err.response.data.errors[0].message);
        } else {
          toast.error(err?.response?.data?.message);
        }

      });
  };

  return (

    <div className="register-wrap">

  
    <div className="register">
      <h1>Register</h1>
      {/* {notif && <p style={{ color: notif === "Status : User Created" ? "green" : "red" }}>{notif}</p>} */}
        <div className="input-box-register">
          
      <input type="text" name="name" value={name} onChange={handleNameChange} placeholder="Name" />
        </div>
        <div className="input-box-register">
        <input type="email" name="email" value={email} onChange={handleEmailChange} placeholder="Email" />
        </div>
      <div className="input-box-register">
          <input type="password" name="password" value={password} onChange={handlePasswordChange} placeholder="Password" />
          </div>
        <div className="input-box-register">
        <input
        type="password"
        name="passwordRepeat"
        value={passwordRepeat}
        onChange={handlePasswordRepeatChange}
        placeholder="Password Repeat"
          />
          </div>

      <div className="input-box-registe">
        <label>Choose Role : </label>
        <select className="option-register" name="role" value={role} onChange={handleRoleChange}>
          <option value={"admin"}>Admin</option>
          <option value={"user"}>User</option>
        </select>
      </div>

      <div className="input-box-register">
      <input
        type="text"
        name="phoneNumber"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        placeholder="Phone Number"
        />
        </div>

      <div className="btn-register">
        <button onClick={handleRegister} disabled={loading ? true : false}>
          {loading ? "Loading..." : "Register"}
        </button>
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
      </div>
      </div>
  );
};

export default Register;

// import React, { useState } from "react";
// import { useRouter } from "next/router";
// import { registerUser } from "@/api/authentication";

// const Register = () => {
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     passwordRepeat: "",
//     role: "",
//     profilPictureUrl: "",
//     phoneNumber: "",
//   });
//   //   const [errors, setErrors] = useState("");
//   const [showNotification, setShowNotification] = useState("");

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       try {
//         const res = await registerUser(formData);
//         console.log(res.data);
//         //   router.push("/authentication/login");
//          setShowNotification("Status : " + res?.message + " Successfully");
//         setTimeout(() => {
//           router.push("/authentication/login");
//         }, 3000);
//       } catch (eror) {
//         console.error(eror);

//         setShowNotification("Status : " + eror?.message);
//       }
//     };

//   return (

//       <div>
//         <h1>Register</h1>
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label>Name:</label>
//             <input type="text" name="name" value={formData.name} onChange={handleChange} />
//           </div>
//           <div>
//             <label>Email:</label>
//             <input type="email" name="email" value={formData.email} onChange={handleChange} />
//           </div>
//           <div>
//             <label>Password:</label>
//             <input type="password" name="password" value={formData.password} onChange={handleChange} />
//           </div>
//           <div>
//             <label>Password Repeat:</label>
//             <input type="password" name="passwordRepeat" value={formData.passwordRepeat} onChange={handleChange} />
//           </div>
//           <div>
//             <label>Role:</label>
//             <input type="text" name="role" value={formData.role} onChange={handleChange} />
//           </div>
//           <div>
//             <label>Profil Picture Url:</label>
//             <input type="text" name="profilPictureUrl" value={formData.profilPictureUrl} onChange={handleChange} />
//           </div>
//           <div>
//             <label>Phone Number:</label>
//             <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
//           </div>

//           {showNotification && <p style={{ color: "red" }}>{showNotification}</p>}
//           <button type="submit">Register</button>
//         </form>
//       </div>

//   );
// };

// export default Register;

// import React, { useState } from "react";
// import { useRouter } from "next/router";
// import { registerUser } from "@/api/authentication";

// const Register = () => {
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     passwordRepeat: "",
//     role: "",
//     profilPictureUrl: "",
//     phoneNumber: "",
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
//       const res = await registerUser(formData);
//       console.log(res.data);
//       router.push("/authentication/login");
//     } catch (error) {
//       console.error(error.data.status);
//       setErrors(error.message);
//     }
//   };

//   return (
//     <div>
//       <h1>Register</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Name:</label>
//           <input type="text" name="name" value={formData.name} onChange={handleChange} />
//         </div>
//         <div>
//           <label>Email:</label>
//           <input type="email" name="email" value={formData.email} onChange={handleChange} />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input type="password" name="password" value={formData.password} onChange={handleChange} />
//         </div>
//         <div>
//           <label>Password Repeat:</label>
//           <input type="password" name="passwordRepeat" value={formData.passwordRepeat} onChange={handleChange} />
//         </div>
//         <div>
//           <label>Role:</label>
//           <input type="text" name="role" value={formData.role} onChange={handleChange} />
//         </div>
//         <div>
//           <label>Profil Picture Url:</label>
//           <input type="text" name="profilPictureUrl" value={formData.profilPictureUrl} onChange={handleChange} />
//         </div>
//         <div>
//           <label>Phone Number:</label>
//           <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
//         </div>

//         {errors && <p style={{ color: "red" }}>{errors}</p>}
//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// };

// export default Register;
