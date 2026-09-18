'use client';

import React from 'react';
import { Brand, Table, Campaign } from '@/lib/types';

interface BrandOverlayProps {
  brand: Brand | null;
  table: Table | null;
  campaign: Campaign | null;
}

export const BrandOverlay: React.FC<BrandOverlayProps> = ({ brand, table, campaign }) => {
  return (
    <div className="absolute top-0 inset-x-0 z-20 pointer-events-none pt-safe px-6 pt-4 flex items-center justify-between">
      <div className="flex items-center gap-2 glass px-3 py-1.5 rounded-full border border-white/10">
        <div className="w-2 h-2 rounded-full bg-[#c8852a] animate-pulse" />
        <span className="text-xs font-semibold tracking-wider text-white uppercase">
          {brand?.name || 'CAFÉ'}
        </span>
      </div>

      <div className="flex items-center gap-2 glass px-3 py-1.5 rounded-full border border-white/10 text-xs text-white/70 font-mono">
        <span>T{table?.tableNumber || '12'}</span>
        {campaign?.hashtag && (
          <>
            <span className="opacity-30">•</span>
            <span className="text-[#c8852a] font-sans font-medium">{campaign.hashtag}</span>
          </>
        )}
      </div>
    </div>
  );
};
