import React, { useState, useEffect } from 'react';
import { Menu, X, Zap, Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface HeaderProps {
  onNavigateToDashboard?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigateToDashboard }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { name: 'Funcionalidades', href: '#funcionalidades' },
    { name: 'Benefícios', href: '#beneficios' },
    { name: 'Depoimentos', href: '#depoimentos' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Wave Pagamentos
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              aria-label="Alternar tema"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button 
              onClick={onNavigateToDashboard}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200"
            >
              Dashboard
            </button>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200">
              Criar Conta Grátis
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6 dark:text-white" /> : <Menu className="h-6 w-6 dark:text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-gray-900 border-t shadow-lg">
          <div className="px-4 py-6 space-y-4">
            {navigationItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium py-2 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="pt-4 space-y-3">
              <button
                onClick={toggleTheme}
                className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 font-medium py-2"
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                <span>{isDark ? 'Tema Claro' : 'Tema Escuro'}</span>
              </button>
              <button 
                onClick={() => {
                  onNavigateToDashboard?.();
                  setIsMenuOpen(false);
                }}
                className="w-full text-left text-gray-700 dark:text-gray-300 font-medium py-2"
              >
                Dashboard
              </button>
              <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold">
                Criar Conta Grátis
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;