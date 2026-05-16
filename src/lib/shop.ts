import type { ShopItem } from '@/types';

export const SHOP_ITEMS: ShopItem[] = [
  // Hats
  { id: 'hat-flower', name: 'Daisy Crown', slot: 'hat', emoji: '🌼', price: 30, blurb: 'A halo of soft petals', color: '#ffe6a3' },
  { id: 'hat-mushroom', name: 'Mushroom Cap', slot: 'hat', emoji: '🍄', price: 55, blurb: 'Forest-foraged & cozy', color: '#ffc7c7' },
  { id: 'hat-beanie', name: 'Knit Beanie', slot: 'hat', emoji: '🧶', price: 45, blurb: 'Hand-knit with love', color: '#bfd9f2' },
  { id: 'hat-leaf', name: 'Leaf Hood', slot: 'hat', emoji: '🍃', price: 80, blurb: 'For little forest spirits', color: '#b8e6c9' },

  // Outfits
  { id: 'fit-sweater', name: 'Cozy Sweater', slot: 'outfit', emoji: '🧥', price: 60, blurb: 'Warm and a little fuzzy', color: '#ffb89a' },
  { id: 'fit-overalls', name: 'Garden Overalls', slot: 'outfit', emoji: '👖', price: 75, blurb: 'For tending little gardens', color: '#b8e6c9' },
  { id: 'fit-cape', name: 'Star Cape', slot: 'outfit', emoji: '🌟', price: 120, blurb: 'For especially brave quests', color: '#d6ccf0' },
  { id: 'fit-pajamas', name: 'Cloud Pajamas', slot: 'outfit', emoji: '☁️', price: 50, blurb: 'Rest-day ready', color: '#bfd9f2' },

  // Accessories
  { id: 'acc-scarf', name: 'Wool Scarf', slot: 'accessory', emoji: '🧣', price: 25, blurb: 'A gentle hug for your neck', color: '#f59ea4' },
  { id: 'acc-glasses', name: 'Round Glasses', slot: 'accessory', emoji: '👓', price: 40, blurb: 'Bookish & sweet', color: '#a896d6' },
  { id: 'acc-bowtie', name: 'Polka Bowtie', slot: 'accessory', emoji: '🎀', price: 35, blurb: 'A little flourish', color: '#ffc7c7' },
  { id: 'acc-backpack', name: 'Tiny Backpack', slot: 'accessory', emoji: '🎒', price: 65, blurb: 'For carrying snacks', color: '#f2c75c' },

  // Decor (room background)
  { id: 'dec-plant', name: 'Potted Fern', slot: 'decor', emoji: '🪴', price: 40, blurb: 'A leafy little friend', color: '#b8e6c9' },
  { id: 'dec-lantern', name: 'Paper Lantern', slot: 'decor', emoji: '🏮', price: 55, blurb: 'Warm evening glow', color: '#ffb89a' },
  { id: 'dec-stars', name: 'String Lights', slot: 'decor', emoji: '✨', price: 70, blurb: 'Tiny twinkles, big mood', color: '#ffe6a3' },
  { id: 'dec-cat', name: 'Sleepy Cat', slot: 'decor', emoji: '🐈', price: 100, blurb: 'Purrs softly while you work', color: '#d6ccf0' },
];

export function getItem(id: string | null): ShopItem | null {
  if (!id) return null;
  return SHOP_ITEMS.find((i) => i.id === id) ?? null;
}
