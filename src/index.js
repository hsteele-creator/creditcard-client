import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import Register from "./Components/Register";
import AddCard from "./Components/AddCard";
import Transactions from "./Components/Transactions";
import EditProfile from "./Components/EditProfile";
import Nav from "./Components/Nav";
import Main from "./Components/Main";
import ManageCards from "./Components/ManageCards"
import App from "./App";


import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Nav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Register />} />
        <Route path="edit-profile" element={<EditProfile />} />
        <Route path="add-card" element={<AddCard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/manage-cards" element={<ManageCards />} />
      </Routes>
    </React.StrictMode>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
