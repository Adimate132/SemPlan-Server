import dotenv from 'dotenv';
import express from "express";
import cors from 'cors';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
dotenv.config(); // configure env vars immediately

// pinata setup ----
import { PinataSDK } from 'pinata';
import fs from 'fs';
import { Blob } from 'buffer';

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT,
  pinataGateway: process.env.GATEWAY_URL
})
// ------------------

// middleware setup
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
const port = process.env.PORT; // PORT

// start server
app.listen(port, () => {
  console.log(`Server is running at port http://localhost:${port}`);
});

// base endpoint
app.get('/', (req, res) => {
  res.status(200).json({ message: 'SemPlan server is up.' });
});

// createAcount 

// verifyLogin 
app.post('/verifyLogin', (req, res) => {
    try {
        const { email, password } = req.body;
        
        // input validation...

        // const { date, contentType } = await pinata.gateways.get(); 
        
        send.status(200).json({})
    }
    catch(error) {
        console.log(error);
        res.status(401).json({error: 'Failed to log in.'});
    }
});



