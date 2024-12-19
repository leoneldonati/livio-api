import { v2 } from "cloudinary";
import { CLD_KEY, CLD_NAME, CLD_SECRET } from "../variables.js";

v2.config({
  cloud_name: CLD_NAME,
  api_key: CLD_KEY,
  api_secret: CLD_SECRET,
});

const { upload_stream } = v2.uploader;

export async function upload(buffers, { folder }) {
  function mapCallback(buff) {
    if (buff) {
      return new Promise((res, rej) =>
        upload_stream({ folder }, (err, result) => {
          if (err) return rej(err);
          res({
            publicId: result?.public_id,
            secureUrl: result?.secure_url,
            width: result?.width,
            height: result?.height,
          });
        }).end(buff)
      );
    }

    return buff;
  }

  const promises = buffers.map(mapCallback);

  try {
    return {
      ok: true,
      uploaded: await Promise.all(promises),
    };
  } catch (error) {
    return {
      ok: false,
      uploaded: null,
    };
  }
}
