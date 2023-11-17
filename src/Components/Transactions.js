import React from "react";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import { useCookies } from "react-cookie";
import Transaction from "./Transaction";
import Register from "./Register";
import { Link } from "react-router-dom";
import chipImg from "../images/chip.png";
import "../css/Transactions.css";

const Transactions = () => {
  const [transactions, setTransactions] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [cards, setCards] = useState(null);
  const [activeCardId, setActiverCardId] = useState(null);

  const getTransactions = async () => {
    try {
      const response = await fetch(
        `https://creditcard-backend-83b305c9c8ed.herokuapp.com/transactions/${cookies.ID}`
      );
      const json = await response.json();
      setTransactions(json);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  const getCards = async () => {
    try {
      const response = await fetch(`https://creditcard-backend-83b305c9c8ed.herokuapp.com/cards/${cookies.ID}`);
      const json = await response.json();
      setCards(json);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getCards();
  }, []);

  const filteredTransactions =
    activeCardId === null
      ? transactions
      : transactions.filter((t) => t.card_id === activeCardId);

  console.log(cards?.length);

  return (
    <>
      {!cards && (
        <h1 style={{ textAlign: "center" }}>You must add a card first</h1>
      )}
      {cookies.AuthToken && cards?.length > 0 && (
        <p className="instructions">Click on a card to view its transactions</p>
      )}
      <div id="transactions-cards-container">
        {cards?.map((c) => {
          return (
            <div
              className={activeCardId === c.id ? "card active-card" : "card"}
              onClick={() => setActiverCardId(c.id)}
            >
              <p className="number">{c.card_number}</p>
              <p className="holder">{c.card_holder.toUpperCase()}</p>
              <p className="type">{c.card_type.toUpperCase()}</p>
              <img className="chip" src={chipImg} />
            </div>
          );
        })}
      </div>

      {cookies.AuthToken && (
        <div id="transactions-btn-container">
          {cards?.length > 0 ? (
            <button className="btn" onClick={() => setShowModal(true)}>
              Add Transaction
            </button>
          ) : (
            <Link to="/add-card">
              <button className="btn" onClick={() => setShowModal(true)}>
                Add Card
              </button>
            </Link>
          )}
          {cards?.length > 0 && (
            <button className="btn" onClick={() => setActiverCardId(null)}>
              View All Transactions
            </button>
          )}
          {showModal && (
            <Modal
              getTransactions={getTransactions}
              creditCards={cards}
              setShowModal={setShowModal}
            />
          )}
        </div>
      )}

      {cookies.AuthToken &&
        transactions &&
        filteredTransactions.map((t) => {
          return (
            <Transaction
              title={t.title}
              month={t.month}
              day={t.day}
              year={t.year}
              transaction_type={t.transaction_type}
              amount={t.amount}
            />
          );
        })}
      {!cookies.AuthToken && <Register />}
    </>
  );
};

export default Transactions;
