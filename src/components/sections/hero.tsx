"use client";

import { motion } from "framer-motion";
import {
  ArrowDown,
  Globe,
  User,
  BookOpen,
  Compass,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProfile } from "@/lib/data";

export function Hero() {
  const profile = getProfile();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-200/30 dark:bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-200/30 dark:bg-purple-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8 inline-block">
            <div className="relative">
              <div className="w-36 h-36 md:w-44 md:h-44 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 p-1 mx-auto">
                <img
                  src={profile.photo}
                  alt={profile.name}
                  className="w-full h-full rounded-full object-cover object-top bg-zinc-200 dark:bg-zinc-700"
                />
              </div>
              <span className="absolute bottom-2 right-1 w-5 h-5 bg-green-400 border-2 border-white dark:border-zinc-900 rounded-full" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-4">
            {profile.name}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-lg sm:text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 font-medium mb-3">
            {profile.title}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-base md:text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto mb-8 leading-relaxed">
            {profile.tagline}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <a href="#websites">
            <Button variant="default" size="lg">
              <Globe className="mr-2 h-4 w-4" />
              My Websites
            </Button>
          </a>
          <a href="#profiles">
            <Button variant="outline" size="lg">
              <User className="mr-2 h-4 w-4" />
              My Profiles
            </Button>
          </a>
          <a href="https://lifeos-aiproject-n13mbnbl7-dar-ishfaq-backends-projects.vercel.app" target="_blank" rel="noopener noreferrer">
            <Button variant="default" size="lg" className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white border-0">
              <Sparkles className="mr-2 h-4 w-4" />
              LifeOS AI
            </Button>
          </a>
          <a href="#publications">
            <Button variant="secondary" size="lg">
              <BookOpen className="mr-2 h-4 w-4" />
              My Publications
            </Button>
          </a>
          <a href="#about">
            <Button variant="ghost" size="lg">
              <Compass className="mr-2 h-4 w-4" />
              Explore My World
            </Button>
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a
          href="#about"
          className="flex flex-col items-center gap-1 text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
        >
          <span className="text-xs font-medium">Explore</span>
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
}
