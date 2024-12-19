import sharp from "sharp";
import { rm } from "node:fs/promises";

export async function optimize(assets, { format = "avif" }) {
  let paths = assets.map((asset) => {
    if (asset) return asset.tempFilePath;
    return asset;
  });
  try {
    const optimizedAssets = assets.map(async (asset) => {
      if (asset) {
        return await sharp(asset.tempFilePath).toFormat(format).toBuffer();
      }

      return asset;
    });

    return {
      ok: true,
      optimizedAssets: await Promise.all(optimizedAssets),
    };
  } catch (error) {
    return { ok: false, optimizedAssets: null };
  } finally {
    // DELETE TEMP FILES
    for (const path of paths) {
      if (path) {
        await rm(path);
      }
    }
  }
}
