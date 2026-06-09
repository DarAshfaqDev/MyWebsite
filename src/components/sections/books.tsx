"use client";

import { motion } from "framer-motion";
import { Download, BookOpen, FileText, BookMarked } from "lucide-react";
import { Section, SectionGrid } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getBooks } from "@/lib/data";

const categoryColors: Record<string, { gradient: string; border: string }> = {
  Python: { gradient: "from-blue-500/10 to-blue-600/5 dark:from-blue-500/20", border: "border-blue-200/50 dark:border-blue-700/30" },
  SQL: { gradient: "from-green-500/10 to-green-600/5 dark:from-green-500/20", border: "border-green-200/50 dark:border-green-700/30" },
  "Power BI": { gradient: "from-yellow-500/10 to-yellow-600/5 dark:from-yellow-500/20", border: "border-yellow-200/50 dark:border-yellow-700/30" },
  "Machine Learning": { gradient: "from-purple-500/10 to-purple-600/5 dark:from-purple-500/20", border: "border-purple-200/50 dark:border-purple-700/30" },
  "Generative AI": { gradient: "from-pink-500/10 to-pink-600/5 dark:from-pink-500/20", border: "border-pink-200/50 dark:border-pink-700/30" },
  "Full Stack Development": { gradient: "from-orange-500/10 to-orange-600/5 dark:from-orange-500/20", border: "border-orange-200/50 dark:border-orange-700/30" },
};

export function Books() {
  const books = getBooks();

  return (
    <Section
      id="books"
      title={
        <span>
          <span className="gradient-text">Library</span>
        </span>
      }
      subtitle="My published books, guides, and technical references."
      className="bg-zinc-50/50 dark:bg-zinc-900/50"
    >
      <SectionGrid>
        {books.map((book, index) => {
          const colors = categoryColors[book.category] || categoryColors["Full Stack Development"];

          return (
            <motion.div
              key={book.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Card className={`h-full flex flex-col group hover:${colors.border} card-premium bg-gradient-to-br ${colors.gradient} ${colors.border}`}>
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-18 rounded-xl bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center text-white shadow-lg shrink-0">
                      <BookMarked className="h-6 w-6" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-semibold text-base text-zinc-900 dark:text-zinc-100 leading-tight">
                          {book.title}
                        </h3>
                        {book.version && (
                          <Badge variant="secondary" className="text-[10px] shrink-0">
                            v{book.version}
                          </Badge>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        <Badge variant="secondary" className="text-[10px]">
                          {book.category}
                        </Badge>
                        {book.pages && (
                          <Badge variant="outline" className="text-[10px]">
                            {book.pages} pages
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 flex-1 mb-4 leading-relaxed line-clamp-2">
                    {book.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {book.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-[10px]">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {book.readUrl && (
                      <a href={book.readUrl} target="_blank" rel="noopener noreferrer">
                        <Button variant="default" size="sm">
                          <BookOpen className="mr-1.5 h-3.5 w-3.5" />
                          Read Online
                        </Button>
                      </a>
                    )}
                    <div className="flex gap-1">
                      {book.pdfUrl && (
                        <a href={book.pdfUrl} download>
                          <Button variant="outline" size="sm">
                            <Download className="mr-1 h-3 w-3" />
                            PDF
                          </Button>
                        </a>
                      )}
                      {book.epubUrl && (
                        <a href={book.epubUrl} download>
                          <Button variant="outline" size="sm">
                            EPUB
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </SectionGrid>
    </Section>
  );
}
