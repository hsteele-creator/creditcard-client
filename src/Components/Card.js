import chip from "../images/chip.png";
import "../css/Card.css"
const Card = ({ card_number, card_holder, card_type, chip }) => {
  return (
    <>
      <div className="card">
        {" "}
        <p className="number">{card_number}</p>
        <p className="holder">{card_holder.toUpperCase()}</p>
        <p className="type">{card_type.toUpperCase()}</p>
        <img className="chip" src={chip} />
      </div>
    </>
  );
};

export default Card;
