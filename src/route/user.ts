import express from "express";
 import {
   registration,
   login,
   addTask,
   getList,
   updateTodo,
   deleteTask
 } from "../controller/user";
const router = express.Router();
router.post("/signup", registration);
router.post("/login", login);
router.post("/add-task", addTask);
router.get("/show-list", getList);
router.post("/update-task", updateTodo);
router.put("/deletetask", deleteTask);

export default router;

