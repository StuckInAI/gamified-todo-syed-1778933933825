import clsx from 'clsx';
import { Check, Trash2, RotateCcw, Calendar, Clock } from 'lucide-react';
import type { Quest } from '@/types';
import { getDeadlineStatus, formatFriendlyDate, getFinalDeadline, formatDateFromDate } from '@/lib/deadlines';
import { getDifficulty } from '@/lib/game';
import { useGame } from '@/hooks/useGame';
import styles from './QuestCard.module.css';

type Props = { quest: Quest };

export default function QuestCard({ quest }: Props) {
  const { completeQuest, uncompleteQuest, deleteQuest } = useGame();
  const status = getDeadlineStatus(quest);
  const meta = getDifficulty(quest.difficulty);
  const finalDate = getFinalDeadline(quest);

  const isDone = quest.status === 'done';

  let statusLabel = '';
  let statusKind: 'soft' | 'today' | 'grace' | 'overdue' | 'done' = 'soft';

  if (isDone) {
    statusLabel = 'Completed ✨';
    statusKind = 'done';
  } else {
    switch (status.kind) {
      case 'none':
        statusLabel = 'No deadline — no pressure 💗';
        statusKind = 'soft';
        break;
      case 'upcoming':
        statusLabel = `${status.daysLeft} day${status.daysLeft === 1 ? '' : 's'} until deadline`;
        statusKind = 'soft';
        break;
      case 'today':
        statusLabel = 'Deadline is today — gentle nudge 🌼';
        statusKind = 'today';
        break;
      case 'grace':
        statusLabel = `${status.daysLeft} day${status.daysLeft === 1 ? '' : 's'} of grace time left`;
        statusKind = 'grace';
        break;
      case 'overdue':
        statusLabel = `${status.daysOver} day${status.daysOver === 1 ? '' : 's'} past — that's okay, try again 🤍`;
        statusKind = 'overdue';
        break;
    }
  }

  return (
    <article className={clsx(styles.card, isDone && styles.done, styles[`status_${statusKind}`])}>
      <button
        className={clsx(styles.checkbox, isDone && styles.checkboxDone)}
        onClick={() => (isDone ? uncompleteQuest(quest.id) : completeQuest(quest.id))}
        aria-label={isDone ? 'Mark as not done' : 'Complete quest'}
      >
        {isDone ? <Check size={18} /> : null}
      </button>

      <div className={styles.body}>
        <div className={styles.topRow}>
          <span className={clsx(styles.difficulty, styles[`diff_${quest.difficulty}`])}>
            <span>{meta.emoji}</span> {meta.label}
          </span>
          <span className={styles.rewards}>+{meta.xp} XP · +{meta.coins} 🪙</span>
        </div>

        <h3 className={styles.title}>{quest.title}</h3>
        {quest.note && <p className={styles.note}>{quest.note}</p>}

        {quest.deadline && (
          <div className={styles.deadlineRow}>
            <span className={styles.dlChip}>
              <Calendar size={12} />
              Due {formatFriendlyDate(quest.deadline)}
            </span>
            {quest.extensionDays > 0 && finalDate && (
              <span className={styles.graceChip}>
                <Clock size={12} />
                +{quest.extensionDays}d grace → {formatDateFromDate(finalDate)}
              </span>
            )}
          </div>
        )}

        <p className={clsx(styles.statusLine, styles[`statusLine_${statusKind}`])}>{statusLabel}</p>
      </div>

      <div className={styles.actions}>
        {isDone && (
          <button className={styles.iconBtn} onClick={() => uncompleteQuest(quest.id)} title="Undo">
            <RotateCcw size={16} />
          </button>
        )}
        <button className={clsx(styles.iconBtn, styles.deleteBtn)} onClick={() => deleteQuest(quest.id)} title="Remove">
          <Trash2 size={16} />
        </button>
      </div>
    </article>
  );
}
