import "../ItemCard/ItemCard.css"

function ItemCard({ item, onCardClick }){

   const handleCardClick = () => {
      onCardClick(item);
      }

    return (             
       <div className="item-cards">
            <h2 className="item-cards__name">{item.name}</h2>
            <img onClick={handleCardClick} src={item.link} alt={item.name} className="item-cards__image" />
         </div>)
}

export default ItemCard;