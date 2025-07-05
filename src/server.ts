import express from 'express';
import { Server } from "http";
import mongoose from "mongoose"
import app from "./app";
import dotenv from "dotenv";
import booksRoutes from "./app/controllers/books.controllers";
import borrowRoutes from './app/controllers/borrows.controllers';
dotenv.config();

let server: Server;

const PORT = 5000;

app.use('/api/books', booksRoutes)
app.use('/api/borrow', borrowRoutes)

async function main() {
    try {

        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zrnmc7c.mongodb.net/library-management-application?retryWrites=true&w=majority&appName=Cluster0`)

        console.log("Mongoose is connected successfully");


        server = app.listen(PORT, () => {
            console.log(`Library management is running on port ${PORT}`);
        })

    } catch (error) {
        console.log(error);
    }
}


main();