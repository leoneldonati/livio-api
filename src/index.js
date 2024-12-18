import express from "express";
import { PORT } from "./variables.js";

express().listen(PORT, () => console.log(`Listen on port: ${PORT}`));
