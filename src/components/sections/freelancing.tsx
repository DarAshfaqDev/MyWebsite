"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Section, SectionGrid } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getFreelancingPlatforms } from "@/lib/data";

export function Platforms() {
  const platforms = getFreelancingPlatforms();

  return (
    <Section
      id="platforms"
      title="Platforms I Use"
      subtitle="Freelance, job, and professional platforms where I'm active."
    >
      <SectionGrid>
        {platforms.map((platform, index) => (
          <motion.div
            key={platform.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
          >
            <Card className="group hover:border-blue-200 dark:hover:border-blue-700">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                    {platform.name.charAt(0)}
                  </div>
                  <p className="font-medium text-sm text-zinc-900 dark:text-zinc-100">
                    {platform.name}
                  </p>
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
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
    </Section>
  );
}
