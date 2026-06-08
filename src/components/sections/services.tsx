"use client";

import { motion } from "framer-motion";
import { Code, Palette, Server, Globe } from "lucide-react";
import { Section, SectionGrid } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getServices } from "@/lib/data";

const iconMap: Record<string, React.ReactNode> = {
  "Web Development": <Code className="h-5 w-5" />,
  "Backend Development": <Server className="h-5 w-5" />,
  "UI/UX Design": <Palette className="h-5 w-5" />,
};

export function Expertise() {
  const services = getServices();

  return (
    <Section
      id="expertise"
      title="What I Do"
      subtitle="Areas of expertise and things I build."
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
            <Card className="h-full flex flex-col group hover:border-blue-200 dark:hover:border-blue-700">
              <CardHeader>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white mb-2">
                  {iconMap[service.title] || <Code className="h-5 w-5" />}
                </div>
                <CardTitle className="text-lg">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <p className="text-sm text-zinc-500 dark:text-zinc-400 flex-1 mb-4">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {service.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </SectionGrid>
    </Section>
  );
}
