
import express, { Request, Response } from 'express'
import { Book } from '../models/books.model';

const booksRoutes = express.Router();

// create book 

booksRoutes.post('/', async (req: Request, res: Response) => {

    try {
        const bookBody = req.body;

        const book = await Book.create(bookBody);
        console.log(book);

        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book
        })

    } catch (error: any) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        })
    }

})

// get all books 
booksRoutes.get('/', async (req: Request, res: Response) => {
    try {
        const filter = req.query.filter as string || "";
        const sortBy = req.query.sortBy as string || "createdAT"
        const sort = req.query.sort === "asc" ? 1 : -1;
        const limit = parseInt(req.query.limit as string) || 10;

        let query: { [key: string]: any } = {};
        if (filter) {
            query.genre = filter
        }

        const books = await Book.find(query)
            .sort({ [sortBy]: sort })
            .limit(limit)

        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books
        })

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        })
    }
})

// get book by id 

booksRoutes.get('/:bookId', async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId;

        const book = await Book.findById(bookId)

        res.status(200).json({
            success: true,
            message: "Book retrieved successfully",
            data: book
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        })
    }
})

// update book 
booksRoutes.put('/:bookId', async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId;
        const updatedBook = req.body;

        const book = await Book.findByIdAndUpdate(bookId, updatedBook, { new: true })

        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: book
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        })
    }
})

// delete book

booksRoutes.delete('/:bookId', async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId;

        const book = await Book.findByIdAndDelete(bookId)

        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: null
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        })
    }
})

export default booksRoutes;