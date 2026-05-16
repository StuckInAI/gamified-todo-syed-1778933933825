import { useMemo } from 'react';
import { useGame } from '@/hooks/useGame';
import QuestForm from '@/components/quests/QuestForm';
import QuestCard from '@/components/quests/QuestCard';

export default function QuestsPage() {
  const { quests } = useGame();

  const { active, completed } = useMemo(() => {
    const a = quests.filter((q) => q.status !== 'done');
    const c = quests.filter((q) => q.status === 'done');
    return { active: a, completed: c };
  }, [quests]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-5)' }}>
      <header>
        <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>Your Quests 📜</h1>
        <p style={{ color: 'var(--ink-soft)', fontStyle: 'italic' }}>
          Gentle goals for gentle days.
        </p>
      </header>

      <QuestForm />

      {active.length > 0 && (
        <section style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
          <h2 style={{ fontSize: 14, fontWeight: 800, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            In progress
          </h2>
          {active.map((q) => (
            <QuestCard key={q.id} quest={q} />
          ))}
        </section>
      )}

      {active.length === 0 && (
        <div
          style={{
            padding: 'var(--sp-5)',
            background: 'var(--bg-card)',
            borderRadius: 'var(--r-lg)',
            textAlign: 'center',
            color: 'var(--ink-soft)',
            fontStyle: 'italic',
          }}
        >
          No active quests — enjoy a little rest 🍵
        </div>
      )}

      {completed.length > 0 && (
        <section style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-3)' }}>
          <h2 style={{ fontSize: 14, fontWeight: 800, color: 'var(--ink-soft)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Recently completed ✨
          </h2>
          {completed.slice(0, 8).map((q) => (
            <QuestCard key={q.id} quest={q} />
          ))}
        </section>
      )}
    </div>
  );
}
