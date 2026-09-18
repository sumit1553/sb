'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, QrCode, ArrowRight, ShieldCheck } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { CinematicButton } from '@/components/ui/CinematicButton';
import { DEMO_BRANDS, DEMO_LOCATIONS, DEMO_TABLES, DEMO_CAMPAIGNS } from '@/lib/demoData';

export default function HomePage() {
  const demoUrl = `/e/${DEMO_BRANDS[0].slug}/${DEMO_LOCATIONS[0].slug}/${DEMO_TABLES[0].tableNumber}?campaign=${DEMO_CAMPAIGNS[0].slug}`;

  return (
    <div className="min-h-dvh flex flex-col items-center justify-between p-6 bg-gradient-to-b from-neutral-950 via-neutral-900 to-black text-white grain">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#c8852a]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="w-full max-w-sm pt-safe flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#c8852a]" />
          <span className="font-display font-medium text-lg text-white">TableCompanion</span>
        </div>

        <Link
          href="/admin"
          className="text-xs text-white/50 hover:text-white/90 px-3 py-1.5 rounded-full border border-white/10 glass transition-colors"
        >
          Admin Console
        </Link>
      </div>

      {/* Hero Content */}
      <div className="w-full max-w-sm my-auto text-center space-y-6 z-10">
        <div className="mx-auto w-16 h-16 rounded-full bg-[#c8852a]/10 border border-[#c8852a]/20 flex items-center justify-center text-[#c8852a]">
          <QrCode className="w-8 h-8" />
        </div>

        <div className="space-y-3">
          <h1 className="font-display text-4xl text-white tracking-tight leading-tight">
            Café AR & UGC Experience
          </h1>
          <p className="text-sm text-white/60 leading-relaxed max-w-xs mx-auto">
            Scan a QR code at your café table to unlock a personalized 3D table companion and create shareable vertical video moments.
          </p>
        </div>

        <GlassCard variant="glass" className="space-y-4 text-left">
          <div className="flex items-center justify-between text-xs text-white/70">
            <span className="text-white/40">Demo Brand:</span>
            <span className="font-medium text-[#c8852a]">Blue Tokai Coffee</span>
          </div>
          <div className="flex items-center justify-between text-xs text-white/70">
            <span className="text-white/40">Demo Location:</span>
            <span>Mumbai — BKC</span>
          </div>
          <div className="flex items-center justify-between text-xs text-white/70">
            <span className="text-white/40">Demo Table:</span>
            <span className="font-mono">T12</span>
          </div>
          <div className="flex items-center justify-between text-xs text-white/70">
            <span className="text-white/40">Campaign:</span>
            <span>Slow Mornings</span>
          </div>
        </GlassCard>

        <Link href={demoUrl} className="block">
          <CinematicButton variant="primary" fullWidth icon={<ArrowRight className="w-4 h-4" />}>
            LAUNCH DEMO EXPERIENCE
          </CinematicButton>
        </Link>
      </div>

      {/* Footer */}
      <div className="w-full max-w-sm pb-safe text-center z-10">
        <p className="text-xs text-white/40 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Multi-Tenant • Privacy First • No App Required</span>
        </p>
      </div>
    </div>
  );
}
