import React from "react";
import "../css/EditProfile.css";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Register from "./Register";
import { redirect } from "react-router-dom";

const EditProfile = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [userData, setUserData] = useState(null);

  const getUserData = async () => {
    try {
      const response = await fetch(
        `https://creditcard-backend-83b305c9c8ed.herokuapp.com/auth/user-data/${cookies.Username}`
      );
      const json = await response.json();
      setUserData(json);
    } catch (e) {
      console.error(e);
    }
  };


  useEffect(() => {
    redirect()
    getUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `https://creditcard-backend-83b305c9c8ed.herokuapp.com/auth/update-user/${cookies.ID}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      }
    );

    const data = await response.json();

    console.log(data);
  };

  return (
    <>
      {cookies.AuthToken &&<h1 id="edit-header">Edit Profile</h1>}

      {cookies.AuthToken &&<div id="edit-profile-container">
        <form
          id="edit-profile-container-form"
          className="flex-column"
          onSubmit={handleSubmit}
        >
          <input
            onChange={handleChange}
            value={(userData && userData.first_name.replace(/[^A-Za-z]/gi, "")) || ""}
            className="input"
            placeholder="first name"
            name="first_name"
            required
          ></input>
          <input
            onChange={handleChange}
            value={userData && userData.last_name.replace(/[^A-Za-z]/gi, "")}
            className="input"
            placeholder="last name"
            name="last_name"
            required
          ></input>
          <input
            onChange={handleChange}
            value={(userData && userData.username) || ""}
            className="input"
            placeholder="username"
            name="username"
            minLength="5"
            required
          ></input>
          <input
            onChange={handleChange}
            value={(userData && userData.phone.replace(/\D/g, "")) || ""}
            className="input"
            name="phone"
            minLength="10"
            maxLength="10"
            placeholder="phone number"
            required
          ></input>
          <input
            onChange={handleChange}
            className="input"
            name="new_password"
            placeholder="enter new password"
            // required
          ></input>

          <button className="btn">Update Profile</button>
        </form>
      </div>}
      {!cookies.AuthToken && <Register />}
    </>
  );
};

export default EditProfile;
