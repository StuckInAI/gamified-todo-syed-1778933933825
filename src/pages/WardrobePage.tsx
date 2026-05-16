import { useMemo, useState } from 'react';
import { Shirt, Check } from 'lucide-react';
import clsx from 'clsx';
import CharacterStage from '@/components/character/CharacterStage';
import { useGame } from '@/hooks/useGame';
import { SHOP_ITEMS } from '@/lib/shop';
import type { ShopSlot, ShopItem } from '@/types';
import styles from '@/components/shop/ShopItemCard.module.css';

const SLOTS: { id: ShopSlot; label: string; emoji: string }[] = [
  { id: 'hat', label: 'Hats', emoji: '🎩' },
  { id: 'outfit', label: 'Outfits', emoji: '👕' },
  { id: 'accessory', label: 'Accessories', emoji: '🎀' },
  { id: 'decor', label: 'Decor', emoji: '🌸' },
];

export default function WardrobePage() {
  const { character, equipItem } = useGame();
  const [activeSlot, setActiveSlot] = useState<ShopSlot>('hat');

  const ownedItems = useMemo<ShopItem[]>(
    () => SHOP_ITEMS.filter((i) => character.ownedItems.includes(i.id) && i.slot === activeSlot),
    [character.ownedItems, activeSlot],
  );

  const handleToggle = (item: ShopItem) => {
    const isEquipped = character.equipped[item.slot] === item.id;
    if (isEquipped) {
      equipItem(null);
    } else {
      equipItem(item.id);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-5)' }}>
      <CharacterStage />

      <div
        style={{
          display: 'flex',
          gap: 8,
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {SLOTS.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveSlot(s.id)}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--r-pill)',
              fontWeight: 700,
              fontSize: 13,
              background:
                activeSlot === s.id
                  ? 'linear-gradient(135deg, var(--peach) 0%, var(--rose) 100%)'
                  : 'var(--bg-soft)',
              color: activeSlot === s.id ? 'var(--ink)' : 'var(--ink-soft)',
              boxShadow: activeSlot === s.id ? 'var(--shadow-sm)' : 'none',
              transition: 'all 0.15s ease',
            }}
          >
            <span style={{ marginRight: 6 }}>{s.emoji}</span>
            {s.label}
          </button>
        ))}
      </div>

      {ownedItems.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: 'var(--sp-6)',
            background: 'var(--bg-card)',
            borderRadius: 'var(--r-lg)',
            boxShadow: 'var(--shadow-sm)',
            color: 'var(--ink-soft)',
          }}
        >
          <Shirt size={32} style={{ opacity: 0.4, marginBottom: 8 }} />
          <p style={{ fontWeight: 700, color: 'var(--ink)', marginBottom: 4 }}>
            Nothing here yet
          </p>
          <p style={{ fontSize: 13, fontStyle: 'italic' }}>
            Visit the shop to find treasures for this slot 💗
          </p>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: 'var(--sp-3)',
          }}
        >
          {ownedItems.map((item) => {
            const isEquipped = character.equipped[item.slot] === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleToggle(item)}
                className={clsx(styles.card)}
                style={{
                  border: isEquipped
                    ? '2px solid var(--mint-deep)'
                    : '2px solid transparent',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <div
                  className={styles.preview}
                  style={{ background: item.color }}
                >
                  <span className={styles.previewEmoji}>{item.emoji}</span>
                </div>
                <div className={styles.info}>
                  <span className={styles.name}>{item.name}</span>
                  <span className={styles.blurb}>{item.blurb}</span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                    padding: '6px 12px',
                    borderRadius: 'var(--r-pill)',
                    fontSize: 12,
                    fontWeight: 800,
                    background: isEquipped
                      ? 'var(--mint)'
                      : 'var(--bg-soft)',
                    color: isEquipped ? '#2f6a44' : 'var(--ink-soft)',
                  }}
                >
                  {isEquipped ? (
                    <>
                      <Check size={14} /> Equipped
                    </>
                  ) : (
                    'Wear it'
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
