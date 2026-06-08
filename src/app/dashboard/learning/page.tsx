"use client";

import * as React from "react";
import { Plus, BookOpen, CheckCircle, Clock } from "lucide-react";

interface LearnItem {
  id: string;
  title: string;
  type: "book" | "course" | "article" | "certification";
  status: "reading" | "completed" | "planned";
  platform: string;
  date: string;
}

export default function LearningPage() {
  const [items, setItems] = React.useState<LearnItem[]>([]);
  const [showForm, setShowForm] = React.useState(false);
  const [form, setForm] = React.useState({ title: "", type: "book" as LearnItem["type"], status: "planned" as LearnItem["status"], platform: "" });

  React.useEffect(() => {
    const stored = localStorage.getItem("dashboard-learning");
    if (stored) setItems(JSON.parse(stored));
  }, []);

  React.useEffect(() => {
    localStorage.setItem("dashboard-learning", JSON.stringify(items));
  }, [items]);

  function addItem() {
    setItems([{ id: Date.now().toString(), ...form, date: new Date().toISOString().split("T")[0] }, ...items]);
    setForm({ title: "", type: "book", status: "planned", platform: "" });
    setShowForm(false);
  }

  const reading = items.filter((i) => i.status === "reading").length;
  const completed = items.filter((i) => i.status === "completed").length;
  const planned = items.filter((i) => i.status === "planned").length;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Learning Tracker</h1>
          <p className="text-sm text-zinc-500 mt-1">Track books, courses, articles, and certifications.</p>
        </div>
        <button onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black text-sm font-medium hover:opacity-90">
          <Plus className="h-4 w-4" /> Add Item
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-200/50 dark:border-blue-700/30 text-center">
          <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">{reading}</p>
          <p className="text-xs text-blue-600 dark:text-blue-500 flex items-center justify-center gap-1"><Clock className="h-3 w-3" /> Reading</p>
        </div>
        <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/10 border border-green-200/50 dark:border-green-700/30 text-center">
          <p className="text-2xl font-bold text-green-700 dark:text-green-400">{completed}</p>
          <p className="text-xs text-green-600 dark:text-green-500 flex items-center justify-center gap-1"><CheckCircle className="h-3 w-3" /> Completed</p>
        </div>
        <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/10 border border-purple-200/50 dark:border-purple-700/30 text-center">
          <p className="text-2xl font-bold text-purple-700 dark:text-purple-400">{planned}</p>
          <p className="text-xs text-purple-600 dark:text-purple-500 flex items-center justify-center gap-1"><BookOpen className="h-3 w-3" /> Planned</p>
        </div>
      </div>

      {showForm && (
        <div className="p-5 mb-6 rounded-2xl border border-zinc-200/50 dark:border-zinc-700/50 bg-white dark:bg-zinc-900">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm" />
            <input placeholder="Platform (Coursera, Udemy...)" value={form.platform} onChange={(e) => setForm({ ...form, platform: e.target.value })}
              className="px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm" />
            <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as LearnItem["type"] })}
              className="px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm">
              <option value="book">Book</option>
              <option value="course">Course</option>
              <option value="article">Article</option>
              <option value="certification">Certification</option>
            </select>
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as LearnItem["status"] })}
              className="px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm">
              <option value="planned">Planned</option>
              <option value="reading">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <button onClick={addItem}
            className="px-6 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black text-sm font-medium hover:opacity-90">
            Save
          </button>
        </div>
      )}

      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="p-4 rounded-xl border border-zinc-200/50 dark:border-zinc-700/50 bg-white dark:bg-zinc-900 flex items-center justify-between">
            <div>
              <h3 className="font-medium text-sm text-zinc-900 dark:text-zinc-100">{item.title}</h3>
              <p className="text-xs text-zinc-500">{item.type} · {item.platform}</p>
            </div>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
              item.status === "completed" ? "bg-green-100 text-green-700" :
              item.status === "reading" ? "bg-blue-100 text-blue-700" :
              "bg-purple-100 text-purple-700"
            }`}>{item.status}</span>
          </div>
        ))}
        {items.length === 0 && !showForm && (
          <p className="text-center py-16 text-zinc-400">No learning items yet.</p>
        )}
      </div>
    </div>
  );
}
