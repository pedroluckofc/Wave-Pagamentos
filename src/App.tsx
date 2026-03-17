import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import WhyChooseSection from './components/WhyChooseSection';
import FeaturesSection from './components/FeaturesSection';
import BenefitsSection from './components/BenefitsSection';
import TestimonialsSection from './components/TestimonialsSection';
import DashboardSection from './components/DashboardSection';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';

function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard' | 'signup'>('landing');

  if (currentView === 'dashboard') {
    return (
      <ThemeProvider>
        <Dashboard onNavigateToLanding={() => setCurrentView('landing')} />
      </ThemeProvider>
    );
  }

  if (currentView === 'signup') {
    return (
      <ThemeProvider>
        <Signup onNavigateToLanding={() => setCurrentView('landing')} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Header onNavigateToDashboard={() => setCurrentView('dashboard')} onNavigateToSignup={() => setCurrentView('signup')} />
        <HeroSection onNavigateToDashboard={() => setCurrentView('dashboard')} />
        <WhyChooseSection />
        <FeaturesSection />
        <BenefitsSection />
        <TestimonialsSection />
        <DashboardSection onNavigateToDashboard={() => setCurrentView('dashboard')} />
        <FAQSection />
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;