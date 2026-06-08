import type { MetadataRoute } from "next";
import { getSiteConfig } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const config = getSiteConfig();

  const staticRoutes = [
    {
      url: config.url,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1.0,
    },
  ];

  return staticRoutes;
}
