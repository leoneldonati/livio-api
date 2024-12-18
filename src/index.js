import express from "express";
import { PORT } from "./variables.js";
import { __auth } from "./routes/auth.js";

const app = express();
// DISABLE EXPRESS HEADER
app.disable("x-powered-by");

// PARSE REQUESTS
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//AUTH Route
app.use(__auth);

// START SERVER
app.listen(PORT, () => console.log(`Listen on port: ${PORT}`));
