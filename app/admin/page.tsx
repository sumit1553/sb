'use client';

import React from 'react';
import Link from 'next/link';
import { Megaphone, User, Quote, Store, QrCode, BarChart3 } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { DEMO_BRANDS, DEMO_CAMPAIGNS, DEMO_CHARACTERS, DEMO_QUOTES, DEMO_TABLES } from '@/lib/demoData';

export default function AdminOverviewPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-3xl font-medium text-white">Dashboard Overview</h2>
        <p className="text-sm text-white/50">Manage brands, locations, campaigns, 3D characters, and QR codes.</p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <GlassCard variant="card" className="p-4 space-y-2 border border-white/10">
          <div className="flex items-center justify-between text-xs text-white/50">
            <span>Brands</span>
            <Store className="w-4 h-4 text-[#c8852a]" />
          </div>
          <p className="text-2xl font-bold font-mono text-white">{DEMO_BRANDS.length}</p>
        </GlassCard>

        <GlassCard variant="card" className="p-4 space-y-2 border border-white/10">
          <div className="flex items-center justify-between text-xs text-white/50">
            <span>Active Campaigns</span>
            <Megaphone className="w-4 h-4 text-[#c8852a]" />
          </div>
          <p className="text-2xl font-bold font-mono text-white">{DEMO_CAMPAIGNS.length}</p>
        </GlassCard>

        <GlassCard variant="card" className="p-4 space-y-2 border border-white/10">
          <div className="flex items-center justify-between text-xs text-white/50">
            <span>3D Characters</span>
            <User className="w-4 h-4 text-[#c8852a]" />
          </div>
          <p className="text-2xl font-bold font-mono text-white">{DEMO_CHARACTERS.length}</p>
        </GlassCard>

        <GlassCard variant="card" className="p-4 space-y-2 border border-white/10">
          <div className="flex items-center justify-between text-xs text-white/50">
            <span>Quotes Engine</span>
            <Quote className="w-4 h-4 text-[#c8852a]" />
          </div>
          <p className="text-2xl font-bold font-mono text-white">{DEMO_QUOTES.length}</p>
        </GlassCard>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/admin/tables">
          <GlassCard variant="glass" className="p-6 space-y-3 hover:border-[#c8852a]/50 transition-colors cursor-pointer group">
            <div className="p-3 rounded-xl bg-white/5 w-fit group-hover:bg-[#c8852a]/20 text-[#c8852a] transition-colors">
              <QrCode className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-medium text-white">Generate Table QRs</h3>
            <p className="text-xs text-white/50">Generate printable QR cards with table IDs for physical cafe tables.</p>
          </GlassCard>
        </Link>

        <Link href="/admin/quotes">
          <GlassCard variant="glass" className="p-6 space-y-3 hover:border-[#c8852a]/50 transition-colors cursor-pointer group">
            <div className="p-3 rounded-xl bg-white/5 w-fit group-hover:bg-[#c8852a]/20 text-[#c8852a] transition-colors">
              <Quote className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-medium text-white">Manage Content Quotes</h3>
            <p className="text-xs text-white/50">Add or edit original quotes organized by time-of-day and day-of-week.</p>
          </GlassCard>
        </Link>

        <Link href="/admin/analytics">
          <GlassCard variant="glass" className="p-6 space-y-3 hover:border-[#c8852a]/50 transition-colors cursor-pointer group">
            <div className="p-3 rounded-xl bg-white/5 w-fit group-hover:bg-[#c8852a]/20 text-[#c8852a] transition-colors">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-medium text-white">Engagement Analytics</h3>
            <p className="text-xs text-white/50">Track scans, camera permissions, video recordings, and share conversion rates.</p>
          </GlassCard>
        </Link>
      </div>
    </div>
  );
}
