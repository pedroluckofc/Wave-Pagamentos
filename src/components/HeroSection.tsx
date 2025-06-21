import React from 'react';
import { ArrowRight, Play, CheckCircle } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

interface HeroSectionProps {
  onNavigateToDashboard?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onNavigateToDashboard }) => {
  const benefits = [
    'Zero taxas de setup',
    'Liberação instantânea',
    'Suporte 24/7',
    'Área de afiliados integrada'
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 pt-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <AnimatedSection animation="fade-up" delay={100}>
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium mb-6">
                🚀 Nova era dos pagamentos digitais
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="fade-up" delay={200}>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                A plataforma de pagamentos que{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                  faz sua receita decolar
                </span>
              </h1>
            </AnimatedSection>
            
            <AnimatedSection animation="fade-up" delay={300}>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
                Processe pagamentos, gerencie afiliados e escale seu negócio digital com a tecnologia mais avançada do mercado.{' '}
                Sem burocracias, sem complicações.
              </p>
            </AnimatedSection>

            {/* Benefits List */}
            <AnimatedSection animation="fade-up" delay={400}>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            {/* CTA Buttons */}
            <AnimatedSection animation="fade-up" delay={500}>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center">
                  Começar Gratuitamente
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
                
                <button 
                  onClick={onNavigateToDashboard}
                  className="group flex items-center justify-center px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold text-lg hover:border-blue-600 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 transition-all duration-200"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Ver Dashboard
                </button>
              </div>
            </AnimatedSection>

            {/* Trust Indicators */}
            <AnimatedSection animation="fade-up" delay={600}>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <p>Mais de <span className="font-bold text-blue-600">50.000</span> empreendedores já confiam na Wave</p>
              </div>
            </AnimatedSection>
          </div>

          {/* Visual */}
          <AnimatedSection animation="scale" delay={400}>
            <div className="relative">
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 lg:p-8 border border-gray-200 dark:border-gray-700">
                {/* Dashboard Preview */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Dashboard Wave</h3>
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-lg text-white">
                      <p className="text-sm opacity-90">Vendas Hoje</p>
                      <p className="text-2xl font-bold">R$ 12.547</p>
                    </div>
                    <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-lg text-white">
                      <p className="text-sm opacity-90">Conversões</p>
                      <p className="text-2xl font-bold">89,3%</p>
                    </div>
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-lg text-white">
                      <p className="text-sm opacity-90">Afiliados</p>
                      <p className="text-2xl font-bold">1.247</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-sm font-medium dark:text-white">Produto Digital #1</span>
                      <span className="text-green-600 font-semibold">+R$ 2.890</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-sm font-medium dark:text-white">Curso Online Premium</span>
                      <span className="text-green-600 font-semibold">+R$ 1.650</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-sm font-medium dark:text-white">E-book Estratégias</span>
                      <span className="text-green-600 font-semibold">+R$ 890</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-green-500 text-white p-3 rounded-lg shadow-lg animate-bounce">
                <p className="text-xs font-semibold">100% Aprovado!</p>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-blue-500 text-white p-3 rounded-lg shadow-lg animate-pulse">
                <p className="text-xs font-semibold">Tempo Real</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;