"use client";

import { motion } from "framer-motion";
import { Section, SectionGrid } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { getSkillCategories, getSkillsByCategory } from "@/lib/data";
import { cn } from "@/lib/utils";

const categoryGradients: Record<string, string> = {
  "Data Analytics": "from-blue-500/10 to-blue-600/5 dark:from-blue-500/20",
  "Machine Learning": "from-green-500/10 to-green-600/5 dark:from-green-500/20",
  AI: "from-purple-500/10 to-purple-600/5 dark:from-purple-500/20",
  "Full Stack Development": "from-orange-500/10 to-orange-600/5 dark:from-orange-500/20",
  "Backend Development": "from-red-500/10 to-red-600/5 dark:from-red-500/20",
  "Cloud Computing": "from-cyan-500/10 to-cyan-600/5 dark:from-cyan-500/20",
  DevOps: "from-yellow-500/10 to-yellow-600/5 dark:from-yellow-500/20",
  Research: "from-pink-500/10 to-pink-600/5 dark:from-pink-500/20",
};

const categoryBorder: Record<string, string> = {
  "Data Analytics": "border-blue-200/50 dark:border-blue-700/30",
  "Machine Learning": "border-green-200/50 dark:border-green-700/30",
  AI: "border-purple-200/50 dark:border-purple-700/30",
  "Full Stack Development": "border-orange-200/50 dark:border-orange-700/30",
  "Backend Development": "border-red-200/50 dark:border-red-700/30",
  "Cloud Computing": "border-cyan-200/50 dark:border-cyan-700/30",
  DevOps: "border-yellow-200/50 dark:border-yellow-700/30",
  Research: "border-pink-200/50 dark:border-pink-700/30",
};

const categoryIcon: Record<string, string> = {
  "Data Analytics": "📊",
  "Machine Learning": "🤖",
  AI: "🧠",
  "Full Stack Development": "⚛️",
  "Backend Development": "⚙️",
  "Cloud Computing": "☁️",
  DevOps: "🔄",
  Research: "📚",
};

export function Skills() {
  const categories = getSkillCategories();

  return (
    <Section
      id="skills"
      title="Skills & Expertise"
      subtitle="Technologies, tools, and methodologies I work with."
      className="bg-zinc-50/50 dark:bg-zinc-900/50"
    >
      <SectionGrid>
        {categories.map((category, index) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className={cn(
              "p-6 rounded-2xl bg-gradient-to-br border backdrop-blur-sm",
              categoryGradients[category] || "from-zinc-500/10",
              categoryBorder[category] || "border-zinc-200/50 dark:border-zinc-700/30"
            )}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">{categoryIcon[category] || "💡"}</span>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                {category}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {getSkillsByCategory(category).map((skill) => (
                <Badge key={skill.name} variant="secondary">
                  {skill.name}
                </Badge>
              ))}
            </div>
          </motion.div>
        ))}
      </SectionGrid>
    </Section>
  );
}
