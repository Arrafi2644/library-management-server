import mongoose, { Schema, Types } from "mongoose";
import { IBorrow } from "../interfaces/borrows.interface";

const borrowSchema = new Schema<IBorrow>({
    book: {
        type: Schema.Types.ObjectId,
        ref: "Book",
        required: [true, "Book object id is required"],
    },
    quantity: {
        type: Number,
        required: [true, "Borrow copy number is required"],
        min: [1, "Borrow quantity must be at least 1"]
    },
    dueDate: {
        type: Date,
        required: [true, "Must provide the due date"],
    },
}, {timestamps: true});


export const Borrow = mongoose.model("Borrow", borrowSchema)