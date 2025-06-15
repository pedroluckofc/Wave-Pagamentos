import React from 'react';
import { Monitor, Smartphone, BarChart3, Users, DollarSign, TrendingUp } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

interface DashboardSectionProps {
  onNavigateToDashboard?: () => void;
}

const DashboardSection: React.FC<DashboardSectionProps> = ({ onNavigateToDashboard }) => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection animation="fade-up" className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Dashboard que 
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">simplifica sua gestão</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Interface intuitiva e poderosa para acompanhar vendas, gerenciar afiliados e otimizar seus resultados em tempo real.
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Dashboard Preview */}
          <AnimatedSection animation="slide-right" delay={200}>
            <div className="relative">
              <div className="bg-gray-900 rounded-2xl p-6 shadow-2xl">
                {/* Browser Header */}
                <div className="flex items-center space-x-2 mb-6">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <div className="ml-4 bg-gray-800 rounded px-3 py-1 text-xs text-gray-300">
                    dashboard.wavepagamentos.com
                  </div>
                </div>

                {/* Dashboard Content */}
                <div className="bg-white rounded-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900">Visão Geral</h3>
                    <div className="text-sm text-gray-500">Últimas 24h</div>
                  </div>

                  {/* Metrics Cards */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-lg text-white">
                      <div className="flex items-center justify-between mb-2">
                        <DollarSign className="h-5 w-5" />
                        <span className="text-xs bg-white/20 px-2 py-1 rounded">+12%</span>
                      </div>
                      <p className="text-sm opacity-90">Receita Hoje</p>
                      <p className="text-2xl font-bold">R$ 24.587</p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-lg text-white">
                      <div className="flex items-center justify-between mb-2">
                        <TrendingUp className="h-5 w-5" />
                        <span className="text-xs bg-white/20 px-2 py-1 rounded">+8%</span>
                      </div>
                      <p className="text-sm opacity-90">Vendas</p>
                      <p className="text-2xl font-bold">127</p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-lg text-white">
                      <div className="flex items-center justify-between mb-2">
                        <Users className="h-5 w-5" />
                        <span className="text-xs bg-white/20 px-2 py-1 rounded">+15%</span>
                      </div>
                      <p className="text-sm opacity-90">Afiliados Ativos</p>
                      <p className="text-2xl font-bold">89</p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 rounded-lg text-white">
                      <div className="flex items-center justify-between mb-2">
                        <BarChart3 className="h-5 w-5" />
                        <span className="text-xs bg-white/20 px-2 py-1 rounded">+5%</span>
                      </div>
                      <p className="text-sm opacity-90">Conversão</p>
                      <p className="text-2xl font-bold">7.2%</p>
                    </div>
                  </div>

                  {/* Recent Sales */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Vendas Recentes</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-sm font-medium">Curso Marketing Digital</span>
                        </div>
                        <span className="text-sm font-semibold text-green-600">+R$ 497</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-sm font-medium">E-book Vendas</span>
                        </div>
                        <span className="text-sm font-semibold text-green-600">+R$ 97</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-sm font-medium">Mentoria Premium</span>
                        </div>
                        <span className="text-sm font-semibold text-green-600">+R$ 1.997</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-green-500 text-white p-3 rounded-lg shadow-lg animate-bounce">
                <p className="text-xs font-semibold">Tempo Real ⚡</p>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-blue-500 text-white p-3 rounded-lg shadow-lg animate-pulse">
                <p className="text-xs font-semibold">100% Online 🌐</p>
              </div>
            </div>
          </AnimatedSection>

          {/* Features List */}
          <div className="space-y-8">
            <AnimatedSection animation="slide-left" delay={100}>
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  Tudo que você precisa em um só lugar
                </h3>
                <p className="text-lg text-gray-600 mb-8">
                  Dashboard completo com métricas em tempo real, relatórios avançados e ferramentas 
                  para otimizar suas vendas e gerenciar sua rede de afiliados.
                </p>
              </div>
            </AnimatedSection>

            <div className="space-y-6">
              {[
                {
                  icon: BarChart3,
                  title: 'Analytics Avançado',
                  description: 'Relatórios detalhados com insights acionáveis para otimizar suas campanhas e aumentar conversões.',
                  color: 'from-blue-500 to-blue-600'
                },
                {
                  icon: Users,
                  title: 'Gestão de Afiliados',
                  description: 'Painel completo para recrutar, gerenciar comissões e acompanhar performance de afiliados.',
                  color: 'from-green-500 to-green-600'
                },
                {
                  icon: Monitor,
                  title: 'Interface Responsiva',
                  description: 'Acesse seu dashboard de qualquer dispositivo com interface otimizada para desktop e mobile.',
                  color: 'from-purple-500 to-purple-600'
                },
                {
                  icon: Smartphone,
                  title: 'App Mobile',
                  description: 'Gerencie suas vendas e acompanhe métricas importantes diretamente do seu smartphone.',
                  color: 'from-orange-500 to-orange-600'
                }
              ].map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <AnimatedSection 
                    key={index}
                    animation="slide-left"
                    delay={200 + (index * 100)}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className={`p-3 bg-gradient-to-r ${feature.color} rounded-lg`}>
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h4>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>

            <AnimatedSection animation="scale" delay={600}>
              <div className="pt-6">
                <button 
                  onClick={onNavigateToDashboard}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  Explorar Dashboard
                </button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardSection;