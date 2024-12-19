import { Worker } from "worker_threads";
export function runWorker(path, data) {
  return new Promise((res, rej) => {
    const worker = new Worker(path, { workerData: data });

    worker.on("message", res);
    worker.on("error", rej);
    worker.on("exit", (code) => {
      if (code !== 0) rej(new Error(`Worker has finished with code ${code}`));
    });
  });
}
