import type { Metadata } from "next";

interface SEOProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  publishedAt?: string;
  type?: "website" | "article";
}

export function generateMetadata({
  title,
  description,
  path,
  image,
  publishedAt,
  type = "website",
}: SEOProps): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";
  const ogImage = image || `${baseUrl}/og-image.jpg`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${baseUrl}${path}`,
      siteName: "Kamraan",
      locale: "en_US",
      type,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      ...(publishedAt && { publishedTime: publishedAt }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: `${baseUrl}${path}`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
