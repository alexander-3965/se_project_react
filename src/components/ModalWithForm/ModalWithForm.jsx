import "./ModalWithForm.css";
import closeBtn from "../../assets/close-btn-grey.svg";

function ModalWithForm({
  children,
  title,
  buttonText,
  onSubmit,
  isOpen,
  onCloseModal,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={onCloseModal}
          type="button"
          className="modal__close-btn"
        >
          <img src={closeBtn} alt="close button" />
        </button>
        <form className="modal__form" onSubmit={onSubmit}>
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
