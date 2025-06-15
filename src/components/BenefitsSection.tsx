import React from 'react';
import { Users, TrendingUp, DollarSign, Target, Zap, Award } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const BenefitsSection = () => {
  const producerBenefits = [
    {
      icon: DollarSign,
      title: 'Maximize sua receita',
      description: 'Taxas reduzidas e liberação instantânea aumentam seu fluxo de caixa.'
    },
    {
      icon: TrendingUp,
      title: 'Escale rapidamente',
      description: 'Ferramentas automatizadas para crescer sem aumentar complexidade.'
    },
    {
      icon: Target,
      title: 'Foque no que importa',
      description: 'Deixe a tecnologia cuidar dos pagamentos enquanto você vende mais.'
    }
  ];

  const affiliateBenefits = [
    {
      icon: Users,
      title: 'Rede qualificada',
      description: 'Acesso a milhares de produtos digitais de alta conversão.'
    },
    {
      icon: Zap,
      title: 'Comissões rápidas',
      description: 'Receba suas comissões na mesma hora da confirmação da venda.'
    },
    {
      icon: Award,
      title: 'Ferramentas pro',
      description: 'Dashboard exclusivo com métricas e materiais de divulgação.'
    }
  ];

  return (
    <section id="beneficios" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection animation="fade-up" className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Benefícios para 
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">produtores</span>
            {' '}e{' '}
            <span className="bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">afiliados</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Criamos uma plataforma que beneficia todos os participantes do ecossistema digital, 
            promovendo crescimento sustentável para produtores e afiliados.
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Produtores */}
          <div className="space-y-8">
            <AnimatedSection animation="slide-right" delay={100}>
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
                  📈 Para Produtores
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Transforme conhecimento em receita recorrente
                </h3>
                <p className="text-lg text-gray-600">
                  Nossa plataforma oferece tudo que você precisa para monetizar seu conhecimento 
                  e criar um negócio digital de sucesso.
                </p>
              </div>
            </AnimatedSection>

            <div className="space-y-6">
              {producerBenefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <AnimatedSection 
                    key={index}
                    animation="slide-right"
                    delay={200 + (index * 100)}
                  >
                    <div className="flex items-start space-x-4 p-6 bg-blue-50 rounded-xl">
                      <div className="flex-shrink-0">
                        <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h4>
                        <p className="text-gray-600">{benefit.description}</p>
                      </div>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>

            <AnimatedSection animation="scale" delay={500}>
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 rounded-2xl text-white">
                <h4 className="text-2xl font-bold mb-4">Programa Produtor Pro</h4>
                <p className="mb-6 opacity-90">
                  Junte-se ao programa exclusivo para grandes produtores e tenha acesso a 
                  benefícios especiais, taxas preferenciais e suporte prioritário.
                </p>
                <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200">
                  Saiba Mais
                </button>
              </div>
            </AnimatedSection>
          </div>

          {/* Afiliados */}
          <div className="space-y-8">
            <AnimatedSection animation="slide-left" delay={100}>
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
                  🤝 Para Afiliados
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Monetize sua audiência com produtos de qualidade
                </h3>
                <p className="text-lg text-gray-600">
                  Encontre os melhores produtos para promover e construa uma renda recorrente 
                  com nossa rede de afiliados premium.
                </p>
              </div>
            </AnimatedSection>

            <div className="space-y-6">
              {affiliateBenefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <AnimatedSection 
                    key={index}
                    animation="slide-left"
                    delay={200 + (index * 100)}
                  >
                    <div className="flex items-start space-x-4 p-6 bg-green-50 rounded-xl">
                      <div className="flex-shrink-0">
                        <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-lg">
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h4>
                        <p className="text-gray-600">{benefit.description}</p>
                      </div>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>

            <AnimatedSection animation="scale" delay={500}>
              <div className="bg-gradient-to-r from-green-600 to-teal-600 p-8 rounded-2xl text-white">
                <h4 className="text-2xl font-bold mb-4">Elite Affiliates</h4>
                <p className="mb-6 opacity-90">
                  Programa exclusivo para afiliados de alto desempenho com comissões diferenciadas, 
                  treinamentos exclusivos e suporte dedicado.
                </p>
                <button className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors duration-200">
                  Candidatar-se
                </button>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Comparison Table */}
        <AnimatedSection animation="fade-up" delay={300} className="mt-20">
          <div className="bg-gray-50 rounded-2xl p-8 lg:p-12">
            <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">
              Compare a Wave com outras plataformas
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Recursos</th>
                    <th className="text-center py-4 px-6 font-semibold text-blue-600">Wave</th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-600">Hotmart</th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-600">Kiwify</th>
                    <th className="text-center py-4 px-6 font-semibold text-gray-600">Eduzz</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="py-4 px-6 font-medium text-gray-900">Taxa PIX</td>
                    <td className="py-4 px-6 text-center font-semibold text-green-600">1,99%</td>
                    <td className="py-4 px-6 text-center text-gray-600">2,99%</td>
                    <td className="py-4 px-6 text-center text-gray-600">2,49%</td>
                    <td className="py-4 px-6 text-center text-gray-600">3,49%</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-medium text-gray-900">Liberação</td>
                    <td className="py-4 px-6 text-center font-semibold text-green-600">Instantânea</td>
                    <td className="py-4 px-6 text-center text-gray-600">D+2</td>
                    <td className="py-4 px-6 text-center text-gray-600">D+1</td>
                    <td className="py-4 px-6 text-center text-gray-600">D+7</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-medium text-gray-900">Anti-fraude IA</td>
                    <td className="py-4 px-6 text-center font-semibold text-green-600">✓</td>
                    <td className="py-4 px-6 text-center text-gray-600">✗</td>
                    <td className="py-4 px-6 text-center text-gray-600">✗</td>
                    <td className="py-4 px-6 text-center text-gray-600">✗</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-medium text-gray-900">Suporte 24/7</td>
                    <td className="py-4 px-6 text-center font-semibold text-green-600">✓</td>
                    <td className="py-4 px-6 text-center text-gray-600">✗</td>
                    <td className="py-4 px-6 text-center text-gray-600">✗</td>
                    <td className="py-4 px-6 text-center text-gray-600">✗</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default BenefitsSection;