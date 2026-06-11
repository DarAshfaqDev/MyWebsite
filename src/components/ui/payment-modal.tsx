"use client";

import * as React from "react";
import { X, Download, Heart, Shield } from "lucide-react";

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  bookTitle: string;
  pdfUrl: string;
}

const UPI_ID = "mohdashfaq1416-1@okicici";
const ACCOUNT_NAME = "Ishfaq Dar";
const SUGGESTED_PRICE = 99;

export function PaymentModal({ open, onClose, bookTitle, pdfUrl }: PaymentModalProps) {
  const paymentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      paymentRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  React.useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const upiLink = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(ACCOUNT_NAME)}&am=${SUGGESTED_PRICE}&cu=INR&tn=${encodeURIComponent(`Payment for: ${bookTitle}`)}`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={onClose}>
      <div ref={paymentRef} tabIndex={-1} onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden outline-none">
        <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors z-10">
          <X className="h-4 w-4 text-zinc-500" />
        </button>

        <div className="p-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mx-auto mb-4">
            <Heart className="h-7 w-7 text-amber-600 dark:text-amber-400" />
          </div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">Support My Work</h2>
          <p className="text-sm text-zinc-500 mb-1">
            You&apos;re about to download <strong className="text-zinc-700 dark:text-zinc-300">{bookTitle}</strong>.
          </p>
          <p className="text-xs text-zinc-400 mb-6">
            Your contribution helps me create more quality content. Suggested contribution: <strong className="text-zinc-600 dark:text-zinc-400">₹{SUGGESTED_PRICE}</strong>
          </p>
        </div>

        <div className="px-6 pb-6">
          <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl p-5 mb-5">
            <img src="/study/upi-qr.jpeg" alt="UPI QR Code"
              className="w-48 h-48 mx-auto rounded-xl shadow-sm object-cover"
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = "none";
                target.nextElementSibling?.classList.remove("hidden");
              }} />
            <p className="text-xs text-zinc-400 text-center mt-3 hidden">QR code not available. Use UPI ID below.</p>
            <div className="mt-3 text-center">
              <p className="text-xs text-zinc-500 mb-1">Or pay via UPI</p>
              <p className="text-sm font-mono font-semibold text-zinc-800 dark:text-zinc-200 bg-white dark:bg-zinc-800 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 inline-block select-all">
                {UPI_ID}
              </p>
            </div>
          </div>

          <div className="space-y-2.5">
            <a href={upiLink} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-black text-sm font-medium hover:opacity-90 transition-opacity">
              <img src="https://img.icons8.com/color/20/google-pay-india.png" alt="" className="h-5 w-5" />
              Pay ₹{SUGGESTED_PRICE} via UPI
            </a>
            <a href={pdfUrl} target="_blank" rel="noopener noreferrer" download
              className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl border-2 border-emerald-500 text-emerald-600 dark:text-emerald-400 text-sm font-medium hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors">
              <Download className="h-4 w-4" />
              Download PDF after Payment
            </a>
          </div>

          <div className="flex items-center justify-center gap-1.5 mt-4 text-[10px] text-zinc-400">
            <Shield className="h-3 w-3" />
            Secure UPI · No account needed
          </div>
        </div>
      </div>
    </div>
  );
}
