import type { MetadataRoute } from "next";
import { getSiteConfig } from "@/lib/data";

export default function robots(): MetadataRoute.Robots {
  const config = getSiteConfig();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${config.url}/sitemap.xml`,
  };
}
