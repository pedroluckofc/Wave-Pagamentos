import React from 'react';
import { Shield, Zap, Users, TrendingUp, CreditCard, BarChart3 } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const WhyChooseSection = () => {
  const reasons = [
    {
      icon: Shield,
      title: 'Máxima Segurança',
      description: 'Certificação PCI DSS e criptografia de ponta garantem total proteção dos dados.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Zap,
      title: 'Liberação Instantânea',
      description: 'Receba seus pagamentos na hora, sem esperar dias por liberação.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Users,
      title: 'Gestão de Afiliados',
      description: 'Plataforma completa para recrutar, gerenciar e remunerar afiliados.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: TrendingUp,
      title: 'Taxas Competitivas',
      description: 'As menores taxas do mercado, com transparência total e sem pegadinhas.',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: CreditCard,
      title: 'Múltiplos Pagamentos',
      description: 'PIX, cartão, boleto e carteiras digitais em uma única integração.',
      color: 'from-teal-500 to-teal-600'
    },
    {
      icon: BarChart3,
      title: 'Analytics Avançado',
      description: 'Relatórios detalhados e insights para otimizar suas vendas.',
      color: 'from-indigo-500 to-indigo-600'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection animation="fade-up" className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Por que escolher a 
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Wave?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Desenvolvemos a plataforma que todo empreendedor digital precisa para escalar seu negócio 
            de forma rápida, segura e inteligente.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => {
            const IconComponent = reason.icon;
            return (
              <AnimatedSection 
                key={index}
                animation="fade-up"
                delay={index * 100}
              >
                <div className="group p-8 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-200">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${reason.color} mb-6`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                    {reason.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Stats Section */}
        <AnimatedSection animation="scale" delay={300} className="mt-20">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 lg:p-12">
            <div className="grid md:grid-cols-4 gap-8 text-center text-white">
              <div>
                <p className="text-4xl lg:text-5xl font-bold mb-2">99.9%</p>
                <p className="text-blue-100">Uptime garantido</p>
              </div>
              <div>
                <p className="text-4xl lg:text-5xl font-bold mb-2">2.5%</p>
                <p className="text-blue-100">Taxa média</p>
              </div>
              <div>
                <p className="text-4xl lg:text-5xl font-bold mb-2">50k+</p>
                <p className="text-blue-100">Empreendedores</p>
              </div>
              <div>
                <p className="text-4xl lg:text-5xl font-bold mb-2">24/7</p>
                <p className="text-blue-100">Suporte disponível</p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default WhyChooseSection;