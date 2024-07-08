import { useState } from "react";

export default function useFetch() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function getWeather(check, dataFunc, url) {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(
        `https://api.weatherapi.com/v1/${check}.json?key=e72b8a43abe84491a4394027240807${url}`
      );
      if (response.status === 400) {
        throw new Error("City/Country not Found ! Try another one");
      }
      if (!response.ok) {
        console.log(response);
        throw new Error(`Some Error occured : ${response.statusText}`);
      }
      const data = await response.json();
      dataFunc(data);
    } catch (err) {
      console.log(err);
      setError(err);
    }
    setIsLoading(false);
  }

  return {
    error,
    isLoading,
    getWeather,
  };
}
