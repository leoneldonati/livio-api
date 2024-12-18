import { Router } from "express";

export const __auth = Router();

__auth.post("/auth/login", async (req, res) => {
  try {
    const payload = req.body;
  } catch (error) {}
});
