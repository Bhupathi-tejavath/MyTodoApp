import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import ConnectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import taskRoutes from "./routes/taskRoute.js";

dotenv.config();

// Connect to MongoDB
ConnectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Home Route
app.get("/", (req, res) => {
    res.status(200).send("Todo API is running...");
});

// Handle Invalid Routes
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found",
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});