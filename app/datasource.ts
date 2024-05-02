import { DataSource } from "typeorm";
import 'reflect-metadata';
import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME
} from "./constants";
import { Facility } from "./entities/Facility";
import { Location } from "./entities/Location";
import { User } from "./entities/User";

const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  entities: [
    Facility,
    Location,
    User
  ],
  synchronize: true
});

export default AppDataSource;