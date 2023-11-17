import React from "react";
import { useState } from "react";
import { Cookies, useCookies } from "react-cookie";
import "../css/Register.css";

const Register = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [status, setStatus] = useState("Login");
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    username: "",
    password: "",
    income: "",
    savings: "",
  });

  console.log(cookies);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`https://creditcard-backend-83b305c9c8ed.herokuapp.com/auth/${status}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    setFormData({});

    const data = await response.json();

    console.log(data)

    if (data.detail) {
      setError(data.detail);
    } else if (data === "User does not exist or password is incorrect") {
      setError(data);
    } else {
      setCookie("AuthToken", data.token);
      setCookie("Username", data.username);
      setCookie("ID", data.id);
      setCookie("Income", data.income);
      setCookie("Savings", data.savings)
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleClick = (newStatus) => {
    setFormData({});
    setStatus(newStatus);
  };

  return (
    <>
      <div id="main-register">
        <div id="register-container" className="flex-column">
          <form className="flex-column center" onSubmit={handleSubmit}>
            <h1>{status}</h1>
            {status === "Register" && (
              <input
                required
                onChange={handleChange}
                placeholder="first name"
                name="first_name"
                className="input"
                value={formData.first_name?.replace(/[^A-Za-z]/gi, "") || ""}
              ></input>
            )}
            {status === "Register" && (
              <input
                required
                onChange={handleChange}
                placeholder="last name"
                name="last_name"
                className="input"
                value={formData.last_name?.replace(/[^A-Za-z]/gi, "") || ""}
              ></input>
            )}{" "}
            {status === "Register" && (
              <input
                required
                onChange={handleChange}
                placeholder="income"
                name="income"
                className="input"
                value={formData.income?.replace(/\D/g, "") || ""}
              ></input>
            )}
            {status === "Register" && (
              <input
                required
                onChange={handleChange}
                placeholder="savings"
                name="savings"
                className="input"
                value={formData.savings?.replace(/\D/g, "") || ""}
              ></input>
            )}
            {status === "Register" && (
              <input
                required
                onChange={handleChange}
                placeholder="phone"
                name="phone"
                className="input"
                minLength="10"
                maxLength="10"
                value={formData.phone?.replace(/\D/g, "") || ""}
              ></input>
            )}
            <input
              required
              minLength="5"
              onChange={handleChange}
              placeholder="username"
              name="username"
              className="input"
              value={formData.username || ""}
            ></input>
            <input
              required
              minLength="5"
              onChange={handleChange}
              type="password"
              placeholder="password"
              name="password"
              className="input"
              value={formData.password || ""}
            ></input>
            {error && <p className="error">{error}</p>}
            <button id="login-submit" className="btn submit" type="submit">
              Submit
            </button>
            {status === "Login" && (
              <p>
                Don't have an account?{" "}
                <span onClick={() => setStatus("Register")}>Sign Up</span>
              </p>
            )}
            {status === "Register" && (
              <p>
                Already have an account?{" "}
                <span onClick={() => setStatus("Login")}>Log In</span>
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
