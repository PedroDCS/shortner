/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */
import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import userRouter from './router/userRouter.js';
import ShortnerController from './controller/shortnerController.js';
import shortnerRouter from './router/shortnerRouter.js';
import AuthMiddleware from './middleware/auth.middleware.js';

dotenv.config();

const { DATABASE_URL } = process.env;
const { PORT } = process.env;

const shortnerController = new ShortnerController();
mongoose.connect(DATABASE_URL)
  .then(() => {
    console.log('Database Connected...');
  }).catch((error) => {
    console.log(error);
  });

const app = express();

app.use(express.json());

app.use(morgan('dev'));

app.get('/:', (request, response) => response.json({ message: 'shortner...' }));
app.get('/:hash', shortnerController.redirect);
app.use(AuthMiddleware);

app.use(userRouter);
app.use(shortnerRouter);

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});

// PzrIwXO7kDkSD2tR
