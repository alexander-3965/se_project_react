import "./ModalWithForm.css";
import closeBtn from "../../assets/close-btn-grey.svg";

function ModalWithForm({
  children,
  title,
  buttonText,
  // activeModal,
  isOpen,
  handleCloseClick,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__close-btn"
        >
          <img src={closeBtn} alt="close button" />
        </button>
        <form className="modal__form" action="submit">
          {children}
          <button type="submit" className="modal__submit-btn">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
