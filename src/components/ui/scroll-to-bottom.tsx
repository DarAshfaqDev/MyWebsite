"use client";

import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ScrollToBottom() {
  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40">
      <Button
        variant="ghost"
        size="sm"
        onClick={scrollToBottom}
        title="Move to bottom"
      >
        Bottom
        <ArrowDown className="ml-1.5 h-4 w-4" />
      </Button>
    </div>
  );
}
