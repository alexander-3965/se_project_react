import ModalWithForm from "./ModalWithForm/ModalWithForm";
import { useForm } from "../Hooks/useForm";
import { useContext, useEffect } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

const EditProfileModal = ({ isOpen, onEditProfile, onCloseModal }) => {
  const currentUser = useContext(CurrentUserContext);
  const defaultValues = { name: "", avatar: "" };

  const { setValues, values, handleChange } = useForm(defaultValues);

  useEffect(() => {
    if (!isOpen) return;
    if (!currentUser) return;
    setValues({
      name: currentUser.name ?? "",
      avatar: currentUser.avatar ?? "",
    });
  }, [currentUser, isOpen, setValues]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onEditProfile(values)
      .then(() => {
        setValues({
          name: currentUser?.name ?? "",
          avatar: currentUser?.avatar ?? "",
        });
      })
      .catch(console.error);
  }

  return (
    <ModalWithForm
      buttonText="Save Changes"
      title="Change Profile Data"
      onCloseModal={onCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="ChangeName" className="modal__label">
        Name*
        <input
          type="text"
          className="modal__input"
          id="ChangeName"
          name="name"
          placeholder="New Name"
          value={values.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="ChangeAvatar" className="modal__label">
        Avatar*
        <input
          type="text"
          className="modal__input"
          id="ChangeAvatar"
          name="avatar"
          placeholder="New Avatar"
          value={values.avatar}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
