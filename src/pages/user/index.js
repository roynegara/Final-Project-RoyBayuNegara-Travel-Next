import React, { useEffect, useState } from "react";
import { getAllUsers, getLoggedUser } from "@/api/user";
import axios from "axios";
import { useRouter } from "next/router";
import { usePost } from "@/hooks/api";

import { logoutUser } from "@/api/authentication";

import { handleLogout } from "@/pages/authentication/logout";

export default function Index() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  // if (!localStorage.getItem("access_token")) {
  //     router.push("/authentication/login");
  // }
  // const token = localStorage.getItem("access_token");

  const getUsers = async () => {
    try {
      //   const res = await getAllUsers(); //gagal
      const res = await axios.get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/all-user", {
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k`,
        },
      });
      setUsers(res.data.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError(`Error: ${error.message}`);
      setLoading(false);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

  // const getLoggedUser = async () => {
  //     try{
  //     const res = await axios.get("https://travel-journal-api-bootcamp.do.dibimbing.id//api/v1/user", {
  //         headers: {
  //           apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
  //           Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k`,
  //         },
  //       });
  //       setUsers(res.data.data);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error(error);
  //       setError(`Error: ${error.message}`);
  //       setLoading(false);
  //     }
  //     };

  // useEffect(() => {
  //     getLoggedUser();
  // },[])

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  //   const handleLogout = async () => {
  //     try {
  //         await logoutUser();
  //         const token = localStorage.getItem("access_token");
  //         console.log("access_token", token);
  //         localStorage.removeItem("access_token");
  //       router.push("/authentication/login");
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  const handleUserDetail = () => {
    router.push(`/user/profile`);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    router.push("/authentication/login");
  };

  return (
    <div>
      {users.length > 0 ? (
        users.map((user, index) => (
          <div key={index}>
            <p>Id: {user.id}</p>
            <img src={user.profilePictureUrl} alt={user.name} width={200} height={200} />
            <p>Name : {user.name}</p>
            {/* <p>Email : {user.email}</p>
            <p>Role : {user.role}</p>
            <p>Phone Number : {user.phoneNumber}</p> */}
            <button onClick={() => handleUserDetail(user.id)}>User detail</button>
            {/* <button onClick={() => router.push(`/user/${user.id}`)}>View Profile</button> */}
            <button onClick={handleLogout}>Logout</button>
            <button onClick={() => router.push("/user/updateProfile")}>Update Profile</button>
            <div>
              <select >
                <option value="">Pilih peran pengguna</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
              <button id="updateButton" >
                Update User Role
              </button>
            </div>

            {/* <div>{token ? <button onClick={handleLogout}> Logout </button> : <a href="/authentication/login">Login</a>}</div> */}
          </div>
        ))
      ) : (
        <div>No users found.</div>
      )}
    </div>
  );
}
