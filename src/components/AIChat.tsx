import { useState } from 'react';
import { motion } from 'framer-motion';

// AI Models Configuration
export interface AIModel {
  id: string;
  name: string;
  provider: string;
  description: string;
  maxTokens: number;
  costPer1K: number;
  icon: string;
  capabilities: string[];
  category: 'text' | 'code' | 'image' | 'multimodal';
}

export const availableModels: AIModel[] = [
  {
    id: 'gpt-4-turbo',
    name: 'GPT-4 Turbo',
    provider: 'OpenAI',
    description: 'Most capable model for complex reasoning tasks',
    maxTokens: 128000,
    costPer1K: 0.03,
    icon: '🤖',
    capabilities: ['Text Generation', 'Code', 'Analysis', 'Math'],
    category: 'text'
  },
  {
    id: 'claude-3-sonnet',
    name: 'Claude 3 Sonnet',
    provider: 'Anthropic',
    description: 'Balanced model for general tasks',
    maxTokens: 200000,
    costPer1K: 0.015,
    icon: '🧠',
    capabilities: ['Text Generation', 'Code', 'Analysis', 'Creative Writing'],
    category: 'text'
  },
  {
    id: 'gemini-pro',
    name: 'Gemini Pro',
    provider: 'Google',
    description: 'Multimodal AI with strong reasoning capabilities',
    maxTokens: 32000,
    costPer1K: 0.0005,
    icon: '✨',
    capabilities: ['Text', 'Images', 'Code', 'Multimodal'],
    category: 'multimodal'
  },
  {
    id: 'llama-2-70b',
    name: 'Llama 2 70B',
    provider: 'Meta',
    description: 'Open-source model with strong performance',
    maxTokens: 4096,
    costPer1K: 0.0015,
    icon: '🦙',
    capabilities: ['Text Generation', 'Code', 'Reasoning'],
    category: 'text'
  },
  {
    id: 'codellama-34b',
    name: 'CodeLlama 34B',
    provider: 'Meta',
    description: 'Specialized for code generation and programming',
    maxTokens: 16384,
    costPer1K: 0.001,
    icon: '💻',
    capabilities: ['Code Generation', 'Debugging', 'Code Review'],
    category: 'code'
  },
  {
    id: 'dall-e-3',
    name: 'DALL-E 3',
    provider: 'OpenAI',
    description: 'Advanced image generation model',
    maxTokens: 0,
    costPer1K: 0.04,
    icon: '🎨',
    capabilities: ['Image Generation', 'Creative Art', 'Visual Design'],
    category: 'image'
  }
];

// Chat Message Interface
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  model?: string;
  tokens?: number;
  cost?: number;
}

