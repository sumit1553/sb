import { Quote, TimeOfDay, DayCategory } from '@/lib/types';
import { DEMO_QUOTES } from '@/lib/demoData';

function getTimeOfDay(hour: number): TimeOfDay {
  if (hour >= 5 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 21) return 'evening';
  return 'night';
}

function getDayCategory(day: number): DayCategory {
  if (day === 1) return 'monday';
  if (day === 5) return 'friday';
  if (day === 0 || day === 6) return 'weekend';
  return 'weekday';
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export function getQuote(options?: {
  characterId?: string;
  campaignId?: string;
  now?: Date;
  exclude?: string[];
}): Quote {
  const now = options?.now ?? new Date();
  const hour = now.getHours();
  const day = now.getDay(); // 0=Sun, 1=Mon ... 6=Sat

  const timeOfDay = getTimeOfDay(hour);
  const dayCategory = getDayCategory(day);

  const activeQuotes = DEMO_QUOTES.filter(q => q.active);
  const excluded = options?.exclude ?? [];

  // Priority 1: exact time + exact day + character
  // Priority 2: exact time + exact day
  // Priority 3: exact time + any day
  // Priority 4: any time + exact day
  // Priority 5: any time + any day
  const scoredQuotes = activeQuotes
    .filter(q => !excluded.includes(q.id))
    .map(q => {
      let score = 0;
      if (q.timeOfDay === timeOfDay) score += 3;
      else if (q.timeOfDay === 'any') score += 1;
      else score -= 10;

      if (q.dayCategory === dayCategory) score += 2;
      else if (q.dayCategory === 'any') score += 1;
      else score -= 5;

      if (options?.characterId && q.characterId === options.characterId) score += 1;
      if (options?.campaignId && q.campaignId === options.campaignId) score += 1;

      return { quote: q, score };
    })
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score);

  if (scoredQuotes.length === 0) {
    // Fallback: random from all
    return shuffle(activeQuotes)[0];
  }

  // Pick randomly from top-scoring tier to avoid repetition
  const topScore = scoredQuotes[0].score;
  const topTier = scoredQuotes.filter(s => s.score === topScore);
  return shuffle(topTier)[0].quote;
}

export function personalizeQuote(quote: Quote, name?: string): Quote {
  const displayName = name?.trim() ? name.trim() : '';
  if (!displayName) return quote;

  const personalize = (text: string) => {
    // Insert name into greetings if not already present
    return text
      .replace(/^Good morning[.,]?/, `Good morning, ${displayName}.`)
      .replace(/^Good afternoon[.,]?/, `Good afternoon, ${displayName}.`)
      .replace(/^Good evening[.,]?/, `Good evening, ${displayName}.`)
      .replace(/^Hey there/, `Hey ${displayName}`)
      .replace(/^Hey,/, `Hey ${displayName},`);
  };

  return {
    ...quote,
    text: personalize(quote.text),
    lines: quote.lines.map(personalize),
  };
}
