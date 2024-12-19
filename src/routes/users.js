import { Router } from "express";
import { usersCollection } from "../db/index.js";
import { parseUserSchema } from "../libs/zod.js";
import { encryptString } from "../libs/bcrypt.js";

export const __users = Router();

__users.post("/users", async (req, res) => {
  try {
    const payload = req.body;

    const { ok, error } = parseUserSchema(payload);

    if (!ok)
      return res
        .json({
          status: 400,
          message: "Algunos datos no son válidos, por favor revísalos.",
          otherIssues: error,
        })
        .status(400);

    const isRegistred = await usersCollection.findOne({
      $or: [{ email: payload.email }, { username: payload.username }],
    });

    if (isRegistred != null)
      return res
        .json({
          message: "El usuario ya se encuentra registrado.",
          status: 400,
          otherIssues: null,
        })
        .status(400);

    const hash = await encryptString(payload.password);

    const model = {
      ...payload,
      hash,
      created: new Date(),
      modified: new Date(),
      headerPhoto: null,
      avatar: null,
      bio: null,
      webSite: null,
      othersLinks: null,
      location: null,
      bornDate: null,
      followers: [],
      followed: [],
    };

    const { insertedId } = await usersCollection.insertOne(model);

    return res.json({ insertedId });
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

__users.patch("/users/:id", async (req, res) => {
  const id = req.params;
  try {
  } catch (error) {}
  return res.json(id);
});