import dotenv from "dotenv";

dotenv.config();

export const HOST = process.env.HOST;
export const PORT = process.env.PORT;
export const DB_ID = process.env.NOTION_DB_ID;
export const DB_API_KEY = process.env.API_KEY;
export const DB_VERSION = process.env.VERSION;