"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { PaymentModal } from "@/components/ui/payment-modal";

function PDFReader() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const fileParam = searchParams.get("file");
  const paid = searchParams.get("paid") === "true";
  const bookTitle = searchParams.get("title") || "Study Corner Book";
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showPay, setShowPay] = useState(false);

  useEffect(() => {
    if (!fileParam) {
      setError("No file specified");
      setLoading(false);
      return;
    }

    let cancelled = false;

    const loadPDF = async () => {
      try {
        const pdfjsLib = await import("pdfjs-dist");
        pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

        const response = await fetch(
          `/api/books/pdf?file=${encodeURIComponent(fileParam)}&mode=read`
        );
        if (!response.ok) {
          if (response.status === 401) {
            router.push("/dashboard/login");
            return;
          }
          throw new Error("Failed to load PDF");
        }

        const arrayBuffer = await response.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        if (cancelled) return;

        const container = containerRef.current;
        if (!container) return;

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 1.5 });

          const canvas = document.createElement("canvas");
          canvas.style.margin = "0 auto 16px";
          canvas.style.display = "block";
          canvas.style.maxWidth = "100%";
          canvas.style.boxShadow = "0 2px 8px rgba(0,0,0,0.12)";
          canvas.style.borderRadius = "4px";
          canvas.width = viewport.width;
          canvas.height = viewport.height;

          await page.render({ canvas, viewport, background: "white" }).promise;
          container.appendChild(canvas);
        }

        setLoading(false);
      } catch {
        if (!cancelled) {
          setError("Failed to load PDF");
          setLoading(false);
        }
      }
    };

    loadPDF();

    return () => {
      cancelled = true;
    };
  }, [fileParam, router]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (e.target instanceof HTMLCanvasElement) {
        e.preventDefault();
      }
    };
    document.addEventListener("contextmenu", handler);
    return () => document.removeEventListener("contextmenu", handler);
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">{error}</p>
          <button
            onClick={() => router.back()}
            className="text-blue-600 hover:underline"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  const downloadUrl = `/api/books/pdf?file=${encodeURIComponent(fileParam || "")}&mode=download`;

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      {paid && (
        <div className="max-w-4xl mx-auto mb-6 p-4 rounded-2xl border-2 border-amber-200 dark:border-amber-700/50 bg-amber-50 dark:bg-amber-900/10 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="font-medium text-sm text-amber-800 dark:text-amber-300">Study Corner Book</p>
            <p className="text-xs text-amber-600 dark:text-amber-400 mt-0.5">Pay &amp; download this book to support the creator.</p>
          </div>
          <button
            onClick={() => setShowPay(true)}
            className="shrink-0 px-4 py-2 rounded-xl bg-amber-600 text-white text-xs font-medium hover:bg-amber-700 transition-colors"
          >
            Pay &amp; Download
          </button>
        </div>
      )}
      {loading && (
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-4" />
            <p className="text-gray-500">Loading PDF...</p>
          </div>
        </div>
      )}
      <div ref={containerRef} className="max-w-4xl mx-auto" />

      <PaymentModal
        open={showPay}
        onClose={() => setShowPay(false)}
        bookTitle={bookTitle}
        pdfUrl={downloadUrl}
      />
    </div>
  );
}

export default function PDFReaderPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
        </div>
      }
    >
      <PDFReader />
    </Suspense>
  );
}
