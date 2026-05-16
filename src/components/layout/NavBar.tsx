import { NavLink } from 'react-router-dom';
import { Home, ListChecks, ShoppingBag, Shirt } from 'lucide-react';
import clsx from 'clsx';
import styles from './NavBar.module.css';

const links = [
  { to: '/', label: 'Home', Icon: Home },
  { to: '/quests', label: 'Quests', Icon: ListChecks },
  { to: '/shop', label: 'Shop', Icon: ShoppingBag },
  { to: '/wardrobe', label: 'Wardrobe', Icon: Shirt },
];

export default function NavBar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        {links.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) => clsx(styles.link, isActive && styles.active)}
          >
            <Icon size={20} />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
