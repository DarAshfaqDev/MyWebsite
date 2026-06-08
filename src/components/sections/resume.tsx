"use client";

import { motion } from "framer-motion";
import {
  Download,
  Eye,
  Share2,
  FileText,
  GraduationCap,
  Award,
  BookOpen,
} from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getProfile } from "@/lib/data";

export function Resume() {
  const profile = getProfile();

  const documents = [
    { label: "Resume", url: profile.resumeUrl, icon: <FileText className="h-5 w-5" />, desc: "Professional resume" },
    { label: "Academic CV", url: profile.academicCvUrl, icon: <GraduationCap className="h-5 w-5" />, desc: "Academic credentials" },
    { label: "Research CV", url: profile.researchCvUrl, icon: <BookOpen className="h-5 w-5" />, desc: "Research experience" },
    { label: "Portfolio PDF", url: profile.portfolioPdfUrl, icon: <Award className="h-5 w-5" />, desc: "Portfolio showcase" },
    { label: "Certifications", url: profile.certificationsUrl, icon: <Award className="h-5 w-5" />, desc: "Certificates & badges" },
  ].filter((d) => d.url);

  return (
    <Section
      id="resume"
      title="Resume & CV"
      subtitle="Download or preview my professional documents."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.map((doc, index) => (
          <motion.div
            key={doc.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
          >
            <Card className="group hover:border-blue-200 dark:hover:border-blue-700">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-4">
                  <span className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                    {doc.icon}
                  </span>
                  <div>
                    <p className="font-medium text-sm text-zinc-900 dark:text-zinc-100">
                      {doc.label}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      {doc.desc}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button variant="outline" size="sm" className="w-full">
                      <Eye className="mr-1.5 h-3.5 w-3.5" />
                      Preview
                    </Button>
                  </a>
                  <a
                    href={doc.url}
                    download
                  >
                    <Button variant="default" size="sm">
                      <Download className="h-3.5 w-3.5" />
                    </Button>
                  </a>
                  <Button variant="ghost" size="sm">
                    <Share2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
