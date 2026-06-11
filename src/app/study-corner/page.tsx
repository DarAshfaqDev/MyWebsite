"use client";

import * as React from "react";
import { Search, BookOpen, FileText, ChevronLeft, ChevronRight } from "lucide-react";
import studyBooks from "../../../data/study-books.json";

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

const BOOKS_PER_PAGE = 8;

export default function StudyCornerPage() {
  const books = studyBooks as StudyBook[];
  const categories = React.useMemo(() => ["All", ...Array.from(new Set(books.map((b) => b.category)))], [books]);
  const [search, setSearch] = React.useState("");
  const [category, setCategory] = React.useState("All");
  const [page, setPage] = React.useState(1);

  const filtered = React.useMemo(() => {
    return books.filter((b) => {
      const q = search.toLowerCase();
      const matchSearch = !q || [b.title, b.author, b.category, b.description, ...b.tags].join(" ").toLowerCase().includes(q);
      const matchCategory = category === "All" || b.category === category;
      return matchSearch && matchCategory;
    });
  }, [books, search, category]);

  const totalPages = Math.ceil(filtered.length / BOOKS_PER_PAGE);
  const paged = filtered.slice((page - 1) * BOOKS_PER_PAGE, page * BOOKS_PER_PAGE);

  React.useEffect(() => {
    setPage(1);
  }, [search, category]);

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="mb-12 text-center">
          <p className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-3">Personal archive and shared resource</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">Study Corner</h1>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto text-sm">
            A curated collection of books for continuous learning, organized for personal reference and public reading.
          </p>
          <div className="flex items-center justify-center gap-6 mt-8">
            <div className="text-center">
              <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{books.length}</p>
              <p className="text-xs text-zinc-500">Books listed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">PDF</p>
              <p className="text-xs text-zinc-500">Native reader</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">Local</p>
              <p className="text-xs text-zinc-500">Save notes</p>
            </div>
          </div>
        </div>

        <div className="mb-8 space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input
              type="search" value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search books, authors, categories..."
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  category === cat
                    ? "bg-zinc-900 dark:bg-white text-white dark:text-black"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                }`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {paged.map((book) => (
            <div key={book.id} className="group rounded-2xl border border-zinc-200/50 dark:border-zinc-700/50 bg-white dark:bg-zinc-900 overflow-hidden hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-700 transition-all duration-300 flex flex-col">
              <div className="aspect-[3/4] bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 flex items-center justify-center p-6 relative overflow-hidden">
                <div className="text-center">
                  <FileText className="h-10 w-10 text-zinc-400 dark:text-zinc-600 mx-auto mb-2" />
                  <p className="text-[10px] text-zinc-400 dark:text-zinc-600 font-medium uppercase tracking-wider">{book.category}</p>
                  <p className="text-[10px] text-zinc-300 dark:text-zinc-700 mt-1">PDF</p>
                </div>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 line-clamp-2 leading-snug mb-1">{book.title}</h3>
                <p className="text-xs text-zinc-500 mb-2">{book.author}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {book.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">{tag}</span>
                  ))}
                </div>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 line-clamp-2 mb-3 flex-1">{book.description}</p>
                <div className="flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-zinc-800 mt-auto">
                  <span className="text-[10px] text-zinc-400"><FileText className="h-3 w-3 inline mr-1" />{book.size}</span>
                  <div className="flex gap-1.5">
                    <button onClick={() => window.open(`/books/read?file=${encodeURIComponent(book.source.split("/").pop() || "")}&paid=true&title=${encodeURIComponent(book.title)}`, "_blank")}
                      className="px-3 py-1.5 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-black text-[10px] font-medium hover:opacity-90 transition-opacity">
                      Read
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <BookOpen className="h-12 w-12 text-zinc-300 dark:text-zinc-600 mx-auto mb-4" />
            <p className="text-zinc-500 dark:text-zinc-400">No books match your search.</p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}
              className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-700 disabled:opacity-30 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button key={p} onClick={() => setPage(p)}
                className={`w-9 h-9 rounded-lg text-xs font-medium transition-colors ${
                  p === page ? "bg-zinc-900 dark:bg-white text-white dark:text-black" : "border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                }`}>
                {p}
              </button>
            ))}
            <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages}
              className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-700 disabled:opacity-30 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
