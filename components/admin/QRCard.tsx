'use client';

import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { QrCode, Download, Sparkles } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { CinematicButton } from '@/components/ui/CinematicButton';

interface QRCardProps {
  brandName: string;
  locationName: string;
  tableNumber: string;
  campaignSlug?: string;
  targetUrl: string;
}

export const QRCard: React.FC<QRCardProps> = ({
  brandName,
  locationName,
  tableNumber,
  campaignSlug,
  targetUrl,
}) => {
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  useEffect(() => {
    QRCode.toDataURL(
      targetUrl,
      {
        width: 300,
        margin: 2,
        color: {
          dark: '#080808',
          light: '#FFFFFF',
        },
      },
      (err, url) => {
        if (!err && url) setDataUrl(url);
      }
    );
  }, [targetUrl]);

  const handleDownload = () => {
    if (!dataUrl) return;
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `QR-${brandName}-${tableNumber}.png`;
    a.click();
  };

  return (
    <GlassCard variant="card" className="max-w-xs w-full text-center space-y-4 p-6 border border-white/20 bg-neutral-900">
      {/* Brand Header */}
      <div className="space-y-1">
        <div className="flex items-center justify-center gap-1.5 text-xs text-[#c8852a] font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{brandName}</span>
        </div>
        <h3 className="font-display text-2xl text-white font-medium">Table {tableNumber}</h3>
        <p className="text-xs text-white/50">{locationName}</p>
      </div>

      {/* QR Display Frame */}
      <div className="relative mx-auto w-48 h-48 bg-white p-3 rounded-2xl shadow-xl flex items-center justify-center">
        {dataUrl ? (
          <img src={dataUrl} alt={`QR for Table ${tableNumber}`} className="w-full h-full object-contain" />
        ) : (
          <div className="text-xs text-neutral-400">Generating QR...</div>
        )}
      </div>

      {/* Callout */}
      <p className="text-xs font-medium text-white/70">
        "Scan for your table companion"
      </p>

      {campaignSlug && (
        <div className="text-[10px] text-white/40 font-mono">
          Campaign: {campaignSlug}
        </div>
      )}

      <CinematicButton
        variant="ghost"
        fullWidth
        icon={<Download className="w-4 h-4" />}
        onClick={handleDownload}
      >
        Download Printable Card
      </CinematicButton>
    </GlassCard>
  );
};
