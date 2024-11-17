import dotenv from 'dotenv';
import express from "express";
import cors from 'cors';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import crypto from 'crypto';
import { GoogleGenerativeAI } from '@google/generative-ai';
dotenv.config(); // configure env vars immediately


// pinata setup ----
import { PinataSDK } from 'pinata';
import fs from 'fs';
import s from 'fs';
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
const upload = multer({ dest: 'uploads/' }); // temporary storage for files
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const port = process.env.PORT; // PORT

// start server
app.listen(port, () => {
  console.log(`Server is running at port http://localhost:${port}`);
});

// base endpoint
app.get('/', (req, res) => {
  try {
    res.status(200).json({ message: 'SemPlan server is up.' });
  }
  catch(error) {
    res.status(500).json({ message: 'SemPlan server is down.' });
  }
});

// upload file 
app.post('/uploadFile',upload.single("file"),async (req, res) => {
    try {
       const file = req.file// get filepath from multer middleware
  console.log(file)
       const fileToUpload = new File([fs.readFileSync(file.path)], file.name, {type: file.mimetype});
        const upload = await pinata.upload.file(fileToUpload)
        const CID = upload.cid
        
        res.status(200).json({token: CID, message: "file upload success"});
    }
    catch(error) {
        res.status(400).json({error: "file failed to upload"});
        console.log(error);
    }
});

app.post('/generateTimeline', async (req, res) => {
    try {
        const { token } = req.body;
        console.log(token)
        const {data} = await pinata.gateways.get(token);
        const result = await model.generateContent([`Tell me about this file: ${data}`])
       console.log(result);
        res.status(200).json({message: result.response.text()})
    }
    catch(error) {
        
        res.status(400).json({error: error});
    }
    
})
