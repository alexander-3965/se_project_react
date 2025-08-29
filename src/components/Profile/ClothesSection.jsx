import "./ClothesSection.css";
import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ onCardClick, onAddClick }) {
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
        {defaultClothingItems.map((item) => {
          return (
            <ItemCard onCardClick={onCardClick} key={item._id} item={item} />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
