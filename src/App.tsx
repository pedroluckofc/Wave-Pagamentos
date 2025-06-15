import React, { useState } from 'react';
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

function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard'>('landing');

  if (currentView === 'dashboard') {
    return <Dashboard />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header onNavigateToDashboard={() => setCurrentView('dashboard')} />
      <HeroSection onNavigateToDashboard={() => setCurrentView('dashboard')} />
      <WhyChooseSection />
      <FeaturesSection />
      <BenefitsSection />
      <TestimonialsSection />
      <DashboardSection onNavigateToDashboard={() => setCurrentView('dashboard')} />
      <FAQSection />
      <Footer />
    </div>
  );
}

export default App;