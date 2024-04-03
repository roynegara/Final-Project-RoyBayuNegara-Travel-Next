import React, { useState } from "react";
import { useRouter } from "next/router";
import { registerUser } from "@/api/authentication";

const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordRepeat: "",
    role: "",
    profilPictureUrl: "",
    phoneNumber: "",
  });
//   const [errors, setErrors] = useState("");
  const [showNotification, setShowNotification] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(formData);
      console.log(res.data);
      //   router.push("/authentication/login");
      setShowNotification('Successfully registered');
      setTimeout(() => {
        
        router.push("/authentication/login");
      }, 3000);
    } catch (eror) {
      console.error(eror);

      setShowNotification(eror?.message);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <div>
          <label>Password Repeat:</label>
          <input type="password" name="passwordRepeat" value={formData.passwordRepeat} onChange={handleChange} />
        </div>
        <div>
          <label>Role:</label>
          <input type="text" name="role" value={formData.role} onChange={handleChange} />
        </div>
        <div>
          <label>Profil Picture Url:</label>
          <input type="text" name="profilPictureUrl" value={formData.profilPictureUrl} onChange={handleChange} />
        </div>
        <div>
          <label>Phone Number:</label>
          <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
        </div>

        {showNotification && <p style={{ color: "red" }}>{showNotification}</p>}
        <button type="submit">Register</button>
      </form>
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
