export type QuestStatus = 'open' | 'done';

export type Quest = {
  id: string;
  title: string;
  note: string;
  deadline: string | null; // ISO date string (YYYY-MM-DD)
  extensionDays: number; // grace period in days after the deadline
  difficulty: Difficulty;
  status: QuestStatus;
  createdAt: string;
  completedAt: string | null;
};

export type Difficulty = 'tiny' | 'cozy' | 'mighty';

export type DifficultyMeta = {
  id: Difficulty;
  label: string;
  emoji: string;
  xp: number;
  coins: number;
  blurb: string;
};

export type ItemSlot = 'hat' | 'outfit' | 'accessory' | 'decor';

export type ShopItem = {
  id: string;
  name: string;
  slot: ItemSlot;
  emoji: string;
  price: number;
  blurb: string;
  color: string;
};

export type Equipped = {
  hat: string | null;
  outfit: string | null;
  accessory: string | null;
  decor: string | null;
};

export type CharacterState = {
  name: string;
  level: number;
  xp: number; // current xp within the level
  xpToNext: number; // xp needed to reach next level
  coins: number;
  totalXp: number; // lifetime xp
  ownedItemIds: string[];
  equipped: Equipped;
};

export type GameState = {
  character: CharacterState;
  quests: Quest[];
};

export type DeadlineStatus =
  | { kind: 'none' }
  | { kind: 'upcoming'; daysLeft: number }
  | { kind: 'grace'; daysLeft: number }
  | { kind: 'overdue'; daysOver: number }
  | { kind: 'today' };
