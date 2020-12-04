
import { Document, Schema, Model, model, Error } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  name: string;
  password: string;
  rut: string;
  email: string;
}

export const userSchema: Schema = new Schema({
  name: String,
  password: String,
  rut: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  }
});


export const User: Model<IUser> = model<IUser>("User", userSchema);