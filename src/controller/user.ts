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
      return res.send({
        status: 400,
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
      return res.json({
        status: 200,
        message: "Registered Successfully",
        result: response,
      })
    } else {
     return res.json({
        status: 400,
        message: "Re-Try",
      })
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
      return res.json({
        status: 400,
        message: "User Not Exits"
      })

    } else {
      if (password !== user.password) {
        return res.json({
          status: 400,
          message: "Incorrect Password"
        })

      }
      const payload = {
        email,
        password: user.password
      }
      jwt.sign(payload, "SECRET_KEY", {
        "expiresIn": "1h"
      }, (err, token) => {
        if (err) console.log(err)
        else {
          return res.json({
            status: 200,
            message: "Login Successfully",
            Token: token,
            result: user
          })
        }
      })
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
      return res.json({
        status: 200,
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
      return res.json({
        status: 200,
        message: "Success",
        result: result,
      });
    }
  } catch (e) {
    throw e;
  }
};

// update
export const updateTodo = async (req:Request, res: Response) => {
  try {
    const { _id, todoId, todo } = req.body;
    // console.log(_id,todoId,todo)
    const result = await User.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(_id), "todoArray._id": todoId },
      { $set: { "todoArray.$.todo": todo } },
      { new: true }
    );

    //  console.log("Response",result)

    if (!result) {
      return res.json({
        status: 404,
        message: "not updated",
      });
    } else {
      return res.json({
        status: 200,
        message: "successfully updated",
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

    if (response) {
      return res.json({
        status: 200,
        message: "Deleted successfully",
        result: response,
      });
    } else {
     return res.json({
       status: 400,
       message: "Not Deleted successfully",
     });
    }
  } catch (e) {
    throw e;
  }
};

