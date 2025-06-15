import React from 'react';
import { Star, Quote } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Marina Santos',
      role: 'Criadora de Conteúdo Digital',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      content: 'A Wave revolucionou meu negócio! Com a liberação instantânea e taxas baixas, consegui reinvestir muito mais rápido nos meus produtos. Em 6 meses, minha receita aumentou 300%.',
      rating: 5,
      revenue: 'R$ 85k/mês'
    },
    {
      name: 'Carlos Henrique',
      role: 'Coach e Mentor',
      avatar: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      content: 'O dashboard da Wave é simplesmente incrível. Consigo acompanhar tudo em tempo real e tomar decisões mais rápidas. O suporte é excepcional, sempre me ajudam quando preciso.',
      rating: 5,
      revenue: 'R$ 120k/mês'
    },
    {
      name: 'Ana Paula Rodrigues',
      role: 'Afiliada Premium',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      content: 'Como afiliada, a Wave me deu acesso aos melhores produtos do mercado. As comissões chegam na hora e o material de apoio é profissional. Já indiquei para vários colegas.',
      rating: 5,
      revenue: 'R$ 45k/mês'
    },
    {
      name: 'Roberto Silva',
      role: 'Infoprodutor',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      content: 'Migrei de outra plataforma e foi a melhor decisão. A taxa de conversão do checkout da Wave é muito superior. Só no primeiro mês já recuperei o que gastava a mais na antiga plataforma.',
      rating: 5,
      revenue: 'R$ 200k/mês'
    },
    {
      name: 'Juliana Costa',
      role: 'Especialista em Marketing',
      avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      content: 'A integração com minhas ferramentas foi perfeita. Em 15 minutos estava tudo funcionando. A Wave entende as necessidades de quem trabalha com marketing digital sério.',
      rating: 5,
      revenue: 'R$ 95k/mês'
    },
    {
      name: 'Fernando Oliveira',
      role: 'Empreendedor Digital',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
      content: 'O que mais me impressiona na Wave é a tecnologia anti-fraude. Desde que migrei, não tive nenhum problema com chargeback. Isso me dá tranquilidade para focar no crescimento.',
      rating: 5,
      revenue: 'R$ 150k/mês'
    }
  ];

  const stats = [
    { label: 'Satisfação dos clientes', value: '98.7%' },
    { label: 'Tempo médio de suporte', value: '< 2min' },
    { label: 'Uptime da plataforma', value: '99.9%' },
    { label: 'Crescimento médio', value: '+180%' }
  ];

  return (
    <section id="depoimentos" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection animation="fade-up" className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Histórias de 
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">sucesso reais</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Mais de 50.000 empreendedores já transformaram seus negócios com a Wave. 
            Veja alguns resultados impressionantes de nossos clientes.
          </p>
        </AnimatedSection>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <AnimatedSection 
              key={index}
              animation="scale"
              delay={index * 100}
              className="text-center"
            >
              <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </AnimatedSection>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection 
              key={index}
              animation="fade-up"
              delay={index * 100}
            >
              <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="flex items-center mb-6">
                  <Quote className="h-8 w-8 text-blue-500 mr-3" />
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>

                <p className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img 
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-green-600">{testimonial.revenue}</div>
                    <div className="text-xs text-gray-500">receita mensal</div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* CTA Section */}
        <AnimatedSection animation="scale" delay={300} className="mt-16 text-center">
          <div className="bg-white p-8 lg:p-12 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Pronto para ser o próximo caso de sucesso?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Junte-se a milhares de empreendedores que já transformaram seus negócios com a Wave. 
              Comece gratuitamente hoje mesmo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                Criar Conta Grátis
              </button>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold text-lg hover:border-blue-600 hover:text-blue-600 transition-all duration-200">
                Falar com Especialista
              </button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default TestimonialsSection;