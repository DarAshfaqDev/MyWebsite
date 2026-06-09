"use client";

import { motion } from "framer-motion";
import {
  ExternalLink,
  Copy,
  Check,
  MessageCircle,
  Globe,
  Mail,
  Hash,
  User,
  Code2,
  Briefcase,
  Pen,
} from "lucide-react";
import { Section, SectionGrid } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getSocials } from "@/lib/data";
import { copyToClipboard } from "@/lib/utils";
import * as React from "react";

const platformIcon: Record<string, React.ReactNode> = {
  LinkedIn: <Briefcase className="h-4 w-4" />,
  GitHub: <Code2 className="h-4 w-4" />,
  "GitHub (Alt)": <Code2 className="h-4 w-4" />,
  "X (Twitter)": <Hash className="h-4 w-4" />,
  Instagram: <Hash className="h-4 w-4" />,
  Facebook: <User className="h-4 w-4" />,
  Medium: <Pen className="h-4 w-4" />,
  Reddit: <MessageCircle className="h-4 w-4" />,
  Behance: <Globe className="h-4 w-4" />,
  CodePen: <Pen className="h-4 w-4" />,
  Dribbble: <Hash className="h-4 w-4" />,
  Figma: <Pen className="h-4 w-4" />,
  Slack: <MessageCircle className="h-4 w-4" />,
  Email: <Mail className="h-4 w-4" />,
};

const platformColors: Record<string, string> = {
  LinkedIn: "#0A66C2",
  GitHub: "#333",
  "GitHub (Alt)": "#333",
  "X (Twitter)": "#1DA1F2",
  Instagram: "#E4405F",
  Facebook: "#1877F2",
  Medium: "#292929",
  Reddit: "#FF4500",
  Behance: "#1769FF",
  CodePen: "#000",
  Dribbble: "#EA4C89",
  Figma: "#F24E1E",
  Slack: "#4A154B",
  Email: "#EA4335",
};

const platformGroups = [
  { label: "Development & Code", key: "dev", platforms: ["GitHub", "GitHub (Alt)", "CodePen", "Figma"] },
  { label: "Professional & Social", key: "social", platforms: ["LinkedIn", "X (Twitter)", "Facebook", "Instagram", "Slack"] },
  { label: "Content & Creativity", key: "content", platforms: ["Medium", "Reddit", "Behance", "Dribbble"] },
  { label: "Contact", key: "contact", platforms: ["Email"] },
];

export function Socials() {
  const socials = getSocials();
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const handleCopy = async (url: string, id: string) => {
    try {
      await copyToClipboard(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // silently fail
    }
  };

  return (
    <Section
      id="profiles"
      title={
        <span>
          My <span className="gradient-text">Digital Presence</span>
        </span>
      }
      subtitle="Discover my footprint across the web — development, professional, creative, and social platforms."
      className="bg-zinc-50/50 dark:bg-zinc-900/50"
    >
      {platformGroups.map((group) => {
        const groupSocials = socials.filter((s) => group.platforms.includes(s.platform));
        if (groupSocials.length === 0) return null;

        return (
          <div key={group.key} className="mb-8 last:mb-0">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-4 flex items-center gap-2"
            >
              <span className="w-1 h-4 rounded-full bg-gradient-to-b from-blue-500 to-purple-500" />
              {group.label}
            </motion.h3>
            <SectionGrid>
              {groupSocials.map((social, index) => (
                <motion.div
                  key={social.platform}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: index * 0.03 }}
                >
                  <Card className="group hover:border-blue-200 dark:hover:border-blue-700 card-premium">
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{ backgroundColor: `${platformColors[social.platform] || '#71717A'}15` }}
                          >
                            <span style={{ color: platformColors[social.platform] || '#71717A' }}>
                              {platformIcon[social.platform] || <Globe className="h-4 w-4" />}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-sm text-zinc-900 dark:text-zinc-100">
                              {social.platform}
                            </p>
                            {social.username && (
                              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                {social.username}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <a
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1"
                        >
                          <Button variant="outline" size="sm" className="w-full">
                            Visit
                            <ExternalLink className="ml-1.5 h-3 w-3" />
                          </Button>
                        </a>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopy(social.url, social.platform)}
                          className="px-2.5"
                        >
                          {copiedId === social.platform ? (
                            <Check className="h-3.5 w-3.5 text-green-500" />
                          ) : (
                            <Copy className="h-3.5 w-3.5" />
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </SectionGrid>
          </div>
        );
      })}
    </Section>
  );
}
