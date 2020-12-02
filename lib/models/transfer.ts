
import { Document, Schema, Model, model, Error, Types } from "mongoose";

export interface ITransfer extends Document {
    // transferId: String,
    origin: Types.ObjectId | Record<string, unknown>;
    receiver: Types.ObjectId | Record<string, unknown>;
    amount: Number;
    date: Date;
}

export const transferSchema = new Schema({
    // transferId: {
    //     type: String, required: true,
    //     unique: true
    // },
    origin: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required:true,
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required:true,
    },
    amount: Number,
    date: Date
});

export const Transfer: Model<ITransfer> = model<ITransfer>("Transfer", transferSchema);