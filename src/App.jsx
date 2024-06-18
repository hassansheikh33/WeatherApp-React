import './App.css';
import Card from './Comonents/UI/Card/Card';
import Input from './Comonents/Input/Input';
import WeatherInfo from './Comonents/WeatherInfo/WeatherInfo';
import { useCallback, useContext, useEffect } from 'react';
import weatherContext from './context/weather';
import useFetch from './hooks/useFetch';

export default function App() {

  const { error, isLoading, getWeather } = useFetch();

  const dataFunc = useCallback(data => {
    weatherCxt.setWeather({
      city: data.location.name,
      country: data.location.country,
      time: data.location.localtime.slice(0, 10),
      weather: data.current.condition.text,
      temp: data.current.temp_c,
      icon: data.current.condition.icon,
      windSpeed: data.current.wind_kph,
    })
  }, []);

  let content;

  const weatherCxt = useContext(weatherContext);

  function getLocation() {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      getWeather('current', dataFunc, `&q=${lat},${lon}&aqi=no`);
    }, () => {
      content = <h2>Allow the location or enter a Place to Continue</h2>
    })
  }

  useEffect(() => {
    getLocation();
  }, []);

  return <>
    <Card className='container'>
      <Input dataFunc={dataFunc} onSubmit={getWeather}></Input>
      {isLoading && !error && <h2>Getting Current Weather...</h2>}
      {error && !isLoading && <h2>Error: {error.message}</h2>}
      {content}
      {!error && !isLoading && <WeatherInfo />}
    </Card>  </>

}
