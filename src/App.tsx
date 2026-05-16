import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import QuestsPage from '@/pages/QuestsPage';
import ShopPage from '@/pages/ShopPage';
import WardrobePage from '@/pages/WardrobePage';
import HomePage from '@/pages/HomePage';
import { GameProvider } from '@/hooks/useGame';

export default function App() {
  return (
    <GameProvider>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/quests" element={<QuestsPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/wardrobe" element={<WardrobePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </GameProvider>
  );
}
