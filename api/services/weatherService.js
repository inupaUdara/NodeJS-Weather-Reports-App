import axios from "axios";
import User from "../models/user.model.js";
import dotenv from 'dotenv';
dotenv.config();

import nodemailer from "nodemailer";

const transpoter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  }
})

const sendEmail = async (email, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: subject,
    text: text
  };

  try {
    await transpoter.sendMail(mailOptions);
    console.log(`Email sent to ${email}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

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

  for (const user of users) {
    const weatherData = await getWeatherData(user.location);
    user.weatherData.push({ date: new Date(), data: weatherData });
    await user.save();
    const latestWeather = user.weatherData[user.weatherData.length - 1];
    console.log(latestWeather);
    await sendEmail(user.email, "Weather Update", `The weather in ${user.location} is ${latestWeather}`)

  }
};
