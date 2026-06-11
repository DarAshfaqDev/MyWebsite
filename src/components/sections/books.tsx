"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Download, BookOpen, BookMarked, Star, ShoppingCart, ExternalLink, Clock, LogIn, X } from "lucide-react";
import { Section, SectionGrid } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getBooks } from "@/lib/data";
import type { Book } from "@/lib/types";
import { PaymentModal } from "@/components/ui/payment-modal";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import studyBooksData from "../../../data/study-books.json";

const comingSoonTitles = new Set([
  "Python for Data Analytics",
  "SQL Mastery",
  "Power BI: From Data to Dashboard",
  "Machine Learning Engineering",
  "Generative AI & LLMs",
  "Full Stack Development with Next.js",
]);

const categoryColors: Record<string, { gradient: string; border: string }> = {
  Python: { gradient: "from-blue-500/10 to-blue-600/5 dark:from-blue-500/20", border: "border-blue-200/50 dark:border-blue-700/30" },
  SQL: { gradient: "from-green-500/10 to-green-600/5 dark:from-green-500/20", border: "border-green-200/50 dark:border-green-700/30" },
  "Power BI": { gradient: "from-yellow-500/10 to-yellow-600/5 dark:from-yellow-500/20", border: "border-yellow-200/50 dark:border-yellow-700/30" },
  "Machine Learning": { gradient: "from-purple-500/10 to-purple-600/5 dark:from-purple-500/20", border: "border-purple-200/50 dark:border-purple-700/30" },
  "Generative AI": { gradient: "from-pink-500/10 to-pink-600/5 dark:from-pink-500/20", border: "border-pink-200/50 dark:border-pink-700/30" },
  "Full Stack Development": { gradient: "from-orange-500/10 to-orange-600/5 dark:from-orange-500/20", border: "border-orange-200/50 dark:border-orange-700/30" },
  Islamic: { gradient: "from-emerald-600/10 to-teal-600/5 dark:from-emerald-500/20", border: "border-emerald-200/50 dark:border-emerald-700/30" },
  Technical: { gradient: "from-blue-500/10 to-blue-600/5 dark:from-blue-500/20", border: "border-blue-200/50 dark:border-blue-700/30" },
  "Self-Development": { gradient: "from-rose-500/10 to-rose-600/5 dark:from-rose-500/20", border: "border-rose-200/50 dark:border-rose-700/30" },
  Reference: { gradient: "from-amber-500/10 to-amber-600/5 dark:from-amber-500/20", border: "border-amber-200/50 dark:border-amber-700/30" },
};

const defaultColors = { gradient: "from-zinc-500/10 to-zinc-600/5 dark:from-zinc-500/20", border: "border-zinc-200/50 dark:border-zinc-700/30" };

interface StudyBook {
  id: string;
  title: string;
  author: string;
  category: string;
  tags: string[];
  description: string;
  size: string;
  source: string;
}

function AuthModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-sm bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden p-6 text-center">
        <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
          <X className="h-4 w-4 text-zinc-500" />
        </button>
        <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-4">
          <LogIn className="h-7 w-7 text-blue-600 dark:text-blue-400" />
        </div>
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">Sign In Required</h2>
        <p className="text-sm text-zinc-500 mb-6">Please sign in to access books, downloads, and purchases.</p>
        <button onClick={() => { onClose(); router.push("/dashboard/login"); }}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black text-sm font-medium hover:opacity-90 transition-opacity">
          <LogIn className="h-4 w-4" />
          Sign In
        </button>
        <button onClick={onClose} className="mt-2 text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">
          Continue browsing
        </button>
      </div>
    </div>
  );
}

