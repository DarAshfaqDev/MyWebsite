"use client";

import { motion } from "framer-motion";
import { Clock, ArrowRight, FileText } from "lucide-react";
import { Section, SectionGrid } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getArticles } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export function Articles() {
  const articles = getArticles();

  return (
    <Section
      id="articles"
      title={
        <span>
          Latest <span className="gradient-text">Articles</span>
        </span>
      }
      subtitle="Thoughts, tutorials, and deep dives on technology and data."
      className="bg-zinc-50/50 dark:bg-zinc-900/50"
    >
      <SectionGrid>
        {articles.map((article, index) => (
          <motion.div
            key={article.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
          >
            <Card className="h-full flex flex-col group hover:border-blue-200 dark:hover:border-blue-700 card-premium">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="secondary">{article.category}</Badge>
                  <div className="flex items-center gap-1 text-xs text-zinc-400">
                    <Clock className="h-3 w-3" />
                    {article.readingTime} min read
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white mb-3">
                  <FileText className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-base text-zinc-900 dark:text-zinc-100 mb-2 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 flex-1 mb-3 leading-relaxed line-clamp-2">
                  {article.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {article.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-[10px]">
                      #{tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-zinc-100 dark:border-zinc-800">
                  <span className="text-xs text-zinc-400">
                    {formatDate(article.publishedAt)}
                  </span>
                  <a href={`/articles/${article.slug}`}>
                    <Button variant="ghost" size="sm">
                      Read Article
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </SectionGrid>
    </Section>
  );
}
