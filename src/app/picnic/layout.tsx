import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/picnic/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Friendship Vault — 12 Years of Memories",
  description: "A digital museum preserving 12+ years of annual picnic memories between three best friends from Kashmir. Photographs, stories, and a lifetime of friendship.",
  keywords: ["friendship", "kashmir", "picnic", "memories", "digital museum", "Ishfaq", "Rouf", "Shoib"],
  authors: [{ name: "The Friendship Vault" }],
  icons: {
    icon: "/picnic-images/hero/logo.png",
  },
  openGraph: {
    title: "The Friendship Vault — 12 Years of Memories",
    description: "Every year, one picnic. Thousands of memories. A lifetime of friendship.",
    type: "website",
  },
};

export default function PicnicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
        >
          {children}
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
