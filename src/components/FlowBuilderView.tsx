import React, { useState, useRef, useEffect } from 'react';
import { 
  MousePointer, CreditCard, Gift, CheckCircle, Mail, Clock, 
  Plus, Settings, Trash2, Copy, ArrowRight, Zap, Users,
  DollarSign, BarChart3, Eye, Edit3, Move, Link2
} from 'lucide-react';

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

interface FlowBuilderViewProps {
  steps: FunnelStep[];
  onStepUpdate: (stepId: string, updates: Partial<FunnelStep>) => void;
  onStepAdd: (step: FunnelStep) => void;
  onStepRemove: (stepId: string) => void;
  onStepSelect: (step: FunnelStep | null) => void;
  selectedStep: FunnelStep | null;
  isEditable?: boolean;
}

const FlowBuilderView: React.FC<FlowBuilderViewProps> = ({
  steps,
  onStepUpdate,
  onStepAdd,
  onStepRemove,
  onStepSelect,
  selectedStep,
  isEditable = true
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [canvasOffset, setCanvasOffset] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [showGrid, setShowGrid] = useState(true);

  const stepTypes = [
    { 
      type: 'landing', 
      name: 'Landing Page', 
      icon: MousePointer, 
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-200 dark:border-blue-700'
    },
    { 
      type: 'checkout', 
      name: 'Checkout', 
      icon: CreditCard, 
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      borderColor: 'border-green-200 dark:border-green-700'
    },
    { 
      type: 'upsell', 
      name: 'Upsell', 
      icon: Gift, 
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      borderColor: 'border-purple-200 dark:border-purple-700'
    },
    { 
      type: 'downsell', 
      name: 'Downsell', 
      icon: Gift, 
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      borderColor: 'border-orange-200 dark:border-orange-700'
    },
    { 
      type: 'thankyou', 
      name: 'Obrigado', 
      icon: CheckCircle, 
      color: 'from-green-400 to-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      borderColor: 'border-green-200 dark:border-green-700'
    },
    { 
      type: 'email', 
      name: 'Email', 
      icon: Mail, 
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      borderColor: 'border-red-200 dark:border-red-700'
    },
    { 
      type: 'wait', 
      name: 'Aguardar', 
      icon: Clock, 
      color: 'from-gray-500 to-gray-600',
      bgColor: 'bg-gray-50 dark:bg-gray-900/20',
      borderColor: 'border-gray-200 dark:border-gray-700'
    }
  ];

  const getStepConfig = (type: string) => {
    return stepTypes.find(st => st.type === type) || stepTypes[0];
  };

  const handleStepDrag = (stepId: string, newPosition: { x: number; y: number }) => {
    if (!isEditable) return;
    onStepUpdate(stepId, { position: newPosition });
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onStepSelect(null);
    }
  };

  const addNewStep = (type: string, position: { x: number; y: number }) => {
    if (!isEditable) return;
    
    const stepConfig = getStepConfig(type);
    const newStep: FunnelStep = {
      id: Date.now().toString(),
      name: stepConfig.name,
      type: type as any,
      visitors: 0,
      conversions: 0,
      conversionRate: 0,
      position,
      settings: {},
      connections: []
    };
    
    onStepAdd(newStep);
  };

  const StepNode = ({ step }: { step: FunnelStep }) => {
    const [isDraggingStep, setIsDraggingStep] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const stepConfig = getStepConfig(step.type);
    const Icon = stepConfig.icon;

    const handleMouseDown = (e: React.MouseEvent) => {
      if (!isEditable) return;
      
      e.preventDefault();
      setIsDraggingStep(true);
      setDragStart({
        x: e.clientX - step.position.x,
        y: e.clientY - step.position.y
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingStep || !isEditable) return;
      
      const newPosition = {
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      };
      
      handleStepDrag(step.id, newPosition);
    };

    const handleMouseUp = () => {
      setIsDraggingStep(false);
    };

    useEffect(() => {
      if (isDraggingStep) {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        return () => {
          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('mouseup', handleMouseUp);
        };
      }
    }, [isDraggingStep, dragStart]);

    const isSelected = selectedStep?.id === step.id;

    return (
      <div
        className={`absolute cursor-pointer transition-all duration-200 ${
          isDraggingStep ? 'z-50' : 'z-10'
        }`}
        style={{
          left: step.position.x,
          top: step.position.y,
          transform: `scale(${zoom})`
        }}
        onMouseDown={handleMouseDown}
        onClick={(e) => {
          e.stopPropagation();
          onStepSelect(step);
        }}
      >
        <div
          className={`relative bg-white dark:bg-gray-800 rounded-xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
            isSelected 
              ? 'border-purple-500 shadow-purple-200 dark:shadow-purple-900/50' 
              : `${stepConfig.borderColor} hover:border-purple-300`
          } ${isDraggingStep ? 'scale-105' : ''}`}
          style={{ width: '280px', minHeight: '160px' }}
        >
          {/* Header */}
          <div className={`${stepConfig.bgColor} p-4 rounded-t-xl border-b ${stepConfig.borderColor}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${stepConfig.color}`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                    {step.name}
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 capitalize">
                    {stepConfig.name}
                  </p>
                </div>
              </div>
              
              {isEditable && (
                <div className="flex items-center space-x-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle duplicate
                    }}
                    className="p-1 text-gray-400 hover:text-blue-600 transition-colors duration-300"
                    title="Duplicar"
                  >
                    <Copy className="h-3 w-3" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onStepRemove(step.id);
                    }}
                    className="p-1 text-gray-400 hover:text-red-600 transition-colors duration-300"
                    title="Remover"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Metrics */}
            <div className="grid grid-cols-3 gap-3 mb-3">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <Users className="h-3 w-3 text-gray-500" />
                  <span className="text-xs text-gray-500 dark:text-gray-400">Visitantes</span>
                </div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {step.visitors.toLocaleString()}
                </p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-gray-500 dark:text-gray-400">Conversões</span>
                </div>
                <p className="text-sm font-semibold text-green-600">
                  {step.conversions}
                </p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <BarChart3 className="h-3 w-3 text-purple-500" />
                  <span className="text-xs text-gray-500 dark:text-gray-400">Taxa</span>
                </div>
                <p className="text-sm font-semibold text-purple-600">
                  {step.conversionRate}%
                </p>
              </div>
            </div>

            {/* Settings Preview */}
            {step.settings.price && (
              <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400 mb-2">
                <DollarSign className="h-3 w-3" />
                <span>R$ {step.settings.price.toLocaleString()}</span>
              </div>
            )}
            
            {step.settings.delay && (
              <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400 mb-2">
                <Clock className="h-3 w-3" />
                <span>{step.settings.delay} min</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onStepSelect(step);
                }}
                className="flex items-center space-x-1 px-2 py-1 text-xs text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded transition-colors duration-300"
              >
                <Settings className="h-3 w-3" />
                <span>Config</span>
              </button>
              
              <button
                className="flex items-center space-x-1 px-2 py-1 text-xs text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded transition-colors duration-300"
              >
                <Eye className="h-3 w-3" />
                <span>Preview</span>
              </button>
            </div>
          </div>

          {/* Connection Points */}
          <div className="absolute -right-2 top-1/2 transform -translate-y-1/2">
            <div className="w-4 h-4 bg-purple-500 rounded-full border-2 border-white dark:border-gray-800 shadow-lg"></div>
          </div>
          <div className="absolute -left-2 top-1/2 transform -translate-y-1/2">
            <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded-full border-2 border-white dark:border-gray-800 shadow-lg"></div>
          </div>
        </div>
      </div>
    );
  };

  const ConnectionLine = ({ from, to }: { from: FunnelStep; to: FunnelStep }) => {
    const startX = from.position.x + 280;
    const startY = from.position.y + 80;
    const endX = to.position.x;
    const endY = to.position.y + 80;

    const midX = startX + (endX - startX) / 2;

    return (
      <svg
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
      >
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon
              points="0 0, 10 3.5, 0 7"
              fill="#8b5cf6"
            />
          </marker>
        </defs>
        <path
          d={`M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}`}
          stroke="#8b5cf6"
          strokeWidth="2"
          fill="none"
          markerEnd="url(#arrowhead)"
          className="drop-shadow-sm"
        />
      </svg>
    );
  };

  const GridPattern = () => {
    if (!showGrid) return null;

    return (
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <pattern
              id="grid"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-gray-300 dark:text-gray-600"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
    );
  };

  return (
    <div className="relative w-full h-full bg-gray-50 dark:bg-gray-900 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
      {/* Toolbar */}
      <div className="absolute top-4 left-4 z-20 flex items-center space-x-2">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-2">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setZoom(Math.min(zoom + 0.1, 2))}
              className="p-1 text-gray-600 dark:text-gray-400 hover:text-purple-600 transition-colors duration-300"
              title="Zoom In"
            >
              <Plus className="h-4 w-4" />
            </button>
            <span className="text-xs text-gray-600 dark:text-gray-400 min-w-[3rem] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom(Math.max(zoom - 0.1, 0.5))}
              className="p-1 text-gray-600 dark:text-gray-400 hover:text-purple-600 transition-colors duration-300"
              title="Zoom Out"
            >
              <Trash2 className="h-4 w-4 rotate-45" />
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-2">
          <button
            onClick={() => setShowGrid(!showGrid)}
            className={`p-1 transition-colors duration-300 ${
              showGrid 
                ? 'text-purple-600' 
                : 'text-gray-600 dark:text-gray-400 hover:text-purple-600'
            }`}
            title="Toggle Grid"
          >
            <BarChart3 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Step Palette */}
      {isEditable && (
        <div className="absolute top-4 right-4 z-20">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-3">
            <h4 className="text-xs font-semibold text-gray-900 dark:text-white mb-2">
              Adicionar Etapa
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {stepTypes.slice(0, 6).map((stepType) => {
                const Icon = stepType.icon;
                return (
                  <button
                    key={stepType.type}
                    onClick={() => addNewStep(stepType.type, { x: 100, y: 100 })}
                    className={`flex flex-col items-center p-2 rounded-lg border-2 border-dashed transition-all duration-300 hover:scale-105 ${stepType.borderColor} hover:border-purple-400 ${stepType.bgColor} hover:bg-purple-50 dark:hover:bg-purple-900/20`}
                    title={stepType.name}
                  >
                    <div className={`p-1 rounded bg-gradient-to-r ${stepType.color} mb-1`}>
                      <Icon className="h-3 w-3 text-white" />
                    </div>
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                      {stepType.name.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Canvas */}
      <div
        ref={canvasRef}
        className="relative w-full h-full cursor-grab active:cursor-grabbing"
        onClick={handleCanvasClick}
        style={{
          transform: `translate(${canvasOffset.x}px, ${canvasOffset.y}px)`
        }}
      >
        <GridPattern />

        {/* Connection Lines */}
        {steps.map((step, index) => {
          if (index < steps.length - 1) {
            return (
              <ConnectionLine
                key={`${step.id}-${steps[index + 1].id}`}
                from={step}
                to={steps[index + 1]}
              />
            );
          }
          return null;
        })}

        {/* Step Nodes */}
        {steps.map((step) => (
          <StepNode key={step.id} step={step} />
        ))}

        {/* Empty State */}
        {steps.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-gray-400 mb-4">
                <Zap className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Canvas Vazio
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {isEditable 
                  ? 'Adicione etapas usando a paleta no canto superior direito'
                  : 'Nenhuma etapa configurada neste funil'
                }
              </p>
              {isEditable && (
                <button
                  onClick={() => addNewStep('landing', { x: 200, y: 200 })}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  Adicionar Primeira Etapa
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mini Map */}
      <div className="absolute bottom-4 right-4 z-20">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-2">
          <div className="w-32 h-20 bg-gray-100 dark:bg-gray-700 rounded relative overflow-hidden">
            {steps.map((step) => (
              <div
                key={step.id}
                className="absolute w-2 h-2 bg-purple-500 rounded-full"
                style={{
                  left: (step.position.x / 10) + 'px',
                  top: (step.position.y / 10) + 'px'
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlowBuilderView;