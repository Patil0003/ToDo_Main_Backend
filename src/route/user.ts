import express from "express";
 import { registration } from "../controller/user";
const router = express.Router();
router.post("/signup", registration);

export default router;

