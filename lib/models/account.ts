
import { Document, Schema, Model, model, Error, Types } from "mongoose";

export interface IAccount extends Document {
    // accountId: String,
    user: Types.ObjectId | Record<string, unknown>;
    amount: Number
}

export const accountSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required:true,
    },
    amount: Number
});

export const Account: Model<IAccount> = model<IAccount>("Account", accountSchema);