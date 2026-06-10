"use client";

import { ArrowDown } from "lucide-react";

export function ScrollToBottom() {
  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
  };

  return (
    <div className="flex justify-center py-6">
      <button
        onClick={scrollToBottom}
        className="flex flex-col items-center gap-1 text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors cursor-pointer"
        aria-label="Scroll to bottom"
      >
        <span className="text-xs font-medium tracking-wider uppercase">Move to Bottom</span>
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </button>
    </div>
  );
}
