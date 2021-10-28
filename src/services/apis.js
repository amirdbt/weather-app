import axios from "axios";

// function to fetch weather api based on url provided
export const fetchData = async (url) => {
  const result = await axios.get(url);
  return result;
};

//api to fetch cities based on user's input
export const fetchCitites = async (city) => {
  const result = await axios.get(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${process.env.REACT_APP_APIKEY}`
  );
  return result;
};
