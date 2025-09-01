import ModalWithForm from "./ModalWithForm/ModalWithForm";
import { useForm } from "../Hooks/useForm";

const AddItemModal = ({ isOpen, onAddItem, onCloseModal }) => {
  const defaultValues = {
    name: "",
    imageUrl: "",
    weatherType: "",
  };

  const { setValues, values, handleChange } = useForm(defaultValues);

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddItem(values)
      .then(() => {
        setValues(defaultValues);
      })
      .catch(console.error);
  }

  return (
    <ModalWithForm
      buttonText="Add Garment"
      title="New Garment"
      onCloseModal={onCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          name="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          name="imageUrl"
          placeholder="Image URL"
          value={values.imageUrl}
          onChange={handleChange}
        />
      </label>
      <fieldset className="modal__radio-btn">
        <legend className="modal__legend">Select the weather type</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            value="hot"
            type="radio"
            name="weatherType"
            className="modal__radio-input"
            onChange={handleChange}
            checked={values.weatherType === "hot" ? true : false}
          />
          Hot
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            value="cold"
            type="radio"
            name="weatherType"
            className="modal__radio-input"
            checked={values.weatherType === "cold" ? true : false}
            onChange={handleChange}
          />
          Cold
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            value="warm"
            type="radio"
            checked={values.weatherType === "warm" ? true : false}
            name="weatherType"
            className="modal__radio-input"
            onChange={handleChange}
          />
          Warm
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
