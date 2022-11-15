import mongoose from "mongoose";
import User from './index'
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: false,
  },
  mobile: {
    type: Number,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  todoArray: [
    {
      todo: String,
    },
  ],
});
const userModel = mongoose.model<User & mongoose.Document>("User", userSchema);
// const User = mongoose.model("User", userSchema);
export default userModel;
