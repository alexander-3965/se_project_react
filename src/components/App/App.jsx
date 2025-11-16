import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import "./App.css";
import {
  coordinates,
  apiKey,
  defaultClothingItems,
} from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import AddItemModal from "../../components/AddItemModal";
import RegisterModal from "../../components/RegisterModal/RegisterModal";
import SignInModal from "../../components/SignInModal";
import EditProfileModal from "../EditProfileModal.jsx";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal.jsx";
import { getWeather, processWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTempuratureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import {
  getItems,
  addItems,
  removeItems,
  getUserInfo,
  editUserInfo,
  addCardLike,
  removeCardLike,
} from "../../utils/api.js";
import { signUp, signIn } from "../../utils/auth.js";
import { getToken, setToken } from "../../utils/token.js";
import ProtectedRoute from "../ProtectedRoute";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "cold",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState(" ");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [currentUser, setCurrentUser] = useState({
    email: "",
    name: "",
    avatar: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const handleDeleteClick = () => {
    setActiveModal("confirm-delete");
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleSignUpClick = () => {
    setActiveModal("register");
  };

  const handleLogInClick = () => {
    setActiveModal("signIn");
  };

  const handleLogoutClick = () => {
    setIsLoggedIn(false);
    setCurrentUser({ email: "", name: "", avatar: "" });
    setToken("");
    navigate("/");
  };

  const handleChangeProfileClick = () => {
    setActiveModal("edit-profile");
  };

  const onAddItem = (inputValues) => {
    const token = getToken();
    return addItems(inputValues, token)
      .then(({ data }) => {
        const newCardData = {
          name: data.name,
          imageUrl: data.imageUrl,
          weather: data.weather,
          _id: data._id,
          owner: data.owner,
        };
        setClothingItems([newCardData, ...clothingItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const onRegister = (user) => {
    return signUp(user)
      .then((data) => {
        return signIn({ email: user.email, password: user.password });
      })
      .then((loginData) => {
        localStorage.setItem("jwt", loginData.token);
        setIsLoggedIn(true);

        return getUserInfo(loginData.token);
      })
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeActiveModal();
        navigate("/");
      })
      .catch(console.error);
  };

  const onSignIn = (user) => {
    return signIn(user)
      .then((data) => {
        getUserInfo(data.token).then(({ name, avatar, _id }) => {
          setCurrentUser({
            name: name,
            avatar: avatar,
            _id: _id,
          });
        });
        setIsLoggedIn(true);
        closeActiveModal();
        if (data.token) {
          setToken(data.token);
          setTimeout(() => {
            return navigate("/");
          }, 0);
        }
      })
      .catch(console.error);
  };

  const onEditProfile = (user) => {
    const token = getToken();
    return editUserInfo(user, token)
      .then((data) => {
        setCurrentUser(data);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const onDeleteItem = (item) => {
    const token = getToken();
    removeItems(item, token)
      .then(() => {
        setClothingItems(
          clothingItems.filter((currentItem) => {
            return item._id !== currentItem._id;
          })
        );
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleCardLike = (_id, isLiked) => {
    const token = localStorage.getItem("jwt");
    !isLiked
      ? addCardLike(_id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === _id ? updatedCard.data : item))
            );
          })
          .catch((err) => console.log(err))
      : removeCardLike(_id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === _id ? updatedCard.data : item))
            );
          })
          .catch((err) => console.log(err));
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch((error) => console.error);
    getWeather(coordinates, apiKey)
      .then((data) => {
        const processedData = processWeatherData(data);
        setWeatherData(processedData);
      })
      .catch((error) => console.error);
  }, []);

  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };
    document.addEventListener("keydown", closeByEscape);

    return () => document.removeEventListener("keydown", closeByEscape);
  }, []);

  useEffect(() => {
    const jwt = getToken();

    if (!jwt) {
      return;
    }

    getUserInfo(jwt)
      .then(({ name, avatar, _id }) => {
        setIsLoggedIn(true);
        setCurrentUser({ name, avatar, _id });
        return navigate("/");
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              isLoggedIn={isLoggedIn}
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              handleSignUpClick={handleSignUpClick}
              handleLogInClick={handleLogInClick}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    isLoggedIn={isLoggedIn}
                    handleCardLike={handleCardLike}
                    clothes={clothingItems}
                    handleCardClick={handleCardClick}
                    weatherData={weatherData}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      isLoggedIn={isLoggedIn}
                      handleCardLike={handleCardLike}
                      onCardClick={handleCardClick}
                      handleChangeProfileClick={handleChangeProfileClick}
                      handleLogoutClick={handleLogoutClick}
                      handleAddClick={handleAddClick}
                      clothingItems={clothingItems}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="*"
                element={
                  isLoggedIn ? (
                    <Navigate to="/profile" replace />
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              />
            </Routes>

            <AddItemModal
              onCloseModal={closeActiveModal}
              isOpen={activeModal === "add-garment"}
              onAddItem={onAddItem}
              isLoggedIn={isLoggedIn}
            ></AddItemModal>

            <RegisterModal
              onCloseModal={closeActiveModal}
              isOpen={activeModal === "register"}
              onRegister={onRegister}
            ></RegisterModal>

            <SignInModal
              onCloseModal={closeActiveModal}
              isOpen={activeModal === "signIn"}
              onSignIn={onSignIn}
            ></SignInModal>

            <EditProfileModal
              onCloseModal={closeActiveModal}
              isOpen={activeModal === "edit-profile"}
              onEditProfile={onEditProfile}
            ></EditProfileModal>

            <ItemModal
              activeModal={activeModal}
              card={selectedCard}
              isOpen={activeModal === "preview"}
              handleCloseClick={closeActiveModal}
              handleDeleteClick={handleDeleteClick}
              onDeleteItem={onDeleteItem}
            />

            <ConfirmDeleteModal
              card={selectedCard}
              isOpen={activeModal === "confirm-delete"}
              onDeleteItem={onDeleteItem}
              onCancel={closeActiveModal}
            />
            <Footer />
          </div>
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
