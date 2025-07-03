import React, { useState, useEffect } from 'react';
import { 
  BarChart3, Users, DollarSign, TrendingUp, CreditCard, 
  Bell, Settings, Search, Filter, Download, Plus,
  ArrowUpRight, ArrowDownRight, Eye, Edit, Trash2,
  Calendar, Clock, CheckCircle, AlertCircle, Zap,
  EyeOff, Moon, Sun, Link
} from 'lucide-react';
import MinimalChart from '../components/MinimalChart';
import ProductModal from '../components/ProductModal';
import ProductReportModal from '../components/ProductReportModal';
import RevenueChart from '../components/RevenueChart';
import AffiliateInviteModal from '../components/AffiliateInviteModal';
import IntegrationsPage from '../components/IntegrationsPage';
import WaveCorePage from '../components/WaveCorePage';
import SettingsModal from '../components/SettingsModal';
import NotificationPanel from '../components/NotificationPanel';
import { useTheme } from '../contexts/ThemeContext';

interface Sale {
  id: string;
  product: string;
  customer: string;
  amount: number;
  status: 'approved' | 'pending' | 'rejected';
  date: Date;
  affiliate?: string;
}

interface Affiliate {
  id: string;
  name: string;
  email: string;
  sales: number;
  commission: number;
  conversionRate: number;
  status: 'active' | 'inactive';
}

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  sales: number;
  status: 'active' | 'inactive' | 'draft';
  category: string;
  commission: number;
  createdAt: Date;
}

