import "./ItemModal.css";
import closeBtn from "../../assets/close-btn-white.svg";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ activeModal, card, handleCloseClick, handleDeleteClick }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwner = card?.owner === currentUser?._id;

  const itemDeleteButtonClassName = isOwner
    ? "modal__delete-btn"
    : "modal__delete-btn_hidden";
  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__item-container ">
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__close-btn"
        >
          <img src={closeBtn} alt="close button" />
        </button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <div className="modal__info">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          <button
            className={itemDeleteButtonClassName}
            onClick={handleDeleteClick}
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
