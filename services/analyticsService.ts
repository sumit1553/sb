import { AnalyticsEvent, AnalyticsPayload } from '@/lib/types';
import { ANALYTICS_KEY } from '@/lib/constants';

type AnalyticsRecord = AnalyticsPayload & { id: string };

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function loadRecords(): AnalyticsRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(ANALYTICS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveRecords(records: AnalyticsRecord[]): void {
  if (typeof window === 'undefined') return;
  try {
    // Keep max 500 records to avoid storage bloat
    const trimmed = records.slice(-500);
    localStorage.setItem(ANALYTICS_KEY, JSON.stringify(trimmed));
  } catch {
    // Storage quota exceeded — ignore silently
  }
}

export function track(
  event: AnalyticsEvent,
  sessionId: string,
  meta?: Partial<Omit<AnalyticsPayload, 'event' | 'sessionId' | 'timestamp'>>
): void {
  const record: AnalyticsRecord = {
    id: generateId(),
    event,
    sessionId,
    timestamp: new Date(),
    ...meta,
  };

  const records = loadRecords();
  records.push(record);
  saveRecords(records);

  // TODO: When Supabase is integrated, also POST to /api/analytics
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Analytics] ${event}`, record);
  }
}

export function getAll(): AnalyticsRecord[] {
  return loadRecords();
}

export function getByEvent(event: AnalyticsEvent): AnalyticsRecord[] {
  return loadRecords().filter(r => r.event === event);
}

export function getSummary(): Record<string, number> {
  const records = loadRecords();
  return records.reduce((acc, r) => {
    acc[r.event] = (acc[r.event] ?? 0) + 1;
    return acc;
  }, {} as Record<string, number>);
}

export function clearAll(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(ANALYTICS_KEY);
  }
}
