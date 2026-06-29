'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Mountain, Clock, Images, Users, BarChart3, BookOpen, MessageCircle, Heart,
  Sun, Moon, Menu, X, TreePine, ChevronDown, Compass, MapPin, Quote, Settings
} from 'lucide-react';

const navItems = [
  { id: 'home', label: 'Home', icon: Mountain },
  { id: 'timeline', label: 'Timeline', icon: Clock },
  { id: 'gallery', label: 'Gallery', icon: Images },
  { id: 'friends', label: 'Friends', icon: Users },
  { id: 'statistics', label: 'Statistics', icon: BarChart3 },
  { id: 'journal', label: 'Journal', icon: BookOpen },
  { id: 'guestbook', label: 'Guestbook', icon: MessageCircle },
  { id: 'wall', label: 'Wall', icon: Quote },
  { id: 'then-vs-now', label: 'Then vs Now', icon: Compass },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navItems.map(item => ({
        id: item.id,
        el: document.getElementById(item.id)
      })).filter(s => s.el);

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.el && section.el.getBoundingClientRect().top <= 120) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass-strong shadow-lg shadow-black/5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-18">
            {/* Logo */}
            <button
              onClick={() => scrollTo('home')}
              className="flex items-center gap-2.5 group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2D5A27] to-[#5BA4CF] flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                <TreePine className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-sm font-bold tracking-tight leading-none text-gradient">
                  The Friendship Vault
                </h1>
                <p className="text-[10px] text-muted-foreground leading-none mt-0.5">
                  Kashmir • Since 2013
                </p>
              </div>
            </button>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`relative px-3 py-2 text-xs font-medium rounded-lg transition-all duration-300 ${
                    activeSection === item.id
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-primary rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2">
              {mounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="rounded-xl h-9 w-9"
                >
                  {theme === 'dark' ? (
                    <Sun className="w-4 h-4" />
                  ) : (
                    <Moon className="w-4 h-4" />
                  )}
                </Button>
              )}

              {/* Mobile menu */}
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="ghost" size="icon" className="rounded-xl h-9 w-9">
                    <Menu className="w-4 h-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-72 pt-16 px-4">
                  <div className="flex flex-col gap-1">
                    {navItems.map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <motion.button
                          key={item.id}
                          initial={{ x: 20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: i * 0.05 }}
                          onClick={() => scrollTo(item.id)}
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                            activeSection === item.id
                              ? 'bg-primary/10 text-primary'
                              : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          {item.label}
                        </motion.button>
                      );
                    })}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-0.5">
        <motion.div
          className="h-full bg-gradient-to-r from-[#2D5A27] via-[#5BA4CF] to-[#E8751A]"
          style={{
            scaleX: scrolled ? undefined : 0,
            transformOrigin: 'left',
          }}
          id="scroll-progress"
        />
      </div>
    </>
  );
}
