import React, { useState } from 'react';
import { 
  Link, CheckCircle, Settings, Plus, ExternalLink, 
  Zap, ShoppingCart, Mail, BarChart3, CreditCard, 
  Globe, Smartphone, Users, FileText, Calendar
} from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: React.ComponentType<any>;
  status: 'connected' | 'available' | 'coming-soon';
  color: string;
  features: string[];
  url?: string;
}

const IntegrationsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const integrations: Integration[] = [
    {
      id: 'hotmart',
      name: 'Hotmart',
      description: 'Integre com a maior plataforma de produtos digitais do Brasil',
      category: 'marketplace',
      icon: Zap,
      status: 'connected',
      color: 'from-orange-500 to-red-500',
      url: 'https://www.hotmart.com',
      features: ['Sincronização automática', 'Gestão de afiliados', 'Relatórios unificados']
    },
    {
      id: 'kiwify',
      name: 'Kiwify',
      description: 'Conecte sua conta Kiwify para gestão centralizada',
      category: 'marketplace',
      icon: ShoppingCart,
      status: 'available',
      color: 'from-green-500 to-teal-500',
      url: 'https://www.kiwify.com.br',
      features: ['Checkout otimizado', 'Gestão de produtos', 'Analytics avançado']
    },
    {
      id: 'shopify',
      name: 'Shopify',
      description: 'Integração completa com sua loja Shopify',
      category: 'ecommerce',
      icon: ShoppingCart,
      status: 'available',
      color: 'from-green-600 to-green-700',
      url: 'https://www.shopify.com',
      features: ['Sincronização de produtos', 'Gestão de pedidos', 'Inventário automático']
    },
    {
      id: 'mailchimp',
      name: 'Mailchimp',
      description: 'Automatize seu email marketing com Mailchimp',
      category: 'marketing',
      icon: Mail,
      status: 'available',
      color: 'from-yellow-500 to-orange-500',
      url: 'https://mailchimp.com',
      features: ['Listas automáticas', 'Campanhas segmentadas', 'Automação de vendas']
    },
    {
      id: 'google-analytics',
      name: 'Google Analytics',
      description: 'Acompanhe métricas detalhadas com Google Analytics',
      category: 'analytics',
      icon: BarChart3,
      status: 'connected',
      color: 'from-blue-500 to-indigo-500',
      url: 'https://analytics.google.com',
      features: ['Tracking avançado', 'Conversões', 'Relatórios personalizados']
    },
    {
      id: 'stripe',
      name: 'Stripe',
      description: 'Processamento de pagamentos internacional',
      category: 'payment',
      icon: CreditCard,
      status: 'available',
      color: 'from-purple-500 to-indigo-500',
      url: 'https://stripe.com',
      features: ['Pagamentos globais', 'Múltiplas moedas', 'Checkout seguro']
    },
    {
      id: 'wordpress',
      name: 'WordPress',
      description: 'Plugin oficial para sites WordPress',
      category: 'cms',
      icon: Globe,
      status: 'available',
      color: 'from-blue-600 to-blue-700',
      url: 'https://wordpress.org',
      features: ['Plugin nativo', 'Shortcodes', 'Widgets personalizados']
    },
    {
      id: 'zapier',
      name: 'Zapier',
      description: 'Conecte com mais de 5000 aplicações',
      category: 'automation',
      icon: Zap,
      status: 'available',
      color: 'from-orange-400 to-orange-600',
      url: 'https://zapier.com',
      features: ['Automações ilimitadas', '5000+ apps', 'Workflows personalizados']
    },
    {
      id: 'whatsapp-business',
      name: 'WhatsApp Business',
      description: 'Notificações e suporte via WhatsApp',
      category: 'communication',
      icon: Smartphone,
      status: 'coming-soon',
      color: 'from-green-400 to-green-600',
      url: 'https://www.whatsapp.com/business',
      features: ['Notificações automáticas', 'Suporte integrado', 'Campanhas direcionadas']
    },
    {
      id: 'discord',
      name: 'Discord',
      description: 'Integração com servidores Discord',
      category: 'communication',
      icon: Users,
      status: 'coming-soon',
      color: 'from-indigo-500 to-purple-500',
      url: 'https://discord.com',
      features: ['Acesso automático', 'Roles por produto', 'Notificações de vendas']
    },
    {
      id: 'notion',
      name: 'Notion',
      description: 'Sincronize dados com seu workspace Notion',
      category: 'productivity',
      icon: FileText,
      status: 'coming-soon',
      color: 'from-gray-600 to-gray-700',
      url: 'https://www.notion.so',
      features: ['Databases automáticos', 'Relatórios dinâmicos', 'Templates prontos']
    },
    {
      id: 'calendly',
      name: 'Calendly',
      description: 'Agendamentos automáticos pós-venda',
      category: 'productivity',
      icon: Calendar,
      status: 'available',
      color: 'from-blue-400 to-blue-600',
      url: 'https://calendly.com',
      features: ['Agendamento automático', 'Lembretes por email', 'Integração com calendários']
    }
  ];

  const categories = [
    { id: 'all', name: 'Todas', count: integrations.length },
    { id: 'marketplace', name: 'Marketplaces', count: integrations.filter(i => i.category === 'marketplace').length },
    { id: 'ecommerce', name: 'E-commerce', count: integrations.filter(i => i.category === 'ecommerce').length },
    { id: 'marketing', name: 'Marketing', count: integrations.filter(i => i.category === 'marketing').length },
    { id: 'analytics', name: 'Analytics', count: integrations.filter(i => i.category === 'analytics').length },
    { id: 'payment', name: 'Pagamentos', count: integrations.filter(i => i.category === 'payment').length },
    { id: 'communication', name: 'Comunicação', count: integrations.filter(i => i.category === 'communication').length },
    { id: 'productivity', name: 'Produtividade', count: integrations.filter(i => i.category === 'productivity').length },
    { id: 'automation', name: 'Automação', count: integrations.filter(i => i.category === 'automation').length },
    { id: 'cms', name: 'CMS', count: integrations.filter(i => i.category === 'cms').length }
  ];

  const filteredIntegrations = integrations.filter(integration => {
    const matchesCategory = selectedCategory === 'all' || integration.category === selectedCategory;
    const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
            <CheckCircle className="h-3 w-3 mr-1" />
            Conectado
          </span>
        );
      case 'available':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
            <Plus className="h-3 w-3 mr-1" />
            Disponível
          </span>
        );
      case 'coming-soon':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400">
            Em Breve
          </span>
        );
      default:
        return null;
    }
  };

  const handleConnect = (integration: Integration) => {
    if (integration.url) {
      window.open(integration.url, '_blank');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Integrações</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Conecte suas ferramentas favoritas para automatizar seu negócio
          </p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
          <Plus className="h-4 w-4" />
          <span>Solicitar Integração</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Buscar integrações..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors duration-300"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Integrações Ativas</h3>
          <p className="text-3xl font-bold text-green-600">
            {integrations.filter(i => i.status === 'connected').length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Disponíveis</h3>
          <p className="text-3xl font-bold text-blue-600">
            {integrations.filter(i => i.status === 'available').length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Em Desenvolvimento</h3>
          <p className="text-3xl font-bold text-purple-600">
            {integrations.filter(i => i.status === 'coming-soon').length}
          </p>
        </div>
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIntegrations.map((integration) => {
          const IconComponent = integration.icon;
          return (
            <div
              key={integration.id}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${integration.color}`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">{integration.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                      {integration.category}
                    </p>
                  </div>
                </div>
                {getStatusBadge(integration.status)}
              </div>

              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                {integration.description}
              </p>

              <div className="space-y-2 mb-4">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">Recursos:</h4>
                <ul className="space-y-1">
                  {integration.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                      <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center space-x-2">
                {integration.status === 'connected' ? (
                  <>
                    <button
                      onClick={() => handleConnect(integration)}
                      className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 text-sm font-medium transition-colors duration-300"
                    >
                      <Settings className="h-4 w-4 inline mr-2" />
                      Configurar
                    </button>
                    <button
                      onClick={() => handleConnect(integration)}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors duration-300"
                      title={`Abrir ${integration.name}`}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </button>
                  </>
                ) : integration.status === 'available' ? (
                  <button
                    onClick={() => handleConnect(integration)}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors duration-300"
                  >
                    Conectar
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-lg text-sm font-medium cursor-not-allowed"
                  >
                    Em Breve
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filteredIntegrations.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Link className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Nenhuma integração encontrada
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Tente ajustar os filtros ou termo de busca
          </p>
        </div>
      )}
    </div>
  );
};

export default IntegrationsPage;