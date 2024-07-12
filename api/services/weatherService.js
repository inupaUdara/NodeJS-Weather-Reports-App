import axios from "axios";
import User from "../models/user.model.js";
import dotenv from 'dotenv';
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";

import nodemailer from "nodemailer";


const genAI = new GoogleGenerativeAI(process.env.API_KEY);

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

const generateWeatherText = async (weatherData) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
    const prompt = `Generate a detailed weather report for the following data: ${JSON.stringify(weatherData)}`;
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    return text;
      
  } catch (error) {
    console.error("Error generating weather text:", error);
    return "Detailed weather report could not be generated.";
  }
};

export const updateWeatherData = async () => {
  const users = await User.find({});

  for (const user of users) {
    const weatherData = await getWeatherData(user.location);
    user.weatherData.push({ date: new Date(), data: weatherData });
    await user.save();
    const latestWeather = user.weatherData[user.weatherData.length - 1];
    const weatherText = await generateWeatherText(latestWeather);
    console.log(latestWeather);
    await sendEmail(user.email, "Weather Update", `${weatherText}`)

  }
};
