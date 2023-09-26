import express from "express";

import { Book } from "../models/bookModel.js";

const router = express.Router()

// Save a New Book

router.post('/', async(request,response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ){
            return response.status(400).send({
                message: "Send all required fields",
            })
        }

        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear
        }

        const book = await Book.create(newBook)

        return response.status(201).send(book)

    } catch (error) {
        console.log(error.message)
        response.status(500).send({message:error.message})
    }
})

// Route for get all bookis from database

router.get("/", async (request, response) => {
  try {
    const books = await Book.find({});

    return response.status(200).json({
      books: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for get one book by ID

router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const book = await Book.findById(id);

    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for update a book by ID

router.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all required fields",
      });
    }

    const { id } = request.params;
    const result = await Book.findByIdAndUpdate(id, request.body);
    if (!result) {
      return response.status(400).json({ message: "Book Not Found" });
    }
    return response.status(200).send({ message: "Book Successfully Updated" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for delete a book by ID

router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).send({ message: "Book Not Found" });
    }
    return response.status(200).json({ message: `Book Successfully Deleted` });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
