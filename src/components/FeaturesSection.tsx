import React from 'react';
import { 
  CreditCard, Shield, Users, BarChart3, Link, Smartphone,
  Globe, Headphones, Zap, Settings, FileText, Trophy
} from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const FeaturesSection = () => {
  const features = [
    {
      icon: CreditCard,
      title: 'Gateway Completo',
      description: 'PIX, cartões, boleto e carteiras digitais com aprovação instantânea.',
      category: 'Pagamentos'
    },
    {
      icon: Users,
      title: 'Rede de Afiliados',
      description: 'Recrute, gerencie e remunere automaticamente seus parceiros.',
      category: 'Afiliados'
    },
    {
      icon: BarChart3,
      title: 'Dashboard Inteligente',
      description: 'Métricas em tempo real com insights para otimizar conversões.',
      category: 'Analytics'
    },
    {
      icon: Shield,
      title: 'Anti-fraude IA',
      description: 'Inteligência artificial previne fraudes e chargebacks.',
      category: 'Segurança'
    },
    {
      icon: Link,
      title: 'API Flexível',
      description: 'Integre facilmente com Hotmart, Kiwify, Shopify e muito mais.',
      category: 'Integração'
    },
    {
      icon: Smartphone,
      title: 'App Mobile',
      description: 'Gerencie vendas e afiliados direto do seu smartphone.',
      category: 'Mobile'
    },
    {
      icon: Globe,
      title: 'Multi-idiomas',
      description: 'Atenda clientes globais com checkout em vários idiomas.',
      category: 'Global'
    },
    {
      icon: Zap,
      title: 'Checkout Otimizado',
      description: 'Taxa de conversão até 40% superior com nosso checkout.',
      category: 'Conversão'
    },
    {
      icon: FileText,
      title: 'Relatórios Avançados',
      description: 'Exportação automática para contabilidade e análises.',
      category: 'Relatórios'
    },
    {
      icon: Settings,
      title: 'Automações',
      description: 'Fluxos automáticos de vendas, reembolsos e comissionamento.',
      category: 'Automação'
    },
    {
      icon: Headphones,
      title: 'Suporte Premium',
      description: 'Atendimento humanizado 24/7 com especialistas.',
      category: 'Suporte'
    },
    {
      icon: Trophy,
      title: 'Programa VIP',
      description: 'Benefícios exclusivos para grandes volumes de vendas.',
      category: 'Premium'
    }
  ];

  const integrations = [
    { name: 'Hotmart', logo: '🔥' },
    { name: 'Kiwify', logo: '🥝' },
    { name: 'Eduzz', logo: '📚' },
    { name: 'Shopify', logo: '🛍️' },
    { name: 'WordPress', logo: '📝' },
    { name: 'Stripe', logo: '💳' }
  ];

  return (
    <section id="funcionalidades" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection animation="fade-up" className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Funcionalidades que 
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> impulsionam vendas</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tudo que você precisa para processar pagamentos, gerenciar afiliados e escalar seu negócio digital 
            está reunido em uma única plataforma.
          </p>
        </AnimatedSection>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <AnimatedSection 
                key={index}
                animation="fade-up"
                delay={index * 50}
              >
                <div className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                          {feature.title}
                        </h3>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
                          {feature.category}
                        </span>
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Integrations */}
        <AnimatedSection animation="scale" delay={200}>
          <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-sm border border-gray-100">
            <div className="text-center mb-10">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Integração com suas plataformas favoritas
              </h3>
              <p className="text-lg text-gray-600">
                Conecte a Wave com as principais ferramentas do mercado em poucos cliques
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {integrations.map((integration, index) => (
                <AnimatedSection 
                  key={index}
                  animation="fade-up"
                  delay={index * 100}
                >
                  <div className="group text-center p-6 bg-gray-50 rounded-xl hover:bg-blue-50 transition-all duration-300 cursor-pointer">
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                      {integration.logo}
                    </div>
                    <p className="font-semibold text-gray-700 group-hover:text-blue-600 transition-colors duration-300">
                      {integration.name}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            <div className="text-center mt-8">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                Ver Todas as Integrações
              </button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default FeaturesSection;