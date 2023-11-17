import React from "react";
import "../css/Transaction.css";
import up from "../images/up.png";
import down from "../images/down.png";

const Transaction = ({ amount, title, month, day, year, transaction_type }) => {
  return (
    <>
      <div className="transaction-container ">
        <img className="transaction-img" src={transaction_type === "Outgoing" ? down : up} />
        <p className="transaction-title">{title}</p>
        <p>${amount}</p>
        <p className="transaction-date">
          {month}/{day}/{year}
        </p>
      </div>
    </>
  );
};

export default Transaction;
