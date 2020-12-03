
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
  rut: String,
  email: String,
});


// userSchema.pre<IUser>("save", function save(next) {
//   const user = this;
//   console.log(user);
  
//   bcrypt.genSalt(10, (err, salt) => {
//     if (err) { return next(err); }
//     bcrypt.hash(this.password, salt, undefined, (err: Error, hash) => {
//       if (err) { return next(err); }
//       user.password = hash;
//       next(hash);
//     });
//   });
// });

// userSchema.method('isValidPassword', function (candidatePassword: string, callback: any) {
//     bcrypt.compare(candidatePassword, this.password, (err: Error, isMatch: boolean) => {
//       callback(err, isMatch);
//     });
// });


export const User: Model<IUser> = model<IUser>("User", userSchema);