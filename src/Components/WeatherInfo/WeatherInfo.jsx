import classes from './WeatherInfo.module.css'
import weatherContext from '../../context/weather'
import { useContext, useState, useRef } from 'react'
import useFetch from '../../hooks/useFetch';
import Card from '../UI/Card/Card';

export default function WeatherInfo() {
    const weatherCxt = useContext(weatherContext);

    let days = ['Sunday', "Monday", 'Tueday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let months = ['January', 'February', 'March', 'April', "May", 'June', 'July', "August", "September", "October", "November", "December"];

    const dateObj = new Date(weatherCxt.time);
    const date = `${days[dateObj.getDay()]}, ${months[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.getFullYear()}`

    const selectRef = useRef();

    const [forecasted, setForecasted] = useState(false);
    const { error, isLoading, getWeather } = useFetch();

    function dataFunc(data) {
        setForecasted(true);
        let forecastArr = [];
        for (let i = 1; i < data.forecast.forecastday.length; i++) {
            const dateObj = new Date(data.forecast.forecastday[i].date.slice(0, 10));
            const date = `${days[dateObj.getDay()]}, ${months[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.getFullYear()}`
            forecastArr.push({
                id: data.forecast.forecastday[i].date_epoch,
                date,
                weather: data.forecast.forecastday[i].day.condition.text,
                icon: data.forecast.forecastday[i].day.condition.icon,
                temp: data.forecast.forecastday[i].day.avgtemp_c,
                windSpeed: data.forecast.forecastday[i].day.maxwind_kph,
            })
        }
        console.log(forecastArr);
        weatherCxt.setForecast(forecastArr);
    }

    const forecastedData = <div className={classes.daysContainer}>
        {weatherCxt.forecast.map(day => {
            return <Card className={classes.forecastDay} key={day.id}>
                <h5>{day.date}</h5>
                <img src={day.icon} alt="weather icon" />
                <h4 className={day.weather === 'Sunny' ? classes.sunny : day.weather.includes('rain') ? classes.rainy : classes.cloudy} style={{ marginBottom: '0' }}>{day.temp}°C, {day.weather}</h4>
                <p style={{ marginTop: '10px' }}>Wind Speed: {day.windSpeed} km/h</p>
            </Card>
        })}
    </div>

    function forecastHandler(e) {
        const numDays = Number(selectRef.current.value) + 1;
        e.preventDefault();
        getWeather('forecast', dataFunc, `&q=${weatherCxt.city}&days=${numDays}&aqi=no&alerts=no`);
    }
    return <>
        <section className={classes.currentSection}>
            <h2 style={{ marginBottom: '0' }}>City: {weatherCxt.city}, {weatherCxt.country}</h2>
            <h3>{date}</h3>
            <img className={classes.currentImage} src={weatherCxt.icon} alt="Weather icon" />
            <h2 className={weatherCxt.weather === 'Sunny' ? classes.sunny : weatherCxt.weather.includes('rain') ? classes.rainy : classes.cloudy}
                style={{ marginBottom: '0' }}>{weatherCxt.weather} , {weatherCxt.temp}°C</h2>
            <p>Wind Speed: {weatherCxt.windSpeed} km/h</p>
            {/* select a number of days then give that input to submithandler which makes the url dynamic according to the num of days */}
            <form onSubmit={forecastHandler}>
                <span>Check forecast for next </span>
                <select className={classes.numDays} defaultValue={7} ref={selectRef} id="numDays">
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                    <option value={8}>8</option>
                    <option value={9}>9</option>
                    <option value={10}>10</option>
                </select>
                <span> Days </span>
                <button type='submit' className={classes.forecastBtn}>Check</button>
            </form>
        </section >
        {isLoading && <h2>Getting Forecast...</h2>
        }
        {!isLoading && error && <h2>Error occured while cheking Forecast: {error.message}</h2>}
        {
            !isLoading && !error && forecasted && <section className={classes.sectionFor}>
                <h2>{selectRef.current.value === '1' ? `Tomorrow's Weather:` : `Upcoming ${selectRef.current.value} Days Weather:`} </h2>
                {forecastedData}
            </section>
        }
    </>
}