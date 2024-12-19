import { parentPort, workerData } from "worker_threads";
import { upload } from "../libs/cld.js";
import { optimize } from "../libs/sharp.js";

const { optimizedAssets } = await optimize(JSON.parse(workerData.assets), {
  format: "avif",
});
const { uploaded } = await upload(optimizedAssets, {
  folder: `livio-web/user-${workerData.id}/`,
});

parentPort.postMessage(uploaded);
