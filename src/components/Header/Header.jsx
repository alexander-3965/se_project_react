import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  isLoggedIn,
  handleAddClick,
  weatherData,
  handleSignUpClick,
  handleLogInClick,
}) {
  const currentUser = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="logo" />
      </Link>
      <p className="header__date-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
      {isLoggedIn && (
        <button
          onClick={handleAddClick}
          className="header__add-clothes-button"
          type="button"
        >
          + Add Clothes
        </button>
      )}
      {!isLoggedIn && (
        <div>
          <button
            onClick={handleSignUpClick}
            className="header__add-clothes-button"
            type="button"
          >
            Sign Up
          </button>
          <button
            onClick={handleLogInClick}
            className="header__add-clothes-button"
            type="button"
          >
            Log In
          </button>
        </div>
      )}
      {isLoggedIn && (
        <Link to="/profile" className="header__link">
          <div className="header__user-container">
            <p className="header__username">{currentUser.name}</p>
            {currentUser.avatar && (
              <img
                src={currentUser.avatar}
                alt="User avatar"
                className="header__avatar"
              />
            )}
            {!currentUser.avatar && currentUser.name && currentUser.name[0] && (
              <p className="header__initial">{currentUser.name[0]}</p>
            )}
          </div>
        </Link>
      )}
    </header>
  );
}
export default Header;
