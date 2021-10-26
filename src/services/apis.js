import axios from "axios";

//api key
export const APIKEY = `b1af37f261c122c9f316319b6b3bed52`;

// function to fetch weather api based on url provided
export const fetchData = async (url) => {
  const result = await axios.get(url);
  return result;
};

//api to fetch cities based on user's input
export const fetchCitites = async (city) => {
  const result = await axios.get(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${APIKEY}`
  );
  return result;
};
