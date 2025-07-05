
import express, { Request, Response } from "express";
import { Book } from "../models/books.model";
import { Borrow } from "../models/borrows.model";

const borrowRoutes = express.Router();

// create borrow 
borrowRoutes.post('/', async (req: Request, res: Response) => {
    try {
        const { book, quantity, dueDate } = req.body;

        await Book.borrowBook(book, quantity);

        const borrow = await Borrow.create({ book, quantity, dueDate });

        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data: borrow,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        });


    }
})

// borrow summary 
borrowRoutes.get("/", async (req: Request, res: Response) => {
    try {
        const summary = await Borrow.aggregate([
            {
                $group: {
                    _id: "$book",
                    totalQuantity: { $sum: "$quantity" }
                }
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "bookDetails"
                }
            },
            {
                $unwind: "$bookDetails"
            },
            {
                $project: {
                    _id: 0,
                    book: {
                        title: "$bookDetails.title",
                        isbn: "$bookDetails.isbn"
                    },
                    totalQuantity: 1
                }
            }
        ]);

        res.status(200).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: summary
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

export default borrowRoutes;