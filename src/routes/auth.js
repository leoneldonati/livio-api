import { Router } from "express";
import { usersCollection } from "../db/index.js";
import { parseLoginSchema } from "../libs/zod.js";
import { compareHash } from "../libs/bcrypt.js";

export const __auth = Router();

__auth.post("/auth/login", async (req, res) => {
  try {
    const payload = req.body;

    const { ok, error } = parseLoginSchema(payload);

    if (!ok)
      return res
        .json({
          message: "Algunos datos no son válidos, por favor revísalos.",
          status: 404,
          otherIssues: error,
        })
        .status(400);

    const userFinded = await usersCollection.findOne({ email: payload.email });

    if (!userFinded)
      return res
        .json({
          message:
            "No se encontró un usuario con ese email, asegúrate de estar registrado.",
          status: 404,
          otherIssues: null,
        })
        .status(404);

    const isMatch = await compareHash(userFinded.hash, payload.password);
    if (!isMatch)
      return res.json({
        message: "Credenciales inválidas, intenta nuevamente.",
        status: 401,
        otherIssues: null,
      });
    return res.json({ insertedId: userFinded._id });
  } catch (error) {
    return res
      .json({
        message: "Error en el servidor.",
        status: 500,
        otherIssues: null,
      })
      .status(500);
  }
});
