'use client';

import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { DEMO_CHARACTERS } from '@/lib/demoData';
import { User, Sparkles } from 'lucide-react';

export default function AdminCharactersPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-3xl font-medium text-white">3D Character System</h2>
        <p className="text-sm text-white/50">Modular 3D characters rendered via Three.js / React Three Fiber.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {DEMO_CHARACTERS.map(c => (
          <GlassCard key={c.id} variant="card" className="p-6 space-y-4 border border-white/10 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center" style={{ backgroundColor: `${c.colorPrimary}20`, color: c.colorPrimary }}>
                <User className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display text-xl text-white">{c.name}</h3>
                <p className="text-xs text-white/60 mt-1">{c.description}</p>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-white/10">
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/40">Personality:</span>
                <span className="text-white/80 capitalize font-medium">{c.personality}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/40">Animations:</span>
                <span className="text-white/80 font-mono">{c.animationSet.length} states</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/40">Variant:</span>
                <span className="font-mono text-[#c8852a]">{c.variant}</span>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
