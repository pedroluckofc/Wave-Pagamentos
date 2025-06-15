import React, { useState, useEffect } from 'react';
import { 
  BarChart3, Users, DollarSign, TrendingUp, CreditCard, 
  Bell, Settings, Search, Filter, Download, Plus,
  ArrowUpRight, ArrowDownRight, Eye, Edit, Trash2,
  Calendar, Clock, CheckCircle, AlertCircle
} from 'lucide-react';
import Chart from '../components/Chart';

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

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('today');
  const [sales, setSales] = useState<Sale[]>([]);
  const [affiliates, setAffiliates] = useState<Affiliate[]>([]);
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

    setSales(sampleSales);
    setAffiliates(sampleAffiliates);
  }, []);

  const MetricCard = ({ title, value, growth, icon: Icon, color }: any) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg bg-gradient-to-r ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div className={`flex items-center text-sm font-medium ${growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {growth >= 0 ? <ArrowUpRight className="h-4 w-4 mr-1" /> : <ArrowDownRight className="h-4 w-4 mr-1" />}
          {Math.abs(growth)}%
        </div>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
      <p className="text-gray-600 text-sm">{title}</p>
    </div>
  );

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
      case 'approved': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      case 'active': return 'text-green-600 bg-green-100';
      case 'inactive': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard Wave</h1>
            <div className="flex items-center space-x-2">
              <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="p-2 text-gray-600 hover:text-gray-900 relative">
              <Bell className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900">
              <Settings className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <nav className="p-6">
            <div className="space-y-2">
              {[
                { id: 'overview', label: 'Visão Geral', icon: BarChart3 },
                { id: 'sales', label: 'Vendas', icon: DollarSign },
                { id: 'affiliates', label: 'Afiliados', icon: Users },
                { id: 'products', label: 'Produtos', icon: CreditCard },
                { id: 'reports', label: 'Relatórios', icon: TrendingUp },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                      activeTab === item.id
                        ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{item.label}</span>
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
              {/* Metrics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                  title="Receita Hoje"
                  value={formatCurrency(metrics.revenue)}
                  growth={metrics.revenueGrowth}
                  icon={DollarSign}
                  color="from-blue-500 to-blue-600"
                />
                <MetricCard
                  title="Vendas"
                  value={metrics.salesCount}
                  growth={metrics.salesGrowth}
                  icon={TrendingUp}
                  color="from-green-500 to-green-600"
                />
                <MetricCard
                  title="Afiliados Ativos"
                  value={metrics.activeAffiliates}
                  growth={metrics.affiliatesGrowth}
                  icon={Users}
                  color="from-purple-500 to-purple-600"
                />
                <MetricCard
                  title="Taxa de Conversão"
                  value={`${metrics.conversionRate}%`}
                  growth={metrics.conversionGrowth}
                  icon={BarChart3}
                  color="from-orange-500 to-orange-600"
                />
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Chart
                  data={chartData.sales}
                  title="Vendas (24h)"
                  value={metrics.salesCount.toString()}
                  growth={metrics.salesGrowth}
                  color="#10b981"
                  gradientFrom="#10b981"
                  gradientTo="#34d399"
                />
                <Chart
                  data={chartData.revenue.map(v => v / 100)} // Scale down for better visualization
                  title="Receita (24h)"
                  value={formatCurrency(metrics.revenue)}
                  growth={metrics.revenueGrowth}
                  color="#3b82f6"
                  gradientFrom="#3b82f6"
                  gradientTo="#60a5fa"
                />
                <Chart
                  data={chartData.conversion}
                  title="Conversão (24h)"
                  value={`${metrics.conversionRate}%`}
                  growth={metrics.conversionGrowth}
                  color="#8b5cf6"
                  gradientFrom="#8b5cf6"
                  gradientTo="#a78bfa"
                />
              </div>

              {/* Recent Sales */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900">Vendas Recentes</h2>
                    <button className="text-blue-600 hover:text-blue-700 font-medium">Ver Todas</button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {sales.slice(0, 5).map((sale) => (
                      <div key={sale.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(sale.status)}`}>
                            {getStatusIcon(sale.status)}
                            <span className="capitalize">{sale.status === 'approved' ? 'Aprovado' : sale.status === 'pending' ? 'Pendente' : 'Rejeitado'}</span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{sale.product}</p>
                            <p className="text-sm text-gray-600">{sale.customer}</p>
                            {sale.affiliate && (
                              <p className="text-xs text-blue-600">via {sale.affiliate}</p>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600">{formatCurrency(sale.amount)}</p>
                          <p className="text-xs text-gray-500">{formatDate(sale.date)}</p>
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
                <h2 className="text-2xl font-bold text-gray-900">Gerenciar Vendas</h2>
                <div className="flex items-center space-x-3">
                  <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Filter className="h-4 w-4" />
                    <span>Filtrar</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Download className="h-4 w-4" />
                    <span>Exportar</span>
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Produto</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Cliente</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Valor</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Data</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {sales.map((sale) => (
                        <tr key={sale.id} className="hover:bg-gray-50">
                          <td className="py-4 px-6">
                            <div>
                              <p className="font-medium text-gray-900">{sale.product}</p>
                              {sale.affiliate && (
                                <p className="text-sm text-blue-600">via {sale.affiliate}</p>
                              )}
                            </div>
                          </td>
                          <td className="py-4 px-6 text-gray-900">{sale.customer}</td>
                          <td className="py-4 px-6 font-semibold text-green-600">{formatCurrency(sale.amount)}</td>
                          <td className="py-4 px-6">
                            <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(sale.status)}`}>
                              {getStatusIcon(sale.status)}
                              <span className="capitalize">
                                {sale.status === 'approved' ? 'Aprovado' : sale.status === 'pending' ? 'Pendente' : 'Rejeitado'}
                              </span>
                            </span>
                          </td>
                          <td className="py-4 px-6 text-gray-600">{formatDate(sale.date)}</td>
                          <td className="py-4 px-6">
                            <div className="flex items-center space-x-2">
                              <button className="p-2 text-gray-600 hover:text-blue-600">
                                <Eye className="h-4 w-4" />
                              </button>
                              <button className="p-2 text-gray-600 hover:text-green-600">
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
                <h2 className="text-2xl font-bold text-gray-900">Gerenciar Afiliados</h2>
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <Plus className="h-4 w-4" />
                  <span>Convidar Afiliado</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Total de Afiliados</h3>
                  <p className="text-3xl font-bold text-blue-600">{affiliates.length}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Comissões Pagas</h3>
                  <p className="text-3xl font-bold text-green-600">
                    {formatCurrency(affiliates.reduce((sum, affiliate) => sum + affiliate.commission, 0))}
                  </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Conversão Média</h3>
                  <p className="text-3xl font-bold text-purple-600">
                    {(affiliates.reduce((sum, affiliate) => sum + affiliate.conversionRate, 0) / affiliates.length).toFixed(1)}%
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Afiliado</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Vendas</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Comissão</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Conversão</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-900">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {affiliates.map((affiliate) => (
                        <tr key={affiliate.id} className="hover:bg-gray-50">
                          <td className="py-4 px-6">
                            <div>
                              <p className="font-medium text-gray-900">{affiliate.name}</p>
                              <p className="text-sm text-gray-600">{affiliate.email}</p>
                            </div>
                          </td>
                          <td className="py-4 px-6 font-semibold text-gray-900">{affiliate.sales}</td>
                          <td className="py-4 px-6 font-semibold text-green-600">{formatCurrency(affiliate.commission)}</td>
                          <td className="py-4 px-6 font-semibold text-purple-600">{affiliate.conversionRate}%</td>
                          <td className="py-4 px-6">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(affiliate.status)}`}>
                              {affiliate.status === 'active' ? 'Ativo' : 'Inativo'}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center space-x-2">
                              <button className="p-2 text-gray-600 hover:text-blue-600">
                                <Eye className="h-4 w-4" />
                              </button>
                              <button className="p-2 text-gray-600 hover:text-green-600">
                                <Edit className="h-4 w-4" />
                              </button>
                              <button className="p-2 text-gray-600 hover:text-red-600">
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
                <h2 className="text-2xl font-bold text-gray-900">Meus Produtos</h2>
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <Plus className="h-4 w-4" />
                  <span>Novo Produto</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: 'Curso Marketing Digital', price: 497, sales: 45, status: 'active' },
                  { name: 'E-book Vendas', price: 97, sales: 32, status: 'active' },
                  { name: 'Mentoria Premium', price: 1997, sales: 28, status: 'active' },
                ].map((product, index) => (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-gray-900">{product.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                        {product.status === 'active' ? 'Ativo' : 'Inativo'}
                      </span>
                    </div>
                    <div className="space-y-2 mb-4">
                      <p className="text-2xl font-bold text-green-600">{formatCurrency(product.price)}</p>
                      <p className="text-sm text-gray-600">{product.sales} vendas este mês</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="flex-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-sm font-medium">
                        Editar
                      </button>
                      <button className="flex-1 px-3 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 text-sm font-medium">
                        Relatório
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Relatórios</h2>
                <div className="flex items-center space-x-3">
                  <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Últimos 7 dias</option>
                    <option>Últimos 30 dias</option>
                    <option>Últimos 90 dias</option>
                  </select>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <Download className="h-4 w-4" />
                    <span>Exportar</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Receita por Período</h3>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Gráfico de Receita</p>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Produtos Mais Vendidos</h3>
                  <div className="space-y-4">
                    {[
                      { name: 'Curso Marketing Digital', sales: 45, percentage: 60 },
                      { name: 'Mentoria Premium', sales: 28, percentage: 37 },
                      { name: 'E-book Vendas', sales: 32, percentage: 43 },
                    ].map((product, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-900">{product.name}</span>
                          <span className="text-sm text-gray-600">{product.sales} vendas</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${product.percentage}%` }}
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
    </div>
  );
};

export default Dashboard;