import type { Difficulty, DifficultyMeta } from '@/types';

export const DIFFICULTIES: DifficultyMeta[] = [
  { id: 'tiny', label: 'Tiny Sprout', emoji: '🌱', xp: 10, coins: 5, blurb: 'A small, gentle task' },
  { id: 'cozy', label: 'Cozy Quest', emoji: '🍵', xp: 25, coins: 15, blurb: 'A meaningful effort' },
  { id: 'mighty', label: 'Mighty Adventure', emoji: '⭐', xp: 60, coins: 40, blurb: 'A brave undertaking' },
];

export function getDifficulty(id: Difficulty): DifficultyMeta {
  return DIFFICULTIES.find((d) => d.id === id) ?? DIFFICULTIES[1];
}

// Gentle level curve: each level needs a little more xp
export function xpForLevel(level: number): number {
  return 50 + (level - 1) * 30;
}

export function applyXpGain(
  currentLevel: number,
  currentXp: number,
  gain: number
): { level: number; xp: number; xpToNext: number; leveledUp: boolean; levelsGained: number } {
  let level = currentLevel;
  let xp = currentXp + gain;
  let needed = xpForLevel(level);
  let levelsGained = 0;
  while (xp >= needed) {
    xp -= needed;
    level += 1;
    levelsGained += 1;
    needed = xpForLevel(level);
  }
  return {
    level,
    xp,
    xpToNext: needed,
    leveledUp: levelsGained > 0,
    levelsGained,
  };
}
