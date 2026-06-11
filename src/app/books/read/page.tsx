"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function PDFReader() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const fileParam = searchParams.get("file");
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      {loading && (
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-4" />
            <p className="text-gray-500">Loading PDF...</p>
          </div>
        </div>
      )}
      <div ref={containerRef} className="max-w-4xl mx-auto" />
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
