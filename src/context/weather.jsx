import React from "react";

const weatherContext = React.createContext({
    city: '',
    country: '',
    forecast: [],
    time: '',
    weather: '',
    temp: '',
    icon: '',
    windSpeed: '',
    setWeather: (weatherObj) => { },
    setCity: (city) => { },
    setForecast: (forecastArr) => { },
})
export default weatherContext;