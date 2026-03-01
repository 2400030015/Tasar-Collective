import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, User, MapPin, Briefcase, ArrowRight, CheckCircle2, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../utils/cn';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<'buyer' | 'artisan'>('buyer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [region, setRegion] = useState('');
  const [bio, setBio] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const payload = isLogin 
        ? { email, password } 
        : { name, email, password, role, region, bio };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      if (isLogin) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate(data.user.role === 'artisan' ? '/dashboard' : '/buyer-dashboard');
      } else {
        setIsLogin(true);
        setError('Registration successful! Please login.');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-tasar-ivory p-6 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <svg width="100%" height="100%">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#6B4423" strokeWidth="1"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full grid md:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden relative z-10"
      >
        {/* Left Side: Visual/Info */}
        <div className="hidden md:block bg-tasar-brown p-12 text-white relative">
          <div className="relative z-10">
            <div className="w-12 h-12 bg-tasar-gold rounded-xl flex items-center justify-center text-white font-serif font-bold text-2xl mb-8">T</div>
            <h2 className="text-4xl font-serif font-bold mb-6">
              {isLogin ? "Welcome Back to the Collective" : "Join the Global Artisan Network"}
            </h2>
            <p className="text-white/70 mb-8 leading-relaxed">
              {isLogin 
                ? "Access your dashboard, manage your collections, and connect with buyers worldwide."
                : "Empower your craft. Connect directly with global buyers and keep 100% of your heritage value."}
            </p>
            
            <div className="space-y-4">
              {[
                "Direct Global Access",
                "Transparent Earnings",
                "Heritage Storytelling",
                "Secure Transactions"
              ].map(item => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="text-tasar-gold" size={20} />
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        {/* Right Side: Form */}
        <div className="p-8 md:p-12">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-serif font-bold">{isLogin ? "Sign In" : "Create Account"}</h3>
            <button 
              onClick={() => navigate('/')}
              className="p-2 hover:bg-tasar-ivory rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl flex items-center gap-2">
              <X size={16} onClick={() => setError('')} className="cursor-pointer" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4"
                >
                  <div className="flex p-1 bg-tasar-ivory rounded-xl mb-4">
                    <button 
                      type="button"
                      onClick={() => setRole('buyer')}
                      className={cn(
                        "flex-1 py-2 text-xs font-bold rounded-lg transition-all",
                        role === 'buyer' ? "bg-white shadow-sm text-tasar-brown" : "text-tasar-brown/40"
                      )}
                    >
                      I AM A BUYER
                    </button>
                    <button 
                      type="button"
                      onClick={() => setRole('artisan')}
                      className={cn(
                        "flex-1 py-2 text-xs font-bold rounded-lg transition-all",
                        role === 'artisan' ? "bg-white shadow-sm text-tasar-brown" : "text-tasar-brown/40"
                      )}
                    >
                      I AM AN ARTISAN
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-tasar-brown/40 mb-2">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-tasar-brown/30" size={18} />
                      <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-tasar-ivory/50 border border-tasar-brown/5 rounded-xl focus:border-tasar-gold outline-none transition-all" 
                        placeholder="John Doe" 
                      />
                    </div>
                  </div>

                  {role === 'artisan' && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="grid grid-cols-2 gap-4"
                    >
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-tasar-brown/40 mb-2">Region</label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-tasar-brown/30" size={18} />
                          <input 
                            type="text" 
                            value={region}
                            onChange={(e) => setRegion(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-tasar-ivory/50 border border-tasar-brown/5 rounded-xl focus:border-tasar-gold outline-none transition-all" 
                            placeholder="Bhagalpur" 
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-tasar-brown/40 mb-2">Experience</label>
                        <div className="relative">
                          <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-tasar-brown/30" size={18} />
                          <input 
                            type="text" 
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-tasar-ivory/50 border border-tasar-brown/5 rounded-xl focus:border-tasar-gold outline-none transition-all" 
                            placeholder="10+ Years" 
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-tasar-brown/40 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-tasar-brown/30" size={18} />
                <input 
                  type="email" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-tasar-ivory/50 border border-tasar-brown/5 rounded-xl focus:border-tasar-gold outline-none transition-all" 
                  placeholder="name@example.com" 
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-tasar-brown/40 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-tasar-brown/30" size={18} />
                <input 
                  type="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-tasar-ivory/50 border border-tasar-brown/5 rounded-xl focus:border-tasar-gold outline-none transition-all" 
                  placeholder="••••••••" 
                />
              </div>
            </div>

            {isLogin && (
              <div className="flex justify-end">
                <button type="button" className="text-xs font-bold text-tasar-gold hover:underline">Forgot Password?</button>
              </div>
            )}

            <button 
              type="submit" 
              disabled={isLoading}
              className="btn-primary w-full py-4 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (isLogin ? "Signing In..." : "Creating Account...") : (isLogin ? "Sign In" : "Create Account")} 
              {!isLoading && <ArrowRight size={18} />}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-tasar-brown/60">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-tasar-gold font-bold hover:underline"
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>

          {isLogin && (
            <>
              <div className="mt-8 flex items-center gap-3">
                <div className="flex-1 h-px bg-tasar-brown/10" />
                <span className="text-xs font-bold text-tasar-brown/40 uppercase">Or</span>
                <div className="flex-1 h-px bg-tasar-brown/10" />
              </div>

              <div className="mt-6 space-y-3">
                <p className="text-xs font-bold uppercase tracking-widest text-tasar-brown/40 mb-3">Continue as Guest</p>
                
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    type="button"
                    onClick={() => {
                      localStorage.setItem('isAnonymous', 'true');
                      localStorage.setItem('userRole', 'artisan');
                      navigate('/dashboard');
                    }}
                    className="py-3 px-4 bg-tasar-ivory border-2 border-tasar-brown/20 rounded-xl hover:border-tasar-gold hover:bg-tasar-gold/10 transition-all text-sm font-bold text-tasar-brown"
                  >
                    Test as Artisan
                  </button>
                  <button 
                    type="button"
                    onClick={() => {
                      localStorage.setItem('isAnonymous', 'true');
                      localStorage.setItem('userRole', 'buyer');
                      navigate('/buyer-dashboard');
                    }}
                    className="py-3 px-4 bg-tasar-ivory border-2 border-tasar-brown/20 rounded-xl hover:border-tasar-gold hover:bg-tasar-gold/10 transition-all text-sm font-bold text-tasar-brown"
                  >
                    Test as Buyer
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
