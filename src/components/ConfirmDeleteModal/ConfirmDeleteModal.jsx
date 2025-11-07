import "./ConfirmDeleteModal.css";

const ConfirmDeleteModal = ({ onDeleteItem, onCancel, isOpen, card }) => {
  const handleDeleteClick = () => {
    onDeleteItem(card);
  };

  return (
    <div className={`delete-modal ${isOpen ? "delete-modal_opened" : ""}`}>
      <div className="delete-modal__content">
        <p className="delete-modal__text">
          Are you sure you want to delete this item? This action is
          irreversible.
        </p>
        <button
          className="delete-modal__delete-btn"
          onClick={handleDeleteClick}
        >
          Yes, delete item
        </button>
        <button className="delete-modal__cancel-btn" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
