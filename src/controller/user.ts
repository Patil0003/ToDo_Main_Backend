// signup-post
import { Request, Response } from "express";
import './index'
import User from "../model/user";
import bcrypt from "bcrypt";
export const registration = async (request :Response, response :Request) => {
  try {
    const { name, email, password, mobile, todoArray } = request.body;
    const user = await User.findOne({ email });
    if (user) {
      return response.send({
        status: false,
        message: "Already Registered",
      });
    }
    const userSignup = new User({
      name,
      email,
      password: bcrypt.hashSync(password, 8),
      mobile,
      todoArray,
    });
    const response = await userSignup.save();
    if (response) {
      response.send({
        status: true,
        message: "Registered Successfully",
        result: response,
      });
    } else {
      response.send({
        status: false,
        message: "Re-Try",
      });
    }
  } catch (e) {
    throw e;
  }
};

// login