"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Section, SectionGrid } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getCareerPlatforms, getCareerRegions } from "@/lib/data";

export function Career() {
  const regions = getCareerRegions();

  return (
    <Section
      id="career"
      title="Career Hub"
      subtitle="Job platforms and career resources by region."
      className="bg-zinc-50/50 dark:bg-zinc-900/50"
    >
      {regions.map((region) => (
        <div key={region} className="mb-8 last:mb-0">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-lg font-semibold text-zinc-800 dark:text-zinc-200 mb-4 flex items-center gap-2"
          >
            <span className="w-1.5 h-5 rounded-full bg-blue-500" />
            {region}
          </motion.h3>
          <SectionGrid>
            {getCareerPlatforms()
              .filter((p) => p.region === region)
              .map((platform, index) => (
                <motion.div
                  key={platform.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.03 }}
                >
                  <Card className="group hover:border-blue-200 dark:hover:border-blue-700">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-xs">
                            {platform.name.charAt(0)}
                          </div>
                          <p className="font-medium text-sm text-zinc-900 dark:text-zinc-100">
                            {platform.name}
                          </p>
                        </div>
                        <Badge variant="secondary" className="text-[10px]">
                          {platform.region}
                        </Badge>
                      </div>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3 line-clamp-1">
                        {platform.description}
                      </p>
                      <a
                        href={platform.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="outline" size="sm" className="w-full">
                          Visit Platform
                          <ExternalLink className="ml-1.5 h-3 w-3" />
                        </Button>
                      </a>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
          </SectionGrid>
        </div>
      ))}
    </Section>
  );
}
