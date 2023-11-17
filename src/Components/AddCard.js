import React from "react";
import "../css/AddCard.css";
import { useState } from "react";
import chipImg from "../images/chip.png";
import {useCookies } from "react-cookie";
import Register from "./Register"

const AddCard = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);

  const [cardData, setCardData] = useState({
    card_number: "",
    cvv: "",
    card_type: "",
    exp_month: "",
    exp_year: "",
    card_holder: "",
    user_id : cookies.ID
  });
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardData({
      ...cardData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // https://creditcard-backend-83b305c9c8ed.herokuapp.com


    const response = await fetch("https://creditcard-backend-83b305c9c8ed.herokuapp.com/cards/add-card", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cardData),
    });

    setCardData(({}))

    const data = await response.json();

    if(!data.detail) {
      alert('Card added succesfully!')
    } else {
      setError(data.detail)
    }
  };

  return (
    <>
      {cookies.AuthToken && <div id="add-card-main" className="flex-column">
        <div id="card-holder-container">
          <div className="card front">
            <img className="chip-img" src={chipImg} />
            <p className="card-number">
              {cardData.card_number?.replace(/\d{4}(?=.)/g, "$& ")}
            </p>

            <p className="card-exp">
              {cardData.exp_month}
              {cardData.exp_month && "/"}
              {cardData.exp_year}
            </p>
          </div>

          <div className="card back">
            <p className="card-type">{cardData.card_type?.toUpperCase()}</p>
            <p className="card-holder">{cardData.card_holder}</p>
            <p className="card-cvv">{cardData.cvv}</p>
          </div>
        </div>

        <div id="add-card-container">
          <h1>Add Card</h1>

          <form className="flex-column" onSubmit={handleSubmit}>
            <input
              onChange={handleChange}
              minLength="16"
              maxLength="16"
              value={cardData.card_number?.replace(/\D/g, "") || ""}
              name="card_number"
              placeholder="card number"
              className="input"
            ></input>
            <input
              minLength="3"
              maxLength="4"
              onChange={handleChange}
              value={cardData.cvv?.replace(/\D/g, "") || ""}
              name="cvv"
              placeholder="cvv"
              className="input"
            ></input>
            <input
              minLength="4"
              onChange={handleChange}
              value={cardData.card_type?.replace(/[^A-Za-z]/gi, "") || ""}
              name="card_type"
              placeholder="card type"
              className="input"
              maxLength="10"
            ></input>
            <input
              minLength="2"
              maxLength="2"
              onChange={handleChange}
              value={cardData.exp_month?.replace(/\D/g, "") || ""}
              name="exp_month"
              placeholder="exp month (2 numbers)"
              className="input"
            ></input>
            <input
              minLength="2"
              maxLength="2"
              onChange={handleChange}
              value={cardData.exp_year?.replace(/\D/g, "") || ""}
              name="exp_year"
              placeholder="exp year (2 numbers)"
              className="input"
            ></input>
            <input
              onChange={handleChange}
              value={
                cardData.card_holder?.replace(/\d+|^\s+$/g, "")
                  .replace(/\s+/g, " ") || ""
              }
              name="card_holder"
              placeholder="card holder"
              className="input"
              maxLength="12"
            ></input>

            {error && <p>{error}</p>}

            <button className="btn">Add Card</button>
          </form>
        </div>
      </div>}
      {!cookies.AuthToken && <Register />}
    </>
  );
};

export default AddCard;
