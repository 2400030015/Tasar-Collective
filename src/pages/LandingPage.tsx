import React, { useState, useEffect } from 'react';
import { 
  Menu, X, ChevronRight, Star, Shield, Globe, BarChart3, 
  ShoppingBag, History, Heart, ArrowRight, Play, CheckCircle2,
  Instagram, Twitter, Facebook, Mail, User, LogOut, Package, LayoutDashboard,
  MapPin
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { cn } from '../utils/cn';

// --- Components ---

const WeavingAnimation = () => {
  return (
    <div className="relative w-full aspect-square max-w-md mx-auto flex items-center justify-center">
      <div className="absolute inset-0 bg-tasar-gold/10 blur-[100px] rounded-full" />
      <svg viewBox="0 0 400 400" className="w-full h-full relative z-10">
        {[...Array(12)].map((_, i) => (
          <motion.line
            key={`warp-${i}`}
            x1={80 + i * 22}
            y1="50"
            x2={80 + i * 22}
            y2="350"
            stroke="#6B4423"
            strokeWidth="1.5"
            strokeOpacity="0.2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 2, delay: i * 0.1, repeat: Infinity, repeatType: "reverse" }}
          />
        ))}
        {[...Array(12)].map((_, i) => (
          <motion.path
            key={`weft-${i}`}
            d={`M 50 ${80 + i * 22} Q 200 ${80 + i * 22 + (i % 2 === 0 ? 10 : -10)} 350 ${80 + i * 22}`}
            stroke="#C8A951"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: 0.8,
              d: [
                `M 50 ${80 + i * 22} Q 200 ${80 + i * 22 + (i % 2 === 0 ? 10 : -10)} 350 ${80 + i * 22}`,
                `M 50 ${80 + i * 22} Q 200 ${80 + i * 22 + (i % 2 === 0 ? -10 : 10)} 350 ${80 + i * 22}`,
                `M 50 ${80 + i * 22} Q 200 ${80 + i * 22 + (i % 2 === 0 ? 10 : -10)} 350 ${80 + i * 22}`
              ]
            }}
            transition={{ 
              pathLength: { duration: 3, delay: i * 0.15 },
              opacity: { duration: 1 },
              d: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
          />
        ))}
      </svg>
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="w-48 h-48 rounded-full border-2 border-tasar-gold/30 p-2 animate-spin-slow">
          <img 
            src="https://images.unsplash.com/photo-1610189012906-400085489375?auto=format&fit=crop&q=80&w=400" 
            alt="Loom" 
            className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-700"
            referrerPolicy="no-referrer"
          />
        </div>
      </motion.div>
    </div>
  );
};

const CartDrawer = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-tasar-ivory z-[70] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-tasar-brown/5 flex items-center justify-between">
              <h2 className="text-2xl font-serif font-bold">Your Collection</h2>
              <button onClick={onClose} className="p-2 hover:bg-tasar-brown/5 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="text-center py-20">
                  <ShoppingBag size={48} className="mx-auto text-tasar-brown/20 mb-4" />
                  <p className="text-tasar-brown/60">Your cart is empty</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-bold text-sm mb-1">{item.name}</h4>
                      <p className="text-tasar-gold font-bold text-sm mb-2">₹{item.price.toLocaleString()}</p>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-tasar-brown/10 rounded-lg overflow-hidden">
                          <button onClick={() => updateQuantity(item.id, -1)} className="px-2 py-1 hover:bg-tasar-brown/5">-</button>
                          <span className="px-3 py-1 text-xs font-bold">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="px-2 py-1 hover:bg-tasar-brown/5">+</button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-xs text-red-500 font-bold hover:underline">Remove</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 bg-white border-t border-tasar-brown/5 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-tasar-brown/60">Total Amount</span>
                  <span className="text-xl font-bold text-tasar-gold">₹{totalPrice.toLocaleString()}</span>
                </div>
                <button 
                  onClick={() => {
                    onClose();
                    navigate('/checkout');
                  }}
                  className="w-full btn-primary py-4 text-lg"
                >
                  Checkout Heritage
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
      isScrolled ? "bg-tasar-ivory/80 backdrop-blur-lg shadow-sm" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-tasar-brown rounded-lg flex items-center justify-center text-tasar-gold font-serif font-bold text-xl">T</div>
          <span className="text-2xl font-serif font-bold tracking-tight">Tasar Collective</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link to="/marketplace" className="text-sm font-medium hover:text-tasar-gold transition-colors">Marketplace</Link>
          <a href="#features" className="text-sm font-medium hover:text-tasar-gold transition-colors">Features</a>
          <a href="#how-it-works" className="text-sm font-medium hover:text-tasar-gold transition-colors">How It Works</a>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-tasar-brown hover:text-tasar-gold transition-colors"
          >
            <ShoppingBag size={24} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-tasar-gold text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                {totalItems}
              </span>
            )}
          </button>
          <Link to="/auth" className="btn-primary py-2 px-6">Start Selling</Link>
        </div>
        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="absolute top-full left-0 right-0 bg-tasar-ivory shadow-xl p-6 flex flex-col gap-4 md:hidden">
            <Link to="/marketplace" className="text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>Marketplace</Link>
            <a href="#features" className="text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>Features</a>
            <a href="#how-it-works" className="text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>How It Works</a>
            <Link to="/auth" className="btn-primary w-full text-center" onClick={() => setIsMobileMenuOpen(false)}>Start Selling</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const FeaturedProducts = () => {
  const products = [
    { name: "Tasar Silk Saree", price: "₹12,499", region: "Bhagalpur", img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=400" },
    { name: "Hand-woven Stole", price: "₹2,850", region: "Champa", img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=400" },
    { name: "Raw Silk Fabric", price: "₹1,200/m", region: "Raigarh", img: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&q=80&w=400" },
    { name: "Heritage Dupatta", price: "₹4,500", region: "Bishnupur", img: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=400" }
  ];

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-serif font-bold mb-4">Featured Collections</h2>
            <p className="text-tasar-brown/60">Authentic handloom directly from the heart of India.</p>
          </div>
          <Link to="/marketplace" className="text-tasar-gold font-bold flex items-center gap-2 hover:gap-3 transition-all">
            View All <ArrowRight size={20} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((p, i) => (
            <motion.div key={i} whileHover={{ y: -10 }} className="group cursor-pointer">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4 shadow-md">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-tasar-brown">{p.region}</div>
                <button className="absolute bottom-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                  <ShoppingBag size={18} className="text-tasar-gold" />
                </button>
              </div>
              <h3 className="font-serif font-bold text-lg">{p.name}</h3>
              <p className="text-tasar-gold font-bold">{p.price}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-tasar-brown/5 to-tasar-gold/5 -z-10" />
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-5xl md:text-7xl font-serif font-bold leading-[1.1] mb-6">
              Sell Authentic Indian Handloom <span className="text-tasar-gold italic">Globally</span> Without Middlemen.
            </h1>
            <p className="text-lg text-tasar-brown/80 mb-8 max-w-lg">
              Tasar Collective empowers artisans to earn more by connecting directly with global buyers who value heritage, sustainability, and craftsmanship.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/auth" className="btn-primary flex items-center gap-2">Join as Artisan <ArrowRight size={18} /></Link>
              <Link to="/marketplace" className="btn-secondary">Browse Collections</Link>
            </div>
          </motion.div>
          <div className="relative">
            <WeavingAnimation />
          </div>
        </div>
      </section>

      <FeaturedProducts />

      {/* Problem/Solution */}
      <section id="features" className="py-24 px-6 bg-tasar-ivory">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-4">There’s a Better Way</h2>
            <p className="text-tasar-brown/60">We're redefining the handloom supply chain for the digital age.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-white/50 border border-tasar-brown/5">
              <h3 className="text-2xl font-serif font-bold mb-6 text-tasar-brown/40">The Old Way</h3>
              <ul className="space-y-4">
                {["Middlemen reduce artisan profit by up to 70%", "Limited global visibility for rural weavers", "No access to market demand insights", "Inconsistent and unpredictable income"].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-tasar-brown/60">
                    <X className="text-red-400 mt-1 flex-shrink-0" size={18} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-8 rounded-2xl bg-white border-2 border-tasar-gold shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-tasar-gold text-white px-4 py-1 text-xs font-bold uppercase tracking-widest">Recommended</div>
              <h3 className="text-2xl font-serif font-bold mb-6">The Tasar Collective Way</h3>
              <ul className="space-y-4">
                {["Direct access to global buyers with 0% middleman fees", "Transparent earnings paid directly to artisans", "Data-driven demand insights to optimize production", "Secure international payments and logistics support", "Story-driven brand identity for every artisan"].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="text-tasar-gold mt-1 flex-shrink-0" size={18} />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-24 px-6 bg-tasar-brown text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-serif font-bold text-center mb-16">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { title: "Create Your Profile", desc: "Sign up as an artisan or buyer in minutes." },
              { title: "List or Discover", desc: "Upload authentic products or explore unique collections." },
              { title: "Grow Globally", desc: "Secure transactions, track orders, and scale your reach." }
            ].map((s, i) => (
              <div key={i} className="text-center relative">
                <div className="w-16 h-16 bg-tasar-gold rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">{i + 1}</div>
                <h3 className="text-2xl font-serif font-bold mb-4">{s.title}</h3>
                <p className="text-white/70">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-tasar-ivory text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-serif font-bold mb-6">Ready to Share India’s Heritage with the World?</h2>
          <p className="text-xl text-tasar-brown/70 mb-10">Join Tasar Collective today and grow your craft beyond borders.</p>
          <Link to="/auth" className="btn-primary text-lg px-12 py-4">Join Tasar Collective</Link>
        </div>
      </section>

      <footer className="bg-tasar-ivory border-t border-tasar-brown/10 py-10 text-center text-sm text-tasar-brown/40">
        © 2026 Tasar Collective. All rights reserved.
      </footer>
    </div>
  );
}
