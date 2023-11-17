import React from "react";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Transaction from "./Transaction";
import CircleCharts from "./CircleCharts";
import Register from "./Register";
import "../css/Main.css";
import Card from "./Card";
import { Link } from "react-router-dom";

const Main = () => {
  const [cards, setCards] = useState(null);
  const [transactions, setTransactions] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const getCards = async () => {
    try {
      const response = await fetch(`http://localhost:8000/cards/${cookies.ID}`);
      const json = await response.json();
      console.log(cookies.ID);
      setCards(json);
    } catch (e) {
      console.error(e);
    }
  };

  const getTransactions = async () => {
    console.log(transactions);
    try {
      const response = await fetch(
        `http://localhost:8000/transactions/${cookies.ID}`
      );
      const json = await response.json();
      setTransactions(json);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getCards();
    getTransactions();
  }, []);

  console.log(cookies);

  return (
    <>
      {cookies.AuthToken && (
        <div id="main-container">
          <div id="main-cards-transactions">
            <h1 id="main-title">Welcome back {cookies.Username} !</h1>

            <div id="main-cards">
              <div id="main-cards-container">
                {cards?.slice(0, 3).map((c) => {
                  return (
                    <Card
                      card_holder={c.card_holder}
                      card_number={c.card_number}
                      card_type={c.card_type}
                    />
                  );
                })}
              </div>
              {cards?.length !== 0 && (
                <Link to="/manage-cards">
                  <button className="btn">View All Cards</button>
                </Link>
              )}
            </div>

            <div id="main-transactions">
              {transactions?.slice(0, 3)?.map((t) => {
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

              {cards?.length === 0 && <h2>You must add a card first!</h2>}
              {cards?.length === 0 && (
                <Link to="/add-card">
                  <button className="btn">Add Card</button>
                </Link>
              )}
              {cards && transactions?.length > 0 && (
                <Link to="/transactions">
                  <button className="btn">View All Transactions</button>
                </Link>
              )}
              {cards && transactions?.length === 0 && (
                <>
                  <h2 style={{color : "#5A1CD4"}}>There are currently no transactions</h2>
                  <Link to="/transactions">
                    <button className="btn">Add a transaction</button>
                  </Link>
                </>
              )}
            </div>
          </div>

          <CircleCharts savings={cookies.Savings} income={cookies.Income} />
        </div>
      )}
      {!cookies.AuthToken && <Register />}
    </>
  );
};

export default Main;
