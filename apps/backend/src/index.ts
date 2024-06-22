import * as bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import routes from "./controllers";
import logger from "./logger";
import { prismaClient } from "./prisma/client";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

const PORT = process.env.PORT || 9999;

async function main() {
  // Remove later: currently, serves just as a placeholder to supress
  // @typescript-eslint/require-await warning
  await prismaClient.$connect();

  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });
}

main()
  .then(async () => {
    await prismaClient.$disconnect();
  })
  .catch(async (error) => {
    logger.error(error);
    await prismaClient.$disconnect();
    process.exit(1);
  });
