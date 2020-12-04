
import { Document, Schema, Model, model, Error, Types } from "mongoose";

export interface IAccount extends Document {
    accountId: String,
    user: Types.ObjectId | Record<string, unknown>;
    amount: number
}

export const accountSchema = new Schema({
    accountId: {
        type: String, 
        required: true,
        unique: true,
        default: Types.ObjectId
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required:true,
        unique:true
    },
    amount: Number
});

export const Account: Model<IAccount> = model<IAccount>("Account", accountSchema);