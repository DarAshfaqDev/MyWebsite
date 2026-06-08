"use client";

import { motion } from "framer-motion";
import { ExternalLink, Briefcase } from "lucide-react";
import { Section, SectionGrid } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getServices } from "@/lib/data";

export function Services() {
  const services = getServices();

  return (
    <Section
      id="services"
      title="Services"
      subtitle="What I can do for you."
      className="bg-zinc-50/50 dark:bg-zinc-900/50"
    >
      <SectionGrid>
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
          >
            <Card className="h-full flex flex-col group hover:border-purple-200 dark:hover:border-purple-700">
              <CardHeader>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white mb-2">
                  <Briefcase className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <p className="text-sm text-zinc-500 dark:text-zinc-400 flex-1 mb-4">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {service.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-zinc-100 dark:border-zinc-800">
                  <span className="text-xs text-zinc-400">
                    {service.pricingModel}
                  </span>
                  <a href="#contact">
                    <Button variant="default" size="sm">
                      Contact Me
                      <ExternalLink className="ml-1.5 h-3 w-3" />
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </SectionGrid>
    </Section>
  );
}
