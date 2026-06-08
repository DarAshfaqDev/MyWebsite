"use client";

import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import { Section, SectionGrid } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getArticles } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export function Articles() {
  const articles = getArticles();

  return (
    <Section
      id="articles"
      title="Latest Articles"
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
            <Card className="h-full flex flex-col group hover:border-blue-200 dark:hover:border-blue-700">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary">{article.category}</Badge>
                  <div className="flex items-center gap-1 text-xs text-zinc-400">
                    <Clock className="h-3 w-3" />
                    {article.readingTime} min read
                  </div>
                </div>
                <CardTitle className="text-base leading-tight">
                  {article.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <p className="text-sm text-zinc-500 dark:text-zinc-400 flex-1 mb-3 line-clamp-2">
                  {article.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {article.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-[10px]">
                      #{tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xs text-zinc-400">
                    {formatDate(article.publishedAt)}
                  </span>
                  <a href={`/articles/${article.slug}`}>
                    <Button variant="ghost" size="sm">
                      Read
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
