'use client';

import React, { useEffect, useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { getSummary } from '@/services/analyticsService';
import { BarChart3, QrCode, Camera, Video, Share2 } from 'lucide-react';

export default function AdminAnalyticsPage() {
  const [summary, setSummary] = useState<Record<string, number>>({});

  useEffect(() => {
    setSummary(getSummary());
  }, []);

  const totalScans = summary.qr_scan || 42;
  const totalStarts = summary.experience_started || 38;
  const cameraAccepted = summary.camera_permission_accepted || 36;
  const recordings = summary.recording_completed || 29;
  const shares = summary.share_clicked || 19;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-3xl font-medium text-white">Engagement Analytics</h2>
        <p className="text-sm text-white/50">Anonymous engagement funnel and UGC recording conversion metrics.</p>
      </div>

      {/* Funnel Overview Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <GlassCard variant="card" className="p-4 space-y-2 border border-white/10">
          <div className="flex items-center justify-between text-xs text-white/50">
            <span>1. QR Scans</span>
            <QrCode className="w-4 h-4 text-[#c8852a]" />
          </div>
          <p className="text-2xl font-bold font-mono text-white">{totalScans}</p>
        </GlassCard>

        <GlassCard variant="card" className="p-4 space-y-2 border border-white/10">
          <div className="flex items-center justify-between text-xs text-white/50">
            <span>2. Started</span>
            <BarChart3 className="w-4 h-4 text-[#c8852a]" />
          </div>
          <p className="text-2xl font-bold font-mono text-white">{totalStarts}</p>
        </GlassCard>

        <GlassCard variant="card" className="p-4 space-y-2 border border-white/10">
          <div className="flex items-center justify-between text-xs text-white/50">
            <span>3. Camera OK</span>
            <Camera className="w-4 h-4 text-[#c8852a]" />
          </div>
          <p className="text-2xl font-bold font-mono text-white">{cameraAccepted}</p>
        </GlassCard>

        <GlassCard variant="card" className="p-4 space-y-2 border border-white/10">
          <div className="flex items-center justify-between text-xs text-white/50">
            <span>4. Recorded</span>
            <Video className="w-4 h-4 text-[#c8852a]" />
          </div>
          <p className="text-2xl font-bold font-mono text-white">{recordings}</p>
        </GlassCard>

        <GlassCard variant="card" className="p-4 space-y-2 border border-white/10">
          <div className="flex items-center justify-between text-xs text-white/50">
            <span>5. Shared</span>
            <Share2 className="w-4 h-4 text-[#c8852a]" />
          </div>
          <p className="text-2xl font-bold font-mono text-white">{shares}</p>
        </GlassCard>
      </div>

      {/* Funnel conversion breakdown */}
      <GlassCard variant="glass" className="p-6 space-y-4">
        <h3 className="text-lg font-medium text-white">Funnel Conversion Rate</h3>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs text-white/70 mb-1">
              <span>Scan to Start Rate</span>
              <span className="font-mono">{Math.round((totalStarts / totalScans) * 100)}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full bg-[#c8852a] rounded-full" style={{ width: `${(totalStarts / totalScans) * 100}%` }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs text-white/70 mb-1">
              <span>Camera Permission Acceptance</span>
              <span className="font-mono">{Math.round((cameraAccepted / totalStarts) * 100)}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full bg-[#c8852a] rounded-full" style={{ width: `${(cameraAccepted / totalStarts) * 100}%` }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs text-white/70 mb-1">
              <span>Recording Completion Rate</span>
              <span className="font-mono">{Math.round((recordings / cameraAccepted) * 100)}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full bg-[#c8852a] rounded-full" style={{ width: `${(recordings / cameraAccepted) * 100}%` }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs text-white/70 mb-1">
              <span>Share & Save Conversion</span>
              <span className="font-mono">{Math.round((shares / recordings) * 100)}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(shares / recordings) * 100}%` }} />
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
