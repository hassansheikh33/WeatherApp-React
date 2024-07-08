import React, { useReducer } from "react";
import weatherContext from "./weather";

let initWeather = {
  city: "",
  country: "",
  time: "",
  weather: "",
  temp: "",
  icon: "",
  windSpeed: "",
  forecast: [],
  expired: false,
};

function weatherReducer(prevState, action) {
  if (action.type === "OK") {
    return {
      ...prevState,
      ...action.value,
    };
  }
  if (action.type === "INPUT") {
    return {
      ...prevState,
      city: action.value,
    };
  }
  if (action.type === "FORECAST") {
    return {
      ...prevState,
      forecast: action.value,
    };
  }
  if (action.type === "EXPIRED") {
    return {
      ...prevState,
      expired: action.value,
    };
  }

  return initWeather;
}

export default function WeatherProvider(props) {
  const [state, dispatchWeather] = useReducer(weatherReducer, initWeather);

  function setWeather(weatherObj) {
    dispatchWeather({ type: "OK", value: weatherObj });
  }

  function setCity(city) {
    dispatchWeather({ type: "INPUT", value: city });
  }

  function setForecast(forecastArr) {
    dispatchWeather({ type: "FORECAST", value: forecastArr });
  }
  function setExpired(status) {
    dispatchWeather({ type: "EXPIRED", value: status });
  }

  const weatherCxt = {
    city: state.city,
    data: state.data,
    country: state.country,
    forecast: state.forecast,
    time: state.time,
    weather: state.weather,
    temp: state.temp,
    icon: state.icon,
    windSpeed: state.windSpeed,
    setWeather,
    setCity,
    setForecast,
    expired: state.expired,
    setExpired,
  };

  return (
    <weatherContext.Provider value={weatherCxt}>
      {props.children}
    </weatherContext.Provider>
  );
}
