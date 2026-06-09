"use client";

import { motion } from "framer-motion";
import { ExternalLink, Briefcase } from "lucide-react";
import { Section, SectionGrid } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getFreelancingPlatforms } from "@/lib/data";

export function Platforms() {
  const platforms = getFreelancingPlatforms();

  return (
    <Section
      id="platforms"
      title="Platforms I Use"
      subtitle="Professional services and freelancing platforms where I'm active."
      className="bg-zinc-50/50 dark:bg-zinc-900/50"
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {platforms.map((platform, index) => (
          <motion.a
            key={platform.name}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: index * 0.03 }}
            className="p-4 rounded-2xl bg-white/60 dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-700/50 backdrop-blur-sm hover:border-indigo-200 dark:hover:border-indigo-700 transition-all duration-300 card-premium group flex flex-col items-center text-center gap-2"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
              {platform.name.charAt(0)}
            </div>
            <div>
              <p className="font-medium text-xs text-zinc-700 dark:text-zinc-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {platform.name}
              </p>
              <p className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5 line-clamp-1">
                {platform.description}
              </p>
            </div>
          </motion.a>
        ))}
      </div>
    </Section>
  );
}
