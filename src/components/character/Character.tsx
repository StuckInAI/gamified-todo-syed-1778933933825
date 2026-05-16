import clsx from 'clsx';
import type { Equipped } from '@/types';
import { getItem } from '@/lib/shop';
import styles from './Character.module.css';

type Props = {
  equipped: Equipped;
  size?: 'sm' | 'md' | 'lg';
  mood?: 'happy' | 'sleepy' | 'cheer';
};

export default function Character({ equipped, size = 'md', mood = 'happy' }: Props) {
  const hat = getItem(equipped.hat);
  const outfit = getItem(equipped.outfit);
  const accessory = getItem(equipped.accessory);

  return (
    <div className={clsx(styles.stage, styles[size])}>
      <div className={styles.shadow} />
      <div className={styles.character}>
        {hat && (
          <div className={styles.hat} style={{ background: hat.color }} title={hat.name}>
            <span>{hat.emoji}</span>
          </div>
        )}
        <div className={styles.body}>
          <div className={styles.head}>
            <div className={clsx(styles.eye, styles.eyeL, mood === 'sleepy' && styles.sleepy)} />
            <div className={clsx(styles.eye, styles.eyeR, mood === 'sleepy' && styles.sleepy)} />
            <div className={styles.cheekL} />
            <div className={styles.cheekR} />
            <div className={clsx(styles.mouth, mood === 'cheer' && styles.mouthBig)} />
          </div>
          <div className={styles.torso} style={outfit ? { background: outfit.color } : undefined}>
            {outfit && <span className={styles.outfitEmoji}>{outfit.emoji}</span>}
          </div>
          {accessory && (
            <div className={styles.accessory} style={{ background: accessory.color }} title={accessory.name}>
              <span>{accessory.emoji}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
