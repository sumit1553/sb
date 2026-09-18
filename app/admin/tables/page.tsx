'use client';

import React, { useState } from 'react';
import { QRCard } from '@/components/admin/QRCard';
import { GlassCard } from '@/components/ui/GlassCard';
import { CinematicButton } from '@/components/ui/CinematicButton';
import { DEMO_BRANDS, DEMO_LOCATIONS, DEMO_TABLES, DEMO_CAMPAIGNS } from '@/lib/demoData';
import { Plus } from 'lucide-react';

export default function AdminTablesPage() {
  const [selectedBrand, setSelectedBrand] = useState(DEMO_BRANDS[0].slug);
  const [selectedLocation, setSelectedLocation] = useState(DEMO_LOCATIONS[0].slug);
  const [selectedCampaign, setSelectedCampaign] = useState(DEMO_CAMPAIGNS[0].slug);
  const [tableNumber, setTableNumber] = useState('T12');

  const brand = DEMO_BRANDS.find(b => b.slug === selectedBrand) || DEMO_BRANDS[0];
  const location = DEMO_LOCATIONS.find(l => l.slug === selectedLocation) || DEMO_LOCATIONS[0];

  const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
  const qrTargetUrl = `${origin}/e/${brand.slug}/${location.slug}/${tableNumber}?campaign=${selectedCampaign}`;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-3xl font-medium text-white">Table QR Code Generator</h2>
        <p className="text-sm text-white/50">Generate and print unique table QR codes configured with brand, location, and campaign.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Form Configuration */}
        <GlassCard variant="glass" className="space-y-6 p-6">
          <h3 className="text-lg font-medium text-white">QR Code Configuration</h3>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-white/70">Brand</label>
              <select
                value={selectedBrand}
                onChange={e => setSelectedBrand(e.target.value)}
                className="input-cinematic text-sm"
              >
                {DEMO_BRANDS.map(b => (
                  <option key={b.id} value={b.slug} className="bg-neutral-900 text-white">
                    {b.name} ({b.slug})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-white/70">Location</label>
              <select
                value={selectedLocation}
                onChange={e => setSelectedLocation(e.target.value)}
                className="input-cinematic text-sm"
              >
                {DEMO_LOCATIONS.map(l => (
                  <option key={l.id} value={l.slug} className="bg-neutral-900 text-white">
                    {l.name} — {l.city}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-white/70">Table Number</label>
              <input
                type="text"
                value={tableNumber}
                onChange={e => setTableNumber(e.target.value.toUpperCase())}
                placeholder="e.g. T12"
                className="input-cinematic text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-white/70">Campaign</label>
              <select
                value={selectedCampaign}
                onChange={e => setSelectedCampaign(e.target.value)}
                className="input-cinematic text-sm"
              >
                {DEMO_CAMPAIGNS.map(c => (
                  <option key={c.id} value={c.slug} className="bg-neutral-900 text-white">
                    {c.name} ({c.hashtag})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="pt-2 text-xs text-white/40 font-mono break-all bg-black/40 p-3 rounded-xl">
            Target URL: {qrTargetUrl}
          </div>
        </GlassCard>

        {/* Live Printable Preview */}
        <div className="flex flex-col items-center justify-center">
          <QRCard
            brandName={brand.name}
            locationName={`${location.name}, ${location.city}`}
            tableNumber={tableNumber}
            campaignSlug={selectedCampaign}
            targetUrl={qrTargetUrl}
          />
        </div>
      </div>
    </div>
  );
}
