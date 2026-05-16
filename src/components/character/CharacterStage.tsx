import { useGame } from '@/hooks/useGame';
import { getItem } from '@/lib/shop';
import Character from '@/components/character/Character';
import styles from './CharacterStage.module.css';

export default function CharacterStage() {
  const { character } = useGame();
  const decor = getItem(character.equipped.decor);
  const xpPct = Math.round((character.xp / character.xpToNext) * 100);

  return (
    <div className={styles.stage}>
      <div className={styles.sky}>
        <span className={styles.sun}>☀️</span>
        {decor && (
          <span className={styles.decor} title={decor.name}>
            {decor.emoji}
          </span>
        )}
        <span className={styles.sparkle1}>✨</span>
        <span className={styles.sparkle2}>✨</span>
      </div>
      <div className={styles.ground}>
        <div className={styles.charWrap}>
          <Character equipped={character.equipped} size="lg" />
        </div>
        <div className={styles.grass} />
      </div>
      <div className={styles.nameplate}>
        <span className={styles.name}>{character.name}</span>
        <span className={styles.level}>Level {character.level}</span>
        <div className={styles.xpBar}>
          <div className={styles.xpFill} style={{ width: `${xpPct}%` }} />
        </div>
        <span className={styles.xpText}>{character.xp} / {character.xpToNext} XP</span>
      </div>
    </div>
  );
}
