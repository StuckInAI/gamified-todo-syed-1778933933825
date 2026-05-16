import { useState } from 'react';
import { Plus, Sparkles } from 'lucide-react';
import clsx from 'clsx';
import type { Difficulty } from '@/types';
import { DIFFICULTIES } from '@/lib/game';
import { useGame } from '@/hooks/useGame';
import styles from './QuestForm.module.css';

export default function QuestForm() {
  const { addQuest } = useGame();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [deadline, setDeadline] = useState('');
  const [extension, setExtension] = useState<number>(3);
  const [difficulty, setDifficulty] = useState<Difficulty>('cozy');

  const reset = () => {
    setTitle('');
    setNote('');
    setDeadline('');
    setExtension(3);
    setDifficulty('cozy');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) return;
    addQuest({
      title,
      note,
      deadline: deadline || null,
      extensionDays: extension,
      difficulty,
    });
    reset();
    setOpen(false);
  };

  if (!open) {
    return (
      <button className={styles.addBtn} onClick={() => setOpen(true)}>
        <Plus size={18} />
        <span>Add a new quest</span>
        <Sparkles size={14} />
      </button>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label className={styles.label}>What's the quest?</label>
        <input
          autoFocus
          className={styles.input}
          placeholder="e.g. Water the plants 🌿"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
        />
      </div>

      <div className={styles.row}>
        <label className={styles.label}>A gentle note (optional)</label>
        <textarea
          className={styles.textarea}
          placeholder="Any little reminder to your future self..."
          value={note}
          rows={2}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNote(e.target.value)}
        />
      </div>

      <div className={styles.rowGrid}>
        <div>
          <label className={styles.label}>Soft deadline</label>
          <input
            type="date"
            className={styles.input}
            value={deadline}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDeadline(e.target.value)}
          />
        </div>
        <div>
          <label className={styles.label}>Grace days</label>
          <div className={styles.extensionWrap}>
            <input
              type="number"
              min={0}
              max={30}
              className={styles.input}
              value={extension}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setExtension(Number(e.target.value))}
            />
            <span className={styles.helper}>extra cozy days after the deadline</span>
          </div>
        </div>
      </div>

      <div className={styles.row}>
        <label className={styles.label}>How big does this feel?</label>
        <div className={styles.diffs}>
          {DIFFICULTIES.map((d) => (
            <button
              type="button"
              key={d.id}
              className={clsx(styles.diffBtn, difficulty === d.id && styles.diffActive)}
              onClick={() => setDifficulty(d.id)}
            >
              <span className={styles.diffEmoji}>{d.emoji}</span>
              <span className={styles.diffLabel}>{d.label}</span>
              <span className={styles.diffReward}>+{d.xp} XP · +{d.coins} 🪙</span>
              <span className={styles.diffBlurb}>{d.blurb}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.cancel} onClick={() => { reset(); setOpen(false); }}>
          Maybe later
        </button>
        <button type="submit" className={styles.submit} disabled={!title.trim()}>
          <Sparkles size={16} />
          Start the quest
        </button>
      </div>
    </form>
  );
}
