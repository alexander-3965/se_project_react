import "./SideBar.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function SideBar({ onChangeProfileClick, onLogoutClick }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <div className="sidebar__profile">
        <img src={currentUser.avatar} alt="" className="sidebar__avatar" />
        <p className="sidebar__username">{currentUser.name}</p>
      </div>
      <button className="sidebar__edit-profile" onClick={onChangeProfileClick}>
        Change Profile data
      </button>
      <button className="sidebar__logout" onClick={onLogoutClick}>
        Log Out
      </button>
    </div>
  );
}

export default SideBar;
