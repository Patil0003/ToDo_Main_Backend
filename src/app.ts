import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
 import Userroot from './route/user'
import { mongoconnection } from './database'
import dotenv from "dotenv";
dotenv.config();
  const  app = express();

mongoconnection();

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded(Object({ extended: true })));
app.use("/user", Userroot);

const port = process.env.PORT;
app.listen(port, (): void => {
  console.log(`server running on ${port}`);
});
export default app;