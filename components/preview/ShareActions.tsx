'use client';

import React, { useState } from 'react';
import { Download, Share2, RefreshCw, Check } from 'lucide-react';
import { CinematicButton } from '@/components/ui/CinematicButton';
import { canUseWebShare } from '@/lib/browserCapabilities';

interface ShareActionsProps {
  blob: Blob | null;
  brandName?: string;
  onReplay: () => void;
}

export const ShareActions: React.FC<ShareActionsProps> = ({
  blob,
  brandName = 'Café',
  onReplay,
}) => {
  const [downloaded, setDownloaded] = useState(false);
  const [shared, setShared] = useState(false);

  const handleDownload = () => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${brandName.toLowerCase()}-table-moment.mp4`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  const handleShare = async () => {
    if (!blob) return;
    if (canUseWebShare()) {
      try {
        const file = new File([blob], `${brandName.toLowerCase()}-moment.mp4`, { type: blob.type || 'video/mp4' });
        await navigator.share({
          title: `My ${brandName} Table Moment`,
          text: `Met a floating table companion at ${brandName}! ✨`,
          files: [file],
        });
        setShared(true);
        setTimeout(() => setShared(false), 3000);
      } catch {
        // User cancelled share or file sharing unhandled -> fallback to download
        handleDownload();
      }
    } else {
      handleDownload();
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <CinematicButton
          variant="primary"
          fullWidth
          icon={downloaded ? <Check className="w-4 h-4 text-emerald-400" /> : <Download className="w-4 h-4" />}
          onClick={handleDownload}
        >
          {downloaded ? 'Saved!' : 'Save Video'}
        </CinematicButton>

        <CinematicButton
          variant="ghost"
          fullWidth
          icon={shared ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
          onClick={handleShare}
        >
          {shared ? 'Shared!' : 'Share'}
        </CinematicButton>
      </div>

      <CinematicButton
        variant="ghost"
        fullWidth
        icon={<RefreshCw className="w-4 h-4" />}
        onClick={onReplay}
      >
        Record Another Moment
      </CinematicButton>
    </div>
  );
};
