import Task from "../models/Task.js";

// Create Task
export const createTask = async (req, res) => {
    try {
        const { title, description, deadline } = req.body;

        if (!title) {
            return res.status(400).json({
                message: "Title is required",
            });
        }

        const task = await Task.create({
            title,
            description,
            deadline,
            user: req.user.id,
        });

        res.status(201).json({
            message: "Task created successfully",
            task,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Delete Task
export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id,
        });

        if (!task) {
            return res.status(404).json({
                message: "Task not found",
            });
        }

        res.status(200).json({
            message: "Task deleted successfully",
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Get All Tasks
export const getTask = async (req, res) => {
    try {
        const tasks = await Task.find({
            user: req.user.id,
        });

        res.status(200).json({
            count: tasks.length,
            tasks,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Get Completed Tasks
export const completedTask = async (req, res) => {
    try {
        const tasks = await Task.find({
            user: req.user.id,
            completed: true,
        });

        res.status(200).json({
            count: tasks.length,
            tasks,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Get Pending Tasks
export const pendingTask = async (req, res) => {
    try {
        const tasks = await Task.find({
            user: req.user.id,
            completed: false,
        });

        res.status(200).json({
            count: tasks.length,
            tasks,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Get Overdue Tasks
export const overdueTask = async (req, res) => {
    try {
        const tasks = await Task.find({
            user: req.user.id,
            completed: false,
            deadline: {
                $lt: new Date(),
            },
        });

        res.status(200).json({
            count: tasks.length,
            tasks,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Update Task
export const updateTask = async (req, res) => {
    try {
        const { title, description, deadline, completed } = req.body;

        const task = await Task.findOne({
            _id: req.params.id,
            user: req.user.id,
        });

        if (!task) {
            return res.status(404).json({
                message: "Task not found",
            });
        }

        if (title !== undefined) task.title = title;
        if (description !== undefined) task.description = description;
        if (deadline !== undefined) task.deadline = deadline;
        if (completed !== undefined) task.completed = completed;

        const updatedTask = await task.save();

        res.status(200).json({
            message: "Task updated successfully",
            task: updatedTask,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Toggle Task Status
export const toggleTask = async (req, res) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            user: req.user.id,
        });

        if (!task) {
            return res.status(404).json({
                message: "Task not found",
            });
        }

        task.completed = !task.completed;

        const updatedTask = await task.save();

        res.status(200).json({
            message: "Task status updated successfully",
            task: updatedTask,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};