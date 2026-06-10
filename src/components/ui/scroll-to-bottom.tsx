"use client";

import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ScrollToBottom() {
  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
  };

  return (
    <div className="flex justify-end px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto -mt-2 mb-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={scrollToBottom}
        title="move to bottom"
      >
        move to bottom
        <ArrowDown className="ml-1.5 h-4 w-4" />
      </Button>
    </div>
  );
}
