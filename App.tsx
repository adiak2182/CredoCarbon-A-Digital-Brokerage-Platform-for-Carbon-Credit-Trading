import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Market } from './pages/Market';
import { Portfolio } from './pages/Portfolio';
import { Transactions } from './pages/Transactions';
import { ImageStudio } from './pages/ImageStudio';
import { CredoCarbonAI } from './pages/CredoCarbonAI';
import { VoiceAdvisor } from './pages/VoiceAdvisor'; // New import
import { MarketProvider } from './context/MarketContext';
import { UserProvider } from './context/UserContext';

const App: React.FC = () => {
  return (
    <MarketProvider>
      <UserProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="market" element={<Market />} />
              <Route path="portfolio" element={<Portfolio />} />
              <Route path="credocarbon-ai" element={<CredoCarbonAI />} />
              <Route path="voice-advisor" element={<VoiceAdvisor />} /> {/* New route */}
              <Route path="studio" element={<ImageStudio />} />
              <Route path="transactions" element={<Transactions />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </HashRouter>
      </UserProvider>
    </MarketProvider>
  );
};

export default App;