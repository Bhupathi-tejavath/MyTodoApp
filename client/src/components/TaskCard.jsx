import API from "../services/api";

const TaskCard = ({ task, fetchTasks, setEditingTask }) => {
  const deleteTask = async () => {
    await API.delete(`/tasks/${task._id}`);
    fetchTasks();
  };

  const toggleTask = async () => {
    await API.patch(`/tasks/${task._id}/toggle`);
    fetchTasks();
  };

  return (
    <div className="bg-white border-2 border-purple-500 rounded-2xl shadow-lg p-6 mb-6 hover:shadow-xl transition-all duration-300">
      <h3 className="text-2xl font-bold text-purple-700 mb-2">
        {task.title}
      </h3>

      <p className="text-gray-700 mb-3">
        {task.description}
      </p>

      <p className="text-gray-600 mb-2">
        <span className="font-semibold">Deadline:</span>{" "}
        {task.deadline
          ? new Date(task.deadline).toLocaleString()
          : "No deadline"}
      </p>

      <p className="mb-5">
        <span className="font-semibold">Status:</span>{" "}
        <span
          className={`font-semibold ${
            task.completed ? "text-green-600" : "text-red-500"
          }`}
        >
          {task.completed ? "Completed" : "Pending"}
        </span>
      </p>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={toggleTask}
          className={`px-4 py-2 rounded-lg text-white font-medium transition duration-200 ${
            task.completed
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {task.completed ? "Mark Pending" : "Mark Completed"}
        </button>

        <button
          onClick={() => setEditingTask(task)}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition duration-200"
        >
          Edit
        </button>

        <button
          onClick={deleteTask}
          className="px-4 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition duration-200"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;