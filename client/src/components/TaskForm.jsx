import { useEffect, useState } from "react";
import API from "../services/api";

const TaskForm = ({ fetchTasks, editingTask, setEditingTask }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    deadline: "",
  });

  useEffect(() => {
    if (editingTask) {
      setForm({
        title: editingTask.title || "",
        description: editingTask.description || "",
        deadline: editingTask.deadline
          ? new Date(editingTask.deadline).toISOString().slice(0, 16)
          : "",
      });
    } else {
      setForm({
        title: "",
        description: "",
        deadline: "",
      });
    }
  }, [editingTask]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      alert("Title is required");
      return;
    }

    try {
      const taskData = {
        title: form.title.trim(),
        description: form.description.trim(),
        deadline: form.deadline || null,
      };

      if (editingTask) {
        await API.put(`/tasks/${editingTask._id}`, taskData);
        alert("Task Updated Successfully");
      } else {
        await API.post("/tasks", taskData);
        alert("Task Added Successfully");
      }

      setForm({
        title: "",
        description: "",
        deadline: "",
      });

      setEditingTask(null);
      fetchTasks();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleCancel = () => {
    setEditingTask(null);

    setForm({
      title: "",
      description: "",
      deadline: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white border-2 border-purple-500 rounded-2xl shadow-xl p-6 space-y-5"
    >
      <h2 className="text-3xl font-bold text-center text-purple-700">
        {editingTask ? "Edit Task" : "Add Task"}
      </h2>

      <div>
        <label className="block mb-2 font-semibold text-gray-700">
          Task Title
        </label>
        <input
          type="text"
          name="title"
          placeholder="Enter Task Title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block mb-2 font-semibold text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          rows="4"
          placeholder="Enter Description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block mb-2 font-semibold text-gray-700">
          Deadline
        </label>
        <input
          type="datetime-local"
          name="deadline"
          value={form.deadline}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>

      <div className="flex flex-wrap gap-4 pt-2">
        <button
          type="submit"
          className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition duration-200"
        >
          {editingTask ? "Update Task" : "Add Task"}
        </button>

        {editingTask && (
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition duration-200"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;