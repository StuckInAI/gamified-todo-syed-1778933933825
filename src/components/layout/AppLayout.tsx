import { Outlet } from 'react-router-dom';
import Header from '@/components/layout/Header';
import NavBar from '@/components/layout/NavBar';
import RewardToast from '@/components/feedback/RewardToast';
import styles from './AppLayout.module.css';

export default function AppLayout() {
  return (
    <div className={styles.shell}>
      <div className={styles.clouds} aria-hidden="true">
        <span className={styles.cloud} style={{ top: '8%', left: '6%' }}>☁️</span>
        <span className={styles.cloud} style={{ top: '14%', right: '10%' }}>☁️</span>
        <span className={styles.cloud} style={{ top: '32%', left: '20%' }}>✨</span>
        <span className={styles.cloud} style={{ top: '60%', right: '6%' }}>🌸</span>
        <span className={styles.cloud} style={{ bottom: '12%', left: '8%' }}>🍃</span>
      </div>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <Outlet />
        </div>
      </main>
      <NavBar />
      <RewardToast />
    </div>
  );
}
