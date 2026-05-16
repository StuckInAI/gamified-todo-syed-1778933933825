import { useEffect } from 'react';
import { Sparkles, Coins, PartyPopper } from 'lucide-react';
import { useGame } from '@/hooks/useGame';
import styles from './RewardToast.module.css';

export default function RewardToast() {
  const { reward, clearReward } = useGame();

  useEffect(() => {
    if (!reward) return;
    const t = setTimeout(clearReward, 3800);
    return () => clearTimeout(t);
  }, [reward, clearReward]);

  if (!reward) return null;

  return (
    <div className={styles.wrap} role="status" aria-live="polite">
      <div className={styles.toast}>
        <div className={styles.icon}>
          {reward.leveledUp ? <PartyPopper size={22} /> : <Sparkles size={22} />}
        </div>
        <div className={styles.body}>
          <p className={styles.title}>
            {reward.leveledUp ? `Level ${reward.newLevel}! You're growing 🌱` : 'Quest complete!'}
          </p>
          <p className={styles.subtitle}>"{reward.questTitle}"</p>
          <div className={styles.rewards}>
            <span className={styles.chipXp}><Sparkles size={12} /> +{reward.xp} XP</span>
            <span className={styles.chipCoin}><Coins size={12} /> +{reward.coins}</span>
          </div>
        </div>
      </div>
      <div className={styles.confetti} aria-hidden="true">
        <span>✨</span><span>🌸</span><span>⭐</span><span>💖</span><span>🍃</span>
      </div>
    </div>
  );
}
