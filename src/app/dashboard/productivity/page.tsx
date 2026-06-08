"use client";

import * as React from "react";
import { Plus, CheckCircle, Circle } from "lucide-react";

interface Task {
  id: string;
  text: string;
  done: boolean;
  date: string;
}

export default function ProductivityPage() {
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [note, setNote] = React.useState("");
  const [newTask, setNewTask] = React.useState("");

  React.useEffect(() => {
    const stored = localStorage.getItem("dashboard-tasks");
    if (stored) setTasks(JSON.parse(stored));
    const savedNote = localStorage.getItem("dashboard-note");
    if (savedNote) setNote(savedNote);
  }, []);

  React.useEffect(() => {
    localStorage.setItem("dashboard-tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask() {
    if (!newTask.trim()) return;
    setTasks([{ id: Date.now().toString(), text: newTask, done: false, date: new Date().toISOString().split("T")[0] }, ...tasks]);
    setNewTask("");
  }

  function toggleTask(id: string) {
    setTasks(tasks.map((t) => t.id === id ? { ...t, done: !t.done } : t));
  }

  const pendingTasks = tasks.filter((t) => !t.done).length;
  const completedTasks = tasks.filter((t) => t.done).length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Productivity Center</h1>
        <p className="text-sm text-zinc-500 mt-1">Tasks, notes, and goals.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl border border-zinc-200/50 dark:border-zinc-700/50 bg-white dark:bg-zinc-900">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-zinc-900 dark:text-zinc-100">Tasks</h2>
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <span className="text-green-500">{completedTasks} done</span>
              <span>·</span>
              <span>{pendingTasks} pending</span>
            </div>
          </div>

          <div className="flex gap-2 mb-4">
            <input value={newTask} onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTask()}
              placeholder="Add a new task..."
              className="flex-1 px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm" />
            <button onClick={addTask}
              className="px-4 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black text-sm font-medium hover:opacity-90">
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-2 max-h-80 overflow-y-auto">
            {tasks.map((task) => (
              <button key={task.id} onClick={() => toggleTask(task.id)}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-left">
                {task.done ? (
                  <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                ) : (
                  <Circle className="h-4 w-4 text-zinc-300 dark:text-zinc-600 shrink-0" />
                )}
                <span className={`text-sm ${task.done ? "line-through text-zinc-400" : "text-zinc-700 dark:text-zinc-300"}`}>
                  {task.text}
                </span>
              </button>
            ))}
            {tasks.length === 0 && (
              <p className="text-center py-8 text-zinc-400 text-sm">No tasks yet. Add one above.</p>
            )}
          </div>
        </div>

        <div className="p-6 rounded-2xl border border-zinc-200/50 dark:border-zinc-700/50 bg-white dark:bg-zinc-900">
          <h2 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-4">Quick Notes</h2>
          <textarea value={note} onChange={(e) => { setNote(e.target.value); localStorage.setItem("dashboard-note", e.target.value); }}
            placeholder="Write your notes here..."
            className="w-full h-64 px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm resize-none" />
        </div>
      </div>
    </div>
  );
}
