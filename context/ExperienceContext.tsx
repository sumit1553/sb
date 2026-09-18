'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ExperiencePhase,
  ExperienceSession,
  Brand,
  Location,
  Table,
  Campaign,
  Character,
  Quote,
  DeviceCapabilities,
  ExperienceError,
  ExperienceContextType,
} from '@/lib/types';
import { useDeviceCapabilities } from '@/hooks/useDeviceCapabilities';
import { DEMO_BRANDS, DEMO_LOCATIONS, DEMO_TABLES, DEMO_CAMPAIGNS, DEMO_CHARACTERS } from '@/lib/demoData';
import { getQuote, personalizeQuote } from '@/services/quoteService';

const ExperienceContext = createContext<ExperienceContextType | undefined>(undefined);

export const ExperienceProvider: React.FC<{
  children: React.ReactNode;
  initialBrandSlug?: string;
  initialLocationSlug?: string;
  initialTableNumber?: string;
  initialCampaignSlug?: string;
}> = ({
  children,
  initialBrandSlug = 'bluetokai',
  initialLocationSlug = 'mumbai-bkc',
  initialTableNumber = 'T12',
  initialCampaignSlug = 'slowmornings',
}) => {
  const { capabilities } = useDeviceCapabilities();
  const [phase, setPhase] = useState<ExperiencePhase>('landing');
  const [userName, setUserName] = useState<string>('');
  const [recordingBlob, setRecordingBlob] = useState<Blob | null>(null);
  const [error, setError] = useState<ExperienceError | null>(null);

  const [brand, setBrand] = useState<Brand | null>(null);
  const [location, setLocation] = useState<Location | null>(null);
  const [table, setTable] = useState<Table | null>(null);
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [character, setCharacter] = useState<Character | null>(null);
  const [quote, setQuote] = useState<Quote | null>(null);

  const [session, setSession] = useState<Partial<ExperienceSession>>({
    id: `sess_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    startedAt: new Date(),
    recorded: false,
    shared: false,
  });

  useEffect(() => {
    // Resolve Brand
    const b = DEMO_BRANDS.find(item => item.slug === initialBrandSlug) || DEMO_BRANDS[0];
    setBrand(b);

    // Resolve Location
    const l = DEMO_LOCATIONS.find(item => item.slug === initialLocationSlug && item.brandId === b.id) || DEMO_LOCATIONS[0];
    setLocation(l);

    // Resolve Table
    const t = DEMO_TABLES.find(item => item.tableNumber === initialTableNumber && item.locationId === l.id) || DEMO_TABLES[0];
    setTable(t);

    // Resolve Campaign
    const c = DEMO_CAMPAIGNS.find(item => item.slug === initialCampaignSlug && item.brandId === b.id) || DEMO_CAMPAIGNS[0];
    setCampaign(c);

    // Resolve Character
    const charId = c?.characterId || DEMO_CHARACTERS[0].id;
    const ch = DEMO_CHARACTERS.find(item => item.id === charId) || DEMO_CHARACTERS[0];
    setCharacter(ch);

    // Resolve Quote
    const rawQuote = getQuote({ characterId: ch.id, campaignId: c?.id });
    setQuote(rawQuote);

    setSession(prev => ({
      ...prev,
      brandId: b.id,
      locationId: l.id,
      tableId: t.id,
      campaignId: c?.id,
    }));
  }, [initialBrandSlug, initialLocationSlug, initialTableNumber, initialCampaignSlug]);

  // Apply user name personalization when name or quote changes
  useEffect(() => {
    if (quote) {
      const personalized = personalizeQuote(quote, userName);
      setQuote(personalized);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userName]);

  return (
    <ExperienceContext.Provider
      value={{
        phase,
        setPhase,
        userName,
        setUserName,
        session,
        brand,
        location,
        table,
        campaign,
        character,
        quote,
        capabilities,
        recordingBlob,
        setRecordingBlob,
        error,
        setError,
      }}
    >
      {children}
    </ExperienceContext.Provider>
  );
};

export const useExperienceContext = (): ExperienceContextType => {
  const context = useContext(ExperienceContext);
  if (!context) {
    throw new Error('useExperienceContext must be used within an ExperienceProvider');
  }
  return context;
};
