import { useEffect, useState } from "react";
import { fetchTasks, createTask, deleteTask, updateTask } from "./api.js";

export default function App() {
  const [tasks, setTasks] = useState([]);

  // create form state
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  // edit state
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // load tasks
  useEffect(() => {
    fetchTasks()
      .then((res) => setTasks(res.data))
      .catch((err) => console.error(err));
  }, []);

  // create task
  const handleCreate = async (e) => {
    e.preventDefault(); // prevent page refresh
    if (!newTitle.trim()) return; // do not create empty title

    const res = await createTask({
      title: newTitle,
      description: newDescription,
      completed: false,
    });

    setTasks([res.data, ...tasks]);
    setNewTitle("");
    setNewDescription("");
  };

  // toggle completed / pending
  const toggleCompleted = async (task) => {
  const res = await updateTask(task._id, {
    completed: !task.completed,
  });

  setTasks((prev) =>
    prev.map((t) =>
      t._id === task._id ? res.data : t
    )
  );
};


  // start editing
  const startEdit = (task) => {
    setEditingId(task._id);
    setEditTitle(task.title);
    setEditDescription(task.description || "");
  };

  // cancel edit
  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditDescription("");
  };

  // save edit
  const saveEdit = async (id) => {
    const res = await updateTask(id, {
      title: editTitle,
      description: editDescription,
    });

    setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
    cancelEdit();
  };

  // delete task
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return; // 
    await deleteTask(id);
    setTasks(tasks.filter((t) => t._id !== id));
  };

  // completion percentage
 const completedCount = tasks.filter(t => t.completed).length;
const percentage =
  tasks.length === 0
    ? 0
    : Math.round((completedCount / tasks.length) * 100);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10">
      <div className="w-full max-w-xl bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-2 text-center">
          Task Manager
        </h1>

        {/* PROGRESS */}
        <p className="text-center text-sm text-gray-600 mb-6">
          Completed: {percentage}% ---- ({completedCount}/{tasks.length})
        </p>

        {/* CREATE TASK */}
        <form onSubmit={handleCreate} className="mb-6">
          <input
            className="w-full border p-2 mb-2 rounded"
            placeholder="Task title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />

          <textarea
            className="w-full border p-2 mb-3 rounded"
            placeholder="Task description "
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Add Task
          </button>
        </form>

        {/* TASK LIST */}
        {tasks.length === 0 && (
          <p className="text-center text-gray-500">No tasks found</p>
        )}

        <ul className="space-y-4">
          {tasks.map((task) => (
            <li key={task._id} className="border rounded p-4">
              {editingId === task._id ? (
                <>
                  <input
                    className="w-full border p-2 mb-2 rounded"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />

                  <textarea
                    className="w-full border p-2 mb-3 rounded"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                  />

                  <div className="flex gap-2">
                    <button
                      className="bg-green-600 text-white px-4 py-1 rounded"
                      onClick={() => saveEdit(task._id)}
                    >
                      Save
                    </button>
                    <button
                      className="bg-gray-400 text-white px-4 py-1 rounded"
                      onClick={cancelEdit}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-2">
                    <input
                   type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleCompleted(task)}
                    className="cursor-pointer"
                  />
                    <h2
                      className={`text-lg font-semibold ${
                        task.completed
                          ? "line-through text-gray-400"
                          : ""
                      }`}
                    >
                      {task.title}
                    </h2>
                  </div>

                  <p className="text-gray-600 mb-3">
                    {task.description || "No description"}
                  </p>

                  <div className="flex gap-2">
                    <button
                      className="bg-blue-500 text-white px-4 py-1 rounded"
                      onClick={() => startEdit(task)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-1 rounded"
                      onClick={() => handleDelete(task._id)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
