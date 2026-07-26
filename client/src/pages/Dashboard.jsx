import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data.tasks);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPendingTasks = async () => {
    try {
      const res = await API.get("/tasks/pending");
      setTasks(res.data.tasks);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCompletedTasks = async () => {
    try {
      const res = await API.get("/tasks/completed");
      setTasks(res.data.tasks);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchOverdueTasks = async () => {
    try {
      const res = await API.get("/tasks/overdue");
      setTasks(res.data.tasks);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 py-10 px-4">
        <div className="max-w-7xl mx-auto">

          {/* Heading */}
          <h1 className="text-4xl font-bold text-center text-purple-700 mb-8">
            My Tasks
          </h1>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={fetchTasks}
              className="bg-purple-600 text-white px-5 py-2 rounded-lg shadow hover:bg-purple-700 transition"
            >
              All
            </button>

            <button
              onClick={fetchPendingTasks}
              className="bg-yellow-500 text-white px-5 py-2 rounded-lg shadow hover:bg-yellow-600 transition"
            >
              Pending
            </button>

            <button
              onClick={fetchCompletedTasks}
              className="bg-green-600 text-white px-5 py-2 rounded-lg shadow hover:bg-green-700 transition"
            >
              Completed
            </button>

            <button
              onClick={fetchOverdueTasks}
              className="bg-red-600 text-white px-5 py-2 rounded-lg shadow hover:bg-red-700 transition"
            >
              Overdue
            </button>
          </div>

          {/* Task Form */}
          <TaskForm
            fetchTasks={fetchTasks}
            editingTask={editingTask}
            setEditingTask={setEditingTask}
          />

          {/* Task List */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  fetchTasks={fetchTasks}
                  setEditingTask={setEditingTask}
                />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 text-xl font-medium">
                No tasks found.
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
};

export default Dashboard;