import dotenv from "dotenv";

dotenv.config();

export const DB_DATABASE: string = process.env.DB_DATABASE ?? "";
export const DB_HOST: string = process.env.DB_HOST ?? "";
export const DB_USERNAME: string = process.env.DB_USERNAME ?? "";
export const DB_PASSWORD: string = process.env.DB_PASSWORD ?? "";
export const DB_PORT: number = Number(process.env.DB_PORT);

export const PORT: number = Number(process.env.PORT);