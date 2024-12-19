import { Router } from "express";
import { usersCollection } from "../db/index.js";
import { parseUserSchema } from "../libs/zod.js";
import { encryptString } from "../libs/bcrypt.js";
import { runWorker } from "../utils/workers.js";
import { fileURLToPath } from "node:url";
import { optimize } from "../libs/sharp.js";
import { upload } from "../libs/cld.js";
import path from "node:path";

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
  const id = req.params?.id;
  const files = req.files;

  // AVATAR Y HEADER PHOTO
  let assets = null;
  if (files && files?.avatar) {
    assets = [files.avatar, null];
  }
  if (files && files["header-photo"]) {
    assets =
      assets && assets[0] != null
        ? [files.avatar, files["header-photo"]]
        : [null, files["header-photo"]];
  }

  let uploaded = null;
  try {
    if (assets) {
      // RUN OPTIMIZATION AND UPLOAD OUT OF PRINCIPAL THREAD
      const result = await runWorker(
        "../livio-api/src/workers/file-processing.js",
        {
          assets: JSON.stringify(assets),
          id,
        }
      );

      uploaded = result;
    }
    return res.json({ id, assets });
  } catch (error) {
    console.log(error);
    return res
      .json({
        message: "Error en el servidor.",
        status: 500,
        otherIssues: null,
      })
      .status(500);
  }
});
