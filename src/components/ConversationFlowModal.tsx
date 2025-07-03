import React, { useState } from 'react';
import { 
  X, Save, Plus, Trash2, MessageCircle, Mail, Phone, 
  Clock, Settings, Zap, ArrowRight, Copy, Edit3
} from 'lucide-react';

interface FlowMessage {
  id: string;
  type: 'text' | 'image' | 'video' | 'button' | 'delay';
  content: string;
  delay?: number;
  buttons?: { text: string; action: string }[];
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
  flowMessages: FlowMessage[];
}

interface ConversationFlowModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (flow: ConversationFlow) => void;
  flow?: ConversationFlow | null;
  mode: 'create' | 'edit';
}

const ConversationFlowModal: React.FC<ConversationFlowModalProps> = ({
  isOpen,
  onClose,
  onSave,
  flow,
  mode
}) => {
  const [activeTab, setActiveTab] = useState('settings');
  const [flowData, setFlowData] = useState<ConversationFlow>({
    id: flow?.id || Date.now().toString(),
    name: flow?.name || '',
    description: flow?.description || '',
    platform: flow?.platform || 'whatsapp',
    status: flow?.status || 'draft',
    triggers: flow?.triggers || [],
    messages: flow?.messages || 0,
    conversions: flow?.conversions || 0,
    createdAt: flow?.createdAt || new Date(),
    flowMessages: flow?.flowMessages || []
  });

  const [newTrigger, setNewTrigger] = useState('');

  if (!isOpen) return null;

  const platforms = [
    { id: 'whatsapp', name: 'WhatsApp', icon: MessageCircle, color: 'text-green-600' },
    { id: 'telegram', name: 'Telegram', icon: MessageCircle, color: 'text-blue-600' },
    { id: 'messenger', name: 'Messenger', icon: MessageCircle, color: 'text-purple-600' },
    { id: 'email', name: 'Email', icon: Mail, color: 'text-red-600' },
    { id: 'sms', name: 'SMS', icon: Phone, color: 'text-orange-600' }
  ];

  const messageTypes = [
    { type: 'text', name: 'Texto', icon: MessageCircle },
    { type: 'image', name: 'Imagem', icon: MessageCircle },
    { type: 'video', name: 'Vídeo', icon: MessageCircle },
    { type: 'button', name: 'Botões', icon: MessageCircle },
    { type: 'delay', name: 'Aguardar', icon: Clock }
  ];

  const addTrigger = () => {
    if (newTrigger.trim()) {
      setFlowData(prev => ({
        ...prev,
        triggers: [...prev.triggers, newTrigger.trim()]
      }));
      setNewTrigger('');
    }
  };

  const removeTrigger = (index: number) => {
    setFlowData(prev => ({
      ...prev,
      triggers: prev.triggers.filter((_, i) => i !== index)
    }));
  };

  const addMessage = (type: string) => {
    const newMessage: FlowMessage = {
      id: Date.now().toString(),
      type: type as any,
      content: type === 'delay' ? '5' : '',
      delay: type === 'delay' ? 5 : undefined,
      buttons: type === 'button' ? [{ text: 'Sim', action: 'continue' }] : undefined
    };

    setFlowData(prev => ({
      ...prev,
      flowMessages: [...prev.flowMessages, newMessage]
    }));
  };

  const updateMessage = (messageId: string, updates: Partial<FlowMessage>) => {
    setFlowData(prev => ({
      ...prev,
      flowMessages: prev.flowMessages.map(msg => 
        msg.id === messageId ? { ...msg, ...updates } : msg
      )
    }));
  };

  const removeMessage = (messageId: string) => {
    setFlowData(prev => ({
      ...prev,
      flowMessages: prev.flowMessages.filter(msg => msg.id !== messageId)
    }));
  };

  const handleSave = () => {
    onSave(flowData);
    onClose();
  };

  const MessageCard = ({ message, index }: { message: FlowMessage; index: number }) => {
    const getMessageIcon = () => {
      switch (message.type) {
        case 'text': return <MessageCircle className="h-4 w-4" />;
        case 'image': return <MessageCircle className="h-4 w-4" />;
        case 'video': return <MessageCircle className="h-4 w-4" />;
        case 'button': return <MessageCircle className="h-4 w-4" />;
        case 'delay': return <Clock className="h-4 w-4" />;
        default: return <MessageCircle className="h-4 w-4" />;
      }
    };

    return (
      <div className="relative">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="p-1 bg-blue-100 dark:bg-blue-900/30 rounded">
                {getMessageIcon()}
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                {message.type === 'delay' ? 'Aguardar' : message.type}
              </span>
            </div>
            <button
              onClick={() => removeMessage(message.id)}
              className="p-1 text-gray-400 hover:text-red-600 transition-colors duration-300"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          {message.type === 'delay' ? (
            <div>
              <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                Tempo (minutos)
              </label>
              <input
                type="number"
                value={message.delay || 5}
                onChange={(e) => updateMessage(message.id, { 
                  delay: parseInt(e.target.value) || 5,
                  content: e.target.value 
                })}
                className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          ) : (
            <div>
              <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                Conteúdo
              </label>
              <textarea
                value={message.content}
                onChange={(e) => updateMessage(message.id, { content: e.target.value })}
                rows={3}
                className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder={`Digite o ${message.type}...`}
              />
            </div>
          )}

          {message.type === 'button' && (
            <div className="mt-2">
              <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                Botões
              </label>
              {message.buttons?.map((button, btnIndex) => (
                <div key={btnIndex} className="flex items-center space-x-2 mb-1">
                  <input
                    type="text"
                    value={button.text}
                    onChange={(e) => {
                      const newButtons = [...(message.buttons || [])];
                      newButtons[btnIndex] = { ...button, text: e.target.value };
                      updateMessage(message.id, { buttons: newButtons });
                    }}
                    className="flex-1 px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Texto do botão"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {index < flowData.flowMessages.length - 1 && (
          <div className="flex justify-center my-2">
            <ArrowRight className="h-4 w-4 text-gray-400" />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
              <MessageCircle className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {mode === 'create' ? 'Novo Fluxo de Conversa' : `Editar: ${flow?.name}`}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {mode === 'create' ? 'Crie um fluxo automatizado' : 'Edite o fluxo de conversa'}
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
              { id: 'builder', label: 'Construtor', icon: MessageCircle },
              { id: 'triggers', label: 'Gatilhos', icon: Zap }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-300 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
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
        <div className="h-[500px] overflow-y-auto">
          {activeTab === 'settings' && (
            <div className="p-6">
              <div className="max-w-2xl space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nome do Fluxo *
                  </label>
                  <input
                    type="text"
                    value={flowData.name}
                    onChange={(e) => setFlowData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Ex: Boas-vindas WhatsApp"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Descrição
                  </label>
                  <textarea
                    value={flowData.description}
                    onChange={(e) => setFlowData(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Descreva o objetivo do fluxo..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Plataforma
                    </label>
                    <select
                      value={flowData.platform}
                      onChange={(e) => setFlowData(prev => ({ ...prev, platform: e.target.value as any }))}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    >
                      {platforms.map(platform => (
                        <option key={platform.id} value={platform.id}>
                          {platform.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Status
                    </label>
                    <select
                      value={flowData.status}
                      onChange={(e) => setFlowData(prev => ({ ...prev, status: e.target.value as any }))}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    >
                      <option value="draft">Rascunho</option>
                      <option value="active">Ativo</option>
                      <option value="paused">Pausado</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'builder' && (
            <div className="flex h-full">
              {/* Message Types */}
              <div className="w-64 bg-gray-50 dark:bg-gray-700 p-4 border-r border-gray-200 dark:border-gray-600">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Tipos de Mensagem</h3>
                <div className="space-y-2">
                  {messageTypes.map((msgType) => {
                    const Icon = msgType.icon;
                    return (
                      <button
                        key={msgType.type}
                        onClick={() => addMessage(msgType.type)}
                        className="w-full flex items-center space-x-2 p-3 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-300"
                      >
                        <Icon className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {msgType.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Flow Canvas */}
              <div className="flex-1 p-6">
                {flowData.flowMessages.length === 0 ? (
                  <div className="text-center py-12">
                    <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Construa seu fluxo
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Adicione mensagens da barra lateral para criar seu fluxo
                    </p>
                    <button
                      onClick={() => addMessage('text')}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg"
                    >
                      Adicionar Primeira Mensagem
                    </button>
                  </div>
                ) : (
                  <div className="max-w-md mx-auto space-y-4">
                    {flowData.flowMessages.map((message, index) => (
                      <MessageCard key={message.id} message={message} index={index} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'triggers' && (
            <div className="p-6">
              <div className="max-w-2xl space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Gatilhos do Fluxo
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Configure quando este fluxo deve ser ativado
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Adicionar Gatilho
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newTrigger}
                      onChange={(e) => setNewTrigger(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addTrigger()}
                      className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Ex: palavra-chave: oi, evento: novo lead"
                    />
                    <button
                      onClick={addTrigger}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                    Gatilhos Configurados
                  </h4>
                  {flowData.triggers.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Nenhum gatilho configurado
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {flowData.triggers.map((trigger, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <span className="text-gray-900 dark:text-white">{trigger}</span>
                          <button
                            onClick={() => removeTrigger(index)}
                            className="p-1 text-gray-400 hover:text-red-600 transition-colors duration-300"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                    Exemplos de Gatilhos
                  </h4>
                  <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                    <li>• palavra-chave: oi, olá, help</li>
                    <li>• evento: novo lead, carrinho abandonado</li>
                    <li>• ação: download e-book, inscrição</li>
                    <li>• tempo: após 24h sem interação</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-4 p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300"
          >
            <Save className="h-4 w-4" />
            <span>{mode === 'create' ? 'Criar Fluxo' : 'Salvar Alterações'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConversationFlowModal;