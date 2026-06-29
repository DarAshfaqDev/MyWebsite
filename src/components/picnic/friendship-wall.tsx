'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { quotes } from '@/lib/picnic-seed-data';
import { Badge } from '@/components/ui/badge';
import { Heart, Sparkles, Quote } from 'lucide-react';

export default function FriendshipWall() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [likedQuotes, setLikedQuotes] = useState<Set<string>>(new Set());

  const toggleLike = (id: string) => {
    setLikedQuotes(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const isInsideJoke = (q: typeof quotes[0]) => q.author?.includes('Ishfaq') || q.author?.includes('Rouf') || q.author?.includes('Shoib');

  return (
    <section id="wall" ref={ref} className="py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {} }
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 px-4 py-1.5 text-xs font-medium tracking-wider uppercase border-primary/20 text-primary bg-primary/5">
            <Quote className="w-3 h-3 mr-1.5" />
            Friendship Wall
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Words That <span className="text-gradient">Define Us</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Quotes, inside jokes, and moments that capture the essence of our friendship.
          </p>
        </motion.div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {quotes.map((quote, index) => (
            <motion.div
              key={quote.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {} }
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="break-inside-avoid"
            >
              <div className={`p-5 rounded-2xl border shadow-sm transition-all hover:shadow-lg group ${
                isInsideJoke(quote)
                  ? 'bg-[#F4A261]/5 border-[#F4A261]/20 hover:border-[#F4A261]/40'
                  : 'bg-card border-border/50 hover:border-primary/20'
              }`}>
                <Quote className={`w-6 h-6 mb-3 ${isInsideJoke(quote) ? 'text-[#E8751A]/40' : 'text-primary/20'}`} />
                <p className="text-sm leading-relaxed font-medium">&ldquo;{quote.text}&rdquo;</p>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">— {quote.author}</p>
                    {quote.context && (
                      <p className="text-[10px] text-muted-foreground/60 mt-0.5 italic">{quote.context}</p>
                    )}
                    {quote.year && (
                      <Badge variant="secondary" className="text-[9px] mt-1.5 px-1.5 py-0">{quote.year}</Badge>
                    )}
                  </div>
                  <button
                    onClick={() => toggleLike(quote.id)}
                    className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center transition-colors"
                  >
                    <Heart className={`w-4 h-4 transition-colors ${
                      likedQuotes.has(quote.id)
                        ? 'fill-red-500 text-red-500'
                        : 'text-muted-foreground/40 group-hover:text-muted-foreground'
                    }`} />
                  </button>
                </div>
                {isInsideJoke(quote) && (
                  <div className="mt-3 pt-2 border-t border-[#F4A261]/10">
                    <span className="text-[10px] text-[#8B6914] dark:text-[#F4A261] font-medium">🔒 Inside Joke</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
