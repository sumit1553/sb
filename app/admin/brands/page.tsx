'use client';

import React from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { DEMO_BRANDS, DEMO_LOCATIONS } from '@/lib/demoData';
import { Store, MapPin } from 'lucide-react';

export default function AdminBrandsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-3xl font-medium text-white">Brand Management</h2>
        <p className="text-sm text-white/50">Multi-tenant café brand and location settings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {DEMO_BRANDS.map(b => {
          const brandLocs = DEMO_LOCATIONS.filter(l => l.brandId === b.id);
          return (
            <GlassCard key={b.id} variant="card" className="p-6 space-y-4 border border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center font-bold font-display" style={{ backgroundColor: b.primaryColor, color: '#fff' }}>
                  {b.name[0]}
                </div>
                <div>
                  <h3 className="font-display text-xl text-white">{b.name}</h3>
                  <p className="text-xs text-white/50">{b.tagline}</p>
                </div>
              </div>

              <div className="space-y-2 pt-3 border-t border-white/10 text-xs">
                <span className="text-white/40 font-medium">Locations ({brandLocs.length}):</span>
                <div className="space-y-1.5 pt-1">
                  {brandLocs.map(l => (
                    <div key={l.id} className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                      <span className="font-medium text-white flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#c8852a]" />
                        {l.name}
                      </span>
                      <span className="text-white/50 font-mono text-[11px]">{l.city}</span>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}
