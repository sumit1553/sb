'use client';

import React from 'react';
import { useSearchParams, useParams } from 'next/navigation';
import { ExperienceProvider } from '@/context/ExperienceContext';
import { ExperienceContainerInner } from '@/components/experience/ExperienceContainer';

export default function ExperiencePage() {
  const params = useParams();
  const searchParams = useSearchParams();

  const brandSlug = (params?.brand as string) || searchParams.get('brand') || 'bluetokai';
  const locationSlug = (params?.location as string) || searchParams.get('location') || 'mumbai-bkc';
  const tableNumber = (params?.table as string) || searchParams.get('table') || 'T12';
  const campaignSlug = searchParams.get('campaign') || 'slowmornings';

  return (
    <ExperienceProvider
      initialBrandSlug={brandSlug}
      initialLocationSlug={locationSlug}
      initialTableNumber={tableNumber}
      initialCampaignSlug={campaignSlug}
    >
      <ExperienceContainerInner />
    </ExperienceProvider>
  );
}
