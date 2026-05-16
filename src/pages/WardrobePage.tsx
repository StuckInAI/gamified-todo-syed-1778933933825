import { useState } from 'react';
import { useGame } from '@/hooks/useGame';
import { SHOP_ITEMS } from '@/lib/shop';
import type { Slot } from '@/types';
import Character from '@/components/character/Character';
import styles from '@/components/shop/ShopItemCard.module.css';

const SLOTS: { id: Slot; label: string; emoji: string }[] = [
  { id: 'hat', label: 'Hats', emoji: '🎩' },
  { id: 'outfit', label: 'Outfits', emoji: '👕' },
  { id: 'accessory', label: 'Accessories', emoji: '🎀' },
  { id: 'decor', label: 'Decor', emoji: '🌸' },
];

export default function WardrobePage() {
  const { character, equipItem, unequipItem } = useGame();
  const [activeSlot, setActiveSlot] = useState<Slot>('hat');

  const owned = SHOP_ITEMS.filter(
    (item) => character.ownedItemIds.includes(item.id) && item.slot === activeSlot,
  );

  const equippedId = character.equipped[activeSlot];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-5)' }}>
      <header style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>Wardrobe 👗</h1>
        <p style={{ color: 'var(--ink-soft)', fontStyle: 'italic', fontSize: 14 }}>
          Dress up your cozy companion ✨
        </p>
      </header>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: 'var(--sp-5)',
          background: 'var(--bg-card)',
          borderRadius: 'var(--r-lg)',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <Character equipped={character.equipped} size="lg" />
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
        {SLOTS.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveSlot(s.id)}
            style={{
              padding: '8px 14px',
              borderRadius: 'var(--r-pill)',
              background: activeSlot === s.id ? 'var(--peach)' : 'var(--bg-soft)',
              fontWeight: 700,
              fontSize: 13,
              color: 'var(--ink)',
              boxShadow: activeSlot === s.id ? 'var(--shadow-sm)' : 'none',
            }}
          >
            {s.emoji} {s.label}
          </button>
        ))}
      </div>

      {owned.length === 0 ? (
        <p style={{ textAlign: 'center', color: 'var(--ink-soft)', fontStyle: 'italic' }}>
          No items in this category yet — visit the shop! 🛍️
        </p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
            gap: 'var(--sp-3)',
          }}
        >
          {owned.map((item) => {
            const isEquipped = equippedId === item.id;
            return (
              <div key={item.id} className={styles.card}>
                <div className={styles.preview} style={{ background: item.color }}>
                  <span className={styles.emoji}>{item.emoji}</span>
                </div>
                <div className={styles.info}>
                  <p className={styles.name}>{item.name}</p>
                  <button
                    className={styles.buyBtn}
                    onClick={() =>
                      isEquipped ? unequipItem(item.slot) : equipItem(item.id)
                    }
                    style={{
                      background: isEquipped ? 'var(--bg-soft)' : undefined,
                      color: isEquipped ? 'var(--ink-soft)' : undefined,
                    }}
                  >
                    {isEquipped ? 'Unequip' : 'Equip'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
