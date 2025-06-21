import React from 'react';
import { X, TrendingUp, DollarSign, Users, Eye, Calendar } from 'lucide-react';
import MinimalChart from './MinimalChart';

interface ProductReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: any;
}

const ProductReportModal: React.FC<ProductReportModalProps> = ({ 
  isOpen, 
  onClose, 
  product 
}) => {
  if (!isOpen || !product) return null;

  // Dados simulados para o relatório
  const salesData = [12, 15, 18, 22, 19, 25, 28, 32, 29, 35, 38, 42, 39, 45, 48, 52, 49, 55, 58, 62, 59, 65, 68, 72];
  const revenueData = [1200, 1500, 1800, 2200, 1900, 2500, 2800, 3200, 2900, 3500, 3800, 4200, 3900, 4500, 4800, 5200, 4900, 5500, 5800, 6200, 5900, 6500, 6800, 7200];
  const conversionData = [5.2, 5.8, 6.1, 6.5, 6.2, 6.8, 7.1, 7.4, 7.0, 7.6, 7.9, 8.2, 7.8, 8.4, 8.7, 9.0, 8.6, 9.2, 9.5, 9.8, 9.4, 10.0, 10.3, 10.6];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Relatório do Produto
            </h2>
            <p className="text-gray-600 dark:text-gray-400">{product.name}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Métricas Principais */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <DollarSign className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-blue-600 dark:text-blue-400">Receita Total</p>
                  <p className="text-xl font-bold text-blue-700 dark:text-blue-300">
                    {formatCurrency(product.price * product.sales)}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-500 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-green-600 dark:text-green-400">Vendas</p>
                  <p className="text-xl font-bold text-green-700 dark:text-green-300">{product.sales}</p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-500 rounded-lg">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-purple-600 dark:text-purple-400">Afiliados</p>
                  <p className="text-xl font-bold text-purple-700 dark:text-purple-300">
                    {Math.floor(product.sales * 0.6)}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-500 rounded-lg">
                  <Eye className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-orange-600 dark:text-orange-400">Conversão</p>
                  <p className="text-xl font-bold text-orange-700 dark:text-orange-300">8.5%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Gráficos */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <MinimalChart
              data={salesData}
              title="Vendas (30 dias)"
              value={product.sales.toString()}
              growth={12}
              color="#10b981"
            />
            <MinimalChart
              data={revenueData.map(v => v / 100)}
              title="Receita (30 dias)"
              value={formatCurrency(product.price * product.sales)}
              growth={18}
              color="#3b82f6"
            />
            <MinimalChart
              data={conversionData}
              title="Conversão (30 dias)"
              value="8.5%"
              growth={5}
              color="#8b5cf6"
            />
          </div>

          {/* Detalhes do Produto */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Detalhes do Produto
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Preço</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {formatCurrency(product.price)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Categoria</p>
                  <p className="font-semibold text-gray-900 dark:text-white capitalize">
                    {product.category}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
                  <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                    product.status === 'active' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                  }`}>
                    {product.status === 'active' ? 'Ativo' : 'Inativo'}
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Comissão</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {product.commission}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Data de Criação</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {new Date(product.createdAt).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Última Venda</p>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    Há 2 horas
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Top Afiliados */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Top Afiliados
            </h3>
            <div className="space-y-3">
              {[
                { name: 'Carlos Silva', sales: 15, commission: formatCurrency(product.price * 15 * product.commission / 100) },
                { name: 'Ana Santos', sales: 12, commission: formatCurrency(product.price * 12 * product.commission / 100) },
                { name: 'Pedro Costa', sales: 8, commission: formatCurrency(product.price * 8 * product.commission / 100) },
              ].map((affiliate, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{affiliate.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{affiliate.sales} vendas</p>
                  </div>
                  <p className="font-semibold text-green-600">{affiliate.commission}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductReportModal;