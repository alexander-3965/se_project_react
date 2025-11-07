import "./ItemCard.css";
import likeBtn from "../../assets/like-button.svg";
import likeBtnActive from "../../assets/like-button-active.svg";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ isLoggedIn, item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const isLiked = item.likes ? item.likes.includes(currentUser._id) : false;

  const isOwn = item.owner === currentUser._id;

  const handleCardClick = () => {
    onCardClick(item);
  };
  const handleLike = () => {
    onCardLike(item._id, isLiked);
  };

  return (
    <div className="item-cards">
      <div className="item-cards__header">
        <h2 className="item-cards__name">{item.name}</h2>
        {isLoggedIn && (
          <button
            onClick={handleLike}
            className="item-cards__like-button"
            type="button"
          >
            <img src={isLiked ? likeBtnActive : likeBtn} alt="like button" />
          </button>
        )}
      </div>
      <img
        onClick={handleCardClick}
        src={item.imageUrl}
        alt={item.name}
        className="item-cards__image"
      />
    </div>
  );
}

export default ItemCard;