function BookCard({ book, index, variant, onPay, onRead }: {
  book: Book & { comingSoon?: boolean; author?: string; fileParam?: string };
  index: number;
  variant: "islamic" | "coming-soon" | "study";
  onPay?: (book: Book) => void;
  onRead?: (book: Book & { author?: string; fileParam?: string }) => void;
}) {
  const colors = categoryColors[book.category] || defaultColors;
  const { data: session } = useSession();
  const [showAuth, setShowAuth] = React.useState(false);

  const requireAuth = (action: () => void) => {
    if (!session) setShowAuth(true);
    else action();
  };

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
            <div className={`w-14 h-18 rounded-xl bg-gradient-to-br ${variant === "islamic" ? "from-emerald-500 to-teal-600" : variant === "coming-soon" ? "from-zinc-400 to-zinc-500" : "from-blue-500 to-indigo-600"} flex items-center justify-center text-white shadow-lg shrink-0`}>
              {variant === "islamic" ? <Star className="h-6 w-6" /> : variant === "coming-soon" ? <Clock className="h-6 w-6" /> : <BookMarked className="h-6 w-6" />}
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
                {variant === "coming-soon" && (
                  <Badge variant="secondary" className="text-[10px] bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-700">
                    Coming Soon
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
            {variant === "coming-soon" ? (
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 text-sm font-medium cursor-default">
                <Clock className="h-4 w-4" />
                Coming Soon
              </span>
            ) : variant === "study" ? (
              <>
                <button onClick={() => requireAuth(() => onRead?.(book))}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all active:scale-[0.98]">
                  <BookOpen className="h-4 w-4" />
                  Read
                </button>
                <button onClick={() => requireAuth(() => onPay?.(book as Book))}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black text-sm font-medium hover:opacity-90 transition-all active:scale-[0.98]">
                  <ShoppingCart className="h-4 w-4" />
                  Pay &amp; Download
                </button>
              </>
            ) : (
              <>
                <button onClick={() => requireAuth(() => onRead?.(book))}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all active:scale-[0.98]">
                  <BookOpen className="h-4 w-4" />
                  Read
                </button>
                <button onClick={() => requireAuth(() => window.open(book.pdfUrl, "_blank"))}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black text-sm font-medium hover:opacity-90 transition-all active:scale-[0.98]">
                  <Download className="h-4 w-4" />
                  Download PDF
                </button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
      <AuthModal open={showAuth} onClose={() => setShowAuth(false)} />
    </motion.div>
  );
}

const apiFileUrl = (filePath: string, mode: string) => {
  const fileName = filePath.split("/").pop() || filePath.replace(/^\//, "");
  return `/api/books/pdf?file=${encodeURIComponent(fileName)}&mode=${mode}`;
};

const bookFileName = (filePath: string) =>
  (filePath.split("/").pop() || filePath.replace(/^\//, ""));

export function Books() {
  const books = getBooks();
  const islamicBooks = books.filter((b) => b.group === "islamic").map((b) => ({
    ...b,
    pdfUrl: apiFileUrl(b.pdfUrl || "", "download"),
    readUrl: apiFileUrl(b.pdfUrl || "", "read"),
    fileParam: bookFileName(b.pdfUrl || ""),
  }));
  const comingSoonBooks = books.filter((b) => b.group === "tech" && comingSoonTitles.has(b.title));
  const studyLibraryBooks = (studyBooksData as StudyBook[]).map((sb) => ({
    title: sb.title,
    description: sb.description,
    category: sb.category,
    tags: sb.tags,
    pdfUrl: apiFileUrl(sb.source, "download"),
    readUrl: apiFileUrl(sb.source, "read"),
    fileParam: bookFileName(sb.source),
    author: sb.author,
    pages: undefined,
    version: undefined,
  }));
  const [payBook, setPayBook] = React.useState<Book | null>(null);
  const [readPayBook, setReadPayBook] = React.useState<Book | null>(null);

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
            <BookCard
              key={book.title}
              book={book}
              index={i}
              variant="islamic"
              onRead={(b) =>
                window.open(
                  `/books/read?file=${encodeURIComponent((b as any).fileParam || "")}`,
                  "_blank"
                )
              }
            />
          ))}
        </SectionGrid>
      </div>

      <div className="mb-14">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-8 w-1 rounded-full bg-amber-500" />
          <div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Technical Library — Coming Soon</h3>
            <p className="text-xs text-zinc-500">Premium publications in development. Stay tuned.</p>
          </div>
        </div>
        <SectionGrid>
          {comingSoonBooks.map((book, i) => (
            <BookCard key={book.title} book={book} index={i} variant="coming-soon" />
          ))}
        </SectionGrid>
      </div>

      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="h-8 w-1 rounded-full bg-blue-500" />
          <div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Study Corner Library</h3>
            <p className="text-xs text-zinc-500">Curated learning resources available for reading and download.</p>
          </div>
        </div>
        <SectionGrid>
          {studyLibraryBooks.map((book, i) => (
            <BookCard
              key={book.title}
              book={book}
              index={i}
              variant="study"
              onPay={(b) => setPayBook(b)}
              onRead={(b) =>
                window.open(
                  `/books/read?file=${encodeURIComponent((b as any).fileParam || "")}&paid=true&title=${encodeURIComponent(b.title)}`,
                  "_blank"
                )
              }
            />
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