// AI Chat Component
export const AIChat = () => {
  const [selectedModel, setSelectedModel] = useState<AIModel>(availableModels[0]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiUsage, setApiUsage] = useState({
    totalRequests: 0,
    totalTokens: 0,
    totalCost: 0,
    remainingCredits: 100
  });

  // Simulate API call to multiple AI models
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate API response based on selected model
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay

      const responseContent = generateMockResponse(input, selectedModel);
      const tokens = Math.floor(Math.random() * 500) + 100;
      const cost = (tokens / 1000) * selectedModel.costPer1K;

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseContent,
        timestamp: new Date(),
        model: selectedModel.name,
        tokens,
        cost
      };

      setMessages(prev => [...prev, assistantMessage]);
      
      // Update usage statistics
      setApiUsage(prev => ({
        totalRequests: prev.totalRequests + 1,
        totalTokens: prev.totalTokens + tokens,
        totalCost: prev.totalCost + cost,
        remainingCredits: prev.remainingCredits - cost
      }));

    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Generate mock responses based on model characteristics
  const generateMockResponse = (prompt: string, model: AIModel): string => {
    const responses: Record<string, string> = {
      'gpt-4-turbo': `[GPT-4 Turbo Response] I understand your question about "${prompt}". As GPT-4 Turbo, I can provide detailed analysis with advanced reasoning capabilities. This would typically involve comprehensive research and nuanced understanding of the topic.`,
      'claude-3-sonnet': `[Claude 3 Sonnet Response] Thank you for your question about "${prompt}". I'm Claude, and I approach this with careful consideration. Let me provide a balanced perspective with thoughtful analysis and clear explanations.`,
      'gemini-pro': `[Gemini Pro Response] Analyzing your query: "${prompt}". As a multimodal AI, I can process this request with advanced reasoning. I can work with text, images, and complex data to provide comprehensive insights.`,
      'llama-2-70b': `[Llama 2 70B Response] Processing your request about "${prompt}". As an open-source model, I focus on providing reliable and well-reasoned responses while maintaining transparency in my capabilities.`,
      'codellama-34b': `[CodeLlama Response] Interpreting your coding query: "${prompt}". I specialize in programming tasks and can help with code generation, debugging, optimization, and technical explanations.`,
      'dall-e-3': `[DALL-E 3 Response] I've received your image generation request: "${prompt}". I would create a detailed, high-quality image based on your description. (Note: This is a text simulation - actual image generation would occur in a real implementation)`
    };

    return responses[model.id] || `[${model.name} Response] Processing your request about "${prompt}"...`;
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-2">
          AI Router <span className="bg-gradient-to-r from-purple-500 to-blue-400 text-transparent bg-clip-text">Hub</span>
        </h1>
        <p className="text-gray-400">Access multiple AI models with a single API key</p>
      </div>

      {/* Usage Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-xl border border-gray-700">
          <div className="text-sm text-gray-400 mb-1">Requests</div>
          <div className="text-2xl font-bold text-white">{apiUsage.totalRequests}</div>
        </div>
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-xl border border-gray-700">
          <div className="text-sm text-gray-400 mb-1">Tokens Used</div>
          <div className="text-2xl font-bold text-white">{apiUsage.totalTokens.toLocaleString()}</div>
        </div>
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-xl border border-gray-700">
          <div className="text-sm text-gray-400 mb-1">Total Cost</div>
          <div className="text-2xl font-bold text-white">${apiUsage.totalCost.toFixed(4)}</div>
        </div>
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-xl border border-gray-700">
          <div className="text-sm text-gray-400 mb-1">Credits Left</div>
          <div className="text-2xl font-bold text-green-400">${apiUsage.remainingCredits.toFixed(2)}</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Model Selection Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-4">Select AI Model</h2>
            <div className="space-y-3">
              {availableModels.map((model) => (
                <motion.button
                  key={model.id}
                  onClick={() => setSelectedModel(model)}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    selectedModel.id === model.id
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500'
                      : 'bg-gray-700/50 hover:bg-gray-600/50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{model.icon}</span>
                    <div className="flex-1">
                      <div className="font-semibold text-white text-sm">{model.name}</div>
                      <div className="text-xs text-gray-300">{model.provider}</div>
                      <div className="text-xs text-gray-400">${model.costPer1K}/1K tokens</div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Selected Model Details */}
            <div className="mt-6 p-4 bg-gray-700/30 rounded-lg">
              <h3 className="font-semibold text-white mb-2">{selectedModel.name}</h3>
              <p className="text-sm text-gray-400 mb-3">{selectedModel.description}</p>
              <div className="space-y-1 text-xs">
                <div className="text-gray-400">Max Tokens: {selectedModel.maxTokens.toLocaleString()}</div>
                <div className="text-gray-400">Category: {selectedModel.category}</div>
              </div>
              <div className="mt-2">
                <div className="text-xs text-gray-400 mb-1">Capabilities:</div>
                <div className="flex flex-wrap gap-1">
                  {selectedModel.capabilities.map((cap) => (
                    <span key={cap} className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded text-xs">
                      {cap}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 h-[600px] flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{selectedModel.icon}</span>
                <div>
                  <div className="font-semibold text-white">{selectedModel.name}</div>
                  <div className="text-sm text-gray-400">Ready to assist</div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.length === 0 ? (
                <div className="text-center text-gray-400 mt-20">
                  <div className="text-4xl mb-4">{selectedModel.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">Start a conversation</h3>
                  <p>Ask {selectedModel.name} anything you'd like to know</p>
                </div>
              ) : (
                messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[80%] p-3 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                        : 'bg-gray-700 text-gray-100'
                    }`}>
                      <div className="text-sm">{message.content}</div>
                      {message.role === 'assistant' && (
                        <div className="text-xs text-gray-400 mt-2 flex justify-between">
                          <span>{message.model}</span>
                          <span>{message.tokens} tokens • ${message.cost?.toFixed(4)}</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))
              )}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-700 p-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-700">
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !isLoading && sendMessage()}
                  placeholder={`Message ${selectedModel.name}...`}
                  className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  disabled={isLoading}
                />
                <button
                  onClick={sendMessage}
                  disabled={isLoading || !input.trim()}
                  className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? '...' : 'Send'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};