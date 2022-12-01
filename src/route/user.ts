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

router.post("/signup",registration);
router.post("/login", login);
router.post("/add-task", addTask);
router.get("/show-list", getList);
router.put("/update-task", updateTodo);
router.put("/delete-task", deleteTask);

export default router;

