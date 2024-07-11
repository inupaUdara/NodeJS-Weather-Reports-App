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