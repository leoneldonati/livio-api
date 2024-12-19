import express from "express";
import morgan from "morgan";
import fileUpload from "express-fileupload";
import { PORT } from "./variables.js";
import { __auth } from "./routes/auth.js";
import { __users } from "./routes/users.js";

const app = express();
// DISABLE EXPRESS HEADER
app.disable("x-powered-by");

// PARSE REQUESTS
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// FILES
app.use(fileUpload({ useTempFiles: true, tempFileDir: "./tmp" }));

// JUST USE IN DEVELOPMENT
app.use(morgan("dev"));

//AUTH Route
app.use(__auth);

//USERS Route
app.use(__users);

// START SERVER
app.listen(PORT, () => console.log(`Listen on port: ${PORT}`));
