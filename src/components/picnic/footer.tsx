'use client';

import { TreePine, Heart, MapPin, Calendar } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const yearsActive = currentYear - 2013;

  return (
    <footer className="relative mt-auto">
      <div className="gradient-nature border-t border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid sm:grid-cols-3 gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2D5A27] to-[#5BA4CF] flex items-center justify-center shadow-md">
                  <TreePine className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gradient">The Friendship Vault</h3>
                  <p className="text-[10px] text-muted-foreground">Kashmir • Since 2013</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
                A digital museum preserving {yearsActive}+ years of annual picnic memories between three best friends from Kashmir, India.
              </p>
            </div>

            {/* Quick Stats */}
            <div>
              <h4 className="text-sm font-semibold mb-4">By The Numbers</h4>
              <div className="space-y-2">
                {[
                  { icon: Calendar, label: 'Years of Friendship', value: `${yearsActive}+` },
                  { icon: MapPin, label: 'Places Explored', value: '12+' },
                  { icon: Heart, label: 'Unbreakable Bond', value: '∞' },
                ].map(stat => (
                  <div key={stat.label} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <stat.icon className="w-3 h-3 text-primary" />
                    <span>{stat.label}: <span className="font-medium text-foreground">{stat.value}</span></span>
                  </div>
                ))}
              </div>
            </div>

            {/* Friends */}
            <div>
              <h4 className="text-sm font-semibold mb-4">The Trio</h4>
              <div className="space-y-2 text-xs text-muted-foreground">
                <p><span className="font-medium text-foreground">Ishfaq</span> — The Planner</p>
                <p><span className="font-medium text-foreground">Rouf</span> — The Entertainer</p>
                <p><span className="font-medium text-foreground">Shoib</span> — The Anchor</p>
              </div>
              <div className="mt-4 p-3 rounded-xl bg-primary/5 border border-primary/10">
                <p className="text-xs text-primary font-medium">
                  &ldquo;Every year, one picnic. Thousands of memories. A lifetime of friendship.&rdquo;
                </p>
              </div>
            </div>
          </div>

          <Separator className="my-8" />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground text-center sm:text-left">
              © {currentYear} The Friendship Vault. Made with <Heart className="w-3 h-3 inline text-red-500 fill-red-500" /> in Kashmir.
            </p>
            <p className="text-xs text-muted-foreground">
              Ishfaq • Rouf • Shoib — Best Friends Forever
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
