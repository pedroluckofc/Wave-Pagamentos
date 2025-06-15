import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Como funciona a liberação instantânea dos pagamentos?',
      answer: 'Nossa tecnologia processa os pagamentos aprovados e libera o valor na sua conta imediatamente, sem necessidade de esperar dias. Funciona 24/7, incluindo finais de semana e feriados.'
    },
    {
      question: 'Quais são as taxas cobradas pela Wave?',
      answer: 'PIX: 1,99% | Cartão de Crédito: 3,99% | Cartão de Débito: 2,49% | Boleto: 2,99%. Não cobramos taxa de setup, mensalidade ou taxa de cancelamento. Você só paga quando vende.'
    },
    {
      question: 'Como funciona o programa de afiliados?',
      answer: 'Você pode recrutar afiliados para promover seus produtos e definir comissões personalizadas. Eles recebem materiais de divulgação, links únicos e dashboard para acompanhar performance. As comissões são pagas automaticamente.'
    },
    {
      question: 'É possível integrar com outras plataformas?',
      answer: 'Sim! Temos integrações nativas com Hotmart, Kiwify, Shopify, WordPress, Eduzz e muitas outras. Também oferecemos API robusta para integrações customizadas.'
    },
    {
      question: 'Como funciona o sistema anti-fraude?',
      answer: 'Utilizamos inteligência artificial para analisar cada transação em tempo real, identificando padrões suspeitos e bloqueando tentativas de fraude antes que causem prejuízo ao seu negócio.'
    },
    {
      question: 'Qual o suporte oferecido?',
      answer: 'Oferecemos suporte 24/7 via chat, email e telefone. Nossa equipe é especializada em pagamentos digitais e está sempre pronta para ajudar com qualquer dúvida ou problema.'
    },
    {
      question: 'Há contrato de permanência?',
      answer: 'Não! Você pode cancelar sua conta a qualquer momento sem multas ou taxas. Acreditamos que a qualidade do nosso serviço é o que deve mantê-lo conosco.'
    },
    {
      question: 'Como recebo os valores das vendas?',
      answer: 'Os valores são depositados automaticamente na sua conta bancária cadastrada. Com a liberação instantânea, você pode receber o dinheiro na hora da aprovação da transação.'
    },
    {
      question: 'É seguro usar a Wave para meu negócio?',
      answer: 'Absolutamente! Somos certificados PCI DSS, utilizamos criptografia de ponta e seguimos todas as normas do Banco Central. Seus dados e dos seus clientes estão totalmente protegidos.'
    },
    {
      question: 'Como começar a usar a plataforma?',
      answer: 'É muito simples! Cadastre-se gratuitamente, configure seus produtos, integre com suas ferramentas e comece a vender. Todo o processo leva menos de 15 minutos.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection animation="fade-up" className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Perguntas 
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Frequentes</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Esclarecemos as principais dúvidas sobre nossa plataforma, taxas, funcionalidades e suporte.
          </p>
        </AnimatedSection>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <AnimatedSection 
              key={index}
              animation="fade-up"
              delay={index * 50}
            >
              <div className="bg-white rounded-xl border border-gray-200 hover:border-blue-200 transition-all duration-300">
                <button
                  className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-50 rounded-xl transition-colors duration-200"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                
                {openIndex === index && (
                  <div className="px-6 pb-6">
                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-gray-700 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* CTA Section */}
        <AnimatedSection animation="scale" delay={300} className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 lg:p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">
              Ainda tem dúvidas?
            </h3>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Nossa equipe de especialistas está pronta para esclarecer qualquer questão 
              e ajudar você a dar os primeiros passos com a Wave.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200">
                Falar com Especialista
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200">
                Agendar Demonstração
              </button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default FAQSection;