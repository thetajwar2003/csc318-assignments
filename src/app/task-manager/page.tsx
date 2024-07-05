"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Task } from "../types/Task";

const API_URL =
  "https://scenic-death-valley-87915-bcf7d8af1a3e.herokuapp.com/tasks";

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleAddTask = async () => {
    try {
      const response = await axios.post(API_URL, newTask);
      setTasks([...tasks, response.data]);
      setNewTask({ title: "", description: "" });
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleUpdateTask = async (id: string, updatedTask: Task) => {
    try {
      await axios.put(`${API_URL}/${id}`, updatedTask);
      setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">Task Manager</h1>

        <div className="mt-6 w-full max-w-xl">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <input
              type="text"
              name="title"
              value={newTask.title}
              onChange={handleChange}
              className="border p-2 text-black"
              placeholder="Title"
            />
            <input
              type="text"
              name="description"
              value={newTask.description}
              onChange={handleChange}
              className="border p-2 text-black"
              placeholder="Description"
            />
            <button
              onClick={handleAddTask}
              className="p-2 bg-blue-600 text-white rounded"
            >
              Add Task
            </button>
          </div>

          {tasks.map((task) => (
            <div key={task.id} className="flex items-center space-x-4 mt-4">
              <input
                type="text"
                value={task.title}
                onChange={(e) =>
                  handleUpdateTask(task.id, { ...task, title: e.target.value })
                }
                className="border p-2 text-black"
                placeholder="Title"
              />
              <input
                type="text"
                value={task.description}
                onChange={(e) =>
                  handleUpdateTask(task.id, {
                    ...task,
                    description: e.target.value,
                  })
                }
                className="border p-2 text-black"
                placeholder="Description"
              />
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="text-red-600"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </main>
      <footer className="bg-gray-900 text-white text-center p-4 mt-auto">
        <p>
          The repo for the API can be found here:{" "}
          <a
            href="https://github.com/thetajwar2003/task-manager"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline"
          >
            https://github.com/thetajwar2003/task-manager
          </a>
        </p>
      </footer>
    </div>
  );
}
