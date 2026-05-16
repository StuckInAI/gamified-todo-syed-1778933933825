import { useState } from 'react';
import clsx from 'clsx';
import { Check, Lock } from 'lucide-react';
import { useGame } from '@/hooks/useGame';
import { SHOP_ITEMS } from '@/lib/shop';
import type { ShopItem } from '@/types';
import Character from '@/components/character/Character';
import styles from './WardrobePage.module.css';

type Slot = ShopItem['slot'];

const SLOTS: { id: Slot; label: string; emoji: string }[] = [
  { id: 'hat', label: 'Hats', emoji: '🎩' },
  { id: 'outfit', label: 'Outfits', emoji: '👕' },
  { id: 'accessory', label: 'Accessories', emoji: '🎀' },
  { id: 'decor', label: 'Decor', emoji: '🌸' },
];

export default function WardrobePage() {
  const { character, equipItem, unequipSlot } = useGame();
  const [activeSlot, setActiveSlot] = useState<Slot>('hat');

  const items = SHOP_ITEMS.filter(
    (item) => character.ownedItems.includes(item.id) && item.slot === activeSlot,
  );

  const equippedId = character.equipped[activeSlot];

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Wardrobe</h1>
        <p className={styles.subtitle}>Dress up your cozy companion ✨</p>
      </header>

      <section className={styles.preview}>
        <Character equipped={character.equipped} size="lg" />
      </section>

      <nav className={styles.tabs}>
        {SLOTS.map((s) => (
          <button
            key={s.id}
            className={clsx(styles.tab, activeSlot === s.id && styles.tabActive)}
            onClick={() => setActiveSlot(s.id)}
          >
            <span>{s.emoji}</span>
            <span>{s.label}</span>
          </button>
        ))}
      </nav>

      <section className={styles.grid}>
        <button
          className={clsx(styles.itemCard, !equippedId && styles.itemActive)}
          onClick={() => unequipSlot(activeSlot)}
        >
          <div className={styles.itemSwatch} style={{ background: 'var(--bg-soft)' }}>
            <span style={{ fontSize: 28 }}>🚫</span>
          </div>
          <span className={styles.itemName}>None</span>
          {!equippedId && (
            <span className={styles.equippedBadge}>
              <Check size={12} /> Equipped
            </span>
          )}
        </button>

        {items.map((item) => {
          const isEquipped = equippedId === item.id;
          return (
            <button
              key={item.id}
              className={clsx(styles.itemCard, isEquipped && styles.itemActive)}
              onClick={() => equipItem(item.id)}
            >
              <div className={styles.itemSwatch} style={{ background: item.color }}>
                <span style={{ fontSize: 28 }}>{item.emoji}</span>
              </div>
              <span className={styles.itemName}>{item.name}</span>
              {isEquipped && (
                <span className={styles.equippedBadge}>
                  <Check size={12} /> Equipped
                </span>
              )}
            </button>
          );
        })}

        {items.length === 0 && (
          <div className={styles.empty}>
            <Lock size={24} />
            <p>No {activeSlot}s yet — visit the shop to find some treasures!</p>
          </div>
        )}
      </section>
    </div>
  );
}

// Inline module styles — keep this file self-contained if the module CSS exists.
// If you have a separate WardrobePage.module.css, this file just references it above.
