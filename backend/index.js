import express from 'express';
import {PORT, mongoDBURL} from './config.js';
import mongoose from 'mongoose';
import BookRoutes from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

app.use(express.json())

app.use(cors())

app.get('/', (request , response) => {
    response.status(234).send("Welcome to MERN Tutorial")
})

app.use('/books', BookRoutes)


mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected succesfully!");
    app.listen(PORT, () => {
      console.log("Server started..!");
    });
  })
  .catch((error) => {
    console.log(error);
  });