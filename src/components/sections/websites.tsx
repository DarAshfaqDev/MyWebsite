"use client";

import { motion } from "framer-motion";
import { ExternalLink, Globe, ArrowUpRight } from "lucide-react";
import { Section, SectionGrid } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getWebsites } from "@/lib/data";

export function Websites() {
  const websites = getWebsites();

  return (
    <Section
      id="websites"
      title={
        <span>
          My <span className="gradient-text">Digital Ecosystem</span>
        </span>
      }
      subtitle="Explore my network of specialized platforms and online destinations."
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
            <a
              href={website.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full"
            >
              <Card className="h-full flex flex-col group hover:border-blue-200 dark:hover:border-blue-700 card-premium cursor-pointer">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
                      <Globe className="h-5 w-5" />
                    </div>
                    <Badge variant="secondary" className="shrink-0">
                      {website.category}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-lg text-zinc-900 dark:text-zinc-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {website.title}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 flex-1 mb-5 leading-relaxed">
                    {website.description}
                  </p>
                  <div className="flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:gap-2 transition-all">
                    Visit Website
                    <ArrowUpRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </CardContent>
              </Card>
            </a>
          </motion.div>
        ))}
      </SectionGrid>
    </Section>
  );
}
