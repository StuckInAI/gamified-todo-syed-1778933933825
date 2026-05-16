import type { DeadlineStatus, Quest } from '@/types';

function startOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

export function daysBetween(a: Date, b: Date): number {
  const ms = startOfDay(b).getTime() - startOfDay(a).getTime();
  return Math.round(ms / (1000 * 60 * 60 * 24));
}

export function getFinalDeadline(quest: Quest): Date | null {
  if (!quest.deadline) return null;
  const d = new Date(quest.deadline + 'T00:00:00');
  d.setDate(d.getDate() + (quest.extensionDays || 0));
  return d;
}

export function getDeadlineStatus(quest: Quest, now: Date = new Date()): DeadlineStatus {
  if (!quest.deadline) return { kind: 'none' };
  const today = startOfDay(now);
  const official = startOfDay(new Date(quest.deadline + 'T00:00:00'));
  const final = getFinalDeadline(quest);
  if (!final) return { kind: 'none' };
  const finalDay = startOfDay(final);

  if (today.getTime() === official.getTime()) return { kind: 'today' };

  if (today < official) {
    return { kind: 'upcoming', daysLeft: daysBetween(today, official) };
  }

  // past official deadline
  if (today <= finalDay) {
    return { kind: 'grace', daysLeft: daysBetween(today, finalDay) };
  }

  return { kind: 'overdue', daysOver: daysBetween(finalDay, today) };
}

export function formatFriendlyDate(iso: string | null): string {
  if (!iso) return '';
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

export function formatDateFromDate(d: Date): string {
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}
