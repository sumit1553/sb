'use client';

import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { DEMO_CAMPAIGNS } from '@/lib/demoData';
import { Megaphone, Calendar, Hash } from 'lucide-react';

export default function AdminCampaignsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-3xl font-medium text-white">Campaign Management</h2>
        <p className="text-sm text-white/50">Active and upcoming café AR campaigns.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {DEMO_CAMPAIGNS.map(c => (
          <GlassCard key={c.id} variant="card" className="p-6 space-y-4 border border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-[#c8852a]" />
                <h3 className="font-display text-xl text-white">{c.name}</h3>
              </div>
              <span className={`text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full ${
                c.active ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-white/10 text-white/40'
              }`}>
                {c.active ? 'Active' : 'Inactive'}
              </span>
            </div>

            <div className="space-y-2 text-xs text-white/70">
              <div className="flex items-center justify-between">
                <span className="text-white/40">Campaign Hashtag:</span>
                <span className="font-mono text-[#c8852a] font-medium">{c.hashtag}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/40">Duration:</span>
                <span className="font-mono">{c.startDate} → {c.endDate}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/40">Slug:</span>
                <span className="font-mono text-white/50">{c.slug}</span>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
