import { Link } from 'react-router-dom';
import { ListChecks, ShoppingBag, Shirt, Sparkles } from 'lucide-react';
import { useGame } from '@/hooks/useGame';
import CharacterStage from '@/components/character/CharacterStage';

export default function HomePage() {
  const { quests, character } = useGame();
  const active = quests.filter((q) => q.status !== 'done').length;
  const done = quests.filter((q) => q.status === 'done').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-5)' }}>
      <CharacterStage />

      <section
        style={{
          background: 'var(--bg-card)',
          borderRadius: 'var(--r-lg)',
          padding: 'var(--sp-5)',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>
          Welcome back, {character.name} 🌷
        </h2>
        <p style={{ color: 'var(--ink-soft)', fontStyle: 'italic', marginBottom: 16 }}>
          You have {active} cozy quest{active === 1 ? '' : 's'} waiting, and {done} completed. No rush
          — go at your own pace.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: 'var(--sp-3)',
          }}
        >
          <Link
            to="/quests"
            style={{
              padding: 'var(--sp-4)',
              borderRadius: 'var(--r-md)',
              background: 'linear-gradient(135deg, var(--peach), var(--rose))',
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
              fontWeight: 700,
              color: 'var(--ink)',
            }}
          >
            <ListChecks size={20} />
            <span>Quests</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-soft)' }}>
              tend your to-do garden
            </span>
          </Link>
          <Link
            to="/shop"
            style={{
              padding: 'var(--sp-4)',
              borderRadius: 'var(--r-md)',
              background: 'linear-gradient(135deg, var(--butter), var(--gold-soft))',
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
              fontWeight: 700,
              color: 'var(--ink)',
            }}
          >
            <ShoppingBag size={20} />
            <span>Shop</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-soft)' }}>
              spend your coins
            </span>
          </Link>
          <Link
            to="/wardrobe"
            style={{
              padding: 'var(--sp-4)',
              borderRadius: 'var(--r-md)',
              background: 'linear-gradient(135deg, var(--lavender), var(--mint))',
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
              fontWeight: 700,
              color: 'var(--ink)',
            }}
          >
            <Shirt size={20} />
            <span>Wardrobe</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-soft)' }}>
              dress up your buddy
            </span>
          </Link>
          <div
            style={{
              padding: 'var(--sp-4)',
              borderRadius: 'var(--r-md)',
              background: 'var(--bg-cream)',
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
              fontWeight: 700,
              color: 'var(--ink)',
            }}
          >
            <Sparkles size={20} />
            <span>Level {character.level}</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-soft)' }}>
              {character.xp} / {character.xpToNext} XP
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
