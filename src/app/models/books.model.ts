import mongoose, { Schema } from "mongoose";
import { BookStaticMethod, IBook } from "../interfaces/books.interface";

const bookSchema = new Schema<IBook, BookStaticMethod>({
title: {
        type: String,
        required: [true, "Title is required but got {VALUE}"]
    },
    author:{
        type: String,
        required: [true, "Author is required but got {VALUE}"]
    },
    genre: {
        type: String,
        enum: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
        required: [true, "Genre is required and must be between FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY."]
    },
    isbn: {
        type: String,
        required: [true, "Isbn is required"],
        unique: [true, "Isbn must be unique, this isbn used before"]
    },
    description: {
        type: String,
        default: ""
    },
    copies: {
        type: Number,
        required: [true, "Copies number required"],
        min: [0, "Copies number cannot be less than 0."]
    },
    available: {
        type: Boolean,
        default: true
    }
},
{
    timestamps: true
}

)

bookSchema.statics.borrowBook = async function(book: string, quantity: number) {
  const foundBook = await this.findById(book);
  if (!foundBook) {
    throw new Error("Book not found");
  }

  if (foundBook.copies < quantity) {
    throw new Error("Not enough copies available");
  }

  foundBook.copies -= quantity;
  if (foundBook.copies === 0) {
    foundBook.available = false;
  }

  await foundBook.save();
  return foundBook;
};

export const Book = mongoose.model<IBook, BookStaticMethod>('Book', bookSchema)