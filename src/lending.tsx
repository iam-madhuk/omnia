import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth, UserProfile } from "./components/Login";
import { Dashboard } from "./components/Dashboard";
import { ProfileSettings } from "./components/ProfileSettings";

import aiHead from "./assets/ai-head.png";

interface CounterProps {
  target: number;
  duration?: number;
}

// Move Counter component outside to avoid hooks issues
const Counter = ({ target, duration = 2 }: CounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let startTime: number | null = null;
          const animateCount = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
            setCount(Math.floor(progress * target));
            if (progress < 1) {
              requestAnimationFrame(animateCount);
            }
          };
          requestAnimationFrame(animateCount);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count}</span>;
};

const AILandingPage = () => {
  // Auth context
  const { isAuthenticated, setShowLogin, user } = useAuth();
  
  // Navigation state
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard' | 'profile'>('landing');
  
  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Video modal state
  const [showVideoModal, setShowVideoModal] = useState(false);
  
  // Mouse glow effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e: any) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Parallax effect for background orbs and hero image
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Reset navigation when authentication changes
  useEffect(() => {
    if (isAuthenticated) {
      setCurrentView('dashboard');
    } else {
      setCurrentView('landing');
    }
  }, [isAuthenticated]);
  useEffect(() => {
    const handleNavigateToProfile = () => {
      setCurrentView('profile');
    };
    const handleNavigateToDashboard = () => {
      setCurrentView('dashboard');
    };
    
    window.addEventListener('navigate-to-profile', handleNavigateToProfile);
    window.addEventListener('navigate-to-dashboard', handleNavigateToDashboard);
    
    return () => {
      window.removeEventListener('navigate-to-profile', handleNavigateToProfile);
      window.removeEventListener('navigate-to-dashboard', handleNavigateToDashboard);
    };
  }, []);

  // Navigation handler for UserProfile component
  const handleNavigation = (view: string) => {
    if (view === 'profile') {
      setCurrentView('profile');
    } else if (view === 'dashboard') {
      setCurrentView('dashboard');
    }
  };


  // Testimonials slider
  const testimonials = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "CTO at TechCorp",
      content: "This AI service has revolutionized our workflow, boosting our productivity by 40% since it was implemented.",
      avatar: "👨‍💼"
    },
    {
      id: 2,
      name: "Sarah Williams",
      role: "Product Manager",
      content: "The insights we've gained from the AI analytics have been invaluable for our decision-making process.",
      avatar: "👩‍💼"
    },
    {
      id: 3,
      name: "Michael Chen",
      role: "Startup Founder",
      content: "Affordable yet powerful. This is exactly what our growing company needed to compete with larger players.",
      avatar: "👨‍🎓"
    },
    {
      id: 4,
      name: "Emma Rodriguez",
      role: "Marketing Director",
      content: "The custom solutions allowed us to tailor the AI to our specific industry needs. Amazing results!",
      avatar: "👩‍🎨"
    }
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Hover tilt effect for cards
  const useTilt = (active: boolean) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!ref.current || !active) return;

      const element = ref.current;

      const handleMouseMove = (e: MouseEvent) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const xPercentage = x / rect.width;
        const yPercentage = y / rect.height;

        const xRotation = (yPercentage - 0.5) * 10;
        const yRotation = (0.5 - xPercentage) * 10;

        element.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg) scale3d(1.02, 1.02, 1.02)`;
      };

      const handleMouseLeave = () => {
        element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
      };

      element.addEventListener('mousemove', handleMouseMove as EventListener);
      element.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        element.removeEventListener('mousemove', handleMouseMove as EventListener);
        element.removeEventListener('mouseleave', handleMouseLeave);
      };
    }, [active]);

    return ref;
  };

  // Handle different views based on navigation - MOVED TO END TO FIX HOOKS ISSUE
  if (isAuthenticated && currentView === 'dashboard') {
    return <Dashboard />;
  }

  if (isAuthenticated && currentView === 'profile') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-black text-white overflow-hidden relative">
        <motion.nav
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="fixed top-0 left-0 w-full flex justify-between items-center px-6 py-4 backdrop-blur-lg bg-black/20 border-b border-gray-800 z-40"
        >
          <button
            onClick={() => setCurrentView('landing')}
            className="text-2xl font-bold flex items-center cursor-pointer hover:opacity-80 transition"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              <span className="font-bold text-xl">Robotix</span>
            </div>
          </button>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentView('dashboard')}
              className="text-gray-300 hover:text-white transition"
            >
              Dashboard
            </button>
            <UserProfile onNavigate={handleNavigation} />
          </div>
        </motion.nav>
        <div className="pt-20">
          <ProfileSettings />
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-black text-white overflow-hidden relative scroll-smooth">
      {/* Animated gradient background orbs with parallax */}
      <motion.div
        className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 opacity-20 blur-3xl"
        animate={{ x: [0, 100, -100, 0], y: [0, -50, 50, 0], scale: [1, 1.2, 0.9, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ y: scrollY * 0.05 }}
      />
      <motion.div
        className="absolute right-0 bottom-0 w-80 h-80 rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-500 opacity-20 blur-3xl"
        animate={{ x: [0, -80, 80, 0], y: [0, 60, -60, 0], scale: [1, 0.8, 1.1, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        style={{ y: scrollY * 0.03 }}
      />

      {/* Mouse follower glow */}
      <div
        className="pointer-events-none fixed inset-0 z-30"
        style={{
          background: `radial-gradient(500px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(168,85,247,0.15), transparent 80%)`,
        }}
      />

      {/* Navbar */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 w-full flex justify-between items-center px-6 py-4 backdrop-blur-lg bg-black/20 border-b border-gray-800 z-40"
      >
        <div className="text-2xl font-bold flex items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            <span className="font-bold text-xl">Robotix</span>
          </div>
        </div>
        <div className="hidden md:flex space-x-8">
          {["Features", "Demo", "Pricing", "Testimonials", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="relative group hover:text-purple-300 transition"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-400 transition-all group-hover:w-full"></span>
            </a>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <UserProfile onNavigate={handleNavigation} />
          ) : (
            <>
              <button 
                onClick={() => setShowLogin(true)}
                className="hidden md:block text-white hover:text-purple-300 transition-colors"
              >
                Login
              </button>
              <button 
                onClick={() => setShowLogin(true)}
                className="hidden md:block bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-lg hover:opacity-90 transition"
              >
                Get Started
              </button>
            </>
          )}
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-lg border-t border-gray-800 md:hidden"
          >
            <div className="px-6 py-4 space-y-4">
              {["Features", "Demo", "Pricing", "Testimonials", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block text-white hover:text-purple-300 transition"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              {!isAuthenticated && (
                <div className="pt-4 space-y-2">
                  <button 
                    onClick={() => {
                      setShowLogin(true);
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left text-white hover:text-purple-300 transition-colors"
                  >
                    Login
                  </button>
                  <button 
                    onClick={() => {
                      setShowLogin(true);
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-lg hover:opacity-90 transition text-center"
                  >
                    Get Started
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* Hero Section */}
      <section className="bg-[#0a0f1c] w-full text-white min-h-screen flex justify-between items-center px-12 relative p-8 pt-24">
        {/* Left Side Content */}
        <div className="flex max-w-xl flex-col space-y-6 relative">
          <h1 className="text-6xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
              Robotix
            </span>
            <br />
            <span className="text-white">
              AI Platform
            </span>
          </h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-gray-300 text-xl leading-relaxed"
          >
            Experience the future of AI with our revolutionary platform that combines{' '}
            <motion.span
              className="text-blue-400 font-semibold"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              15+ AI models
            </motion.span>{' '}
            under one unified interface. Build, create, and innovate faster than ever before.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
            className="flex gap-4 mt-8"
          >
            <motion.button 
              onClick={() => {
                if (isAuthenticated) {
                  setCurrentView('dashboard');
                } else {
                  setShowLogin(true);
                }
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 rounded-2xl px-8 py-4 font-bold text-lg shadow-2xl overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <span className="relative flex items-center gap-2">
                Start Now
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
            </motion.button>
            <motion.button 
              onClick={() => {
                setShowVideoModal(true);
                setTimeout(() => {
                  document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
                }, 500);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-gradient-to-r border-gray-500 hover:border-blue-400 rounded-2xl px-8 py-4 text-white hover:bg-gray-800/50 font-semibold text-lg backdrop-blur-sm transition-all duration-300 flex items-center gap-2"
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ▶
              </motion.span>
              Watch Magic
            </motion.button>
          </motion.div>
          {/* Enhanced Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-8 grid grid-cols-3 gap-6 text-center"
          >
            {[
              { icon: "⭐", value: "10K+", label: "Active Users" },
              { icon: "⚡", value: "500%", label: "Speed Boost" },
              { icon: "🤖", value: "15+", label: "AI Models" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-4 backdrop-blur-sm border border-gray-700/50"
                whileHover={{ scale: 1.05, y: -2 }}
                animate={{ 
                  boxShadow: [
                    '0 0 20px rgba(59, 130, 246, 0.3)',
                    '0 0 30px rgba(147, 51, 234, 0.4)',
                    '0 0 20px rgba(59, 130, 246, 0.3)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
              >
                <div className="text-2xl mb-1">{stat.icon}</div>
                <div className="text-xl font-bold text-blue-400">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right Side (AI Image + Floating Cards) with parallax */}
        <div className="relative ">
          <motion.img
            src={aiHead}
            alt="AI Head"
            className="w-[450px] [transform-style:preserve-3d]"
            initial={{ opacity: 0, rotateY: -20 }}
            animate={{
              opacity: 1,
              rotateY: [0, 20, -20, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ y: scrollY * 0.1 }}
          />

          {/* Floating Info Cards */}
          {[
            { top: "5", left: "75", bottom: "20px", right: "40", delay: 0.9, color: "bg-pink-500", icon: "❤️", title: "Lovely Place", desc: "You Can Enjoy More" },
            { top: "10", left: "50", bottom: "120", right: "140", delay: 1.2, color: "bg-blue-400", icon: "📄", title: "Document Lab", desc: "You Gave Access" },
            { top: "35", left: "35", bottom: "20", right: "40", delay: 0.6, color: "bg-orange-400", icon: "💡", title: "Quickly Generate", desc: "Feeling Good With Us" },
            { top: "50", left: "60", bottom: "20", right: "40", delay: 0.9, color: "bg-pink-500", icon: "❤️", title: "Lovely Place", desc: "You Can Enjoy More" },
            { top: "75", left: "10", bottom: "120", right: "40", delay: 1.2, color: "bg-blue-400", icon: "📄", title: "Document Lab", desc: "You Gave Access" },
          ].map((card, i) => (
            <motion.div
              key={i}
              className={`absolute top-${card.top} bottom-${card.bottom} left-${card.left} right-${card.right} bg-[#111827] px-4 py-2 rounded-xl shadow-lg flex items-center gap-2`}
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: card.delay }}
            >
              <div className={`w-6 h-6 ${card.color} flex items-center justify-center rounded`}>
                {card.icon}
              </div>
              <div>
                <p className="text-sm font-semibold">{card.title}</p>
                <p className="text-xs text-gray-400">{card.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-900/30 to-purple-900/30 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-12">
          {[
            { value: <Counter target={10000} />, label: "Active Users" },
            { value: <Counter target={95} />, label: "Satisfaction Rate" },
            { value: <Counter target={24} />, label: "Support Hours" },
            { value: <Counter target={50} />, label: "AI Models" },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
                {stat.value}
              </div>
              <div className="text-gray-400 mt-2">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Dashboard Section - Only show if authenticated */}
      {isAuthenticated && <div id="dashboard"><Dashboard /></div>}

      {/* Features Section */}
      <section id="features" className="py-24 px-12 bg-[#0a0f1c] relative">
        <h2 className="text-4xl font-bold text-center mb-16">
          Powerful <span className="bg-gradient-to-r from-purple-500 to-blue-400 text-transparent bg-clip-text">Features</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {["Automation", "AI Insights", "Custom Solutions"].map((feature, i) => {
            // const ref = useTilt(true); // Temporarily disabled
            return (
              <motion.div
                // ref={ref} // Temporarily disabled
                key={feature}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.3 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl shadow-lg hover:scale-105 transition transform-gpu"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <h3 className="text-xl font-semibold mb-4">{feature}</h3>
                <p className="text-gray-400">
                  {feature} helps you achieve results faster, smarter, and with less effort.
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-24 px-12 bg-[#0d1220] relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">
              Live <span className="bg-gradient-to-r from-purple-500 to-blue-400 text-transparent bg-clip-text">Demo</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              See the magic happen in real-time. Experience the power of 15+ AI models working together seamlessly.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Demo Preview */}
            <motion.div
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-gray-700/50"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="bg-black/50 rounded-xl p-6 min-h-[200px] flex flex-col justify-center">
                <div className="text-green-400 text-sm font-mono mb-2">$ robotix generate --model gpt-4</div>
                <div className="text-gray-300 text-sm leading-relaxed">
                  <div className="mb-2">🤖 Analyzing request...</div>
                  <div className="mb-2">⚡ Processing with GPT-4 Turbo...</div>
                  <div className="mb-2">✨ Generating creative content...</div>
                  <div className="text-blue-400">🚀 Ready! Your AI response is complete.</div>
                </div>
              </div>
            </motion.div>
            
            {/* Feature Highlights */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">🚀</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Lightning Fast</h3>
                  <p className="text-gray-400">Get responses in under 2 seconds with our optimized AI routing</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">🎯</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Smart Routing</h3>
                  <p className="text-gray-400">Automatically selects the best AI model for your specific task</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">💡</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">15+ AI Models</h3>
                  <p className="text-gray-400">GPT-4, Claude, Gemini, and more - all in one platform</p>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* CTA Buttons */}
          <div className="relative">
            {/* Background decorative elements */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10 rounded-3xl blur-xl"></div>
            
            {/* Stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 relative">
              <div className="text-center p-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl border border-blue-500/30">
                <div className="text-3xl font-bold text-blue-400">15+</div>
                <div className="text-sm text-gray-400">AI Models</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-xl border border-green-500/30">
                <div className="text-3xl font-bold text-green-400">2.3s</div>
                <div className="text-sm text-gray-400">Avg Response</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl border border-purple-500/30">
                <div className="text-3xl font-bold text-purple-400">10K+</div>
                <div className="text-sm text-gray-400">Happy Users</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl border border-yellow-500/30">
                <div className="text-3xl font-bold text-yellow-400">99.9%</div>
                <div className="text-sm text-gray-400">Uptime</div>
              </div>
            </div>
            
            {/* Main CTA area */}
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-3xl p-8 border border-gray-700/50 backdrop-blur-sm relative">
              {/* Floating particles */}
              <div className="absolute top-4 left-4 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <div className="absolute top-8 right-8 w-1 h-1 bg-purple-400 rounded-full animate-bounce"></div>
              <div className="absolute bottom-4 left-8 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-3">Ready to Transform Your Workflow?</h3>
                <p className="text-gray-300 text-lg">Experience the future of AI development today</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                <button 
                  onClick={() => isAuthenticated ? setCurrentView('dashboard') : setShowLogin(true)}
                  className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl transition-all duration-300 group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative flex items-center gap-2">
                    {isAuthenticated ? 'Launch AI Hub' : 'Start Free Demo'}
                    <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                  </span>
                </button>
                <button 
                  onClick={() => alert('📚 Documentation: Visit docs.robotix.ai for API guides, tutorials, and examples!')}
                  className="border-2 border-gray-500 hover:border-blue-400 px-8 py-4 rounded-2xl text-white hover:bg-gray-800/50 font-semibold transition-all duration-300 flex items-center gap-2"
                >
                  📖 View Documentation
                  <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">NEW</span>
                </button>
              </div>
              
              {/* Trust indicators with icons */}
              <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <span className="text-green-400">✓</span>
                  No credit card required
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">⚡</span>
                  Instant access
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400">⭐</span>
                  1000+ satisfied users
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-400">🔒</span>
                  Enterprise secure
                </div>
              </div>
              
              {/* Social proof badges */}
              <div className="flex justify-center items-center gap-4 mt-6 pt-6 border-t border-gray-700">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-2 border-gray-800"></div>
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full border-2 border-gray-800"></div>
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full border-2 border-gray-800"></div>
                  </div>
                  <span>Joined by developers from top companies</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 px-12 bg-[#0a0f1c] relative">
        <h2 className="text-4xl font-bold text-center mb-16">
          What Our <span className="bg-gradient-to-r from-purple-500 to-blue-400 text-transparent bg-clip-text">Clients</span> Say
        </h2>
        <div className="max-w-4xl mx-auto relative h-80 overflow-hidden">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{
                opacity: index === currentTestimonial ? 1 : 0,
                x: index === currentTestimonial ? 0 : 100,
                display: index === currentTestimonial ? 'block' : 'none'
              }}
              transition={{ duration: 0.5 }}
              className="absolute top-0 left-0 w-full bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-lg"
            >
              <div className="flex items-center mb-6">
                <div className="text-4xl mr-4">{testimonial.avatar}</div>
                <div>
                  <h3 className="text-xl font-semibold">{testimonial.name}</h3>
                  <p className="text-gray-400">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-300 italic">"{testimonial.content}"</p>
            </motion.div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-3 h-3 rounded-full mx-1 ${index === currentTestimonial ? 'bg-purple-500' : 'bg-gray-600'}`}
            />
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-12 bg-[#0a0f1c] relative">
        <h2 className="text-4xl font-bold text-center mb-16">Pricing Plans</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {["Basic", "Pro", "Enterprise"].map((plan, i) => {
            // const ref = useTilt(true); // Temporarily disabled
            return (
              <motion.div
                // ref={ref} // Temporarily disabled
                key={plan}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.3 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-lg hover:scale-105 transition transform-gpu text-center"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <h3 className="text-2xl font-bold mb-4">{plan}</h3>
                <p className="text-3xl font-extrabold mb-6">$ {i * 49 + 49}</p>
                <ul className="text-gray-400 mb-6 space-y-2">
                  <li>✔ Feature One</li>
                  <li>✔ Feature Two</li>
                  <li>✔ Feature Three</li>
                </ul>
                <button 
                  onClick={() => isAuthenticated ? alert(`Selected ${plan} plan!`) : setShowLogin(true)}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-full hover:opacity-80"
                >
                  {isAuthenticated ? 'Upgrade Plan' : 'Choose Plan'}
                </button>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="py-16 px-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLW9wYWNpdHk9IjAuMiI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMjgiLz48L2c+PC9zdmc+')] opacity-20"></div>
        <motion.div
          className="relative z-10 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Business?</h2>
          <p className="text-gray-100 mb-8">Join thousands of companies using our AI solutions to drive growth and innovation.</p>
          <button 
            onClick={() => alert('📧 Contact Us:\n\nEmail: support@robotix.ai\nDiscord: discord.gg/robotix\nTwitter: @RobotixAI\n\nWe\'d love to hear from you!')}
            className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
          >
            {isAuthenticated ? 'Contact Sales' : 'Get Started Now'}
          </button>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-12 bg-[#0d1220] relative text-center">
        <h2 className="text-4xl font-bold mb-8">
          Get In <span className="bg-gradient-to-r from-purple-500 to-blue-400 text-transparent bg-clip-text">Touch</span>
        </h2>
        <motion.form
          className="max-w-xl mx-auto flex flex-col gap-6"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <input
            type="text"
            placeholder="Your Name"
            className="bg-gray-800 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="bg-gray-800 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <textarea
            placeholder="Your Message"
            rows={4}
            className="bg-gray-800 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          ></textarea>
          <button className="bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 rounded-lg hover:opacity-80">
            Send Message
          </button>
        </motion.form>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowVideoModal(false)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-gray-900 rounded-2xl overflow-hidden max-w-4xl w-full max-h-[80vh] relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowVideoModal(false)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
              >
                ✕
              </button>
              
              {/* Video Container */}
              <div className="relative w-full" style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}>
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/sFe0RFkNU7I?autoplay=1&rel=0&modestbranding=1"
                  title="Robotix AI Demo Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              
              {/* Video Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">Robotix AI Platform Demo</h3>
                <p className="text-gray-400">See how our multi-AI platform transforms your workflow</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-black/30 py-6 text-center text-gray-500 text-sm">
        © 2025 Robotix. All rights reserved.
      </footer>
    </div>
  );
};

export default AILandingPage;
