import axios from 'axios';

const ROOT_URL = "http://localhost:5001/weather/";

export const FETCH_WEATHER = 'FETCH_WEATHER';

export function fetchWeather(city){

  const url = ROOT_URL + encodeURIComponent(city);
  const request = axios.get(url);

  return {
    type: FETCH_WEATHER,
    payload: request
  };
}
