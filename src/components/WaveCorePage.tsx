import React, { useState } from 'react';
import {
  Plus, Play, Pause, Settings, Eye, Edit, Trash2, Copy,
  BarChart3, Users, DollarSign, TrendingUp, ArrowRight,
  MessageCircle, Mail, Phone, Calendar, Zap, Target,
  Layers, GitBranch, Clock, CheckCircle, AlertCircle,
  Filter, Search, Download, Upload, Share2, Save, Sparkles,
  Lightbulb, FileText, Send, RefreshCw, BookOpen, TrendingUpIcon
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

  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiCategory, setAiCategory] = useState<'copy' | 'strategy'>('copy');
  const [selectedCopyType, setSelectedCopyType] = useState('headline');
  const [productContext, setProductContext] = useState({
    name: '',
    description: '',
    price: '',
    target: ''
  });

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

  const handleGenerateAI = async () => {
    if (!aiPrompt.trim() && !productContext.name) {
      alert('Por favor, escreva uma pergunta ou preencha pelo menos o nome do produto');
      return;
    }

    setIsGenerating(true);
    setAiResponse('');

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseKey) {
        throw new Error('Supabase não configurado');
      }

      const apiUrl = `${supabaseUrl}/functions/v1/wave-ai`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseKey}`,
        },
        body: JSON.stringify({
          prompt: aiPrompt,
          type: aiCategory,
          copyType: selectedCopyType,
          context: productContext,
        }),
      });

      if (!response.ok) {
        throw new Error(`Erro: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.success) {
        setAiResponse(data.response);
      } else {
        throw new Error(data.error || 'Erro ao gerar conteúdo');
      }
    } catch (error) {
      alert(`Erro ao gerar conteúdo: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(aiResponse);
    alert('Copiado para a área de transferência!');
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
            { id: 'analytics', label: 'Analytics', icon: BarChart3 },
            { id: 'waveai', label: 'Wave IA', icon: Sparkles, badge: true }
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
                {tab.badge && (
                  <span className="ml-1 px-2 py-0.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-xs font-medium">
                    IA
                  </span>
                )}
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

      {activeTab === 'waveai' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 bg-white/20 rounded-lg">
                <Sparkles className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">Wave IA</h2>
                <p className="text-blue-100">Assistente inteligente para copy e estratégias de vendas</p>
              </div>
            </div>
            <p className="text-blue-100">
              Use o poder da inteligência artificial para criar copies persuasivas e estratégias de vendas comprovadas.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <span>Gerador de Conteúdo</span>
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Categoria
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setAiCategory('copy')}
                        className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                          aiCategory === 'copy'
                            ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30'
                            : 'border-gray-300 dark:border-gray-600 hover:border-blue-400'
                        }`}
                      >
                        <FileText className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                        <p className="font-semibold text-gray-900 dark:text-white">Copy</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Textos de vendas</p>
                      </button>

                      <button
                        onClick={() => setAiCategory('strategy')}
                        className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                          aiCategory === 'strategy'
                            ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/30'
                            : 'border-gray-300 dark:border-gray-600 hover:border-purple-400'
                        }`}
                      >
                        <Lightbulb className="h-6 w-6 mx-auto mb-2 text-purple-600" />
                        <p className="font-semibold text-gray-900 dark:text-white">Estratégia</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Planos de vendas</p>
                      </button>
                    </div>
                  </div>

                  {aiCategory === 'copy' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Tipo de Copy
                      </label>
                      <select
                        value={selectedCopyType}
                        onChange={(e) => setSelectedCopyType(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      >
                        <option value="headline">Headline / Título Principal</option>
                        <option value="email">Email de Vendas</option>
                        <option value="vsl">Script de VSL</option>
                        <option value="landing">Landing Page</option>
                        <option value="ads">Anúncio para Tráfego Pago</option>
                        <option value="checkout">Página de Checkout</option>
                      </select>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {aiCategory === 'copy' ? 'Instruções Específicas (Opcional)' : 'Descreva sua estratégia desejada'}
                    </label>
                    <textarea
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      placeholder={aiCategory === 'copy'
                        ? 'Ex: Crie um headline focado em urgência com menção ao preço...'
                        : 'Ex: Crie uma estratégia de lançamento para um curso de 6 meses...'}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Contexto do Produto
                    </label>
                    <input
                      type="text"
                      value={productContext.name}
                      onChange={(e) => setProductContext({...productContext, name: e.target.value})}
                      placeholder="Nome do produto"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white mb-2"
                    />
                    <textarea
                      value={productContext.description}
                      onChange={(e) => setProductContext({...productContext, description: e.target.value})}
                      placeholder="Descrição resumida do produto"
                      rows={2}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white mb-2"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={productContext.price}
                        onChange={(e) => setProductContext({...productContext, price: e.target.value})}
                        placeholder="Preço (ex: R$ 497)"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                      <input
                        type="text"
                        value={productContext.target}
                        onChange={(e) => setProductContext({...productContext, target: e.target.value})}
                        placeholder="Público-alvo"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleGenerateAI}
                    disabled={isGenerating}
                    className={`w-full flex items-center justify-center space-x-2 px-6 py-4 rounded-lg font-semibold transition-all duration-300 ${
                      isGenerating
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg text-white'
                    }`}
                  >
                    {isGenerating ? (
                      <>
                        <RefreshCw className="h-5 w-5 animate-spin" />
                        <span>Gerando...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-5 w-5" />
                        <span>Gerar com IA</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
                <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-3 flex items-center space-x-2">
                  <BookOpen className="h-5 w-5" />
                  <span>Dicas Profissionais</span>
                </h4>
                <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-300">
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-600">•</span>
                    <span>Quanto mais contexto você fornecer, melhor será o resultado</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-600">•</span>
                    <span>Teste diferentes variações para encontrar a que converte melhor</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-600">•</span>
                    <span>Adapte o conteúdo gerado para a voz da sua marca</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-600">•</span>
                    <span>Use A/B testing para validar a performance</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 min-h-[500px]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                    <Sparkles className="h-5 w-5 text-purple-600" />
                    <span>Resultado Gerado</span>
                  </h3>
                  {aiResponse && (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={copyToClipboard}
                        className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors duration-300"
                        title="Copiar"
                      >
                        <Copy className="h-5 w-5" />
                      </button>
                      <button
                        className="p-2 text-gray-600 dark:text-gray-400 hover:text-green-600 transition-colors duration-300"
                        title="Salvar"
                      >
                        <Save className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                </div>

                {!aiResponse && !isGenerating && (
                  <div className="flex flex-col items-center justify-center h-96 text-center">
                    <div className="p-6 bg-gray-100 dark:bg-gray-700 rounded-full mb-4">
                      <Sparkles className="h-12 w-12 text-gray-400" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Pronto para criar conteúdo incrível?
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 max-w-md">
                      Preencha as informações ao lado e clique em "Gerar com IA" para criar copy profissional ou estratégias de vendas personalizadas.
                    </p>
                  </div>
                )}

                {isGenerating && (
                  <div className="flex flex-col items-center justify-center h-96">
                    <div className="relative">
                      <div className="p-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4 animate-pulse">
                        <Sparkles className="h-12 w-12 text-white" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-xl opacity-50 animate-pulse"></div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mt-4 animate-pulse">
                      Gerando conteúdo com IA...
                    </p>
                  </div>
                )}

                {aiResponse && !isGenerating && (
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 whitespace-pre-wrap text-gray-800 dark:text-gray-200 font-mono text-sm leading-relaxed">
                      {aiResponse}
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700 text-center">
                  <div className="text-2xl font-bold text-blue-600">10K+</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Copies Gerados</div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700 text-center">
                  <div className="text-2xl font-bold text-purple-600">8.5%</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Conversão Média</div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700 text-center">
                  <div className="text-2xl font-bold text-green-600">92%</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Satisfação</div>
                </div>
              </div>
            </div>
          </div>
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