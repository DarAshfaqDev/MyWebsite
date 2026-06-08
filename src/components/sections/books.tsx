"use client";

import { motion } from "framer-motion";
import {
  Download,
  Share2,
  BookOpen,
} from "lucide-react";
import { Section, SectionGrid } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getBooks } from "@/lib/data";

export function Books() {
  const books = getBooks();

  return (
    <Section
      id="books"
      title="Book Library"
      subtitle="My published books, guides, and technical references."
    >
      <SectionGrid>
        {books.map((book, index) => (
          <motion.div
            key={book.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
          >
            <Card className="h-full flex flex-col group hover:border-green-200 dark:hover:border-green-700">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="w-12 h-16 rounded-lg bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-bold text-xs text-center leading-tight px-1">
                    {book.title.slice(0, 3)}
                  </div>
                  {book.version && (
                    <Badge variant="secondary">v{book.version}</Badge>
                  )}
                </div>
                <CardTitle className="mt-3 text-base leading-tight">
                  {book.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <p className="text-sm text-zinc-500 dark:text-zinc-400 flex-1 mb-3 line-clamp-2">
                  {book.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  <Badge variant="secondary" className="text-xs">
                    {book.category}
                  </Badge>
                  {book.pages && (
                    <Badge variant="outline" className="text-xs">
                      {book.pages} pages
                    </Badge>
                  )}
                </div>
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
                        Read
                      </Button>
                    </a>
                  )}
                  {book.pdfUrl && (
                    <a href={book.pdfUrl} download>
                      <Button variant="outline" size="sm">
                        <Download className="mr-1.5 h-3.5 w-3.5" />
                        PDF
                      </Button>
                    </a>
                  )}
                  {book.epubUrl && (
                    <a href={book.epubUrl} download>
                      <Button variant="ghost" size="sm">
                        EPUB
                      </Button>
                    </a>
                  )}
                  <Button variant="ghost" size="sm">
                    <Share2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </SectionGrid>
    </Section>
  );
}
