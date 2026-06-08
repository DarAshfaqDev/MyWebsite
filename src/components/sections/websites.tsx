"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Section, SectionGrid } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getWebsites } from "@/lib/data";

export function Websites() {
  const websites = getWebsites();

  return (
    <Section
      id="websites"
      title="Featured Websites"
      subtitle="Explore my digital ecosystem — a network of specialized platforms."
    >
      <SectionGrid>
        {websites.map((website, index) => (
          <motion.div
            key={website.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
          >
            <Card className="h-full flex flex-col group hover:border-blue-200 dark:hover:border-blue-700">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                    {website.title.charAt(0)}
                  </div>
                  <Badge variant="secondary">{website.category}</Badge>
                </div>
                <CardTitle className="mt-3 text-lg">{website.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <p className="text-sm text-zinc-500 dark:text-zinc-400 flex-1 mb-4">
                  {website.description}
                </p>
                <a
                  href={website.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="sm" className="w-full group">
                    Visit Website
                    <ExternalLink className="ml-2 h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </Button>
                </a>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </SectionGrid>
    </Section>
  );
}
