import express from "express";
import {
    createTask,
    deleteTask,
    updateTask,
    toggleTask,
    getTask,
    pendingTask,
    completedTask,
    overdueTask,
} from "../controller/taskController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all tasks
router.get("/", authMiddleware, getTask);

// Create a task
router.post("/", authMiddleware, createTask);

// Update a task
router.put("/:id", authMiddleware, updateTask);

// Delete a task
router.delete("/:id", authMiddleware, deleteTask);

// Toggle task completion
router.patch("/:id/toggle", authMiddleware, toggleTask);

// Get completed tasks
router.get("/completed", authMiddleware, completedTask);

// Get pending tasks
router.get("/pending", authMiddleware, pendingTask);

// Get overdue tasks
router.get("/overdue", authMiddleware, overdueTask);

export default router;