import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { IdeaProvider, useIdea } from './context/IdeaContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { LandingPage } from './components/landing/LandingPage';
import { AuthModal } from './components/auth/AuthModal';
import { IdeaCreatorForm } from './components/idea-creator/IdeaCreatorForm';
import { DashboardOverview } from './components/dashboard/DashboardOverview';
import { IdeaValidationReport } from './components/dashboard/IdeaValidationReport';
import { AiCoachModal } from './components/tools/AiCoachModal';
import { IdeaComparison } from './components/tools/IdeaComparison';
import { ExploreIdeas } from './components/tools/ExploreIdeas';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { BusinessIdea } from './types';

const MainAppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { ideas, activeIdea, setActiveIdea } = useIdea();
  const [activeTab, setActiveTab] = useState<string>('landing');
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [coachOpen, setCoachOpen] = useState<boolean>(false);

  const openAuthModal = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleStartValidation = () => {
    if (!isAuthenticated) {
      openAuthModal('signup');
    } else {
      setActiveTab('create');
    }
  };

  const handleTryDemo = () => {
    if (ideas.length > 0) {
      setActiveIdea(ideas[0]);
    }
    setActiveTab('report');
  };

  const handleSelectIdea = (idea: BusinessIdea) => {
    setActiveIdea(idea);
    setActiveTab('report');
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-950 text-slate-100 font-sans">
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openAuthModal={openAuthModal}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activeTab === 'landing' && (
          <LandingPage
            onStartValidation={handleStartValidation}
            onTryDemo={handleTryDemo}
            openAuthModal={openAuthModal}
          />
        )}

        {activeTab === 'create' && (
          <IdeaCreatorForm
            onAnalysisCompleted={() => setActiveTab('report')}
          />
        )}

        {activeTab === 'dashboard' && (
          <DashboardOverview
            onNewAnalysis={() => setActiveTab('create')}
            onSelectIdea={handleSelectIdea}
            onCompareSelect={() => setActiveTab('compare')}
          />
        )}

        {activeTab === 'report' && activeIdea && (
          <IdeaValidationReport
            idea={activeIdea}
            onOpenCoach={() => setCoachOpen(true)}
            onCompareSelect={() => setActiveTab('compare')}
            onBackToDashboard={() => setActiveTab('dashboard')}
          />
        )}

        {activeTab === 'compare' && (
          <IdeaComparison />
        )}

        {activeTab === 'explore' && (
          <ExploreIdeas
            onSelectSampleIdea={(sample) => {
              if (ideas.length > 0) setActiveIdea(ideas[0]);
              setActiveTab('report');
            }}
          />
        )}

        {activeTab === 'admin' && (
          <AdminDashboard />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        initialMode={authMode}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={() => setActiveTab('dashboard')}
      />

      {/* AI Business Coach Chat Drawer */}
      <AiCoachModal
        isOpen={coachOpen}
        idea={activeIdea}
        onClose={() => setCoachOpen(false)}
      />

    </div>
  );
};

export function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <IdeaProvider>
            <MainAppContent />
          </IdeaProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
