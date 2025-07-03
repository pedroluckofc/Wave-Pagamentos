import React, { useState } from 'react';
import { 
  X, Plus, Save, Eye, Settings, Trash2, ArrowRight, 
  MousePointer, CreditCard, Gift, CheckCircle, Mail, 
  Clock, Users, DollarSign, BarChart3, Layers,
  Move, Copy, Edit3, Zap, Workflow
} from 'lucide-react';
import FlowBuilderView from './FlowBuilderView';

interface FunnelStep {
  id: string;
  name: string;
  type: 'landing' | 'checkout' | 'upsell' | 'downsell' | 'thankyou' | 'email' | 'sms' | 'wait';
  visitors: number;
  conversions: number;
  conversionRate: number;
  position: { x: number; y: number };
  settings: {
    title?: string;
    description?: string;
    price?: number;
    delay?: number;
    template?: string;
  };
  connections?: string[];
}

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

interface FunnelBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (funnel: Funnel) => void;
  funnel?: Funnel | null;
  mode: 'create' | 'edit';
}

const FunnelBuilderModal: React.FC<FunnelBuilderModalProps> = ({
  isOpen,
  onClose,
  onSave,
  funnel,
  mode
}) => {
  const [activeTab, setActiveTab] = useState('builder');
  const [selectedStep, setSelectedStep] = useState<FunnelStep | null>(null);
  const [viewMode, setViewMode] = useState<'flow' | 'list'>('flow');
  const [funnelData, setFunnelData] = useState<Funnel>({
    id: funnel?.id || Date.now().toString(),
    name: funnel?.name || '',
    description: funnel?.description || '',
    status: funnel?.status || 'draft',
    type: funnel?.type || 'sales',
    visitors: funnel?.visitors || 0,
    conversions: funnel?.conversions || 0,
    revenue: funnel?.revenue || 0,
    conversionRate: funnel?.conversionRate || 0,
    createdAt: funnel?.createdAt || new Date(),
    steps: funnel?.steps?.map((step, index) => ({
      ...step,
      position: step.position || { x: 100 + (index * 350), y: 100 }
    })) || []
  });

  if (!isOpen) return null;

  const stepTypes = [
    { 
      type: 'landing', 
      name: 'Landing Page', 
      icon: MousePointer, 
      color: 'from-blue-500 to-blue-600',
      description: 'Página de captura ou apresentação'
    },
    { 
      type: 'checkout', 
      name: 'Checkout', 
      icon: CreditCard, 
      color: 'from-green-500 to-green-600',
      description: 'Página de pagamento'
    },
    { 
      type: 'upsell', 
      name: 'Upsell', 
      icon: Gift, 
      color: 'from-purple-500 to-purple-600',
      description: 'Oferta adicional'
    },
    { 
      type: 'downsell', 
      name: 'Downsell', 
      icon: Gift, 
      color: 'from-orange-500 to-orange-600',
      description: 'Oferta alternativa'
    },
    { 
      type: 'thankyou', 
      name: 'Obrigado', 
      icon: CheckCircle, 
      color: 'from-green-400 to-green-500',
      description: 'Página de confirmação'
    },
    { 
      type: 'email', 
      name: 'Email', 
      icon: Mail, 
      color: 'from-red-500 to-red-600',
      description: 'Envio de email automático'
    },
    { 
      type: 'wait', 
      name: 'Aguardar', 
      icon: Clock, 
      color: 'from-gray-500 to-gray-600',
      description: 'Delay entre etapas'
    }
  ];

  const getStepIcon = (type: string) => {
    const stepType = stepTypes.find(st => st.type === type);
    return stepType ? stepType.icon : Layers;
  };

  const getStepColor = (type: string) => {
    const stepType = stepTypes.find(st => st.type === type);
    return stepType ? stepType.color : 'from-gray-500 to-gray-600';
  };

  const addStep = (type: string) => {
    const stepType = stepTypes.find(st => st.type === type);
    const newStep: FunnelStep = {
      id: Date.now().toString(),
      name: stepType?.name || 'Nova Etapa',
      type: type as any,
      visitors: 0,
      conversions: 0,
      conversionRate: 0,
      position: { x: 100 + (funnelData.steps.length * 350), y: 100 },
      settings: {},
      connections: []
    };

    setFunnelData(prev => ({
      ...prev,
      steps: [...prev.steps, newStep]
    }));
  };

  const removeStep = (stepId: string) => {
    setFunnelData(prev => ({
      ...prev,
      steps: prev.steps.filter(step => step.id !== stepId)
    }));
    if (selectedStep?.id === stepId) {
      setSelectedStep(null);
    }
  };

  const updateStep = (stepId: string, updates: Partial<FunnelStep>) => {
    setFunnelData(prev => ({
      ...prev,
      steps: prev.steps.map(step => 
        step.id === stepId ? { ...step, ...updates } : step
      )
    }));
    
    if (selectedStep?.id === stepId) {
      setSelectedStep(prev => prev ? { ...prev, ...updates } : null);
    }
  };

  const duplicateStep = (step: FunnelStep) => {
    const newStep: FunnelStep = {
      ...step,
      id: Date.now().toString(),
      name: `${step.name} (Cópia)`,
      position: { x: step.position.x + 50, y: step.position.y + 50 }
    };

    setFunnelData(prev => ({
      ...prev,
      steps: [...prev.steps, newStep]
    }));
  };

  const handleSave = () => {
    onSave(funnelData);
    onClose();
  };

  const StepSettings = () => {
    if (!selectedStep) {
      return (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 text-center">
          <div className="text-gray-400 mb-4">
            <Settings className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Selecione uma Etapa
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Clique em uma etapa no canvas para configurá-la
          </p>
        </div>
      );
    }

    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3 mb-6">
          <div className={`p-2 rounded-lg bg-gradient-to-r ${getStepColor(selectedStep.type)}`}>
            {React.createElement(getStepIcon(selectedStep.type), { className: "h-5 w-5 text-white" })}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {selectedStep.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
              {selectedStep.type}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nome da Etapa
            </label>
            <input
              type="text"
              value={selectedStep.name}
              onChange={(e) => updateStep(selectedStep.id, { name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>

          {selectedStep.type === 'checkout' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Preço (R$)
              </label>
              <input
                type="number"
                value={selectedStep.settings.price || ''}
                onChange={(e) => updateStep(selectedStep.id, { 
                  settings: { ...selectedStep.settings, price: parseFloat(e.target.value) || 0 }
                })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
          )}

          {selectedStep.type === 'wait' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tempo de Espera (minutos)
              </label>
              <input
                type="number"
                value={selectedStep.settings.delay || ''}
                onChange={(e) => updateStep(selectedStep.id, { 
                  settings: { ...selectedStep.settings, delay: parseInt(e.target.value) || 0 }
                })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Template
            </label>
            <select
              value={selectedStep.settings.template || ''}
              onChange={(e) => updateStep(selectedStep.id, { 
                settings: { ...selectedStep.settings, template: e.target.value }
              })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="">Selecionar template</option>
              <option value="modern">Moderno</option>
              <option value="classic">Clássico</option>
              <option value="minimal">Minimalista</option>
              <option value="bold">Impactante</option>
            </select>
          </div>

          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">Métricas</h4>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-xs text-gray-600 dark:text-gray-400">Visitantes</p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {selectedStep.visitors.toLocaleString()}
                </p>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-xs text-gray-600 dark:text-gray-400">Conversões</p>
                <p className="font-semibold text-green-600">
                  {selectedStep.conversions}
                </p>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-xs text-gray-600 dark:text-gray-400">Taxa</p>
                <p className="font-semibold text-purple-600">
                  {selectedStep.conversionRate}%
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 pt-4">
            <button
              onClick={() => duplicateStep(selectedStep)}
              className="flex-1 px-3 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 text-sm font-medium transition-colors duration-300"
            >
              Duplicar
            </button>
            <button
              onClick={() => removeStep(selectedStep.id)}
              className="flex-1 px-3 py-2 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/50 text-sm font-medium transition-colors duration-300"
            >
              Excluir
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-7xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {mode === 'create' ? 'Novo Funil' : `Editar: ${funnel?.name}`}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {mode === 'create' ? 'Crie seu funil de vendas' : 'Edite as configurações do funil'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-300"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 px-6">
          <nav className="flex space-x-8">
            {[
              { id: 'settings', label: 'Configurações', icon: Settings },
              { id: 'builder', label: 'Construtor', icon: Workflow },
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

        {/* Content */}
        <div className="flex h-[600px]">
          {activeTab === 'settings' && (
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="max-w-2xl space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nome do Funil *
                  </label>
                  <input
                    type="text"
                    value={funnelData.name}
                    onChange={(e) => setFunnelData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Ex: Funil Curso Marketing Digital"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Descrição
                  </label>
                  <textarea
                    value={funnelData.description}
                    onChange={(e) => setFunnelData(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Descreva o objetivo do seu funil..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Tipo do Funil
                    </label>
                    <select
                      value={funnelData.type}
                      onChange={(e) => setFunnelData(prev => ({ ...prev, type: e.target.value as any }))}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    >
                      <option value="sales">Vendas</option>
                      <option value="lead">Captura de Leads</option>
                      <option value="webinar">Webinar</option>
                      <option value="product">Produto</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Status
                    </label>
                    <select
                      value={funnelData.status}
                      onChange={(e) => setFunnelData(prev => ({ ...prev, status: e.target.value as any }))}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    >
                      <option value="draft">Rascunho</option>
                      <option value="active">Ativo</option>
                      <option value="paused">Pausado</option>
                    </select>
                  </div>
                </div>

                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-900 dark:text-purple-300 mb-2">
                    Configurações Avançadas
                  </h4>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                      <span className="ml-2 text-sm text-purple-800 dark:text-purple-300">
                        Ativar pixel de conversão
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                      <span className="ml-2 text-sm text-purple-800 dark:text-purple-300">
                        Integrar com automação de email
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                      <span className="ml-2 text-sm text-purple-800 dark:text-purple-300">
                        Ativar split test A/B
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'builder' && (
            <div className="flex flex-1">
              {/* Flow Builder Canvas */}
              <div className="flex-1">
                <FlowBuilderView
                  steps={funnelData.steps}
                  onStepUpdate={updateStep}
                  onStepAdd={(step) => setFunnelData(prev => ({ ...prev, steps: [...prev.steps, step] }))}
                  onStepRemove={removeStep}
                  onStepSelect={setSelectedStep}
                  selectedStep={selectedStep}
                  isEditable={true}
                />
              </div>

              {/* Settings Panel */}
              <div className="w-80 bg-gray-50 dark:bg-gray-700 p-4 border-l border-gray-200 dark:border-gray-600 overflow-y-auto">
                <StepSettings />
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl">
                    <div className="flex items-center space-x-3 mb-4">
                      <Users className="h-8 w-8 text-blue-600" />
                      <h3 className="font-semibold text-blue-900 dark:text-blue-300">Visitantes</h3>
                    </div>
                    <p className="text-3xl font-bold text-blue-900 dark:text-blue-300">
                      {funnelData.visitors.toLocaleString()}
                    </p>
                    <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">Total de visitantes</p>
                  </div>

                  <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl">
                    <div className="flex items-center space-x-3 mb-4">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                      <h3 className="font-semibold text-green-900 dark:text-green-300">Conversões</h3>
                    </div>
                    <p className="text-3xl font-bold text-green-900 dark:text-green-300">
                      {funnelData.conversions}
                    </p>
                    <p className="text-sm text-green-700 dark:text-green-400 mt-1">Total de conversões</p>
                  </div>

                  <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-xl">
                    <div className="flex items-center space-x-3 mb-4">
                      <DollarSign className="h-8 w-8 text-purple-600" />
                      <h3 className="font-semibold text-purple-900 dark:text-purple-300">Receita</h3>
                    </div>
                    <p className="text-3xl font-bold text-purple-900 dark:text-purple-300">
                      R$ {funnelData.revenue.toLocaleString()}
                    </p>
                    <p className="text-sm text-purple-700 dark:text-purple-400 mt-1">Receita total</p>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Performance por Etapa
                  </h3>
                  <div className="space-y-4">
                    {funnelData.steps.map((step, index) => {
                      const Icon = getStepIcon(step.type);
                      return (
                        <div key={step.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-lg bg-gradient-to-r ${getStepColor(step.type)}`}>
                              <Icon className="h-4 w-4 text-white" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">{step.name}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Etapa {index + 1}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-6 text-sm">
                            <div className="text-center">
                              <p className="font-semibold text-gray-900 dark:text-white">{step.visitors.toLocaleString()}</p>
                              <p className="text-gray-600 dark:text-gray-400">Visitantes</p>
                            </div>
                            <div className="text-center">
                              <p className="font-semibold text-green-600">{step.conversions}</p>
                              <p className="text-gray-600 dark:text-gray-400">Conversões</p>
                            </div>
                            <div className="text-center">
                              <p className="font-semibold text-purple-600">{step.conversionRate}%</p>
                              <p className="text-gray-600 dark:text-gray-400">Taxa</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-white transition-colors duration-300">
              <Eye className="h-4 w-4" />
              <span>Visualizar</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-white transition-colors duration-300">
              <Copy className="h-4 w-4" />
              <span>Duplicar</span>
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
            >
              <Save className="h-4 w-4" />
              <span>{mode === 'create' ? 'Criar Funil' : 'Salvar Alterações'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FunnelBuilderModal;