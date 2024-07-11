import axios from "axios";
import User from "../models/user.model.js";

const getWeatherData = async (location) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.WEATHER_API_KEY}`
    );
    console.log("Weather Data Fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateWeatherData = async () => {
  const users = await User.find({});
  console.log("Users:", users);
  for (const user of users) {
    const weatherData = await getWeatherData(user.location);
    user.weatherData.push({ date: new Date(), data: weatherData });
    await user.save();
  }
};
