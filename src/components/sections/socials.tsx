"use client";

import { motion } from "framer-motion";
import {
  ExternalLink,
  Copy,
  Check,
  MessageCircle,
  Send,
  Globe,
  Mail,
  Link2,
  Hash,
  User,
  Star,
} from "lucide-react";
import { Section, SectionGrid } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getSocials } from "@/lib/data";
import { copyToClipboard } from "@/lib/utils";
import * as React from "react";

const iconMap: Record<string, React.ReactNode> = {
  twitter: <Link2 className="h-4 w-4" />,
  linkedin: <Link2 className="h-4 w-4" />,
  github: <Star className="h-4 w-4" />,
  youtube: <Globe className="h-4 w-4" />,
  instagram: <Hash className="h-4 w-4" />,
  facebook: <User className="h-4 w-4" />,
  discord: <MessageCircle className="h-4 w-4" />,
  telegram: <Send className="h-4 w-4" />,
  whatsapp: <MessageCircle className="h-4 w-4" />,
  medium: <Globe className="h-4 w-4" />,
  mail: <Mail className="h-4 w-4" />,
  default: <Globe className="h-4 w-4" />,
};

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
      id="socials"
      title="Connect With Me"
      subtitle="Follow me across the web — let's stay connected."
      className="bg-zinc-50/50 dark:bg-zinc-900/50"
    >
      <SectionGrid>
        {socials.map((social, index) => (
          <motion.div
            key={social.platform}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
          >
            <Card className="group hover:border-blue-200 dark:hover:border-blue-700">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                      {iconMap[social.icon] || iconMap.default}
                    </span>
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
    </Section>
  );
}
