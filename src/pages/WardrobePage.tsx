import { useGame } from '@/hooks/useGame';
import { SHOP_ITEMS } from '@/lib/shop';
import type { ShopItem, ShopSlot } from '@/types';
import Character from '@/components/character/Character';

const SLOTS: { id: ShopSlot; label: string; emoji: string }[] = [
  { id: 'hat', label: 'Hats', emoji: '🎩' },
  { id: 'outfit', label: 'Outfits', emoji: '👕' },
  { id: 'accessory', label: 'Accessories', emoji: '🎀' },
  { id: 'decor', label: 'Decor', emoji: '🌷' },
];

export default function WardrobePage() {
  const { character, ownedItemIds, equipItem, unequipSlot } = useGame();

  const ownedBySlot = (slot: ShopSlot): ShopItem[] =>
    SHOP_ITEMS.filter((i) => i.slot === slot && ownedItemIds.includes(i.id));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-5)' }}>
      <header>
        <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>Wardrobe 👗</h1>
        <p style={{ color: 'var(--ink-soft)', fontStyle: 'italic' }}>
          Dress {character.name} however feels right today.
        </p>
      </header>

      <div
        style={{
          background: 'var(--bg-card)',
          borderRadius: 'var(--r-lg)',
          padding: 'var(--sp-5)',
          display: 'flex',
          justifyContent: 'center',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <Character equipped={character.equipped} size="lg" />
      </div>

      {SLOTS.map((slot) => {
        const items = ownedBySlot(slot.id);
        const equippedId = character.equipped[slot.id];
        return (
          <section key={slot.id} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: 14, fontWeight: 800, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {slot.emoji} {slot.label}
              </h2>
              {equippedId && (
                <button
                  onClick={() => unequipSlot(slot.id)}
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: 'var(--ink-soft)',
                    padding: '4px 10px',
                    borderRadius: 'var(--r-pill)',
                    background: 'var(--bg-soft)',
                  }}
                >
                  Unequip
                </button>
              )}
            </div>
            {items.length === 0 ? (
              <div
                style={{
                  padding: 'var(--sp-4)',
                  background: 'var(--bg-cream)',
                  borderRadius: 'var(--r-md)',
                  fontStyle: 'italic',
                  color: 'var(--ink-soft)',
                  fontSize: 13,
                  textAlign: 'center',
                }}
              >
                Nothing here yet — visit the shop 🛍️
              </div>
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                  gap: 'var(--sp-2)',
                }}
              >
                {items.map((item) => {
                  const isEquipped = equippedId === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => equipItem(item.id)}
                      style={{
                        padding: 'var(--sp-3)',
                        borderRadius: 'var(--r-md)',
                        background: isEquipped ? 'linear-gradient(135deg, var(--mint), var(--mint-deep))' : 'var(--bg-cream)',
                        color: isEquipped ? 'white' : 'var(--ink)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 4,
                        fontWeight: 700,
                        fontSize: 13,
                        boxShadow: isEquipped ? 'var(--shadow-sm)' : 'none',
                      }}
                    >
                      <span style={{ fontSize: 28 }}>{item.emoji}</span>
                      <span>{item.name}</span>
                      <span style={{ fontSize: 10, fontWeight: 600, opacity: 0.8 }}>
                        {isEquipped ? 'Equipped' : 'Tap to wear'}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
