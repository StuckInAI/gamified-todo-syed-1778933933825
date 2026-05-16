import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { CharacterState, GameState, Quest, Difficulty, ItemSlot } from '@/types';
import { loadState, saveState } from '@/lib/storage';
import { applyXpGain, getDifficulty, xpForLevel } from '@/lib/game';
import { uid } from '@/lib/ids';
import { getItem } from '@/lib/shop';

type RewardToast = {
  id: string;
  xp: number;
  coins: number;
  leveledUp: boolean;
  newLevel: number;
  questTitle: string;
};

type GameContextValue = {
  state: GameState;
  character: CharacterState;
  quests: Quest[];
  addQuest: (input: { title: string; note: string; deadline: string | null; extensionDays: number; difficulty: Difficulty }) => void;
  completeQuest: (id: string) => void;
  uncompleteQuest: (id: string) => void;
  deleteQuest: (id: string) => void;
  buyItem: (itemId: string) => { ok: boolean; reason?: string };
  equipItem: (itemId: string) => void;
  unequipSlot: (slot: ItemSlot) => void;
  setCharacterName: (name: string) => void;
  reward: RewardToast | null;
  clearReward: () => void;
};

const defaultCharacter: CharacterState = {
  name: 'Mochi',
  level: 1,
  xp: 0,
  xpToNext: xpForLevel(1),
  coins: 20,
  totalXp: 0,
  ownedItemIds: [],
  equipped: { hat: null, outfit: null, accessory: null, decor: null },
};

const sampleQuests = (): Quest[] => {
  const today = new Date();
  const fmt = (d: Date) => d.toISOString().slice(0, 10);
  const inDays = (n: number) => {
    const d = new Date(today);
    d.setDate(d.getDate() + n);
    return fmt(d);
  };
  return [
    {
      id: uid(),
      title: 'Stretch & sip some tea 🍵',
      note: 'A gentle warm-up for the day.',
      deadline: inDays(0),
      extensionDays: 2,
      difficulty: 'tiny',
      status: 'open',
      createdAt: new Date().toISOString(),
      completedAt: null,
    },
    {
      id: uid(),
      title: 'Tidy the desk a little',
      note: 'Just one corner — that counts!',
      deadline: inDays(3),
      extensionDays: 3,
      difficulty: 'cozy',
      status: 'open',
      createdAt: new Date().toISOString(),
      completedAt: null,
    },
    {
      id: uid(),
      title: 'Send that email I keep avoiding',
      note: 'Brave quest. You can do it.',
      deadline: inDays(5),
      extensionDays: 4,
      difficulty: 'mighty',
      status: 'open',
      createdAt: new Date().toISOString(),
      completedAt: null,
    },
  ];
};

const initialState: GameState = {
  character: defaultCharacter,
  quests: sampleQuests(),
};

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GameState>(() => loadState<GameState>(initialState));
  const [reward, setReward] = useState<RewardToast | null>(null);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const addQuest = useCallback<GameContextValue['addQuest']>((input) => {
    setState((prev) => ({
      ...prev,
      quests: [
        {
          id: uid(),
          title: input.title.trim(),
          note: input.note.trim(),
          deadline: input.deadline,
          extensionDays: Math.max(0, Math.floor(input.extensionDays || 0)),
          difficulty: input.difficulty,
          status: 'open',
          createdAt: new Date().toISOString(),
          completedAt: null,
        },
        ...prev.quests,
      ],
    }));
  }, []);

  const completeQuest = useCallback((id: string) => {
    setState((prev) => {
      const q = prev.quests.find((x) => x.id === id);
      if (!q || q.status === 'done') return prev;
      const meta = getDifficulty(q.difficulty);
      const result = applyXpGain(prev.character.level, prev.character.xp, meta.xp);
      const nextCharacter: CharacterState = {
        ...prev.character,
        level: result.level,
        xp: result.xp,
        xpToNext: result.xpToNext,
        coins: prev.character.coins + meta.coins,
        totalXp: prev.character.totalXp + meta.xp,
      };
      setReward({
        id: uid(),
        xp: meta.xp,
        coins: meta.coins,
        leveledUp: result.leveledUp,
        newLevel: result.level,
        questTitle: q.title,
      });
      return {
        character: nextCharacter,
        quests: prev.quests.map((x) =>
          x.id === id ? { ...x, status: 'done', completedAt: new Date().toISOString() } : x
        ),
      };
    });
  }, []);

  const uncompleteQuest = useCallback((id: string) => {
    setState((prev) => {
      const q = prev.quests.find((x) => x.id === id);
      if (!q || q.status !== 'done') return prev;
      // No XP/coin clawback — keep the cozy vibe. Just mark as open.
      return {
        ...prev,
        quests: prev.quests.map((x) =>
          x.id === id ? { ...x, status: 'open', completedAt: null } : x
        ),
      };
    });
  }, []);

  const deleteQuest = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      quests: prev.quests.filter((x) => x.id !== id),
    }));
  }, []);

  const buyItem = useCallback<GameContextValue['buyItem']>((itemId) => {
    const item = getItem(itemId);
    if (!item) return { ok: false, reason: 'Item not found' };
    let result = { ok: false as boolean, reason: undefined as string | undefined };
    setState((prev) => {
      if (prev.character.ownedItemIds.includes(itemId)) {
        result = { ok: false, reason: 'Already owned' };
        return prev;
      }
      if (prev.character.coins < item.price) {
        result = { ok: false, reason: 'Not enough coins' };
        return prev;
      }
      result = { ok: true, reason: undefined };
      return {
        ...prev,
        character: {
          ...prev.character,
          coins: prev.character.coins - item.price,
          ownedItemIds: [...prev.character.ownedItemIds, itemId],
          equipped: { ...prev.character.equipped, [item.slot]: itemId },
        },
      };
    });
    return result;
  }, []);

  const equipItem = useCallback((itemId: string) => {
    const item = getItem(itemId);
    if (!item) return;
    setState((prev) => {
      if (!prev.character.ownedItemIds.includes(itemId)) return prev;
      return {
        ...prev,
        character: {
          ...prev.character,
          equipped: { ...prev.character.equipped, [item.slot]: itemId },
        },
      };
    });
  }, []);

  const unequipSlot = useCallback((slot: ItemSlot) => {
    setState((prev) => ({
      ...prev,
      character: {
        ...prev.character,
        equipped: { ...prev.character.equipped, [slot]: null },
      },
    }));
  }, []);

  const setCharacterName = useCallback((name: string) => {
    setState((prev) => ({
      ...prev,
      character: { ...prev.character, name: name.trim() || 'Mochi' },
    }));
  }, []);

  const clearReward = useCallback(() => setReward(null), []);

  const value = useMemo<GameContextValue>(
    () => ({
      state,
      character: state.character,
      quests: state.quests,
      addQuest,
      completeQuest,
      uncompleteQuest,
      deleteQuest,
      buyItem,
      equipItem,
      unequipSlot,
      setCharacterName,
      reward,
      clearReward,
    }),
    [state, addQuest, completeQuest, uncompleteQuest, deleteQuest, buyItem, equipItem, unequipSlot, setCharacterName, reward, clearReward]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame(): GameContextValue {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used inside <GameProvider>');
  return ctx;
}