interface DashboardProps {
  onNavigateToLanding?: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigateToLanding }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('today');
  const [searchTerm, setSearchTerm] = useState('');
  const [sales, setSales] = useState<Sale[]>([]);
  const [affiliates, setAffiliates] = useState<Affiliate[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isAffiliateInviteModalOpen, setIsAffiliateInviteModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [hiddenMetrics, setHiddenMetrics] = useState<Set<string>>(new Set());
  const [hideAllValues, setHideAllValues] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const [metrics, setMetrics] = useState({
    revenue: 24587,
    salesCount: 127,
    activeAffiliates: 89,
    conversionRate: 7.2,
    revenueGrowth: 12,
    salesGrowth: 8,
    affiliatesGrowth: 15,
    conversionGrowth: 5
  });

  // Chart data for the last 24 hours
  const [chartData, setChartData] = useState({
    sales: [45, 52, 48, 61, 55, 67, 59, 73, 69, 81, 76, 89, 85, 92, 88, 95, 91, 98, 94, 102, 99, 105, 101, 127],
    revenue: [2100, 2450, 2200, 2890, 2650, 3200, 2950, 3500, 3300, 3850, 3600, 4200, 4000, 4350, 4150, 4500, 4300, 4650, 4400, 4800, 4600, 4950, 4750, 5200],
    conversion: [6.2, 6.5, 6.1, 6.8, 6.4, 7.1, 6.9, 7.3, 7.0, 7.5, 7.2, 7.8, 7.4, 7.9, 7.6, 8.1, 7.8, 8.3, 8.0, 8.4, 8.1, 8.6, 8.3, 7.2]
  });

  // Revenue data for reports
  const revenueData = [15000, 18000, 22000, 19000, 25000, 28000, 32000, 29000, 35000, 38000, 42000, 39000, 45000, 48000, 52000, 49000, 55000, 58000, 62000, 59000, 65000, 68000, 72000, 75000];

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        revenue: prev.revenue + Math.floor(Math.random() * 500),
        salesCount: prev.salesCount + Math.floor(Math.random() * 3),
      }));

      // Update chart data
      setChartData(prev => ({
        sales: [...prev.sales.slice(1), prev.sales[prev.sales.length - 1] + Math.floor(Math.random() * 10 - 5)],
        revenue: [...prev.revenue.slice(1), prev.revenue[prev.revenue.length - 1] + Math.floor(Math.random() * 500 - 250)],
        conversion: [...prev.conversion.slice(1), Math.max(0, Math.min(15, prev.conversion[prev.conversion.length - 1] + (Math.random() * 2 - 1)))]
      }));

      // Add new sale occasionally
      if (Math.random() > 0.7) {
        const newSale: Sale = {
          id: Date.now().toString(),
          product: ['Curso Marketing Digital', 'E-book Vendas', 'Mentoria Premium'][Math.floor(Math.random() * 3)],
          customer: ['João Silva', 'Maria Santos', 'Pedro Costa'][Math.floor(Math.random() * 3)],
          amount: [97, 497, 1997][Math.floor(Math.random() * 3)],
          status: 'approved',
          date: new Date(),
          affiliate: Math.random() > 0.5 ? 'Carlos Afiliado' : undefined
        };
        setSales(prev => [newSale, ...prev.slice(0, 9)]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Initialize sample data
  useEffect(() => {
    const sampleSales: Sale[] = [
      {
        id: '1',
        product: 'Curso Marketing Digital',
        customer: 'João Silva',
        amount: 497,
        status: 'approved',
        date: new Date(Date.now() - 1000 * 60 * 5),
        affiliate: 'Carlos Afiliado'
      },
      {
        id: '2',
        product: 'E-book Vendas',
        customer: 'Maria Santos',
        amount: 97,
        status: 'approved',
        date: new Date(Date.now() - 1000 * 60 * 15),
      },
      {
        id: '3',
        product: 'Mentoria Premium',
        customer: 'Pedro Costa',
        amount: 1997,
        status: 'pending',
        date: new Date(Date.now() - 1000 * 60 * 30),
        affiliate: 'Ana Afiliada'
      }
    ];

    const sampleAffiliates: Affiliate[] = [
      {
        id: '1',
        name: 'Carlos Afiliado',
        email: 'carlos@email.com',
        sales: 45,
        commission: 2850,
        conversionRate: 8.5,
        status: 'active'
      },
      {
        id: '2',
        name: 'Ana Afiliada',
        email: 'ana@email.com',
        sales: 32,
        commission: 1920,
        conversionRate: 6.2,
        status: 'active'
      },
      {
        id: '3',
        name: 'Roberto Silva',
        email: 'roberto@email.com',
        sales: 28,
        commission: 1680,
        conversionRate: 5.8,
        status: 'inactive'
      }
    ];

    const sampleProducts: Product[] = [
      {
        id: '1',
        name: 'Curso Marketing Digital',
        description: 'Curso completo de marketing digital para iniciantes',
        price: 497,
        sales: 45,
        status: 'active',
        category: 'curso',
        commission: 30,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30)
      },
      {
        id: '2',
        name: 'E-book Vendas',
        description: 'Guia prático para aumentar suas vendas',
        price: 97,
        sales: 32,
        status: 'active',
        category: 'ebook',
        commission: 40,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15)
      },
      {
        id: '3',
        name: 'Mentoria Premium',
        description: 'Mentoria individual para empreendedores',
        price: 1997,
        sales: 28,
        status: 'active',
        category: 'mentoria',
        commission: 25,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60)
      }
    ];

    setSales(sampleSales);
    setAffiliates(sampleAffiliates);
    setProducts(sampleProducts);
  }, []);

  const handleTimeRangeChange = (newRange: string) => {
    setTimeRange(newRange);
    console.log('Período alterado para:', newRange);
    // Aqui você implementaria a lógica para buscar dados do período selecionado
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    console.log('Buscando por:', term);
    // Aqui você implementaria a lógica de busca
  };

  const handleWithdraw = () => {
    alert(`Iniciando saque de ${formatCurrency(metrics.revenue)}`);
  };

  const toggleMetricVisibility = (metricId: string) => {
    setHiddenMetrics(prev => {
      const newSet = new Set(prev);
      if (newSet.has(metricId)) {
        newSet.delete(metricId);
      } else {
        newSet.add(metricId);
      }
      return newSet;
    });
  };

  const toggleAllValuesVisibility = () => {
    setHideAllValues(!hideAllValues);
  };

  const handleInviteAffiliate = (inviteData: any) => {
    console.log('Convite enviado:', inviteData);
    alert(`Convite enviado para ${inviteData.email} com sucesso!`);
  };

  const MetricCard = ({ id, title, value, growth, icon: Icon, color, showWithdrawButton = false }: any) => {
    const isHidden = hiddenMetrics.has(id) || hideAllValues;
    
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-500">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-lg bg-gradient-to-r ${color}`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => toggleMetricVisibility(id)}
              className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-300"
              title={isHidden ? 'Mostrar valor' : 'Ocultar valor'}
            >
              {isHidden ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
            <div className={`flex items-center text-sm font-medium ${growth >= 0 ? 'text-green-600' : 'text-red-600'} ${
              isHidden ? 'filter blur-lg select-none pointer-events-none' : ''
            }`}>
              {growth >= 0 ? <ArrowUpRight className="h-4 w-4 mr-1" /> : <ArrowDownRight className="h-4 w-4 mr-1" />}
              {Math.abs(growth)}%
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h3 className={`text-2xl font-bold text-gray-900 dark:text-white mb-1 transition-all duration-300 ${
              isHidden ? 'filter blur-lg select-none pointer-events-none' : ''
            }`}>
              {value}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{title}</p>
          </div>
          {showWithdrawButton && (
            <button
              onClick={handleWithdraw}
              className={`px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors duration-300 text-sm ${
                isHidden ? 'filter blur-lg pointer-events-none' : ''
              }`}
            >
              Sacar
            </button>
          )}
        </div>
      </div>
    );
  };

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
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
      case 'pending': return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30';
      case 'rejected': return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30';
      case 'active': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
      case 'inactive': return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/30';
      case 'draft': return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'rejected': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const handleCreateProduct = () => {
    setSelectedProduct(null);
    setModalMode('create');
    setIsProductModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setModalMode('edit');
    setIsProductModalOpen(true);
  };

  const handleViewReport = (product: Product) => {
    setSelectedProduct(product);
    setIsReportModalOpen(true);
  };

  const handleSaveProduct = (productData: any) => {
    if (modalMode === 'create') {
      setProducts(prev => [...prev, productData]);
    } else {
      setProducts(prev => prev.map(p => p.id === productData.id ? productData : p));
    }
  };

  const handleDeleteProduct = (productId: string) => {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      setProducts(prev => prev.filter(p => p.id !== productId));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 transition-colors duration-500">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onNavigateToLanding}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                <Zap className="h-6 w-6 text-white" />
              </div>
            </button>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Wave</h1>
            <div className="flex items-center space-x-2">
              <select 
                value={timeRange}
                onChange={(e) => handleTimeRangeChange(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-300"
              >
                <option value="today">Hoje</option>
                <option value="week">Esta Semana</option>
                <option value="month">Este Mês</option>
                <option value="year">Este Ano</option>
              </select>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-300"
              />
            </div>
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-110"
              title={isDark ? 'Tema Claro' : 'Tema Escuro'}
            >
              {isDark ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
            </button>
            <button 
              onClick={() => setIsNotificationPanelOpen(true)}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 relative transition-colors duration-300"
            >
              <Bell className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
            </button>
            <button 
              onClick={() => setIsSettingsModalOpen(true)}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors duration-300"
            >
              <Settings className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-screen transition-colors duration-500">
          <nav className="p-6">
            <div className="space-y-2">
              {[
                { id: 'overview', label: 'Visão Geral', icon: BarChart3 },
                { id: 'sales', label: 'Vendas', icon: DollarSign },
                { id: 'affiliates', label: 'Afiliados', icon: Users },
                { id: 'products', label: 'Produtos', icon: CreditCard },
                { id: 'wavecore', label: 'WaveCore™', icon: Zap },
                { id: 'integrations', label: 'Integrações', icon: Link },
                { id: 'reports', label: 'Relatórios', icon: TrendingUp },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-300 ${
                      activeTab === item.id
                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-r-2 border-blue-600'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
                    {item.id === 'wavecore' && (
                      <span className="ml-auto px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400 rounded-full text-xs font-medium">
                        NEW
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Controls */}
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Visão Geral</h2>
                <button
                  onClick={toggleAllValuesVisibility}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors duration-300"
                >
                  {hideAllValues ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  <span>{hideAllValues ? 'Mostrar Valores' : 'Ocultar Valores'}</span>
                </button>
              </div>

              {/* Metrics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                  id="revenue"
                  title="Receita Hoje"
                  value={formatCurrency(metrics.revenue)}
                  growth={metrics.revenueGrowth}
                  icon={DollarSign}
                  color="from-blue-500 to-blue-600"
                  showWithdrawButton={true}
                />
                <MetricCard
                  id="sales"
                  title="Vendas"
                  value={metrics.salesCount}
                  growth={metrics.salesGrowth}
                  icon={TrendingUp}
                  color="from-green-500 to-green-600"
                />
                <MetricCard
                  id="affiliates"
                  title="Afiliados Ativos"
                  value={metrics.activeAffiliates}
                  growth={metrics.affiliatesGrowth}
                  icon={Users}
                  color="from-purple-500 to-purple-600"
                />
                <MetricCard
                  id="conversion"
                  title="Taxa de Conversão"
                  value={`${metrics.conversionRate}%`}
                  growth={metrics.conversionGrowth}
                  icon={BarChart3}
                  color="from-orange-500 to-orange-600"
                />
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className={hideAllValues ? 'filter blur-lg pointer-events-none select-none' : ''}>
                  <MinimalChart
                    data={chartData.sales}
                    title="Vendas (24h)"
                    value={metrics.salesCount.toString()}
                    growth={metrics.salesGrowth}
                    color="#10b981"
                  />
                </div>
                <div className={hideAllValues ? 'filter blur-lg pointer-events-none select-none' : ''}>
                  <MinimalChart
                    data={chartData.revenue.map(v => v / 100)}
                    title="Receita (24h)"
                    value={formatCurrency(metrics.revenue)}
                    growth={metrics.revenueGrowth}
                    color="#3b82f6"
                  />
                </div>
                <div className={hideAllValues ? 'filter blur-lg pointer-events-none select-none' : ''}>
                  <MinimalChart
                    data={chartData.conversion}
                    title="Conversão (24h)"
                    value={`${metrics.conversionRate}%`}
                    growth={metrics.conversionGrowth}
                    color="#8b5cf6"
                  />
                </div>
              </div>

              {/* Recent Sales */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-500">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Vendas Recentes</h2>
                    <button className="text-blue-600 hover:text-blue-700 font-medium">Ver Todas</button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {sales.slice(0, 5).map((sale) => (
                      <div key={sale.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-300">
                        <div className="flex items-center space-x-4">
                          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(sale.status)}`}>
                            {getStatusIcon(sale.status)}
                            <span className="capitalize">{sale.status === 'approved' ? 'Aprovado' : sale.status === 'pending' ? 'Pendente' : 'Rejeitado'}</span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{sale.product}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{sale.customer}</p>
                            {sale.affiliate && (
                              <p className="text-xs text-blue-600">via {sale.affiliate}</p>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-bold text-green-600 ${
                            hideAllValues ? 'filter blur-lg select-none pointer-events-none' : ''
                          }`}>
                            {formatCurrency(sale.amount)}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{formatDate(sale.date)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sales' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Gerenciar Vendas</h2>
                <div className="flex items-center space-x-3">
                  <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-white transition-colors duration-300">
                    <Filter className="h-4 w-4" />
                    <span>Filtrar</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-white transition-colors duration-300">
                    <Download className="h-4 w-4" />
                    <span>Exportar</span>
                  </button>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-500">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                      <tr>
                        <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Produto</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Cliente</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Valor</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Status</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Data</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                      {sales.map((sale) => (
                        <tr key={sale.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300">
                          <td className="py-4 px-6">
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">{sale.product}</p>
                              {sale.affiliate && (
                                <p className="text-sm text-blue-600">via {sale.affiliate}</p>
                              )}
                            </div>
                          </td>
                          <td className="py-4 px-6 text-gray-900 dark:text-white">{sale.customer}</td>
                          <td className={`py-4 px-6 font-semibold text-green-600 ${
                            hideAllValues ? 'filter blur-lg select-none pointer-events-none' : ''
                          }`}>
                            {formatCurrency(sale.amount)}
                          </td>
                          <td className="py-4 px-6">
                            <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(sale.status)}`}>
                              {getStatusIcon(sale.status)}
                              <span className="capitalize">
                                {sale.status === 'approved' ? 'Aprovado' : sale.status === 'pending' ? 'Pendente' : 'Rejeitado'}
                              </span>
                            </span>
                          </td>
                          <td className="py-4 px-6 text-gray-600 dark:text-gray-400">{formatDate(sale.date)}</td>
                          <td className="py-4 px-6">
                            <div className="flex items-center space-x-2">
                              <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors duration-300">
                                <Eye className="h-4 w-4" />
                              </button>
                              <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-green-600 transition-colors duration-300">
                                <Edit className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'affiliates' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Gerenciar Afiliados</h2>
                <button 
                  onClick={() => setIsAffiliateInviteModalOpen(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                >
                  <Plus className="h-4 w-4" />
                  <span>Convidar Afiliado</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-500">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Total de Afiliados</h3>
                  <p className={`text-3xl font-bold text-blue-600 ${
                    hideAllValues ? 'filter blur-lg select-none pointer-events-none' : ''
                  }`}>
                    {affiliates.length}
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-500">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Comissões Pagas</h3>
                  <p className={`text-3xl font-bold text-green-600 ${
                    hideAllValues ? 'filter blur-lg select-none pointer-events-none' : ''
                  }`}>
                    {formatCurrency(affiliates.reduce((sum, affiliate) => sum + affiliate.commission, 0))}
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-500">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Conversão Média</h3>
                  <p className={`text-3xl font-bold text-purple-600 ${
                    hideAllValues ? 'filter blur-lg select-none pointer-events-none' : ''
                  }`}>
                    {(affiliates.reduce((sum, affiliate) => sum + affiliate.conversionRate, 0) / affiliates.length).toFixed(1)}%
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-500">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                      <tr>
                        <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Afiliado</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Vendas</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Comissão</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Conversão</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Status</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                      {affiliates.map((affiliate) => (
                        <tr key={affiliate.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300">
                          <td className="py-4 px-6">
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">{affiliate.name}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{affiliate.email}</p>
                            </div>
                          </td>
                          <td className={`py-4 px-6 font-semibold text-gray-900 dark:text-white ${
                            hideAllValues ? 'filter blur-lg select-none pointer-events-none' : ''
                          }`}>
                            {affiliate.sales}
                          </td>
                          <td className={`py-4 px-6 font-semibold text-green-600 ${
                            hideAllValues ? 'filter blur-lg select-none pointer-events-none' : ''
                          }`}>
                            {formatCurrency(affiliate.commission)}
                          </td>
                          <td className={`py-4 px-6 font-semibold text-purple-600 ${
                            hideAllValues ? 'filter blur-lg select-none pointer-events-none' : ''
                          }`}>
                            {affiliate.conversionRate}%
                          </td>
                          <td className="py-4 px-6">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(affiliate.status)}`}>
                              {affiliate.status === 'active' ? 'Ativo' : 'Inativo'}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center space-x-2">
                              <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors duration-300">
                                <Eye className="h-4 w-4" />
                              </button>
                              <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-green-600 transition-colors duration-300">
                                <Edit className="h-4 w-4" />
                              </button>
                              <button className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 transition-colors duration-300">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Meus Produtos</h2>
                <button 
                  onClick={handleCreateProduct}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                >
                  <Plus className="h-4 w-4" />
                  <span>Novo Produto</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <div key={product.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-500">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-gray-900 dark:text-white">{product.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                        {product.status === 'active' ? 'Ativo' : product.status === 'inactive' ? 'Inativo' : 'Rascunho'}
                      </span>
                    </div>
                    <div className="space-y-2 mb-4">
                      <p className={`text-2xl font-bold text-green-600 ${
                        hideAllValues ? 'filter blur-lg select-none pointer-events-none' : ''
                      }`}>
                        {formatCurrency(product.price)}
                      </p>
                      <p className={`text-sm text-gray-600 dark:text-gray-400 ${
                        hideAllValues ? 'filter blur-lg select-none pointer-events-none' : ''
                      }`}>
                        {product.sales} vendas este mês
                      </p>
                      <p className={`text-xs text-gray-500 dark:text-gray-500 ${
                        hideAllValues ? 'filter blur-lg select-none pointer-events-none' : ''
                      }`}>
                        Comissão: {product.commission}%
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleEditProduct(product)}
                        className="flex-1 px-3 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 text-sm font-medium transition-colors duration-300"
                      >
                        Editar
                      </button>
                      <button 
                        onClick={() => handleViewReport(product)}
                        className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 text-sm font-medium transition-colors duration-300"
                      >
                        Relatório
                      </button>
                      <button 
                        onClick={() => handleDeleteProduct(product.id)}
                        className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 transition-colors duration-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'wavecore' && <WaveCorePage />}

          {activeTab === 'integrations' && <IntegrationsPage />}

          {activeTab === 'reports' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Relatórios</h2>
                <div className="flex items-center space-x-3">
                  <select className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-300">
                    <option>Últimos 7 dias</option>
                    <option>Últimos 30 dias</option>
                    <option>Últimos 90 dias</option>
                  </select>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
                    <Download className="h-4 w-4" />
                    <span>Exportar</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className={hideAllValues ? 'filter blur-lg pointer-events-none select-none' : ''}>
                  <RevenueChart
                    data={revenueData}
                    title="Receita por Período"
                  />
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-500">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Produtos Mais Vendidos</h3>
                  <div className="space-y-4">
                    {products.map((product, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{product.name}</span>
                          <span className={`text-sm text-gray-600 dark:text-gray-400 ${
                            hideAllValues ? 'filter blur-lg select-none pointer-events-none' : ''
                          }`}>
                            {product.sales} vendas
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
                            style={{ width: `${(product.sales / Math.max(...products.map(p => p.sales))) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Modals */}
      <ProductModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onSave={handleSaveProduct}
        product={selectedProduct}
        mode={modalMode}
      />

      <ProductReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        product={selectedProduct}
      />

      <AffiliateInviteModal
        isOpen={isAffiliateInviteModalOpen}
        onClose={() => setIsAffiliateInviteModalOpen(false)}
        onSend={handleInviteAffiliate}
      />

      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
      />

      <NotificationPanel
        isOpen={isNotificationPanelOpen}
        onClose={() => setIsNotificationPanelOpen(false)}
      />
    </div>
  );
};

export default Dashboard;