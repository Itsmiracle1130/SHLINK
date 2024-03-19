import mongoose from "mongoose";
import { IUser } from "../utils/Interface";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
},
{
  timestamps: true
});
export const userModel = mongoose.model<IUser>("user", userSchema);