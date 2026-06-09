"use client";

import { motion } from "framer-motion";
import { ExternalLink, FileText, BookOpen, Quote } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getPublications } from "@/lib/data";

const typeLabels: Record<string, string> = {
  "research-paper": "Research Paper",
  journal: "Journal Article",
  conference: "Conference Paper",
  thesis: "Thesis",
  report: "Technical Report",
  "case-study": "Case Study",
  "survey-paper": "Survey Paper",
};

const typeStyles: Record<string, { bg: string; text: string; dot: string }> = {
  "research-paper": { bg: "bg-blue-50 dark:bg-blue-900/20", text: "text-blue-700 dark:text-blue-400", dot: "bg-blue-500" },
  journal: { bg: "bg-green-50 dark:bg-green-900/20", text: "text-green-700 dark:text-green-400", dot: "bg-green-500" },
  conference: { bg: "bg-purple-50 dark:bg-purple-900/20", text: "text-purple-700 dark:text-purple-400", dot: "bg-purple-500" },
  thesis: { bg: "bg-orange-50 dark:bg-orange-900/20", text: "text-orange-700 dark:text-orange-400", dot: "bg-orange-500" },
  report: { bg: "bg-zinc-50 dark:bg-zinc-800/50", text: "text-zinc-700 dark:text-zinc-300", dot: "bg-zinc-500" },
  "case-study": { bg: "bg-pink-50 dark:bg-pink-900/20", text: "text-pink-700 dark:text-pink-400", dot: "bg-pink-500" },
  "survey-paper": { bg: "bg-cyan-50 dark:bg-cyan-900/20", text: "text-cyan-700 dark:text-cyan-400", dot: "bg-cyan-500" },
};

export function PublicationsSection() {
  const publications = getPublications();

  return (
    <Section
      id="publications"
      title={
        <span>
          Research & <span className="gradient-text">Publications</span>
        </span>
      }
      subtitle="Academic papers, conference proceedings, and technical reports."
      className="bg-zinc-50/50 dark:bg-zinc-900/50"
    >
      <div className="space-y-5">
        {publications.map((pub, index) => {
          const style = typeStyles[pub.type] || typeStyles["research-paper"];

          return (
            <motion.div
              key={pub.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="p-6 rounded-2xl bg-white/80 dark:bg-zinc-900/80 border border-zinc-200/50 dark:border-zinc-700/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 card-premium"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl ${style.bg} shrink-0 hidden sm:block`}>
                  <BookOpen className={`h-5 w-5 ${style.text}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <div className={`w-2 h-2 rounded-full ${style.dot}`} />
                    <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
                      {pub.title}
                    </h3>
                    <Badge
                      variant="secondary"
                      className={`text-[10px] ${style.bg} ${style.text}`}
                    >
                      {typeLabels[pub.type] || pub.type}
                    </Badge>
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">
                    {pub.authors.join(", ")} · {pub.year}
                  </p>
                  {pub.journal && (
                    <p className="text-xs text-zinc-400 dark:text-zinc-500 italic mb-1 flex items-center gap-1">
                      <Quote className="h-3 w-3" />
                      {pub.journal}
                    </p>
                  )}
                  {pub.conference && (
                    <p className="text-xs text-zinc-400 dark:text-zinc-500 italic mb-1">
                      Presented at {pub.conference}
                    </p>
                  )}
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3 leading-relaxed line-clamp-2">
                    {pub.description}
                  </p>
                  <div className="flex items-center gap-3">
                    {pub.doi && (
                      <span className="text-[10px] text-zinc-400 font-mono bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-md">
                        DOI: {pub.doi}
                      </span>
                    )}
                    {pub.url && (
                      <a
                        href={pub.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="ghost" size="sm">
                          View Publication
                          <ExternalLink className="ml-1 h-3 w-3" />
                        </Button>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
