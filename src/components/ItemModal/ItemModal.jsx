import "./ItemModal.css";
import closeBtn from "../../assets/close-btn-white.svg";

function ItemModal({ activeModal, card, handleCloseClick }) {
  return (
    <div className={`modal ${activeModal == "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__close-btn"
        >
          <img src={closeBtn} alt="close button" />
        </button>
        <img src={card.link} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
