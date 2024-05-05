import React, { useEffect, useState } from "react";
import axios from "axios";

const UpdateRole = (props) => {
  const [role, setRole] = useState("");

  const handleChangeUserRole = (id, role) => {
    const accessToken = localStorage.getItem("access_token");
    axios
      .post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-user-role/${id}`,
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
        getUsers();
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return props.trigger ? (
    <div className="popup">
      <label>Update Role {user.name} </label>
      <form>
        <select name="role" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">-- Change Role--</option>
          <option value={"admin"}>Admin</option>
          <option value={"user"}>User</option>
        </select>
        <button onClick={() => handleChangeUserRole(user.id, role)}>Change Role</button>
      </form>
      <button className="btn-close-popup" onClick={() => props.setTrigger(false)}>
        {" "}
        X{" "}
      </button>
      {props.children}
    </div>
  ) : (
    ""
  );
};

export default UpdateRole;
