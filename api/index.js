import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import cron from "node-cron";


import userRoute from "./routes/user.route.js";
import { updateWeatherData } from "./services/weatherService.js";

//Database connection
mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.use("/api/user", userRoute);

//Cron job to update weather data
cron.schedule('38 * * * *', async () => {
  console.log('Updating weather data...');
  await updateWeatherData();
});

//Error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server error";
  return res.status(statusCode).json({ 
      success: false,
      statusCode,
      message,
   });
});