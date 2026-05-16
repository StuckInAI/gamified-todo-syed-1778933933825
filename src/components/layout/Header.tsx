import { Link } from 'react-router-dom';
import { Coins, Sparkles } from 'lucide-react';
import { useGame } from '@/hooks/useGame';
import styles from './Header.module.css';

export default function Header() {
  const { character } = useGame();
  const xpPct = Math.min(100, Math.round((character.xp / character.xpToNext) * 100));

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.brand}>
        <span className={styles.logo}>🌱</span>
        <span className={styles.brandText}>
          <span className={styles.brandTitle}>Cozy Quest</span>
          <span className={styles.brandSub}>a gentle to-do adventure</span>
        </span>
      </Link>

      <div className={styles.stats}>
        <div className={styles.levelChip} title={`Level ${character.level}`}>
          <Sparkles size={14} />
          <span>Lv {character.level}</span>
          <div className={styles.xpTrack}>
            <div className={styles.xpFill} style={{ width: `${xpPct}%` }} />
          </div>
          <span className={styles.xpText}>{character.xp}/{character.xpToNext}</span>
        </div>

        <div className={styles.coinChip} title="Coins">
          <Coins size={16} />
          <span>{character.coins}</span>
        </div>
      </div>
    </header>
  );
}
