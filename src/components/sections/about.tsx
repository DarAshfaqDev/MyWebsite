"use client";

import { motion } from "framer-motion";
import { Target, Compass, Award, Heart } from "lucide-react";
import { Section } from "@/components/ui/section";
import { getAbout } from "@/lib/data";

const iconMap: Record<string, React.ReactNode> = {
  mission: <Target className="h-5 w-5" />,
  journey: <Compass className="h-5 w-5" />,
  objectives: <Award className="h-5 w-5" />,
  story: <Heart className="h-5 w-5" />,
};

export function About() {
  const about = getAbout();

  const items = [
    { key: "story", label: "My Story", content: about.story },
    { key: "journey", label: "My Journey", content: about.journey },
    { key: "mission", label: "My Mission", content: about.mission },
  ];

  return (
    <Section
      id="about"
      title="About Me"
      subtitle="A glimpse into who I am, what drives me, and where I'm heading."
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
            className="p-6 rounded-2xl bg-white/80 dark:bg-zinc-900/80 border border-zinc-200/50 dark:border-zinc-700/50 backdrop-blur-sm hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
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
        className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border border-blue-200/50 dark:border-blue-700/30"
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
            <Target className="h-5 w-5" />
          </span>
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
            Career Objectives
          </h3>
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {about.objectives.map((objective, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400"
            >
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
              {objective}
            </li>
          ))}
        </ul>
      </motion.div>
    </Section>
  );
}
