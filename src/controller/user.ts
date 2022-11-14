// signup-post
import { Request, Response } from "express";
import User from "../model/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// register
export const registration = async (req: Request, res: Response) => {
  try {
    const { name, email, password, mobile, todoArray } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.send({
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
      // image: req.file.filename,
    });
    const response = await userSignup.save();
    if (response) {
      res.send({
        status: true,
        message: "Registered Successfully",
        result: response,
      });
    } else {
      res.send({
        status: false,
        message: "Re-Try",
      });
    }
  } catch (e) {
    throw e;
  }
};
// login-post
// export const login = async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     const isValid = bcrypt.compareSync(password, user.password);
//     user.image = `http://localhost:3216/uploads/${user.image}`;
//     let payload = {};
//     payload.id = user.id;
//     payload.email = user.email;

//     jwt.sign(
//       payload,
//       "SECRET_KEY",
//       {
//         expiresIn: "1h",
//       },
//       (err, token) => {
//         if (isValid) {
//           return res.send({
//             status: true,
//             message: "Login Success",
//             Token: token,
//             result: user,
//           });
//         } else {
//           return res.send({
//             status: false,
//             message: "Login Failed",
//             result: err,
//           });
//         }
//       }
//     );
//   } catch (e) {
//     throw e;
//   }
// };
