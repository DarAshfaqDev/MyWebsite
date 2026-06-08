"use client";

import { motion } from "framer-motion";
import { ExternalLink, FileText } from "lucide-react";
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

const typeColors: Record<string, string> = {
  "research-paper": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  journal: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  conference: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  thesis: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  report: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
  "case-study": "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
  "survey-paper": "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400",
};

export function PublicationsSection() {
  const publications = getPublications();

  return (
    <Section
      id="publications"
      title="Research & Publications"
      subtitle="Academic papers, conference proceedings, and technical reports."
      className="bg-zinc-50/50 dark:bg-zinc-900/50"
    >
      <div className="space-y-4">
        {publications.map((pub, index) => (
          <motion.div
            key={pub.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="p-5 rounded-2xl bg-white/80 dark:bg-zinc-900/80 border border-zinc-200/50 dark:border-zinc-700/50 backdrop-blur-sm hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <span className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 shrink-0">
                <FileText className="h-5 w-5" />
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100">
                    {pub.title}
                  </h3>
                  <Badge
                    variant="secondary"
                    className={`text-[10px] ${typeColors[pub.type] || ""}`}
                  >
                    {typeLabels[pub.type] || pub.type}
                  </Badge>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">
                  {pub.authors.join(", ")} · {pub.year}
                </p>
                {pub.journal && (
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 italic mb-1">
                    {pub.journal}
                  </p>
                )}
                {pub.conference && (
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 italic mb-1">
                    {pub.conference}
                  </p>
                )}
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2 line-clamp-2">
                  {pub.description}
                </p>
                <div className="flex gap-2">
                  {pub.doi && (
                    <span className="text-[10px] text-zinc-400 font-mono">
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
                        <ExternalLink className="mr-1 h-3 w-3" />
                        View
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
