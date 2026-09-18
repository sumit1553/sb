'use client';

import React, { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { CinematicButton } from '@/components/ui/CinematicButton';
import { DEMO_QUOTES } from '@/lib/demoData';
import { Quote } from '@/lib/types';
import { Plus, Clock, Calendar } from 'lucide-react';

export default function AdminQuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>(DEMO_QUOTES);
  const [filterTime, setFilterTime] = useState<string>('all');
  const [newText, setNewText] = useState('');
  const [newTime, setNewTime] = useState<'morning' | 'afternoon' | 'evening' | 'night' | 'any'>('morning');

  const filtered = quotes.filter(q => filterTime === 'all' || q.timeOfDay === filterTime);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim()) return;
    const lines = newText.trim().split('\n').filter(Boolean);
    const newQuote: Quote = {
      id: `q-custom-${Date.now()}`,
      text: newText.trim(),
      lines: lines.length > 0 ? lines : [newText.trim()],
      category: newTime,
      timeOfDay: newTime,
      dayCategory: 'any',
      active: true,
    };
    setQuotes([newQuote, ...quotes]);
    setNewText('');
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl font-medium text-white">Quotes Engine</h2>
          <p className="text-sm text-white/50">{quotes.length} short original messages categorized by time of day.</p>
        </div>
      </div>

      {/* Add Quote Form */}
      <GlassCard variant="glass" className="p-6 space-y-4">
        <h3 className="text-base font-medium text-white">Add New Quote</h3>
        <form onSubmit={handleAdd} className="space-y-4">
          <textarea
            value={newText}
            onChange={e => setNewText(e.target.value)}
            placeholder="Good morning, {name}. Take your time."
            rows={2}
            className="input-cinematic text-sm"
          />
          <div className="flex items-center gap-4">
            <select
              value={newTime}
              onChange={e => setNewTime(e.target.value as any)}
              className="input-cinematic text-sm max-w-xs"
            >
              <option value="morning" className="bg-neutral-900">Morning</option>
              <option value="afternoon" className="bg-neutral-900">Afternoon</option>
              <option value="evening" className="bg-neutral-900">Evening</option>
              <option value="night" className="bg-neutral-900">Night</option>
              <option value="any" className="bg-neutral-900">Any Time</option>
            </select>

            <CinematicButton type="submit" variant="primary" icon={<Plus className="w-4 h-4" />}>
              Add Quote
            </CinematicButton>
          </div>
        </form>
      </GlassCard>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {['all', 'morning', 'afternoon', 'evening', 'night', 'any'].map(t => (
          <button
            key={t}
            onClick={() => setFilterTime(t)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-colors ${
              filterTime === t ? 'bg-[#c8852a] text-black' : 'bg-white/5 text-white/60 hover:text-white'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Quote Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(q => (
          <GlassCard key={q.id} variant="card" className="p-4 space-y-2 border border-white/10 flex flex-col justify-between">
            <p className="text-sm font-medium text-white italic">"{q.text}"</p>
            <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[11px] text-white/50 font-mono">
              <span className="flex items-center gap-1 uppercase">
                <Clock className="w-3 h-3 text-[#c8852a]" />
                {q.timeOfDay}
              </span>
              <span>{q.dayCategory}</span>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
