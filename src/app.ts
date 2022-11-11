import express from "express";
import mongoose from "mongoose";
import config from "./config/config";

const app = express();
const db = config;
// database
const MONGO_URI = `mongodb://${db.staging.DB.HOST}/${db.staging.DB.PORT}:${db.staging.DB.DATABASE}`;
mongoose.connect(MONGO_URI);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log(`Database Connected :- ${MONGO_URI}`);
});
// port
const port = 5000;
app.listen(port, () => console.log(`Listening on port :- ${port}`));



export default app;
