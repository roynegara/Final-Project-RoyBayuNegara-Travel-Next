import React, { useState } from "react";
import { useRouter } from "next/router";
import { loginUser } from "@/api/authentication";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(formData);
      console.log(res.data);
      router.push("/");
    } catch (error) {
      console.error(error);
      setErrors(error.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        {errors && <p style={{ color: "red" }}>{errors}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
