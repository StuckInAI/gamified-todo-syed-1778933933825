import { Coins } from 'lucide-react';
import { useGame } from '@/hooks/useGame';
import { SHOP_ITEMS } from '@/lib/shop';
import ShopItemCard from '@/components/shop/ShopItemCard';

export default function ShopPage() {
  const { character } = useGame();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-5)' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 'var(--sp-3)' }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>Cozy Shop 🛍️</h1>
          <p style={{ color: 'var(--ink-soft)', fontStyle: 'italic' }}>
            Soft little treasures for your buddy.
          </p>
        </div>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '8px 16px',
            background: 'linear-gradient(135deg, var(--butter), var(--gold-soft))',
            borderRadius: 'var(--r-pill)',
            fontWeight: 800,
            color: '#7a5a1f',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <Coins size={16} />
          {character.coins}
        </div>
      </header>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: 'var(--sp-3)',
        }}
      >
        {SHOP_ITEMS.map((item) => (
          <ShopItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
