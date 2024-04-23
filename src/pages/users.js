import axios from "axios";
import React, { useState, useEffect } from "react";
import {toast} from "sonner";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Track current page
    const [totalPages, setTotalPages] = useState(0); // Track total pages
    const itemsPerPage = 15; // Number of items per page
    const paginationRange = 10; // Number of page buttons to display
    const [role, setRole] = useState("");
   
    const [selectedUserId, setSelectedUserId] = useState(null); // Track selected user for role change
    const [isModalOpen, setIsModalOpen] = useState(false); // Track modal visibility

    useEffect(() => {
        const getUsers = async () => {
            try {
                const accessToken = localStorage.getItem("access_token");
                const response = await axios.get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/all-user", {
                    headers: {
                        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                const totalUsers = response.data.data.length;
                setTotalPages(Math.ceil(totalUsers / itemsPerPage));
                const startIndex = (currentPage - 1) * itemsPerPage;
                const endIndex = currentPage * itemsPerPage;
                const usersForPage = response.data.data.slice(startIndex, endIndex);
                setUsers(usersForPage);
                const userNames = usersForPage.map(user => user.name);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        getUsers();
    }, [currentPage, itemsPerPage]); // Call useEffect whenever currentPage or itemsPerPage changes

    // Function to handle pagination
    const goToPage = (page) => {
        setCurrentPage(page);
    };

    // Function to go to the first page
    const goToFirstPage = () => {
        setCurrentPage(1);
    };

    // Function to go to the last page
    const goToLastPage = () => {
        setCurrentPage(totalPages);
    };

    // Function to open modal and set selected user for role change
    const openModal = (userId) => {
        setSelectedUserId(userId);
        setIsModalOpen(true);
    };

    // Function to close modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Function to update user role
    const handleChangeUserRole = () => {
        const accessToken = localStorage.getItem("access_token");
        axios
            .post(
                `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-user-role/${selectedUserId}`,
                { role },
                {
                    headers: {
                        apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            )
            .then((res) => {
                console.log("res", res);
                // getUsers();
                const userName = users.find(user => user.id === selectedUserId)?.name;
                toast.success(`${userName} roles's has been changed to ${role}`);
                setTimeout(() => {
                    window.location.reload();
                },1000)
                closeModal(); // Close modal after role change
                
            })
            .catch((err) => {
                console.log("err", err);
            });
    };

    // Generate page numbers
    const pageNumbers = [];
    const startPage = Math.max(1, currentPage - Math.floor(paginationRange / 2));
    const endPage = Math.min(totalPages, startPage + paginationRange - 1);
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    };

    const userName = users.find(user => user.id === selectedUserId)?.name;
    return (
        <div className="users">
            <h1 className="users-title">The Member User of This Website</h1>
          
            <div className="users-content">
            {users.map((user, index) => (
                <div key={index}>
                    <div className="users-card">
                    <p>Name : {user.name}</p>
                    <img className="users-avatar" src={user.profilePictureUrl} alt={user.name} />
                    <p>Email : {user.email}</p>
                    <p>Role : {user.role}</p>
                    <p>Phone Number : {user.phoneNumber}</p>
                        </div>
                    <div className="users-btn-change-role">
                        <button onClick={() => openModal(user.id)}>Change Role</button>
                    </div>
                </div>
            ))}
            </div>
            
            <div className="btn-pagination">
                <button onClick={goToFirstPage} disabled={currentPage === 1}>
                    Start
                </button>
                <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                    Previous
                </button>
                {pageNumbers.map((number) => (
                    <span
                        key={number}
                        onClick={() => goToPage(number)}
                        style={{ cursor: "pointer", margin: "0 5px", fontWeight: currentPage === number ? "bold" : "normal" }}
                    >
                        {number}
                    </span>
                ))}
                <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                    Next
                </button>
                <button onClick={goToLastPage} disabled={currentPage === totalPages}>
                    End
                </button>
            </div>
          
            {isModalOpen && (     
                
                <div className="popup-edit-users">                    
                        <span className="btn-close-popup-edit-users" onClick={closeModal}>
                            &times;
                        </span>
                        <h2>Update Role "{userName}"  </h2>
                        <select name="role" value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="">Choose Role</option>
                            <option value={"admin"}>Admin</option>
                            <option value={"user"}>User</option>
                        </select>
                        <button onClick={handleChangeUserRole}>Change</button>
                    </div>
              
                )}
                
        </div>
    );
};

export default Users;


////sdh benar tapi masih blm ada notif
// import axios from "axios";
// import React, { useState, useEffect } from "react";

// const Users = () => {
//     const [users, setUsers] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1); // Track current page
//     const [totalPages, setTotalPages] = useState(0); // Track total pages
//     const itemsPerPage = 16; // Number of items per page
//     const paginationRange = 10; // Number of page buttons to display
//     const [role, setRole] = useState("");
//     const [selectedUserId, setSelectedUserId] = useState(null); // Track selected user for role change
//     const [isModalOpen, setIsModalOpen] = useState(false); // Track modal visibility

//     useEffect(() => {
//         const getUsers = async () => {
//             try {
//                 const accessToken = localStorage.getItem("access_token");
//                 const response = await axios.get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/all-user", {
//                     headers: {
//                         apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//                         Authorization: `Bearer ${accessToken}`,
//                     },
//                 });
//                 const totalUsers = response.data.data.length;
//                 setTotalPages(Math.ceil(totalUsers / itemsPerPage));
//                 const startIndex = (currentPage - 1) * itemsPerPage;
//                 const endIndex = currentPage * itemsPerPage;
//                 const usersForPage = response.data.data.slice(startIndex, endIndex);
//                 setUsers(usersForPage);
//             } catch (error) {
//                 console.error("Error fetching users:", error);
//             }
//         };

//         getUsers();
//     }, [currentPage, itemsPerPage]); // Call useEffect whenever currentPage or itemsPerPage changes

//     // Function to handle pagination
//     const goToPage = (page) => {
//         setCurrentPage(page);
//     };

//     // Function to go to the first page
//     const goToFirstPage = () => {
//         setCurrentPage(1);
//     };

//     // Function to go to the last page
//     const goToLastPage = () => {
//         setCurrentPage(totalPages);
//     };

//     // Function to open modal and set selected user for role change
//     const openModal = (userId) => {
//         setSelectedUserId(userId);
//         setIsModalOpen(true);
//     };

//     // Function to close modal
//     const closeModal = () => {
//         setIsModalOpen(false);
//     };

//     // Function to update user role
//     const handleChangeUserRole = () => {
//         const accessToken = localStorage.getItem("access_token");
//         axios
//             .post(
//                 `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-user-role/${selectedUserId}`,
//                 { role },
//                 {
//                     headers: {
//                         apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//                         Authorization: `Bearer ${accessToken}`,
//                     },
//                 }
//             )
//             .then((res) => {
//                 console.log("res", res);
//                 getUsers();
//                 closeModal(); // Close modal after role change
//             })
//             .catch((err) => {
//                 console.log("err", err);
//             });
//     };

//     // Generate page numbers
//     const pageNumbers = [];
//     const startPage = Math.max(1, currentPage - Math.floor(paginationRange / 2));
//     const endPage = Math.min(totalPages, startPage + paginationRange - 1);
//     for (let i = startPage; i <= endPage; i++) {
//         pageNumbers.push(i);
//     };

//     return (
//         <div className="users">
//             {users.map((user, index) => (
//                 <div key={index}>
//                     <img className="image-users" src={user.profilePictureUrl} alt={user.name} />
//                     <p>User Id : {user.id}</p>
//                     <p>Name : {user.name}</p>
//                     <p>Email : {user.email}</p>
//                     <p>Role : {user.role}</p>
//                     <p>Phone Number : {user.phoneNumber}</p>
//                     <div>
//                         <button onClick={() => openModal(user.id)}>Change Role</button>
//                     </div>
//                 </div>
//             ))}
//             <div className="pagination">
//                 <button onClick={goToFirstPage} disabled={currentPage === 1}>
//                     Start
//                 </button>
//                 <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
//                     Previous
//                 </button>
//                 {pageNumbers.map((number) => (
//                     <span
//                         key={number}
//                         onClick={() => goToPage(number)}
//                         style={{ cursor: "pointer", margin: "0 5px", fontWeight: currentPage === number ? "bold" : "normal" }}
//                     >
//                         {number}
//                     </span>
//                 ))}
//                 <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
//                     Next
//                 </button>
//                 <button onClick={goToLastPage} disabled={currentPage === totalPages}>
//                     End
//                 </button>
//             </div>
          
//             {isModalOpen && (
//                 <div className="popup-edit-users">                    
//                         <span className="btn-close-popup-edit-users" onClick={closeModal}>
//                             &times;
//                         </span>
//                         <h2>Update Role </h2>
//                         <select name="role" value={role} onChange={(e) => setRole(e.target.value)}>
//                             <option value="">Choose Role</option>
//                             <option value={"admin"}>Admin</option>
//                             <option value={"user"}>User</option>
//                         </select>
//                         <button onClick={handleChangeUserRole}>Change</button>
//                     </div>
              
//             )}
//         </div>
//     );
// };

// export default Users;




// // sudah benar ada edit role juga
// import axios from "axios";
// import React, { useState, useEffect } from "react";

// const Users = () => {
//     const [users, setUsers] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1); // Track current page
//     const [totalPages, setTotalPages] = useState(0); // Track total pages
//     const itemsPerPage = 16; // Number of items per page
//     const paginationRange = 10; // Number of page buttons to display

//     const [role, setRole] = useState("");
//     useEffect(() => {
//         const getUsers = async () => {
//             try {
//                 const accessToken = localStorage.getItem("access_token");
//                 const response = await axios.get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/all-user", {
//                     headers: {
//                         apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//                         Authorization: `Bearer ${accessToken}`,
//                     },
//                 });
//                 const totalUsers = response.data.data.length;
//                 setTotalPages(Math.ceil(totalUsers / itemsPerPage));
//                 const startIndex = (currentPage - 1) * itemsPerPage;
//                 const endIndex = currentPage * itemsPerPage;
//                 const usersForPage = response.data.data.slice(startIndex, endIndex);
//                 setUsers(usersForPage);
//             } catch (error) {
//                 console.error("Error fetching users:", error);
//             }
//         };

//         getUsers();
//     }, [currentPage, itemsPerPage]); // Call useEffect whenever currentPage or itemsPerPage changes

//     // Function to handle pagination
//     const goToPage = (page) => {
//         setCurrentPage(page);
//     };

//     // Function to go to the first page
//     const goToFirstPage = () => {
//         setCurrentPage(1);
//     };

//     // Function to go to the last page
//     const goToLastPage = () => {
//         setCurrentPage(totalPages);
//     };

//     // Generate page numbers
//     const pageNumbers = [];
//     const startPage = Math.max(1, currentPage - Math.floor(paginationRange / 2));
//     const endPage = Math.min(totalPages, startPage + paginationRange - 1);
//     for (let i = startPage; i <= endPage; i++) {
//         pageNumbers.push(i);
//     }

//     const handleChangeUserRole = (id, role) => {
//         const accessToken = localStorage.getItem("access_token");
//         axios
//           .post(
//             `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-user-role/${id}`,
//             { role },
//             {
//               headers: {
//                 apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//                 Authorization: `Bearer ${accessToken}`,
//               },
//             }
//           )
//           .then((res) => {
//             console.log("res", res);
//             getUsers();
//           })
//           .catch((err) => {
//             console.log("err", err);
//           });
//       };
    


    
//     return (
//         <div className="users">
//             {users.map((user, index) => (
//                 <div key={index}>
//                     <img className="image-users" src={user.profilePictureUrl} alt={user.name} />
//                     <p>User Id : {user.id}</p>
//                     <p>Name : {user.name}</p>
//                     <p>Email : {user.email}</p>
//                     <p>Role : {user.role}</p>
//                     <p>Phone Number : {user.phoneNumber}</p>   
                    
//                  <div>
//                  {/* <label>Update Role : </label> */}
//                  <select name="role" value={role} onChange={(e) => setRole(e.target.value)}>
//                             <option value="">Change Role {user.name}</option>
//                    <option value={"admin"}>Admin</option>
//                    <option value={"user"}>User</option>
//                  </select>
//                  <button onClick={() => handleChangeUserRole(user.id, role)}>Change Role</button>
//                </div>
//                 </div>
//             ))}
//             <div className="pagination">
//                 <button onClick={goToFirstPage} disabled={currentPage === 1}>Start</button>
//                 <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
//                 {pageNumbers.map((number) => (
//                     <span
//                         key={number}
//                         onClick={() => goToPage(number)}
//                         style={{ cursor: 'pointer', margin: '0 5px', fontWeight: currentPage === number ? 'bold' : 'normal' }}
//                     >
//                         {number}
//                     </span>
//                 ))}
//                 <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
//                 <button onClick={goToLastPage} disabled={currentPage === totalPages}>End</button>
//             </div>
//         </div>
//     );
// }

// export default Users;



// //pagination berada diluar map.users
// import axios from "axios";
// import React, { useState, useEffect } from "react";

// const Users = () => {
//     const [users, setUsers] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1); // Track current page
//     const [totalPages, setTotalPages] = useState(0); // Track total pages
//     const itemsPerPage = 16; // Number of items per page
//     const paginationRange = 10; // Number of page buttons to display

//     useEffect(() => {
//         const getUsers = async () => {
//             try {
//                 const accessToken = localStorage.getItem("access_token");
//                 const response = await axios.get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/all-user", {
//                     headers: {
//                         apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//                         Authorization: `Bearer ${accessToken}`,
//                     },
//                 });
//                 const totalUsers = response.data.data.length;
//                 setTotalPages(Math.ceil(totalUsers / itemsPerPage));
//                 const startIndex = (currentPage - 1) * itemsPerPage;
//                 const endIndex = currentPage * itemsPerPage;
//                 const usersForPage = response.data.data.slice(startIndex, endIndex);
//                 setUsers(usersForPage);
//             } catch (error) {
//                 console.error("Error fetching users:", error);
//             }
//         };

//         getUsers();
//     }, [currentPage, itemsPerPage]); // Call useEffect whenever currentPage or itemsPerPage changes

//     // Function to handle pagination
//     const goToPage = (page) => {
//         setCurrentPage(page);
//     };

//     // Generate page numbers
//     const pageNumbers = [];
//     const startPage = Math.max(1, currentPage - Math.floor(paginationRange / 2));
//     const endPage = Math.min(totalPages, startPage + paginationRange - 1);
//     for (let i = startPage; i <= endPage; i++) {
//         pageNumbers.push(i);
//     }

//     return (
//         <div className="users">
//             {users.map((user, index) => (
//                 <div key={index}>
//                     <img className="image-users" src={user.profilePictureUrl} alt={user.name} />
//                     <p>User Id : {user.id}</p>
//                     <p>Name : {user.name}</p>
//                     <p>Email : {user.email}</p>
//                     <p>Role : {user.role}</p>
//                     <p>Phone Number : {user.phoneNumber}</p>           
//                 </div>
//             ))}
           
//             <div className="pagination">
//                 <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
//                 {pageNumbers.map((number) => (
//                     <span
//                         key={number}
//                         onClick={() => goToPage(number)}
//                         style={{ cursor: 'pointer', margin: '0 5px', fontWeight: currentPage === number ? 'bold' : 'normal' }}
//                     >
//                         {number}
//                     </span>
//                 ))}
//                 <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
//             </div>
//         </div>
//     );
// }

// export default Users;



//// pagination msh 14 dan gabung ke map.users
// import axios from "axios";
// import React, { useState, useEffect } from "react";

// const Users = () => {
//     const [users, setUsers] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1); // Track current page
//     const [totalPages, setTotalPages] = useState(0); // Track total pages
//     const itemsPerPage = 16; // Number of items per page
//     const paginationRange = 10; // Number of page buttons to display

//     useEffect(() => {
//         const getUsers = async () => {
//             try {
//                 const accessToken = localStorage.getItem("access_token");
//                 const response = await axios.get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/all-user", {
//                     headers: {
//                         apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//                         Authorization: `Bearer ${accessToken}`,
//                     },
//                 });
//                 const totalUsers = response.data.data.length;
//                 setTotalPages(Math.ceil(totalUsers / itemsPerPage));
//                 const startIndex = (currentPage - 1) * itemsPerPage;
//                 const endIndex = currentPage * itemsPerPage;
//                 const usersForPage = response.data.data.slice(startIndex, endIndex);
//                 setUsers(usersForPage);
//             } catch (error) {
//                 console.error("Error fetching users:", error);
//             }
//         };

//         getUsers();
//     }, [currentPage]); // Call useEffect whenever currentPage changes

//     // Function to handle pagination
//     const goToPage = (page) => {
//         setCurrentPage(page);
//     };

//     // Generate page numbers
//     const pageNumbers = [];
//     const startPage = Math.max(1, currentPage - Math.floor(paginationRange / 2));
//     const endPage = Math.min(totalPages, startPage + paginationRange - 1);
//     for (let i = startPage; i <= endPage; i++) {
//         pageNumbers.push(i);
//     }

//     return (
//         <div className="users">
//             {users.map((user, index) => (
//                 <div key={index}>
//                     <img className="image-users" src={user.profilePictureUrl} alt={user.name} />
//                     <p>User Id : {user.id}</p>
//                     <p>Name : {user.name}</p>
//                     <p>Email : {user.email}</p>
//                     <p>Role : {user.role}</p>
//                     <p>Phone Number : {user.phoneNumber}</p>           
//                 </div>
//             ))}
//             <div>
//                 <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
//                 {pageNumbers.map((number) => (
//                     <span
//                         key={number}
//                         onClick={() => goToPage(number)}
//                         style={{ cursor: 'pointer', margin: '0 5px', fontWeight: currentPage === number ? 'bold' : 'normal' }}
//                     >
//                         {number}
//                     </span>
//                 ))}
//                 <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
//             </div>
//         </div>
//     );
// }

// export default Users;




// sudah ada page highlight active
// import axios from "axios";
// import React, { useState, useEffect } from "react";

// const Users = () => {
//     const [users, setUsers] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1); // Track current page
//     const [totalPages, setTotalPages] = useState(0); // Track total pages
//     const itemsPerPage = 20; // Number of items per page

//     useEffect(() => {
//         const getUsers = async () => {
//             try {
//                 const accessToken = localStorage.getItem("access_token");
//                 const response = await axios.get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/all-user", {
//                     headers: {
//                         apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//                         Authorization: `Bearer ${accessToken}`,
//                     },
//                 });
//                 const totalUsers = response.data.data.length;
//                 setTotalPages(Math.ceil(totalUsers / itemsPerPage));
//                 const startIndex = (currentPage - 1) * itemsPerPage;
//                 const endIndex = currentPage * itemsPerPage;
//                 const usersForPage = response.data.data.slice(startIndex, endIndex);
//                 setUsers(usersForPage);
//             } catch (error) {
//                 console.error("Error fetching users:", error);
//             }
//         };

//         getUsers();
//     }, [currentPage]); // Call useEffect whenever currentPage changes

//     // Function to handle pagination
//     const goToPage = (page) => {
//         setCurrentPage(page);
//     };

//     // Generate page numbers
//     const pageNumbers = [];
//     for (let i = 1; i <= totalPages; i++) {
//         pageNumbers.push(i);
//     }

//     return (
//         <div className="users">
//             {users.map((user, index) => (
//                 <div key={index}>
//                     <img className="image-users" src={user.profilePictureUrl} alt={user.name} />
//                     <p>User Id : {user.id}</p>
//                     <p>Name : {user.name}</p>
//                     <p>Email : {user.email}</p>
//                     <p>Role : {user.role}</p>
//                     <p>Phone Number : {user.phoneNumber}</p>           
//                 </div>
//             ))}
//             <div>
//                 <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
//                 {pageNumbers.map((number) => (
//                     <span
//                         key={number}
//                         onClick={() => goToPage(number)}
//                         style={{ cursor: 'pointer', margin: '0 5px', fontWeight: currentPage === number ? 'bold' : 'normal' }}
//                     >
//                         {number}
//                     </span>
//                 ))}
//                 <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
//             </div>
//         </div>
//     );
// }

// export default Users;


// // sudah ok cuma kurang aktif number pagination
// import axios from "axios";
// import React, { useState, useEffect } from "react";

// const Users = () => {
//     const [users, setUsers] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1); // Track current page
//     const [totalPages, setTotalPages] = useState(0); // Track total pages
//     const itemsPerPage = 20; // Number of items per page

//     useEffect(() => {
//         const getUsers = async () => {
//             try {
//                 const accessToken = localStorage.getItem("access_token");
//                 const response = await axios.get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/all-user", {
//                     headers: {
//                         apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//                         Authorization: `Bearer ${accessToken}`,
//                     },
//                 });
//                 const totalUsers = response.data.data.length;
//                 setTotalPages(Math.ceil(totalUsers / itemsPerPage));
//                 const startIndex = (currentPage - 1) * itemsPerPage;
//                 const endIndex = currentPage * itemsPerPage;
//                 const usersForPage = response.data.data.slice(startIndex, endIndex);
//                 setUsers(usersForPage);
//             } catch (error) {
//                 console.error("Error fetching users:", error);
//             }
//         };

//         getUsers();
//     }, [currentPage]); // Call useEffect whenever currentPage changes

//     // Function to handle pagination
//     const goToPage = (page) => {
//         setCurrentPage(page);
//     };

//     // Generate page numbers
//     const pageNumbers = [];
//     for (let i = 1; i <= totalPages; i++) {
//         pageNumbers.push(i);
//     }

//     return (
//         <div className="users">
//             {users.map((user, index) => (
//                 <div key={index}>
//                     <img className="image-users" src={user.profilePictureUrl} alt={user.name} />
//                     <p>User Id : {user.id}</p>
//                     <p>Name : {user.name}</p>
//                     <p>Email : {user.email}</p>
//                     <p>Role : {user.role}</p>
//                     <p>Phone Number : {user.phoneNumber}</p>           
//                 </div>
//             ))}
//             <div>
//                 <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
//                 {pageNumbers.map((number) => (
//                     <span key={number} onClick={() => goToPage(number)} style={{ cursor: 'pointer', margin: '0 5px' }}>{number}</span>
//                 ))}
//                 <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
//             </div>
//         </div>
//     );
// }

// export default Users;




// sudah benar ada pagiantion but no number just prev next
// import axios from "axios";
// import React, { useState, useEffect } from "react";

// const Users = () => {
//     const [users, setUsers] = useState([]);
//     const [currentPage, setCurrentPage] = useState(1); // Track current page
//     const itemsPerPage = 20; // Number of items per page

//     useEffect(() => {
//         const getUsers = async () => {
//             try {
//                 const accessToken = localStorage.getItem("access_token");
//                 const response = await axios.get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/all-user", {
//                     headers: {
//                         apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//                         Authorization: `Bearer ${accessToken}`,
//                     },
//                 });
//                 // Calculate start and end index for current page
//                 const startIndex = (currentPage - 1) * itemsPerPage;
//                 const endIndex = currentPage * itemsPerPage;
//                 // Extract users for the current page
//                 const usersForPage = response.data.data.slice(startIndex, endIndex);
//                 setUsers(usersForPage);
//             } catch (error) {
//                 console.error("Error fetching users:", error);
//             }
//         };

//         getUsers();
//     }, [currentPage]); // Call useEffect whenever currentPage changes

//     // Function to handle pagination
//     const nextPage = () => {
//         setCurrentPage(currentPage + 1);
//     }

//     const prevPage = () => {
//         setCurrentPage(currentPage - 1);
//     }

//     return (
//         <div className="users">
//             {users.map((user, index) => (
//                 <div key={index}>
//                     <img className="image-users" src={user.profilePictureUrl} alt={user.name} />
//                     <p>User Id : {user.id}</p>
//                     <p>Name : {user.name}</p>
//                     <p>Email : {user.email}</p>
//                     <p>Role : {user.role}</p>
//                     <p>Phone Number : {user.phoneNumber}</p>           
//                 </div>
//             ))}
//             <div>
//                 <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
//                 <button onClick={nextPage}>Next</button>
//             </div>
//         </div>
//     );
// }

// export default Users;







// //benar
// import axios from "axios";
// import React, { useState, useEffect } from "react";

// const Users = () => {
//     const [users, setUsers] = useState([]);

    

//     const getUsers = () => {
//         const accessToken = localStorage.getItem("access_token");
//         axios
//             .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/all-user", {
//                 headers: {
//                     apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
//                     Authorization: `Bearer ${accessToken}`,
//                 },
//             })
//             .then((res) => {
//                 console.log("res", res);
//                 setUsers(res.data.data);
//                 // getUsers(currentPage)
//             })
//             .catch((err) => {
//                 console.log("err", err);
//             });
//     }

//     useEffect(() => {
//         getUsers()
//     }, [])

//     return (
//         <div className="users">
//         {users.map((user, index) => (
//           <div key={index}>
//             <img className="image-users" src={user.profilePictureUrl} alt={user.name} />
//             <p>User Id : {user.id}</p>
//             <p>Name : {user.name}</p>
//             <p>Email : {user.email}</p>
//             <p>Role : {user.role}</p>
//             <p>Phone Number : {user.phoneNumber}</p>           
//           </div>
//         ))}
//       </div>
//     )
// }

// export default Users