import type { MetadataRoute } from "next";
import { getSiteConfig } from "@/lib/data";

export default function manifest(): MetadataRoute.Manifest {
  const config = getSiteConfig();

  return {
    name: config.name,
    short_name: config.name,
    description: config.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#09090b",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
