import express from "express";
import Connection from "./database/db.js";
import dotenv from 'dotenv';
import cors from 'cors';
import DefaultData from "./default.js";
import bodyParser from "body-parser";
import Router from "./Routes/route.js";

const app = express();
dotenv.config();

const PORT = 8000;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;


app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("Hello from app")
})

app.use('/', Router)
// 50 3

Connection(username, password);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// DefaultData();  //  Need Only 1 Time