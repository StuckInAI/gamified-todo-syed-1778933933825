import { useMemo, useState } from 'react';
import { Sparkles, Check } from 'lucide-react';
import clsx from 'clsx';
import { useGame } from '@/hooks/useGame';
import { SHOP_ITEMS } from '@/lib/shop';
import Character from '@/components/character/Character';
import type { ShopItem } from '@/types';

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

  const owned = useMemo(
    () => SHOP_ITEMS.filter((i) => character.ownedItemIds.includes(i.id) && i.slot === activeSlot),
    [character.ownedItemIds, activeSlot],
  );

  const equippedId = character.equipped[activeSlot];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-5)' }}>
      <header style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: 'var(--ink)' }}>
          <Sparkles size={20} style={{ verticalAlign: -3, marginRight: 6 }} />
          Wardrobe
        </h1>
        <p style={{ color: 'var(--ink-soft)', fontStyle: 'italic', fontSize: 14 }}>
          Dress up your little sprout however feels cozy today 💗
        </p>
      </header>

      <div
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
        <Character equipped={character.equipped} size="lg" mood="cheer" />
        <span style={{ fontWeight: 700, color: 'var(--ink)' }}>{character.name}</span>
      </div>

      <div
        style={{
          display: 'flex',
          gap: 8,
          overflowX: 'auto',
          paddingBottom: 4,
        }}
      >
        {SLOTS.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveSlot(s.id)}
            className={clsx()}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--r-pill)',
              background: activeSlot === s.id ? 'var(--peach)' : 'var(--bg-soft)',
              color: 'var(--ink)',
              fontWeight: 700,
              fontSize: 13,
              whiteSpace: 'nowrap',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              boxShadow: activeSlot === s.id ? 'var(--shadow-sm)' : 'none',
            }}
          >
            <span>{s.emoji}</span>
            <span>{s.label}</span>
          </button>
        ))}
      </div>

      {owned.length === 0 ? (
        <div
          style={{
            background: 'var(--bg-card)',
            borderRadius: 'var(--r-lg)',
            padding: 'var(--sp-6)',
            textAlign: 'center',
            color: 'var(--ink-soft)',
            fontStyle: 'italic',
          }}
        >
          No items in this slot yet — visit the shop to find something darling! 🛍️
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
            gap: 'var(--sp-3)',
          }}
        >
          {equippedId && (
            <button
              onClick={() => unequipSlot(activeSlot)}
              style={{
                padding: 'var(--sp-3)',
                background: 'var(--bg-soft)',
                border: '2px dashed var(--ink-mute)',
                borderRadius: 'var(--r-md)',
                color: 'var(--ink-soft)',
                fontWeight: 700,
                fontSize: 13,
                minHeight: 120,
              }}
            >
              ✖ Unequip
            </button>
          )}
          {owned.map((item) => {
            const isEquipped = equippedId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => equipItem(item.id)}
                style={{
                  padding: 'var(--sp-3)',
                  background: isEquipped ? 'white' : 'var(--bg-cream)',
                  border: `2px solid ${isEquipped ? 'var(--mint-deep)' : 'transparent'}`,
                  borderRadius: 'var(--r-md)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 6,
                  boxShadow: isEquipped ? 'var(--shadow-sm)' : 'none',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 'var(--r-md)',
                    background: item.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 28,
                  }}
                >
                  {item.emoji}
                </div>
                <span style={{ fontWeight: 700, fontSize: 13, color: 'var(--ink)' }}>{item.name}</span>
                {isEquipped && (
                  <span
                    style={{
                      position: 'absolute',
                      top: 6,
                      right: 6,
                      background: 'var(--mint-deep)',
                      color: 'white',
                      borderRadius: '50%',
                      width: 20,
                      height: 20,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Check size={12} />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
