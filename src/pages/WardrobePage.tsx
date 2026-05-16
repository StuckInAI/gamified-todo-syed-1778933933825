import { useMemo, useState } from 'react';
import { Shirt, Check } from 'lucide-react';
import clsx from 'clsx';
import type { ShopItem } from '@/types';
import { SHOP_ITEMS } from '@/lib/shop';
import { useGame } from '@/hooks/useGame';
import Character from '@/components/character/Character';

type SlotId = 'hat' | 'outfit' | 'accessory' | 'decor';

const SLOTS: { id: SlotId; label: string; emoji: string }[] = [
  { id: 'hat', label: 'Hats', emoji: '🎩' },
  { id: 'outfit', label: 'Outfits', emoji: '👕' },
  { id: 'accessory', label: 'Accessories', emoji: '🎀' },
  { id: 'decor', label: 'Decor', emoji: '🌸' },
];

export default function WardrobePage() {
  const { character, equipItem } = useGame();
  const [activeSlot, setActiveSlot] = useState<SlotId>('hat');

  const owned = useMemo(
    () => SHOP_ITEMS.filter((i) => character.owned.includes(i.id) && i.slot === activeSlot),
    [character.owned, activeSlot],
  );

  const equippedId = character.equipped[activeSlot];

  const handleEquip = (item: ShopItem) => {
    if (equippedId === item.id) {
      equipItem(item.slot, null);
    } else {
      equipItem(item.slot, item.id);
    }
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 280px) 1fr',
        gap: 'var(--sp-5)',
        alignItems: 'start',
      }}
    >
      <div
        style={{
          background: 'var(--bg-card)',
          borderRadius: 'var(--r-lg)',
          padding: 'var(--sp-4)',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--sp-3)',
          position: 'sticky',
          top: 80,
        }}
      >
        <Character equipped={character.equipped} size="lg" />
        <div style={{ fontWeight: 800, color: 'var(--ink)' }}>{character.name}</div>
        <div style={{ fontSize: 12, color: 'var(--ink-soft)', fontStyle: 'italic' }}>
          Dress up your companion 💖
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
        <div style={{ display: 'flex', gap: 'var(--sp-2)', flexWrap: 'wrap' }}>
          {SLOTS.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSlot(s.id)}
              className={clsx()}
              style={{
                padding: '8px 14px',
                borderRadius: 'var(--r-pill)',
                background: activeSlot === s.id ? 'var(--peach)' : 'var(--bg-soft)',
                color: 'var(--ink)',
                fontWeight: 700,
                fontSize: 13,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                boxShadow: activeSlot === s.id ? 'var(--shadow-sm)' : 'none',
              }}
            >
              <span>{s.emoji}</span>
              {s.label}
            </button>
          ))}
        </div>

        {owned.length === 0 ? (
          <div
            style={{
              background: 'var(--bg-card)',
              borderRadius: 'var(--r-lg)',
              padding: 'var(--sp-5)',
              textAlign: 'center',
              color: 'var(--ink-soft)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <Shirt size={28} style={{ marginBottom: 8, opacity: 0.6 }} />
            <p style={{ fontWeight: 700, color: 'var(--ink)' }}>Nothing in this drawer yet</p>
            <p style={{ fontSize: 13, fontStyle: 'italic' }}>
              Visit the shop to find something cozy ✨
            </p>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
              gap: 'var(--sp-3)',
            }}
          >
            {owned.map((item) => {
              const isEquipped = equippedId === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleEquip(item)}
                  style={{
                    background: 'var(--bg-card)',
                    borderRadius: 'var(--r-lg)',
                    padding: 'var(--sp-3)',
                    boxShadow: 'var(--shadow-sm)',
                    border: isEquipped ? '2px solid var(--mint-deep)' : '2px solid transparent',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 6,
                    cursor: 'pointer',
                  }}
                >
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: '50%',
                      background: item.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 28,
                    }}
                  >
                    {item.emoji}
                  </div>
                  <div style={{ fontWeight: 800, fontSize: 13, color: 'var(--ink)' }}>
                    {item.name}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: isEquipped ? 'var(--mint-deep)' : 'var(--ink-soft)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    {isEquipped ? (
                      <>
                        <Check size={12} /> Equipped
                      </>
                    ) : (
                      'Tap to wear'
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
