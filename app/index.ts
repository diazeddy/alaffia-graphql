import express from "express";

import AppDataSource from "./datasource";
import { PORT } from "./constants";

AppDataSource.initialize()
  .then(() => {
      console.log("Data Source has been initialized!")
  })
  .catch((err) => {
      console.error("Error during Data Source initialization", err)
  });

const app = express();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
