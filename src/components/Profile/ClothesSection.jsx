import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ClothesSection({ onCardClick, onAddClick, clothes, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = (item) => item.owner === currentUser._id;
  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__title">Your Items</p>
        <button className="clothes-section__add-btn" onClick={onAddClick}>
          {" "}
          + Add New{" "}
        </button>
      </div>
      <ul className="clothes-section__items">
        {clothes
          .filter((item) => isOwn(item))
          .map((item) => (
            <ItemCard
              onCardClick={onCardClick}
              key={item._id}
              item={item}
              onCardLike={onCardLike}
            />
          ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
