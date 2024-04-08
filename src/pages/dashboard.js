import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const Dashboard = () => {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
 

  const getUsers = () => {
    axios
      .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/all-user", {
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k",
        },
      })
      .then((res) => {
        console.log("res", res);
        setUsers(res.data.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const getLoggedUser = () => {
    const accessToken = localStorage.getItem("access_token");


    axios
      .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/user", {
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          Authorization: `Bearer ${accessToken}`,
            
        },
        params: {
          token : accessToken
        }
      })
      .then((res) => {
        console.log("res", res);
        setUser(res.data.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    getLoggedUser();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <img className="image-dashboard" src={user.profilePictureUrl} alt={user.name} />
        <p>User Id : {user.id}</p>
        <p>Name : {user.name}</p>
        <p>Email : {user.email}</p>
        <p>Role : {user.role}</p>
        <p>Phone Number : {user.phoneNumber}</p>
      </div>
      <div>
        {users.map((user, index) => (
          <div key={index}>
            <img className="image-dashboard" src={user.profilePictureUrl} alt={user.name} />
            <p>User Id : {user.id}</p>
            <p>Name : {user.name}</p>
            <p>Email : {user.email}</p>
            <p>Role : {user.role}</p>
            <p>Phone Number : {user.phoneNumber}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { setLoggedInUser, setAuthStatus } from '../Redux/action';
// import axios from 'axios';

// const Dashboard = () => {
//   const dispatch = useDispatch();
//   const loggedInUser = useSelector((state) => state.loggedInUser);
//   const isAuthenticated = useSelector((state) => state.isAuthenticated);

//   useEffect(() => {
//     const getUserData = async () => {
//       try {
//         const response = await axios.get('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/user', {
//           headers: {
//             apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
//             Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k',
//           },
//         });
//         const userData = response.data.data;
//         dispatch(setLoggedInUser(userData));
//         dispatch(setAuthStatus(true));
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//         dispatch(setAuthStatus(false));
//       }
//     };

//     if (!isAuthenticated) {
//       getUserData();
//     }
//   }, [dispatch, isAuthenticated]);

//   return (
//     <div>
//       <h1>Dashboard</h1>
//       <div>
//         <img className="image-dashboard" src={loggedInUser.profilePictureUrl} alt={loggedInUser.name} />
//         <p>User Id : {loggedInUser.id}</p>
//         <p>Name : {loggedInUser.name}</p>
//         <p>Email : {loggedInUser.email}</p>
//         <p>Role : {loggedInUser.role}</p>
//         <p>Phone Number : {loggedInUser.phoneNumber}</p>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/router";
// import axios from "axios";

// const Dashboard = () => {
//   const router = useRouter();
//   const [users, setUsers] = useState([]);
//   const [user, setUser] = useState({});

//   const getUsers = () => {
//     axios
//       .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/all-user", {
//         headers: {
//           apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//           Authorization:
//             "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k",
//         },
//       })
//       .then((res) => {
//         console.log("res", res);
//         setUsers(res.data.data);
//       })
//       .catch((err) => {
//         console.log("err", err);
//       });
//   };

//   useEffect(() => {
//     getUsers();
//   }, []);

//   const getLoggedUser = () => {
//     axios
//       .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/user", {
//         headers: {
//           apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//           Authorization:
//             "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k",
//         },
//       })
//       .then((res) => {
//         console.log("res", res);
//         setUser(res.data.data);
//       })
//       .catch((err) => {
//         console.log("err", err);
//       });
//   };

//   useEffect(() => {
//     getLoggedUser();
//   }, []);

//   return (
//     <div>
//           <h1>Dashboard</h1>
//           <div>
//             <img className="image-dashboard" src={user.profilePictureUrl} alt={user.name} />
//             <p>User Id : {user.id}</p>
//             <p>Name : {user.name}</p>
//             <p>Email : {user.email}</p>
//             <p>Role : {user.role}</p>
//             <p>Phone Number : {user.phoneNumber}</p>

//           </div>
//       <div>
//         {users.map((user, index) => (
//           <div key={index}>
//             <img className="image-dashboard" src={user.profilePictureUrl} alt={user.name} />
//             <p>User Id : {user.id}</p>
//             <p>Name : {user.name}</p>
//             <p>Email : {user.email}</p>
//             <p>Role : {user.role}</p>
//             <p>Phone Number : {user.phoneNumber}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
