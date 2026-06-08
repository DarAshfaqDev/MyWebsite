"use client";

import * as React from "react";
import { Plus, FileText, BookOpen, Eye, Download } from "lucide-react";

export default function ContentPage() {
  const [content, setContent] = React.useState<{ id: string; title: string; type: string; platform: string; views: number; downloads: number; date: string }[]>([]);

  React.useEffect(() => {
    const stored = localStorage.getItem("dashboard-content");
    if (stored) setContent(JSON.parse(stored));
  }, []);

  React.useEffect(() => {
    localStorage.setItem("dashboard-content", JSON.stringify(content));
  }, [content]);

  const totalViews = content.reduce((s, c) => s + c.views, 0);
  const totalDownloads = content.reduce((s, c) => s + c.downloads, 0);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Content Dashboard</h1>
        <p className="text-sm text-zinc-500 mt-1">Track your published content and its performance.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="p-5 rounded-2xl border border-zinc-200/50 dark:border-zinc-700/50 bg-white dark:bg-zinc-900">
          <div className="flex items-center gap-2 text-xs text-zinc-500 mb-2"><Eye className="h-4 w-4" /> Total Views</div>
          <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">{totalViews}</p>
        </div>
        <div className="p-5 rounded-2xl border border-zinc-200/50 dark:border-zinc-700/50 bg-white dark:bg-zinc-900">
          <div className="flex items-center gap-2 text-xs text-zinc-500 mb-2"><Download className="h-4 w-4" /> Total Downloads</div>
          <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">{totalDownloads}</p>
        </div>
      </div>

      <div className="space-y-3">
        {content.map((item) => (
          <div key={item.id} className="p-4 rounded-xl border border-zinc-200/50 dark:border-zinc-700/50 bg-white dark:bg-zinc-900">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-medium text-sm text-zinc-900 dark:text-zinc-100">{item.title}</h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">{item.type}</span>
            </div>
            <p className="text-xs text-zinc-500">{item.platform} · {item.views} views · {item.downloads} downloads</p>
          </div>
        ))}
        {content.length === 0 && (
          <p className="text-center py-16 text-zinc-400">No content tracked yet. Content will appear here as you publish.</p>
        )}
      </div>
    </div>
  );
}
