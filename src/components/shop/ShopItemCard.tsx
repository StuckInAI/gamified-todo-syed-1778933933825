import clsx from 'clsx';
import { Coins, Check } from 'lucide-react';
import type { ShopItem } from '@/types';
import { useGame } from '@/hooks/useGame';
import styles from './ShopItemCard.module.css';

type Props = {
  item: ShopItem;
  onPurchase?: (item: ShopItem, ok: boolean, reason?: string) => void;
};

export default function ShopItemCard({ item, onPurchase }: Props) {
  const { character, buyItem, equipItem } = useGame();
  const owned = character.ownedItemIds.includes(item.id);
  const equipped = character.equipped[item.slot] === item.id;
  const canAfford = character.coins >= item.price;

  const handleClick = () => {
    if (owned) {
      if (!equipped) equipItem(item.id);
      return;
    }
    const result = buyItem(item.id);
    if (onPurchase) onPurchase(item, result.ok, result.reason);
  };

  return (
    <article className={clsx(styles.card, owned && styles.owned)}>
      <div className={styles.preview} style={{ background: `linear-gradient(135deg, ${item.color}, white)` }}>
        <span className={styles.emoji}>{item.emoji}</span>
        {equipped && (
          <span className={styles.equippedBadge}>
            <Check size={12} /> Wearing
          </span>
        )}
      </div>
      <div className={styles.body}>
        <span className={styles.slot}>{item.slot}</span>
        <h3 className={styles.name}>{item.name}</h3>
        <p className={styles.blurb}>{item.blurb}</p>
        <button
          className={clsx(styles.btn, owned ? styles.btnOwn : styles.btnBuy)}
          onClick={handleClick}
          disabled={!owned && !canAfford}
        >
          {owned ? (
            equipped ? 'Equipped ✨' : 'Wear this'
          ) : (
            <>
              <Coins size={14} /> {item.price} {canAfford ? '' : '(need more)'}
            </>
          )}
        </button>
      </div>
    </article>
  );
}
