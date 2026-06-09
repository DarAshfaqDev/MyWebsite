"use client";

import { motion } from "framer-motion";
import { Code, Palette, Server, Globe, Layers, PenTool } from "lucide-react";
import { Section, SectionGrid } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getServices } from "@/lib/data";

const iconMap: Record<string, { icon: React.ReactNode; gradient: string }> = {
  "Web Development": { icon: <Code className="h-5 w-5" />, gradient: "from-blue-400 to-purple-500" },
  "Backend Development": { icon: <Server className="h-5 w-5" />, gradient: "from-green-400 to-teal-500" },
  "UI/UX Design": { icon: <Palette className="h-5 w-5" />, gradient: "from-purple-400 to-pink-500" },
  "Portfolio Websites": { icon: <Globe className="h-5 w-5" />, gradient: "from-orange-400 to-rose-500" },
};

export function Expertise() {
  const services = getServices();

  return (
    <Section
      id="expertise"
      title={
        <span>
          What I <span className="gradient-text">Do</span>
        </span>
      }
      subtitle="Areas of expertise — the skills and technologies I work with."
    >
      <SectionGrid>
        {services.map((service, index) => {
          const meta = iconMap[service.title] || { icon: <Layers className="h-5 w-5" />, gradient: "from-zinc-400 to-zinc-500" };

          return (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Card className="h-full flex flex-col group hover:border-blue-200 dark:hover:border-blue-700 card-premium">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${meta.gradient} flex items-center justify-center text-white shadow-lg mb-4`}>
                    {meta.icon}
                  </div>
                  <h3 className="font-semibold text-lg text-zinc-900 dark:text-zinc-100 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 flex-1 mb-4 leading-relaxed">
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
          );
        })}
      </SectionGrid>
    </Section>
  );
}
