import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/router";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 6;
  const paginationRange = 5;
  const [role, setRole] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null); // Track selected user for role change
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal visibility
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      router.push("/login");
    }
  }, []);

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
        const userNames = usersForPage.map((user) => user.name);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    getUsers();
  }, [currentPage, itemsPerPage]);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  const openModal = (userId) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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
        const updatedUsers = users.map((user) => {
          if (user.id === selectedUserId) {
            return { ...user, role: role }; // Update the role for the selected user
          }
          return user;
        });
        setUsers(updatedUsers); // Update users state with the modified user data
        const userName = updatedUsers.find((user) => user.id === selectedUserId)?.name;
        toast.success(`${userName} roles's has been changed to ${role}`);
        closeModal(); // Close modal after role change
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const pageNumbers = [];
  const startPage = Math.max(1, currentPage - Math.floor(paginationRange / 2));
  const endPage = Math.min(totalPages, startPage + paginationRange - 1);
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const userName = users.find((user) => user.id === selectedUserId)?.name;
  return (
    <div className="users">
      <div className={`users ${isModalOpen ? "blur-users" : ""}`}>
        <h1 className="users-title">The Database Users of This Website</h1>
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
              style={{
                cursor: "pointer",
                margin: "0 5px",
                fontWeight: currentPage === number ? "bold" : "normal",
                border: currentPage === number ? "1px solid white" : "none",
              }}>
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
      </div>
      {isModalOpen && (
        <div className="popup-edit-users">
          <span className="btn-close-popup-edit-users" onClick={closeModal}>
            &times;
          </span>
          <h2>Update Role "{userName}" </h2>
          <select className="role" name="role" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">Choose Role</option>
            <option value={"admin"}>Admin</option>
            <option value={"user"}>User</option>
          </select>
          <div className="users-btn-change-role-popup">
            <button onClick={handleChangeUserRole}>Change</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
