"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Briefcase,
  Code,
  BookOpen,
  FileText,
  CheckSquare,
  Globe,
  LogOut,
  Home,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/jobs", label: "Job Tracker", icon: Briefcase },
  { href: "/dashboard/freelancing", label: "Freelancing", icon: Code },
  { href: "/dashboard/learning", label: "Learning", icon: BookOpen },
  { href: "/dashboard/content", label: "Content", icon: FileText },
  { href: "/dashboard/todo", label: "To-Do List", icon: CheckSquare },
  { href: "/dashboard/productivity", label: "Productivity", icon: FileText },
  { href: "/dashboard/platforms", label: "Platforms", icon: Globe },
  { href: "/dashboard/payments", label: "Payments", icon: BookOpen },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 flex flex-col">
      <div className="p-5 border-b border-zinc-200 dark:border-zinc-700">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-xs">
            ID
          </div>
          <span className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
            My Dashboard
          </span>
        </Link>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors",
                isActive
                  ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-medium"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-zinc-200 dark:border-zinc-700 space-y-1">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
        >
          <Home className="h-4 w-4" />
          Public Site
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/dashboard/login" })}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
