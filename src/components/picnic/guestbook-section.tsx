'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { guestbookEntries as initialEntries } from '@/lib/picnic-seed-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import {
  MessageCircle, Heart, Send, Smile, ThumbsUp, PartyPopper, Flame
} from 'lucide-react';
import { toast } from 'sonner';

export default function GuestbookSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [entries, setEntries] = useState(initialEntries);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      toast.error('Please fill in both name and message');
      return;
    }
    setIsSubmitting(true);
    // Simulate submission
    await new Promise(r => setTimeout(r, 800));
    const newEntry = {
      id: `gb-${Date.now()}`,
      name: name.trim(),
      message: message.trim(),
      emoji: '💚',
      createdAt: new Date().toISOString(),
    };
    setEntries(prev => [newEntry, ...prev]);
    setName('');
    setMessage('');
    setIsSubmitting(false);
    toast.success('Thank you for leaving a message! 💚');
  };

  const reactionEmojis = ['❤️', '😂', '😭', '🔥', '👏', '🎉'];

  return (
    <section id="guestbook" ref={ref} className="py-24 px-4 sm:px-6 bg-muted/30">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {} }
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4 px-4 py-1.5 text-xs font-medium tracking-wider uppercase border-primary/20 text-primary bg-primary/5">
            <MessageCircle className="w-3 h-3 mr-1.5" />
            Guestbook
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Leave a <span className="text-gradient">Message</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Visitors, friends, and family — share your thoughts about our friendship journey.
          </p>
        </motion.div>

        {/* Entry Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {} }
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="border-border/50 shadow-sm mb-8">
            <CardContent className="p-5">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="rounded-xl h-11"
                  />
                </div>
                <Textarea
                  placeholder="Write a message for Ishfaq, Rouf & Shoib..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  className="rounded-xl resize-none"
                />
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {['😊', '❤️', '🏔️', '✨', '👏', '🍃'].map(emoji => (
                      <button
                        key={emoji}
                        type="button"
                        className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center text-sm transition-colors"
                      >{emoji}</button>
                    ))}
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting || !name.trim() || !message.trim()}
                    className="rounded-xl h-10 px-6"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-4 h-4" /> Send Message
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Entries */}
        <div className="space-y-4">
          {entries.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {} }
              transition={{ duration: 0.4, delay: 0.3 + index * 0.08 }}
            >
              <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-[#5BA4CF]/20 flex items-center justify-center text-lg shrink-0">
                      {entry.emoji || '✨'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm">{entry.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(entry.createdAt).toLocaleDateString('en-IN', {
                            year: 'numeric', month: 'short', day: 'numeric'
                          })}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {entry.message}
                      </p>
                      <div className="flex items-center gap-2 mt-3">
                        {reactionEmojis.map(emoji => (
                          <button
                            key={emoji}
                            className="text-sm hover:scale-125 transition-transform"
                          >{emoji}</button>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
