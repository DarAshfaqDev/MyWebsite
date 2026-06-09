"use client";

import { motion } from "framer-motion";
import { Target, Compass, Heart, Sparkles, ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { getAbout, getProfile } from "@/lib/data";

const iconMap: Record<string, React.ReactNode> = {
  mission: <Target className="h-5 w-5" />,
  journey: <Compass className="h-5 w-5" />,
  story: <Heart className="h-5 w-5" />,
};

export function About() {
  const about = getAbout();
  const profile = getProfile();

  const items = [
    { key: "story", label: "My Story", content: about.story, gradient: "from-blue-500/10 to-blue-600/5 dark:from-blue-500/20", border: "border-blue-200/50 dark:border-blue-700/30", iconBg: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" },
    { key: "journey", label: "My Journey", content: about.journey, gradient: "from-purple-500/10 to-purple-600/5 dark:from-purple-500/20", border: "border-purple-200/50 dark:border-purple-700/30", iconBg: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400" },
    { key: "mission", label: "My Mission", content: about.mission, gradient: "from-emerald-500/10 to-emerald-600/5 dark:from-emerald-500/20", border: "border-emerald-200/50 dark:border-emerald-700/30", iconBg: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400" },
  ];

  return (
    <Section
      id="about"
      title={
        <span>
          About <span className="gradient-text">Me</span>
        </span>
      }
      subtitle="A glimpse into who I am, what drives me, and where I'm heading on this digital frontier."
      className="bg-zinc-50/50 dark:bg-zinc-900/50"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {items.map((item, index) => (
          <motion.div
            key={item.key}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`p-6 rounded-2xl bg-gradient-to-br ${item.gradient} border ${item.border} backdrop-blur-sm hover:shadow-lg transition-all duration-300 card-premium`}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className={`p-2.5 rounded-xl ${item.iconBg}`}>
                {iconMap[item.key]}
              </span>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                {item.label}
              </h3>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {item.content}
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-blue-50 via-purple-50/50 to-pink-50 dark:from-blue-950/30 dark:via-purple-950/20 dark:to-pink-950/30 border border-blue-200/50 dark:border-blue-700/30 backdrop-blur-sm"
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="p-2.5 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-600 dark:text-purple-400">
            <Sparkles className="h-5 w-5" />
          </span>
          <h3 className="font-semibold text-lg text-zinc-900 dark:text-zinc-100">
            What Drives Me
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {about.objectives.map((objective, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-3 rounded-xl bg-white/50 dark:bg-zinc-900/50 border border-zinc-200/30 dark:border-zinc-700/30"
            >
              <span className="mt-1 h-6 w-6 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                {i + 1}
              </span>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {objective}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}
