import express from "express";
import Connection from "./database/db.js";

const app = express();
const PORT = 8000;

app.get("/", (req, res) => {
    res.send("Hello Server")
});

Connection();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
