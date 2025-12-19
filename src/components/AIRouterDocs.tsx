import { motion } from 'framer-motion';

export const AIRouterDocs = () => {
  const codeExample = `// Example: Using Omnia AI Router API
const response = await fetch('https://api.omnia-ai.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer omn_your_api_key_here',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'gpt-4-turbo', // or claude-3-sonnet, gemini-pro, etc.
    messages: [
      { role: 'user', content: 'Hello, how are you?' }
    ],
    max_tokens: 150
  })
});

const data = await response.json();
console.log(data.choices[0].message.content);`;

  const features = [
    {
      title: 'Unified API',
      description: 'Access 20+ AI models through a single API endpoint',
      icon: '🔗',
      details: [
        'OpenAI GPT-4, GPT-3.5',
        'Anthropic Claude family',
        'Google Gemini Pro',
        'Meta Llama 2 & CodeLlama',
        'Cohere Command models',
        'And many more...'
      ]
    },
    {
      title: 'Smart Routing',
      description: 'Automatically route requests to the best available model',
      icon: '🧠',
      details: [
        'Fallback handling',
        'Load balancing',
        'Cost optimization',
        'Performance routing',
        'Real-time switching',
        'Intelligent caching'
      ]
    },
    {
      title: 'Cost Management',
      description: 'Track usage and optimize costs across all providers',
      icon: '💰',
      details: [
        'Real-time usage tracking',
        'Cost per request',
        'Budget alerts',
        'Provider comparison',
        'Usage analytics',
        'Credit management'
      ]
    },
    {
      title: 'Developer Friendly',
      description: 'Simple integration with comprehensive documentation',
      icon: '👨‍💻',
      details: [
        'RESTful API',
        'SDKs for popular languages',
        'Webhook support',
        'Rate limiting',
        'Error handling',
        'Comprehensive docs'
      ]
    }
  ];

  return (
    <div className="h-full flex flex-col p-6">
      <div className="max-w-6xl mx-auto w-full flex-1 overflow-y-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            AI Router <span className="bg-gradient-to-r from-purple-500 to-blue-400 text-transparent bg-clip-text">Documentation</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            One API to rule them all. Access multiple AI providers through a single, unified interface.
          </p>
        </div>

        {/* Quick Start */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Quick Start</h2>
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">1. Get Your API Key</h3>
                <p className="text-gray-400 text-sm">
                  After logging in, navigate to the API Management section to generate your unique API key.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">2. Make Your First Request</h3>
                <p className="text-gray-400 text-sm">
                  Use our unified API to access any of the supported AI models with a simple HTTP request.
                </p>
              </div>
            </div>
            
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-600 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">JavaScript Example</span>
                <button className="text-gray-400 hover:text-white text-sm flex-shrink-0">📋 Copy</button>
              </div>
              <div className="overflow-x-auto">
                <pre className="text-xs text-green-400 whitespace-pre">
                  <code>{codeExample}</code>
                </pre>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Features */}
        <section>
          <h2 className="text-3xl font-bold text-white text-center mb-8">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{feature.description}</p>
              <ul className="space-y-1">
                {feature.details.map((detail, i) => (
                  <li key={i} className="text-xs text-gray-500 flex items-center">
                    <span className="text-purple-400 mr-2">•</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        </section>

        {/* Supported Models */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border border-gray-700"
        >
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Supported Models</h2>
          <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
              <span className="mr-2">🤖</span> Text Generation
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• GPT-4 Turbo (OpenAI)</li>
              <li>• GPT-3.5 Turbo (OpenAI)</li>
              <li>• Claude 3 Opus (Anthropic)</li>
              <li>• Claude 3 Sonnet (Anthropic)</li>
              <li>• Gemini Pro (Google)</li>
              <li>• Llama 2 70B (Meta)</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
              <span className="mr-2">💻</span> Code Generation
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• CodeLlama 34B (Meta)</li>
              <li>• Code-Davinci (OpenAI)</li>
              <li>• StarCoder (Hugging Face)</li>
              <li>• Codegen (Salesforce)</li>
              <li>• InstructCodeT5+ (Salesforce)</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
              <span className="mr-2">🎨</span> Multimodal
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• DALL-E 3 (OpenAI)</li>
              <li>• Midjourney (via API)</li>
              <li>• Stable Diffusion XL</li>
              <li>• GPT-4 Vision (OpenAI)</li>
              <li>• Claude 3 Vision (Anthropic)</li>
            </ul>
          </div>
        </div>
      </motion.section>

      {/* Pricing */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700"
      >
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Transparent Pricing</h2>
        <div className="text-center mb-6">
          <p className="text-gray-400">
            Pay only for what you use. No hidden fees, no monthly commitments.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl mb-2">📊</div>
            <h3 className="font-semibold text-white mb-2">Usage-Based</h3>
            <p className="text-sm text-gray-400">Only pay for successful API calls</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">💡</div>
            <h3 className="font-semibold text-white mb-2">Cost Optimization</h3>
            <p className="text-sm text-gray-400">Automatically route to cost-effective models</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">📈</div>
            <h3 className="font-semibold text-white mb-2">Real-time Tracking</h3>
            <p className="text-sm text-gray-400">Monitor usage and costs in real-time</p>
          </div>
        </div>
      </motion.section>

      {/* Getting Started CTA */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center bg-gradient-to-r from-purple-500/20 to-blue-500/20 p-8 rounded-2xl border border-purple-500/30"
      >
        <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
        <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
          Join thousands of developers who are already building with our AI Router platform. 
          Start with $10 in free credits.
        </p>
        <div className="flex justify-center space-x-4">
          <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition">
            Start Building Now
          </button>
          <button className="border border-gray-600 text-gray-300 px-6 py-3 rounded-lg hover:bg-gray-700 transition">
            View Full Documentation
          </button>
        </div>
        </motion.section>
      </div>
    </div>
  );
};