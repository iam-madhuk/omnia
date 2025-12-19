// import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'

interface AIModel {
  id: string
  name: string
  icon: string
  provider: string
  description: string
  maxTokens: number
  costPer1K: number
  category: string
  capabilities: string[]
}

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  model?: string
  tokens?: number
  cost?: number
}

interface APIUsage {
  totalRequests: number
  totalTokens: number
  totalCost: number
  remainingCredits: number
}

export default function AIChatNew() {
  const [selectedModel, setSelectedModel] = useState<AIModel>({
    id: 'gpt-4',
    name: 'GPT-4',
    icon: '🤖',
    provider: 'OpenAI',
    description: 'Most capable GPT model, best for complex reasoning tasks',
    maxTokens: 8192,
    costPer1K: 0.03,
    category: 'General',
    capabilities: ['Reasoning', 'Code', 'Creative Writing', 'Analysis']
  })

  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const availableModels: AIModel[] = [
    {
      id: 'gpt-4',
      name: 'GPT-4',
      icon: '🤖',
      provider: 'OpenAI',
      description: 'Most capable GPT model, best for complex reasoning tasks',
      maxTokens: 8192,
      costPer1K: 0.03,
      category: 'General',
      capabilities: ['Reasoning', 'Code', 'Creative Writing', 'Analysis']
    },
    {
      id: 'claude-3.5-sonnet',
      name: 'Claude 3.5 Sonnet',
      icon: '🧠',
      provider: 'Anthropic',
      description: 'Advanced AI assistant with strong reasoning capabilities',
      maxTokens: 200000,
      costPer1K: 0.015,
      category: 'General',
      capabilities: ['Analysis', 'Writing', 'Code', 'Math']
    },
    {
      id: 'gpt-3.5-turbo',
      name: 'GPT-3.5 Turbo',
      icon: '⚡',
      provider: 'OpenAI',
      description: 'Fast and efficient model for most tasks',
      maxTokens: 16385,
      costPer1K: 0.002,
      category: 'General',
      capabilities: ['Chat', 'Code', 'Writing']
    },
    {
      id: 'llama-2-70b',
      name: 'Llama 2 70B',
      icon: '🦙',
      provider: 'Meta',
      description: 'Open-source large language model',
      maxTokens: 4096,
      costPer1K: 0.0008,
      category: 'Open Source',
      capabilities: ['Chat', 'Code', 'Reasoning']
    }
  ]

  const apiUsage: APIUsage = {
    totalRequests: 1247,
    totalTokens: 89543,
    totalCost: 12.34,
    remainingCredits: 487.66
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `This is a response from ${selectedModel.name}. I understand your message: "${userMessage.content}". How can I help you further?`,
        timestamp: new Date(),
        model: selectedModel.name,
        tokens: Math.floor(Math.random() * 1000) + 100,
        cost: Math.random() * 0.01 + 0.001
      }

      setMessages(prev => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1000 + Math.random() * 2000)
  }

  return (
    <div className="h-full flex flex-col bg-[#0a0f1c]">
      {/* Header Section */}
      <div className="border-b border-gray-700 p-4">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-white mb-1">
            AI Router <span className="bg-gradient-to-r from-purple-500 to-blue-400 text-transparent bg-clip-text">Hub</span>
          </h1>
          <p className="text-gray-400 text-sm">Access multiple AI models with a single API key</p>
        </div>

        {/* Usage Stats - Horizontal Layout */}
        <div className="grid grid-cols-4 gap-3">
          <div className="bg-gray-800/50 p-3 rounded-lg text-center">
            <div className="text-xs text-gray-400 mb-1">Requests</div>
            <div className="text-lg font-bold text-white">{apiUsage.totalRequests}</div>
          </div>
          <div className="bg-gray-800/50 p-3 rounded-lg text-center">
            <div className="text-xs text-gray-400 mb-1">Tokens</div>
            <div className="text-lg font-bold text-white">{apiUsage.totalTokens}</div>
          </div>
          <div className="bg-gray-800/50 p-3 rounded-lg text-center">
            <div className="text-xs text-gray-400 mb-1">Cost</div>
            <div className="text-lg font-bold text-white">${apiUsage.totalCost.toFixed(4)}</div>
          </div>
          <div className="bg-gray-800/50 p-3 rounded-lg text-center">
            <div className="text-xs text-gray-400 mb-1">Credits</div>
            <div className="text-lg font-bold text-green-400">${apiUsage.remainingCredits.toFixed(2)}</div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex min-h-0">
        {/* Model Selection Sidebar */}
        <div className="w-72 border-r border-gray-700 flex flex-col">
          <div className="p-4 border-b border-gray-700">
            <h2 className="text-sm font-semibold text-white mb-3">AI Models</h2>
            <div className="space-y-1 max-h-48 overflow-y-auto">
              {availableModels.map((model) => (
                <button
                  key={model.id}
                  onClick={() => setSelectedModel(model)}
                  className={`w-full text-left p-2 rounded transition-colors ${
                    selectedModel.id === model.id
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">{model.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{model.name}</div>
                      <div className="text-xs text-gray-400 truncate">{model.provider}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Selected Model Info */}
          <div className="p-4 flex-1">
            <div className="bg-gray-800/30 p-3 rounded-lg">
              <h3 className="text-sm font-semibold text-white mb-2">{selectedModel.name}</h3>
              <p className="text-xs text-gray-400 mb-3">{selectedModel.description}</p>
              <div className="space-y-1 text-xs text-gray-500">
                <div>Max Tokens: {selectedModel.maxTokens.toLocaleString()}</div>
                <div>Cost: ${selectedModel.costPer1K}/1K tokens</div>
                <div>Category: {selectedModel.category}</div>
              </div>
              <div className="mt-2">
                <div className="text-xs text-gray-400 mb-1">Capabilities:</div>
                <div className="flex flex-wrap gap-1">
                  {selectedModel.capabilities.slice(0, 3).map((cap) => (
                    <span key={cap} className="bg-purple-500/20 text-purple-300 px-1 py-0.5 rounded text-xs">
                      {cap}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-3 border-b border-gray-700 bg-gray-800/30">
            <div className="flex items-center space-x-2">
              <span className="text-lg">{selectedModel.icon}</span>
              <div>
                <div className="text-sm font-semibold text-white">{selectedModel.name}</div>
                <div className="text-xs text-gray-400">Ready to assist</div>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-center">
                <div>
                  <div className="text-4xl mb-3">{selectedModel.icon}</div>
                  <h3 className="text-lg font-semibold text-white mb-2">Start a conversation</h3>
                  <p className="text-gray-400">Ask {selectedModel.name} anything you'd like to know</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.role === 'user'
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-700 text-gray-100'
                      }`}
                    >
                      <div className="text-sm">{message.content}</div>
                      {message.model && (
                        <div className="text-xs text-gray-300 mt-2">
                          {message.model} • {message.tokens} tokens • ${message.cost?.toFixed(4)}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-700 p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-700">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !isLoading && sendMessage()}
                placeholder={`Message ${selectedModel.name}...`}
                className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
              >
                {isLoading ? '...' : 'Send'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}