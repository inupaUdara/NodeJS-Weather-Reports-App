import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

export const createUser = async (req, res, next) => {
    const { email, location } = req.body;

    const newUser = new User({
        email,
        location
    });

    try {
        await newUser.save();
        res.status(201).json('User created successfully!')
        
    } catch (error) {
        next(error);
    }

};

export const updateUser = async (req, res, next) => {
    const { email, location } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, {
                $set: {
                    email,
                    location
                }
            }, { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
}

export const getWeatherData = async (req, res, next) => {
    const { email, date } = req.query;
    try {
        const user = await User.findOne({ email });
        if (!user){
            return next(errorHandler(404, 'User not found!'));
        }
        const weatherData = user.weatherData.filter((data) => {
            return new Date(data.date).toDateString() === new Date(date).toDateString();
        });
        res.status(200).json(weatherData);
    } catch (error) {
        next(error);
    }
}