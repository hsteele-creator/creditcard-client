import "../css/ManageCards.css";
import React from "react";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import chip from "../images/chip.png";
import Card from "./Card";
import Register from "./Register"

const ManageCards = () => {
  const [cards, setCards] = useState(null);
  const [activeCard, setActiveCard] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [openWarning, setOpenWarning] = useState(null);
  const [cardModal, setCardModal] = useState(null);

  const getCards = async () => {
    try {
      const response = await fetch(`http://localhost:8000/cards/${cookies.ID}`);
      const json = await response.json();
      setCards(json);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getCards();
  }, []);

  const handleOpenDelete = (card) => {
    setOpenWarning(true);
    setActiveCard(card);
  };

  const handleOpenEdit = (card) => {
    setCardModal(true);
    setActiveCard(card);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setActiveCard({
      ...activeCard,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('clicked')

    const response = await fetch("http://localhost:8000/cards/update-card", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(activeCard),
      });

      const data = await response.json()
      console.log(data)
      getCards()
      setCardModal(null)
  }

  const handleDelete = async() => {
    const response = await fetch(`http://localhost:8000/cards/delete-card/${activeCard.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }); 
      getCards();
      setOpenWarning(null)
  }

  console.log(activeCard?.id)

  return (
    <>
      {cookies.AuthToken && <div id="manage-cards-container">
        {cards?.map((c) => {
          return (
            <div>
              <Card
                card_holder={c.card_holder}
                card_number={c.card_number}
                card_type={c.card_type}
              />
              <div id="btn-container">
                <button onClick={() => handleOpenDelete(c)} className="btn">
                  Delete
                </button>
                <button onClick={() => handleOpenEdit(c)} className="btn">
                  Edit
                </button>
              </div>
            </div>
          );
        })}
        {openWarning && (
          <div className="manage-warning">
            {" "}
            <button className="close-btn" onClick={() => setOpenWarning(null)}>
              X
            </button>
            <h3>
              Are you sure you want to delete card ending in{" "}
              {activeCard.card_number.slice(-4)}
            </h3>
            <button className="delete-btn" onClick={handleDelete}>Yes</button>
          </div>
        )}{" "}
        {cardModal && (
          <div id="edit-card-form">
            <button
              className="edit-form-btn"
              onClick={() => setCardModal(null)}
            >
              x
            </button>
            <form onSubmit={handleSubmit}>
              <input
                className="input"
                onChange={handleChange}
                minLength="16"
                maxLength="16"
                value={activeCard.card_number?.replace(/\D/g, "") || ""}
                name="card_number"
                placeholder="card number"
              ></input>
              <input
                className="input"
                minLength="3"
                maxLength="4"
                onChange={handleChange}
                value={activeCard.cvv?.replace(/\D/g, "") || ""}
                name="cvv"
                placeholder="cvv"
              ></input>
              <input
                className="input"
                minLength="4"
                onChange={handleChange}
                value={activeCard.card_type?.replace(/[^A-Za-z]/gi, "") || ""}
                name="card_type"
                placeholder="card type"
              ></input>
              <input
                className="input"
                minLength="2"
                maxLength="2"
                onChange={handleChange}
                value={activeCard.exp_month?.replace(/\D/g, "") || ""}
                name="exp_month"
                placeholder="exp month (2 numbers)"
              ></input>
              <input
                className="input"
                minLength="2"
                maxLength="2"
                onChange={handleChange}
                value={activeCard.exp_year?.replace(/\D/g, "") || ""}
                name="exp_year"
                placeholder="exp year (2 numbers)"
              ></input>
              <input
                className="input"
                onChange={handleChange}
                value={
                  activeCard.card_holder
                    ?.replace(/\d+|^\s+$/g, "")
                    .replace(/\s+/g, " ") || ""
                }
                name="card_holder"
                placeholder="card holder"
                maxLength="12"
              ></input>
              <button id="edit-card-btn">Edit Card</button>
            </form>
          </div>
        )}
      </div>}
      {!cookies.AuthToken && <Register />}
    </>
  );
};

export default ManageCards;
