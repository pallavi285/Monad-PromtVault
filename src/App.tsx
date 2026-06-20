import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PromptProvider } from './context/PromptContext';
import { WalletProvider } from './context/WalletContext';
import { LandingPage } from './pages/LandingPage';
import { MarketplacePage } from './pages/MarketplacePage';
import { PromptDetailPage } from './pages/PromptDetailPage';
import { SubmitPromptPage } from './pages/SubmitPromptPage';
import { DashboardLayout } from './layouts/DashboardLayout';
import { DashboardPage } from './pages/DashboardPage';
import { CreatePromptPage } from './pages/CreatePromptPage';

function App() {
  return (
    <WalletProvider>
      <PromptProvider>
        <BrowserRouter>
          <Routes>
            {/* Landing Page */}
            <Route path="/" element={<LandingPage />} />

            {/* Public Marketplace */}
            <Route path="/marketplace" element={<MarketplacePage />} />

            {/* Prompt Detail Page */}
            <Route path="/prompt/:id" element={<PromptDetailPage />} />

            {/* Submit Prompt Form */}
            <Route path="/submit" element={<SubmitPromptPage />} />

            {/* Dashboard Shell */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="my-prompts" element={<DashboardPage />} />
              <Route path="create" element={<CreatePromptPage />} />
            </Route>

            {/* Fallback Catch-All Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </PromptProvider>
    </WalletProvider>
  );
}

export default App;
