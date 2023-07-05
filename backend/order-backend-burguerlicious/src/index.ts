import env from "dotenv";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { verifyToken } from "./middleware/token";
import router from "./routes";

env.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const requestLogger = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log(`[${request.method}] => url:: ${request.url}`);

  next();
};

app.use(requestLogger);

app.use(verifyToken);

app.use(router);

app.listen(port, () => console.log(`[SERVER] http://localhost:${port}`));
