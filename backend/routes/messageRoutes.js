import express from "express";
import { protectedRoute } from "../middleware/auth";
import {
  getMessages,
  getUserForSidebar,
  markMessageAsSeen,
} from "../controllers/messageController";

const messageRouter = express.Router();

messageRouter.get("/users", protectedRoute, getUserForSidebar);
messageRouter.get("/:id", protectedRoute, getMessages);
messageRouter.put("mark/:id", protectedRoute, markMessageAsSeen);

export default messageRouter;
