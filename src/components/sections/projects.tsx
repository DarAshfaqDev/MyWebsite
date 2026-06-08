"use client";

import { motion } from "framer-motion";
import { ExternalLink, BookOpen, FileText, GitBranch } from "lucide-react";
import { Section, SectionGrid } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProjects } from "@/lib/data";

export function Projects() {
  const projects = getProjects();

  return (
    <Section
      id="projects"
      title="Featured Projects"
      subtitle="Open-source work, side projects, and production platforms I've built."
      className="bg-zinc-50/50 dark:bg-zinc-900/50"
    >
      <SectionGrid>
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full flex flex-col group hover:border-purple-200 dark:hover:border-purple-700">
              <CardHeader>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                  {project.title.charAt(0)}
                </div>
                <CardTitle className="mt-3 text-lg">{project.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <p className="text-sm text-zinc-500 dark:text-zinc-400 flex-1 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" size="sm">
                        <GitBranch className="mr-1.5 h-3.5 w-3.5" />
                        Code
                      </Button>
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="default" size="sm">
                        <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                        Demo
                      </Button>
                    </a>
                  )}
                  {project.documentationUrl && (
                    <a
                      href={project.documentationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="ghost" size="sm">
                        <BookOpen className="mr-1.5 h-3.5 w-3.5" />
                        Docs
                      </Button>
                    </a>
                  )}
                  {project.caseStudyUrl && (
                    <a
                      href={project.caseStudyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="ghost" size="sm">
                        <FileText className="mr-1.5 h-3.5 w-3.5" />
                        Case Study
                      </Button>
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </SectionGrid>
    </Section>
  );
}
