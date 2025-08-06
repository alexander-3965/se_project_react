import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css"


function Main({ weatherData, clothes, handleCardClick}) {
    return (
        <main><WeatherCard weatherData={weatherData}/>
            <section className="cards">
                <p className="cards__text">
                    Today is {weatherData.temp.F}&deg; F / You may want to wear:
                </p>
                <ul className="cards__list">
                    {clothes
                    .filter((item) => {
                        return item.weather === weatherData.type;
                    })
                    .map((item) => {
                        return <ItemCard  onCardClick={handleCardClick} key={item._id} item={item} />
                    })
                    }
                </ul>
            </section>
        </main>)
}

export default Main