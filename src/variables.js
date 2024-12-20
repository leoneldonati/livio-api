process.loadEnvFile();

export const PORT = process.env.PORT ?? 8080;

// DB INFO
export const DB_PASS = process.env.DB_PASS;
export const CLUSTER_NAME = process.env.CLUSTER_NAME;
export const USER_NAME = process.env.USER_NAME;
export const DB_NAME = process.env.DB_NAME;

// CLOUDINARY
export const CLD_NAME = process.env.CLD_NAME;
export const CLD_KEY = process.env.CLD_KEY;
export const CLD_SECRET = process.env.CLD_SECRET;
