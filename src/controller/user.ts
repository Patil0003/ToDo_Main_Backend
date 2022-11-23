// signup-post
import { Request, Response } from "express";
import User from "../model/user";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
// register
export const registration = async (req: Request, res: Response) => {
  try {
    const { name, email, password, mobile, todoArray } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(404).json({
        message: "Already Registered",
      });
    }
    const userSignup = new User({
      name,
      email,
      password,
      mobile,
      todoArray,
      // image: req.file?.filename,
    });
    // console.log("image", userSignup);

    const response = await userSignup.save();
    if (response) {
      return res.status(200).json({
        message: "Registered Successfully",
        result: response,
      });
    } else {
      return res.status(404).json({
        message: "Re-Try",
      });
    }
  } catch (e) {
    throw e;
  }
};
// login-post
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User Not Exits",
      });
    } else {
      if (password !== user.password) {
        return res.status(404).json({
          message: "Incorrect Password",
        });
      }
      const payload = {
        email,
        password: user.password,
      };
      jwt.sign(
        payload,
        "SECRET_KEY",
        {
          expiresIn: "1h",
        },
        (err, token) => {
          if (err) console.log(err);
          else {
            return res.status(200).json({
              message: "Login Successfully",
              Token: token,
              result: user,
            });
          }
        }
      );
    }
  } catch (e) {
    throw e;
  }
};

// add-task
export const addTask = async (req: Request, res: Response) => {
  try {
    const { _id, todo } = req.body;
    // console.log(_id, todo);
    let data = {
      todo,
    };
    const response = await User.findByIdAndUpdate(
      { _id: _id },
      { $push: { todoArray: data } },
      { new: true }
    );
    if (response) {
      return res.status(200).json({
        message: "Task added successfully",
        result: response,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

// list
export const getList = async (req: Request, res: Response) => {
  try {
    const result = await User.find();
    if (result) {
      return res.status(200).json({
        message: "Success",
        result: result,
      });
    }
  } catch (e) {
    throw e;
  }
};

// update
export const updateTodo = async (req: Request, res: Response) => {
  try {
    const { _id, todoId, todo } = req.body;

    const result = await User.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(_id),
        "todoArray._id": new mongoose.Types.ObjectId(todoId),
      },
      { $set: { "todoArray.$.todo": todo } },
      { new: true }
    );

    if (!result) {
      return res.status(404).json({
        message: "Not Updated",
      });
    } else {
      return res.status(200).json({
        message: "Updated Success",
        result: result,
      });
    }
  } catch (error) {
    throw error;
  }
};

// delete
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { _id, todoId } = req.body;
    const response = await User.findByIdAndUpdate(
      { _id: _id },
      { $pull: { todoArray: { _id: todoId } } },
      { new: true }
    );
    if (!response) {
      return res.status(400).json({
        message: " Not Deleted successfully",
        // result: response,
      });
    } else {
      return res.status(200).json({
        message: "Deleted successfully ................",
        result: response,
      });
    }
  } catch (e) {
    throw e;
  }
};
