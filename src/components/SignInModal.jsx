import ModalWithForm from "./ModalWithForm/ModalWithForm";
import { useForm } from "../Hooks/useForm";

const SignInModal = ({ isOpen, onSignIn, onCloseModal }) => {
  const defaultValues = {
    email: "",
    password: "",
  };

  const { setValues, values, handleChange } = useForm(defaultValues);

  function handleSubmit(evt) {
    evt.preventDefault();
    onSignIn(values)
      .then(() => {
        setValues(defaultValues);
      })
      .catch(console.error);
  }

  return (
    <ModalWithForm
      buttonText="Log In"
      title="Log In"
      redirectButtonText="or Sign Up"
      onCloseModal={onCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="email" className="modal__label">
        Email*{" "}
        <input
          type="email"
          className="modal__input"
          id="email"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password*
        <input
          type="password"
          className="modal__input"
          id="password"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
};

export default SignInModal;
