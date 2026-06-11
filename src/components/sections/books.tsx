"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Download, BookOpen, BookMarked, Star, ShoppingCart } from "lucide-react";
import { Section, SectionGrid } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getBooks } from "@/lib/data";
import type { Book } from "@/lib/types";
import { PaymentModal } from "@/components/ui/payment-modal";

const categoryColors: Record<string, { gradient: string; border: string }> = {
  Python: { gradient: "from-blue-500/10 to-blue-600/5 dark:from-blue-500/20", border: "border-blue-200/50 dark:border-blue-700/30" },
  SQL: { gradient: "from-green-500/10 to-green-600/5 dark:from-green-500/20", border: "border-green-200/50 dark:border-green-700/30" },
  "Power BI": { gradient: "from-yellow-500/10 to-yellow-600/5 dark:from-yellow-500/20", border: "border-yellow-200/50 dark:border-yellow-700/30" },
  "Machine Learning": { gradient: "from-purple-500/10 to-purple-600/5 dark:from-purple-500/20", border: "border-purple-200/50 dark:border-purple-700/30" },
  "Generative AI": { gradient: "from-pink-500/10 to-pink-600/5 dark:from-pink-500/20", border: "border-pink-200/50 dark:border-pink-700/30" },
  "Full Stack Development": { gradient: "from-orange-500/10 to-orange-600/5 dark:from-orange-500/20", border: "border-orange-200/50 dark:border-orange-700/30" },
  Islamic: { gradient: "from-emerald-600/10 to-teal-600/5 dark:from-emerald-500/20", border: "border-emerald-200/50 dark:border-emerald-700/30" },
};

const defaultColors = { gradient: "from-zinc-500/10 to-zinc-600/5 dark:from-zinc-500/20", border: "border-zinc-200/50 dark:border-zinc-700/30" };

function BookCard({ book, index, onPay }: { book: Book; index: number; onPay?: (book: Book) => void }) {
  const colors = categoryColors[book.category] || defaultColors;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <Card className={`h-full flex flex-col group card-premium bg-gradient-to-br ${colors.gradient} ${colors.border}`}>
        <CardContent className="p-6 flex flex-col h-full">
          <div className="flex items-start gap-4 mb-4">
            <div className={`w-14 h-18 rounded-xl bg-gradient-to-br ${book.group === "islamic" ? "from-emerald-500 to-teal-600" : "from-emerald-400 to-green-600"} flex items-center justify-center text-white shadow-lg shrink-0`}>
              {book.group === "islamic" ? <Star className="h-6 w-6" /> : <BookMarked className="h-6 w-6" />}
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
            {book.group === "islamic" ? (
              <>
                <a href={book.pdfUrl} target="_blank" rel="noopener noreferrer" download
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black text-sm font-medium hover:opacity-90 transition-all active:scale-[0.98]">
                  <Download className="h-4 w-4" />
                  Download PDF
                </a>
                {book.epubUrl && (
                  <a href={book.epubUrl} target="_blank" rel="noopener noreferrer" download
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all active:scale-[0.98]">
                    <BookOpen className="h-4 w-4" />
                    ePub
                  </a>
                )}
              </>
            ) : (
              <button onClick={() => onPay?.(book)}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black text-sm font-medium hover:opacity-90 transition-all active:scale-[0.98]">
                <ShoppingCart className="h-4 w-4" />
                Pay &amp; Download
              </button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function Books() {
  const books = getBooks();
  const islamicBooks = books.filter((b) => b.group === "islamic");
  const techBooks = books.filter((b) => b.group === "tech");
  const [payBook, setPayBook] = React.useState<Book | null>(null);

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
      <div className="mb-14">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-8 w-1 rounded-full bg-emerald-500" />
          <div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Islamic Library</h3>
            <p className="text-xs text-zinc-500">Books on Islamic creed, spirituality, and jurisprudence.</p>
          </div>
        </div>
        <SectionGrid>
          {islamicBooks.map((book, i) => (
            <BookCard key={book.title} book={book} index={i} />
          ))}
        </SectionGrid>
      </div>

      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="h-8 w-1 rounded-full bg-blue-500" />
          <div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Technical Library</h3>
            <p className="text-xs text-zinc-500">Guides on programming, data science, AI, and full-stack development.</p>
          </div>
        </div>
        <SectionGrid>
          {techBooks.map((book, i) => (
            <BookCard key={book.title} book={book} index={i} onPay={setPayBook} />
          ))}
        </SectionGrid>
      </div>

      {payBook && (
        <PaymentModal
          open={!!payBook}
          onClose={() => setPayBook(null)}
          bookTitle={payBook?.title || ""}
          pdfUrl={payBook?.pdfUrl || ""}
          pages={payBook?.pages}
        />
      )}
    </Section>
  );
}
