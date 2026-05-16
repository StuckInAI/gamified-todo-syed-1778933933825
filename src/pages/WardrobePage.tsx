import { useState } from 'react';
import clsx from 'clsx';
import type { ShopItem } from '@/types';
import { SHOP_ITEMS, getItem } from '@/lib/shop';
import { useGame } from '@/hooks/useGame';
import Character from '@/components/character/Character';
import styles from '@/components/shop/ShopItemCard.module.css';

type Slot = 'hat' | 'outfit' | 'accessory' | 'decor';

const SLOTS: { id: Slot; label: string; emoji: string }[] = [
  { id: 'hat', label: 'Hat', emoji: '🎩' },
  { id: 'outfit', label: 'Outfit', emoji: '👕' },
  { id: 'accessory', label: 'Accessory', emoji: '🎀' },
  { id: 'decor', label: 'Decor', emoji: '🌼' },
];

export default function WardrobePage() {
  const { character, equipItem, unequipSlot } = useGame();
  const [activeSlot, setActiveSlot] = useState<Slot>('hat');

  const ownedItems: ShopItem[] = SHOP_ITEMS.filter(
    (item) => character.owned.includes(item.id) && item.slot === activeSlot,
  );

  const equippedId = character.equipped[activeSlot];
  const equippedItem = getItem(equippedId);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-5)' }}>
      <header style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: 'var(--ink)', marginBottom: 4 }}>
          Wardrobe 👗
        </h1>
        <p style={{ fontSize: 13, color: 'var(--ink-soft)', fontStyle: 'italic' }}>
          Dress up your cozy companion however you like.
        </p>
      </header>

      <section
        style={{
          background: 'var(--bg-card)',
          borderRadius: 'var(--r-lg)',
          padding: 'var(--sp-5)',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--sp-3)',
        }}
      >
        <Character equipped={character.equipped} size="lg" />
        <p style={{ fontSize: 12, color: 'var(--ink-soft)', fontStyle: 'italic' }}>
          {character.name} looks lovely today ✨
        </p>
      </section>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 'var(--sp-2)',
        }}
      >
        {SLOTS.map((slot) => (
          <button
            key={slot.id}
            onClick={() => setActiveSlot(slot.id)}
            style={{
              padding: 'var(--sp-3)',
              borderRadius: 'var(--r-md)',
              background:
                activeSlot === slot.id
                  ? 'linear-gradient(135deg, var(--peach), var(--rose))'
                  : 'var(--bg-soft)',
              fontWeight: 700,
              fontSize: 12,
              color: 'var(--ink)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              boxShadow:
                activeSlot === slot.id ? 'var(--shadow-sm)' : 'none',
            }}
          >
            <span style={{ fontSize: 20 }}>{slot.emoji}</span>
            <span>{slot.label}</span>
          </button>
        ))}
      </div>

      {equippedItem && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 'var(--sp-3) var(--sp-4)',
            background: 'var(--bg-cream)',
            borderRadius: 'var(--r-md)',
          }}
        >
          <span style={{ fontSize: 13, color: 'var(--ink-soft)', fontWeight: 600 }}>
            Currently wearing: <strong>{equippedItem.name}</strong> {equippedItem.emoji}
          </span>
          <button
            onClick={() => unequipSlot(activeSlot)}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--r-pill)',
              background: 'var(--bg-soft)',
              fontSize: 12,
              fontWeight: 700,
              color: 'var(--ink-soft)',
            }}
          >
            Take off
          </button>
        </div>
      )}

      {ownedItems.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: 'var(--sp-5)',
            color: 'var(--ink-soft)',
            fontStyle: 'italic',
            fontSize: 13,
          }}
        >
          You don't own any {activeSlot} items yet — visit the shop! 🛍️
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
            gap: 'var(--sp-3)',
          }}
        >
          {ownedItems.map((item) => {
            const isEquipped = equippedId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => equipItem(item.id)}
                className={clsx(styles.card)}
                style={{
                  border: isEquipped
                    ? '2px solid var(--mint-deep)'
                    : '2px solid transparent',
                  background: isEquipped ? '#f4fbf6' : 'var(--bg-card)',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <div
                  style={{
                    fontSize: 32,
                    textAlign: 'center',
                    padding: 'var(--sp-2)',
                    background: item.color,
                    borderRadius: 'var(--r-md)',
                    marginBottom: 'var(--sp-2)',
                  }}
                >
                  {item.emoji}
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)' }}>
                  {item.name}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: isEquipped ? 'var(--mint-deep)' : 'var(--ink-soft)',
                    fontWeight: 700,
                    marginTop: 4,
                  }}
                >
                  {isEquipped ? '✓ Equipped' : 'Tap to wear'}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
