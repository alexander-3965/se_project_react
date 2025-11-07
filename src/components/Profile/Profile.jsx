import "./Profile.css";
import SideBar from "./SideBar";
import ClothesSection from "./ClothesSection";

function Profile({
  onCardClick,
  handleAddClick,
  clothingItems,
  handleCardLike,
  handleChangeProfileClick,
  handleLogoutClick,
  isLoggedIn,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          onChangeProfileClick={handleChangeProfileClick}
          onLogoutClick={handleLogoutClick}
        />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          isLoggedIn={isLoggedIn}
          onCardLike={handleCardLike}
          onCardClick={onCardClick}
          onAddClick={handleAddClick}
          clothes={clothingItems}
        />
      </section>
    </div>
  );
}

export default Profile;
