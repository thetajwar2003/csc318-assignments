"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Task } from "../types/Task";

const API_URL =
  "https://scenic-death-valley-87915-bcf7d8af1a3e.herokuapp.com/tasks";

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = async () => {
    if (!searchTerm) {
      fetchTasks();
    } else {
      try {
        const response = await axios.get(`${API_URL}/name/${searchTerm}`);
        setTasks(response.data);
      } catch (error) {
        console.error("Error searching tasks:", error);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold mb-10">Task Manager</h1>

        <div className="w-full max-w-2xl bg-gray-800 p-8 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <input
              type="text"
              name="title"
              value={newTask.title}
              onChange={handleChange}
              className="border p-3 rounded-md text-black"
              placeholder="Title"
            />
            <input
              type="text"
              name="description"
              value={newTask.description}
              onChange={handleChange}
              className="border p-3 rounded-md text-black"
              placeholder="Description"
            />
            <button
              onClick={handleAddTask}
              className="p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add Task
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              className="border p-3 rounded-md text-black"
              placeholder="Search by Title"
            />
            <button
              onClick={handleSearch}
              className="p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 col-span-1 md:col-span-2"
            >
              Search
            </button>
          </div>

          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center space-x-4 mt-4 bg-gray-700 p-4 rounded-md"
            >
              <input
                type="text"
                value={task.title}
                onChange={(e) =>
                  handleUpdateTask(task.id, { ...task, title: e.target.value })
                }
                className="border p-3 rounded-md text-black flex-grow"
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
                className="border p-3 rounded-md text-black flex-grow"
                placeholder="Description"
              />
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="text-red-600 hover:text-red-800"
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
