import "./Header.css"; 
import logo from "../../assets/logo.svg"
import avatar from "../../assets/avatar.png"


function Header({ handleAddClick, weatherData }) {

    const currentDate = new Date().toLocaleString('default', { 
        month: 'long', 
        day: 'numeric', 
    });

    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="logo" />
            <p className="header__date-location">{currentDate}, {weatherData.city}</p>
            <button onClick={handleAddClick} className="header__add-clothes-button" type="button" >+ Add Clothes</button>
            <div className="header__user-container">
                <p className="header__username">Alexander Rocha</p>
                <img src={avatar} alt= "Alexander Rocha Avatar" className="header__avatar" />
            </div>
        </header>

    )
}
export default Header;