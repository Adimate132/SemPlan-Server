import dotenv from 'dotenv';
import express from "express";
import cors from 'cors';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';

// middleware setup
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT;

// start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// base endpoint
app.get('/', (req, res) => {
  res.send('SemPlan server is up.');
});



