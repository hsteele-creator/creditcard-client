import React from "react";
import "../css/Modal.css";
import { useState } from "react";
import closed from "../images/closed.png";
import { useCookies } from "react-cookie";

const Modal = ({ setShowModal, creditCards, getTransactions }) => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState(null);
  const [transaction, setTransaction] = useState({
    title: "",
    amount: "",
    month: "",
    day: "",
    year: "",
    user_id: cookies.ID,
    card_number: "",
    transaction_type: "Outgoing",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTransaction({
      ...transaction,
      [name]: value,
    });
  };

  const handleSelectChange = (e) => {
    setDisabled(true);
    setTransaction({
      ...transaction,
      card_number: e.target.value,
    });
  };

  const handleTypeChange = (e) => {
    setTransaction({
      ...transaction,
      transaction_type: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (transaction.card_number !== "") {
      try {
        const response = await fetch(
          `https://creditcard-backend-83b305c9c8ed.herokuapp.com/transactions/add-transaction`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(transaction),
          }
        );

        const data = await response.json()
        .then(data => {
          setTransaction({})
          setShowModal(false)
          alert('Transaction added succesfully!')
        }).then(data => {
          getTransactions()
        })


      } catch (e) {
        console.error(e);
      }
    } else {
      setError('Please choose a card first')
    }
  };

  return (
    <>
      <div id="modal-container" className="center flex-column">
        <button
          id="close-modal-btn"
          className="btn"
          onClick={() => setShowModal(null)}
        >
          <img src={closed} />
        </button>

        {/* {creditCards?.length < 1 && <h3 className="error">You must add a card first!</h3>} */}

        <h3>Fill in transaction details below</h3>

        <form id="modal-container-form" onSubmit={handleSubmit}>
          <input
            value={transaction.title || ""}
            required
            onChange={handleChange}
            name="title"
            placeholder="title"
            className="input"
          ></input>
          <input
            value={transaction.amount?.replace(/\D/g, "") || ""}
            required
            onChange={handleChange}
            name="amount"
            placeholder="amount"
            className="input"
          ></input>
          <input
            value={transaction.month?.replace(/\D/g, "") || ""}
            minLength="2"
            maxLength="2"
            required
            onChange={handleChange}
            name="month"
            placeholder="month"
            className="input"
          ></input>
          <input
            value={transaction.day?.replace(/\D/g, "") || ""}
            minLength="2"
            maxLength="2"
            required
            onChange={handleChange}
            name="day"
            placeholder="day"
            className="input"
          ></input>
          <input
            value={transaction.year?.replace(/\D/g, "") || ""}
            minLength="4"
            maxLength="4"
            required
            onChange={handleChange}
            name="year"
            placeholder="year"
            className="input"
          ></input>

          <div id="selects-container">
            <select onChange={handleTypeChange}>
              <option value="Outgoing">Outgoing</option>
              <option value="Incoming">Incoming</option>
            </select>

            <select onChange={handleSelectChange} value={transaction.card_number}>
              <option disabled={disabled}>Choose a Card</option>
              {creditCards &&
                creditCards.map((c) => {
                  return <option value={c.card_number}>{c.card_number}</option>;
                })}
            </select>
          </div>

          {error && <p>{error}</p>}

          <button className="btn submit-modal-btn">Submit</button>
        </form>
      </div>
    </>
  );
};

export default Modal;
