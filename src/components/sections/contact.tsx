"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, Calendar, Check } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getProfile } from "@/lib/data";

export function Contact() {
  const profile = getProfile();
  const [submitted, setSubmitted] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailto = `mailto:${profile.email}?subject=Contact from ${formData.name}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    window.open(mailto);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: "", email: "", message: "" });
  };

  const contactItems = [
    { icon: <Mail className="h-4 w-4" />, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { icon: <Phone className="h-4 w-4" />, label: "Phone", value: profile.phone, href: `tel:${profile.phone}` },
    { icon: <MapPin className="h-4 w-4" />, label: "Location", value: profile.location },
  ].filter((item) => item.value);

  return (
    <Section
      id="contact"
      title="Get In Touch"
      subtitle="Have a project, question, or opportunity? Let's talk."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1"
                  >
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1"
                  >
                    Your Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>
                <Button
                  type="submit"
                  variant="default"
                  size="lg"
                  className="w-full"
                >
                  {submitted ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          {contactItems.map((item) => (
            <Card key={item.label} className="hover:border-blue-200 dark:hover:border-blue-700">
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <span className="p-2.5 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                    {item.icon}
                  </span>
                  <div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="font-medium text-sm text-zinc-900 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="font-medium text-sm text-zinc-900 dark:text-zinc-100">
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {profile.calendlyUrl && (
            <a
              href={profile.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Card className="hover:border-green-200 dark:hover:border-green-700 cursor-pointer transition-all duration-300 hover:shadow-md">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3">
                    <span className="p-2.5 rounded-xl bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                      <Calendar className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        Schedule a Meeting
                      </p>
                      <p className="font-medium text-sm text-zinc-900 dark:text-zinc-100">
                        Book a call via Calendly
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </a>
          )}
        </motion.div>
      </div>
    </Section>
  );
}
