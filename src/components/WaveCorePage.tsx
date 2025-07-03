import React, { useState } from 'react';
import { 
  Plus, Play, Pause, Settings, Eye, Edit, Trash2, Copy, 
  BarChart3, Users, DollarSign, TrendingUp, ArrowRight,
  MessageCircle, Mail, Phone, Calendar, Zap, Target,
  Layers, GitBranch, Clock, CheckCircle, AlertCircle,
  Filter, Search, Download, Upload, Share2, Save
} from 'lucide-react';
import FunnelBuilderModal from './FunnelBuilderModal';
import ConversationFlowModal from './ConversationFlowModal';

interface Funnel {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'paused' | 'draft';
  type: 'sales' | 'lead' | 'webinar' | 'product';
  visitors: number;
  conversions: number;
  revenue: number;
  conversionRate: number;
  createdAt: Date;
  steps: FunnelStep[];
}

interface FunnelStep {
  id: string;
  name: string;
  type: 'landing' | 'checkout' | 'upsell' | 'downsell' | 'thankyou' | 'email' | 'sms' | 'wait';
  visitors: number;
  conversions: number;
  conversionRate: number;
  settings?: {
    title?: string;
    description?: string;
    price?: number;
    delay?: number;
    template?: string;
  };
}

interface ConversationFlow {
  id: string;
  name: string;
  description: string;
  platform: 'whatsapp' | 'telegram' | 'messenger' | 'email' | 'sms';
  status: 'active' | 'paused' | 'draft';
  triggers: string[];
  messages: number;
  conversions: number;
  createdAt: Date;
  flowMessages?: any[];
}

const WaveCorePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('funnels');
  const [selectedFunnel, setSelectedFunnel] = useState<Funnel | null>(null);
  const [selectedFlow, setSelectedFlow] = useState<ConversationFlow | null>(null);
  const [isFunnelBuilderOpen, setIsFunnelBuilderOpen] = useState(false);
  const [isFlowBuilderOpen, setIsFlowBuilderOpen] = useState(false);
  const [funnelModalMode, setFunnelModalMode] = useState<'create' | 'edit'>('create');
  const [flowModalMode, setFlowModalMode] = useState<'create' | 'edit'>('create');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const [funnels, setFunnels] = useState<Funnel[]>([
    {
      id: '1',
      name: 'Funil Curso Marketing Digital',
      description: 'Funil completo para venda do curso de marketing digital',
      status: 'active',
      type: 'sales',
      visitors: 2847,
      conversions: 156,
      revenue: 77532,
      conversionRate: 5.48,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15),
      steps: [
        { id: '1', name: 'Landing Page', type: 'landing', visitors: 2847, conversions: 1423, conversionRate: 50.0 },
        { id: '2', name: 'Checkout', type: 'checkout', visitors: 1423, conversions: 156, conversionRate: 11.0 },
        { id: '3', name: 'Upsell Premium', type: 'upsell', visitors: 156, conversions: 47, conversionRate: 30.1 },
        { id: '4', name: 'Página de Obrigado', type: 'thankyou', visitors: 156, conversions: 156, conversionRate: 100.0 }
      ]
    },
    {
      id: '2',
      name: 'Captura de Leads E-book',
      description: 'Funil de captura para e-book gratuito',
      status: 'active',
      type: 'lead',
      visitors: 5234,
      conversions: 892,
      revenue: 0,
      conversionRate: 17.05,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8),
      steps: [
        { id: '1', name: 'Landing Page', type: 'landing', visitors: 5234, conversions: 892, conversionRate: 17.05 },
        { id: '2', name: 'Página de Obrigado', type: 'thankyou', visitors: 892, conversions: 892, conversionRate: 100.0 }
      ]
    },
    {
      id: '3',
      name: 'Webinar Vendas Avançadas',
      description: 'Funil para webinar de vendas com oferta especial',
      status: 'paused',
      type: 'webinar',
      visitors: 1456,
      conversions: 89,
      revenue: 178300,
      conversionRate: 6.11,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
      steps: [
        { id: '1', name: 'Inscrição Webinar', type: 'landing', visitors: 1456, conversions: 456, conversionRate: 31.3 },
        { id: '2', name: 'Página do Webinar', type: 'landing', visitors: 456, conversions: 234, conversionRate: 51.3 },
        { id: '3', name: 'Oferta Especial', type: 'checkout', visitors: 234, conversions: 89, conversionRate: 38.0 }
      ]
    }
  ]);

  const [conversationFlows, setConversationFlows] = useState<ConversationFlow[]>([
    {
      id: '1',
      name: 'Boas-vindas WhatsApp',
      description: 'Fluxo de boas-vindas para novos leads no WhatsApp',
      platform: 'whatsapp',
      status: 'active',
      triggers: ['palavra-chave: oi', 'palavra-chave: olá', 'primeiro contato'],
      messages: 1247,
      conversions: 89,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
      flowMessages: []
    },
    {
      id: '2',
      name: 'Sequência Email Marketing',
      description: 'Sequência de 7 emails para nutrição de leads',
      platform: 'email',
      status: 'active',
      triggers: ['download e-book', 'inscrição newsletter'],
      messages: 3456,
      conversions: 234,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20),
      flowMessages: []
    },
    {
      id: '3',
      name: 'Recuperação Carrinho',
      description: 'Fluxo para recuperar carrinhos abandonados',
      platform: 'email',
      status: 'active',
      triggers: ['carrinho abandonado'],
      messages: 567,
      conversions: 123,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
      flowMessages: []
    }
  ]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
      case 'paused': return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30';
      case 'draft': return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Play className="h-4 w-4" />;
      case 'paused': return <Pause className="h-4 w-4" />;
      case 'draft': return <Edit className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'sales': return <DollarSign className="h-5 w-5" />;
      case 'lead': return <Users className="h-5 w-5" />;
      case 'webinar': return <Play className="h-5 w-5" />;
      case 'product': return <Target className="h-5 w-5" />;
      default: return <Layers className="h-5 w-5" />;
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'whatsapp': return <MessageCircle className="h-5 w-5 text-green-600" />;
      case 'telegram': return <MessageCircle className="h-5 w-5 text-blue-600" />;
      case 'messenger': return <MessageCircle className="h-5 w-5 text-purple-600" />;
      case 'email': return <Mail className="h-5 w-5 text-red-600" />;
      case 'sms': return <Phone className="h-5 w-5 text-orange-600" />;
      default: return <MessageCircle className="h-5 w-5" />;
    }
  };

  const filteredFunnels = funnels.filter(funnel => {
    const matchesSearch = funnel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         funnel.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || funnel.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const filteredFlows = conversationFlows.filter(flow => {
    const matchesSearch = flow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         flow.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || flow.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Funnel Actions
  const handleCreateFunnel = () => {
    setSelectedFunnel(null);
    setFunnelModalMode('create');
    setIsFunnelBuilderOpen(true);
  };

  const handleEditFunnel = (funnel: Funnel) => {
    setSelectedFunnel(funnel);
    setFunnelModalMode('edit');
    setIsFunnelBuilderOpen(true);
  };

  const handleSaveFunnel = (funnelData: Funnel) => {
    if (funnelModalMode === 'create') {
      setFunnels(prev => [...prev, funnelData]);
    } else {
      setFunnels(prev => prev.map(f => f.id === funnelData.id ? funnelData : f));
    }
  };

  const handleDuplicateFunnel = (funnel: Funnel) => {
    const duplicatedFunnel: Funnel = {
      ...funnel,
      id: Date.now().toString(),
      name: `${funnel.name} (Cópia)`,
      status: 'draft',
      visitors: 0,
      conversions: 0,
      revenue: 0,
      conversionRate: 0,
      createdAt: new Date()
    };
    setFunnels(prev => [...prev, duplicatedFunnel]);
  };

  const handleDeleteFunnel = (funnelId: string) => {
    if (confirm('Tem certeza que deseja excluir este funil?')) {
      setFunnels(prev => prev.filter(f => f.id !== funnelId));
    }
  };

  const handleToggleFunnelStatus = (funnelId: string) => {
    setFunnels(prev => prev.map(f => 
      f.id === funnelId 
        ? { ...f, status: f.status === 'active' ? 'paused' : 'active' as any }
        : f
    ));
  };

  // Flow Actions
  const handleCreateFlow = () => {
    setSelectedFlow(null);
    setFlowModalMode('create');
    setIsFlowBuilderOpen(true);
  };

  const handleEditFlow = (flow: ConversationFlow) => {
    setSelectedFlow(flow);
    setFlowModalMode('edit');
    setIsFlowBuilderOpen(true);
  };

  const handleSaveFlow = (flowData: ConversationFlow) => {
    if (flowModalMode === 'create') {
      setConversationFlows(prev => [...prev, flowData]);
    } else {
      setConversationFlows(prev => prev.map(f => f.id === flowData.id ? flowData : f));
    }
  };

  const handleDuplicateFlow = (flow: ConversationFlow) => {
    const duplicatedFlow: ConversationFlow = {
      ...flow,
      id: Date.now().toString(),
      name: `${flow.name} (Cópia)`,
      status: 'draft',
      messages: 0,
      conversions: 0,
      createdAt: new Date()
    };
    setConversationFlows(prev => [...prev, duplicatedFlow]);
  };

  const handleDeleteFlow = (flowId: string) => {
    if (confirm('Tem certeza que deseja excluir este fluxo?')) {
      setConversationFlows(prev => prev.filter(f => f.id !== flowId));
    }
  };

  const handleToggleFlowStatus = (flowId: string) => {
    setConversationFlows(prev => prev.map(f => 
      f.id === flowId 
        ? { ...f, status: f.status === 'active' ? 'paused' : 'active' as any }
        : f
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">WaveCore™</h2>
            <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400 rounded-full text-sm font-medium">
              Sistema de Funis
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Crie funis de vendas e fluxos de conversa de alta conversão
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-white transition-colors duration-300">
            <Upload className="h-4 w-4" />
            <span>Importar</span>
          </button>
          <button 
            onClick={activeTab === 'funnels' ? handleCreateFunnel : handleCreateFlow}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
          >
            <Plus className="h-4 w-4" />
            <span>{activeTab === 'funnels' ? 'Novo Funil' : 'Novo Fluxo'}</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-500">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Layers className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Funis Ativos</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {funnels.filter(f => f.status === 'active').length}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            +2 este mês
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-500">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Visitantes</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {funnels.reduce((sum, f) => sum + f.visitors, 0).toLocaleString()}
          </p>
          <p className="text-sm text-green-600 dark:text-green-400 mt-1">
            +12% vs mês anterior
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-500">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Conversões</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {funnels.reduce((sum, f) => sum + f.conversions, 0).toLocaleString()}
          </p>
          <p className="text-sm text-purple-600 dark:text-purple-400 mt-1">
            +8% vs mês anterior
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-500">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <DollarSign className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Receita</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatCurrency(funnels.reduce((sum, f) => sum + f.revenue, 0))}
          </p>
          <p className="text-sm text-orange-600 dark:text-orange-400 mt-1">
            +15% vs mês anterior
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8">
          {[
            { id: 'funnels', label: 'Funis de Vendas', icon: Layers },
            { id: 'flows', label: 'Fluxos de Conversa', icon: MessageCircle },
            { id: 'templates', label: 'Templates', icon: Copy },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-300 ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder={`Buscar ${activeTab === 'funnels' ? 'funis' : 'fluxos'}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors duration-300"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors duration-300"
          >
            <option value="all">Todos os Status</option>
            <option value="active">Ativo</option>
            <option value="paused">Pausado</option>
            <option value="draft">Rascunho</option>
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-white transition-colors duration-300">
            <Download className="h-4 w-4" />
            <span>Exportar</span>
          </button>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'funnels' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredFunnels.map((funnel) => (
            <div key={funnel.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                      {getTypeIcon(funnel.type)}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">{funnel.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{funnel.type}</p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(funnel.status)}`}>
                    {getStatusIcon(funnel.status)}
                    <span className="capitalize">
                      {funnel.status === 'active' ? 'Ativo' : funnel.status === 'paused' ? 'Pausado' : 'Rascunho'}
                    </span>
                  </span>
                </div>

                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{funnel.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Visitantes</p>
                    <p className="font-bold text-gray-900 dark:text-white">{funnel.visitors.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Conversões</p>
                    <p className="font-bold text-green-600">{funnel.conversions}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Taxa de Conversão</p>
                    <p className="font-bold text-purple-600">{funnel.conversionRate}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Receita</p>
                    <p className="font-bold text-blue-600">{formatCurrency(funnel.revenue)}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Criado em {formatDate(funnel.createdAt)}
                  </span>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => handleToggleFunnelStatus(funnel.id)}
                      className={`p-2 transition-colors duration-300 ${
                        funnel.status === 'active' 
                          ? 'text-yellow-600 hover:text-yellow-700' 
                          : 'text-green-600 hover:text-green-700'
                      }`}
                      title={funnel.status === 'active' ? 'Pausar' : 'Ativar'}
                    >
                      {funnel.status === 'active' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </button>
                    <button 
                      onClick={() => handleEditFunnel(funnel)}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 transition-colors duration-300"
                      title="Editar"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button 
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors duration-300" 
                      title="Visualizar"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleDuplicateFunnel(funnel)}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-green-600 transition-colors duration-300" 
                      title="Duplicar"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteFunnel(funnel.id)}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 transition-colors duration-300" 
                      title="Excluir"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'flows' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredFlows.map((flow) => (
            <div key={flow.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      {getPlatformIcon(flow.platform)}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">{flow.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{flow.platform}</p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(flow.status)}`}>
                    {getStatusIcon(flow.status)}
                    <span className="capitalize">
                      {flow.status === 'active' ? 'Ativo' : flow.status === 'paused' ? 'Pausado' : 'Rascunho'}
                    </span>
                  </span>
                </div>

                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{flow.description}</p>

                <div className="mb-4">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Gatilhos:</p>
                  <div className="flex flex-wrap gap-1">
                    {flow.triggers.slice(0, 2).map((trigger, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">
                        {trigger}
                      </span>
                    ))}
                    {flow.triggers.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">
                        +{flow.triggers.length - 2}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Mensagens Enviadas</p>
                    <p className="font-bold text-gray-900 dark:text-white">{flow.messages.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Conversões</p>
                    <p className="font-bold text-green-600">{flow.conversions}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Criado em {formatDate(flow.createdAt)}
                  </span>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => handleToggleFlowStatus(flow.id)}
                      className={`p-2 transition-colors duration-300 ${
                        flow.status === 'active' 
                          ? 'text-yellow-600 hover:text-yellow-700' 
                          : 'text-green-600 hover:text-green-700'
                      }`}
                      title={flow.status === 'active' ? 'Pausar' : 'Ativar'}
                    >
                      {flow.status === 'active' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </button>
                    <button 
                      onClick={() => handleEditFlow(flow)}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors duration-300" 
                      title="Editar"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleDuplicateFlow(flow)}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-green-600 transition-colors duration-300" 
                      title="Duplicar"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteFlow(flow.id)}
                      className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 transition-colors duration-300" 
                      title="Excluir"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'templates' && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Copy className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Templates de Funis
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Escolha entre dezenas de templates prontos para acelerar sua criação
          </p>
          <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all duration-300">
            Explorar Templates
          </button>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <BarChart3 className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Analytics Avançado
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Análises detalhadas de performance dos seus funis e fluxos
          </p>
          <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all duration-300">
            Ver Relatórios
          </button>
        </div>
      )}

      {/* Modals */}
      <FunnelBuilderModal
        isOpen={isFunnelBuilderOpen}
        onClose={() => setIsFunnelBuilderOpen(false)}
        onSave={handleSaveFunnel}
        funnel={selectedFunnel}
        mode={funnelModalMode}
      />

      <ConversationFlowModal
        isOpen={isFlowBuilderOpen}
        onClose={() => setIsFlowBuilderOpen(false)}
        onSave={handleSaveFlow}
        flow={selectedFlow}
        mode={flowModalMode}
      />
    </div>
  );
};

export default WaveCorePage;