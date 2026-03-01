import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Search, Filter, ShoppingBag, Heart, Star, MapPin, 
  ChevronDown, Grid, List, SlidersHorizontal, Loader2, Map as MapIcon, Info
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../utils/cn';

export default function Marketplace() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  const categories = ["All", "Sarees", "Fabrics", "Accessories", "Home Decor"];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.region?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-tasar-ivory pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Heritage Cluster Map Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 bg-white rounded-[40px] p-8 shadow-sm border border-tasar-brown/5 overflow-hidden relative"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-tasar-gold/10 text-tasar-gold rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                <MapIcon size={14} /> Heritage Cluster Mapping
              </div>
              <h2 className="text-4xl font-serif font-bold mb-6">Trace Your Silk to its Roots</h2>
              <p className="text-tasar-brown/60 mb-8 leading-relaxed">
                Every thread in the Tasar Collective is mapped to a specific weaving cluster. 
                Explore the regions where heritage meets craftsmanship, from the riverbanks of 
                Bhagalpur to the looms of Champa.
              </p>
              <div className="space-y-4">
                {[
                  { name: "Bhagalpur", craft: "Matka & Gicha Silk", status: "Active Cluster" },
                  { name: "Champa", craft: "Kosa Silk", status: "Heritage Site" },
                  { name: "Raigarh", craft: "Tasar Weaving", status: "Artisan Hub" },
                ].map(cluster => (
                  <div key={cluster.name} className="flex items-center justify-between p-4 rounded-2xl bg-tasar-ivory/30 border border-tasar-brown/5 hover:border-tasar-gold transition-all cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-tasar-gold shadow-sm">
                        <MapPin size={18} />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">{cluster.name}</h4>
                        <p className="text-[10px] text-tasar-brown/40 uppercase font-bold tracking-widest">{cluster.craft}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">{cluster.status}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-square bg-tasar-ivory/50 rounded-[32px] overflow-hidden border border-tasar-brown/5 flex items-center justify-center">
              {/* Visual Map Representation */}
              <div className="absolute inset-0 opacity-20 grayscale pointer-events-none">
                <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1000" alt="Map Background" className="w-full h-full object-cover" />
              </div>
              <div className="relative w-full h-full p-12 flex items-center justify-center">
                <div className="relative w-64 h-80 border-2 border-tasar-gold/20 rounded-full flex items-center justify-center">
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                    className="absolute top-10 right-20 w-4 h-4 bg-tasar-gold rounded-full shadow-lg shadow-tasar-gold/50"
                  />
                  <motion.div 
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ repeat: Infinity, duration: 4, delay: 1 }}
                    className="absolute bottom-20 left-10 w-3 h-3 bg-tasar-gold rounded-full shadow-lg shadow-tasar-gold/50"
                  />
                  <div className="text-center">
                    <p className="font-serif italic text-tasar-brown/40 text-xl">The Silk Route of India</p>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-tasar-gold mt-2">Verified Clusters</p>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-tasar-brown/5 max-w-[200px]">
                <div className="flex items-center gap-2 mb-2">
                  <Info size={14} className="text-tasar-gold" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Cluster Info</span>
                </div>
                <p className="text-[10px] text-tasar-brown/60 leading-tight">Bhagalpur produces 15% of India's Tasar silk, supporting over 25,000 artisan families.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Header & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-serif font-bold mb-2">Marketplace</h1>
            <p className="text-tasar-brown/60">Discover authentic handloom from India's finest artisans.</p>
          </div>
          
          <div className="relative max-w-md w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-tasar-brown/30" size={20} />
            <input 
              type="text" 
              placeholder="Search products, regions, or artisans..." 
              className="w-full pl-12 pr-4 py-3 bg-white border border-tasar-brown/5 rounded-2xl shadow-sm focus:border-tasar-gold outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-[240px_1fr] gap-12">
          {/* Filters Sidebar */}
          <aside className="hidden lg:block space-y-8">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-tasar-brown/40 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={cn(
                      "w-full text-left px-4 py-2 rounded-xl text-sm font-medium transition-all",
                      selectedCategory === cat ? "bg-tasar-gold text-white" : "hover:bg-white text-tasar-brown/70"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-tasar-brown/40 mb-4">Price Range</h3>
              <div className="space-y-4">
                <input type="range" className="w-full accent-tasar-gold" min="0" max="50000" />
                <div className="flex justify-between text-xs font-bold text-tasar-brown/40">
                  <span>₹0</span>
                  <span>₹50,000+</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-tasar-brown/40 mb-4">Region</h3>
              <div className="space-y-2">
                {["Bhagalpur", "Champa", "Raigarh", "Bishnupur"].map(region => (
                  <label key={region} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded border-tasar-brown/10 accent-tasar-gold" />
                    <span className="text-sm text-tasar-brown/70 group-hover:text-tasar-brown">{region}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <main>
            <div className="flex items-center justify-between mb-8">
              <p className="text-sm text-tasar-brown/60 font-medium">Showing {filteredProducts.length} products</p>
              <div className="flex items-center gap-4">
                <div className="flex bg-white rounded-lg p-1 border border-tasar-brown/5">
                  <button className="p-1.5 rounded bg-tasar-ivory text-tasar-brown"><Grid size={18} /></button>
                  <button className="p-1.5 rounded text-tasar-brown/40 hover:text-tasar-brown"><List size={18} /></button>
                </div>
                <button className="flex items-center gap-2 text-sm font-bold text-tasar-brown/60 hover:text-tasar-brown">
                  Sort by: Newest <ChevronDown size={16} />
                </button>
              </div>
            </div>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 size={48} className="animate-spin text-tasar-gold mb-4" />
                <p className="text-tasar-brown/60">Loading heritage collections...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProducts.map((p, i) => (
                  <Link 
                    to={`/product/${p.id}`}
                    key={p.id}
                    className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-tasar-brown/5"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <img src={p.image_url || p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                      <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-tasar-brown/40 hover:text-red-500 transition-colors shadow-sm">
                        <Heart size={20} />
                      </button>
                      <div className="absolute bottom-4 left-4 flex gap-2">
                        <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-tasar-brown flex items-center gap-1">
                          <MapPin size={10} /> {p.region || 'India'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-tasar-gold mb-1">{p.category}</p>
                          <h3 className="text-lg font-serif font-bold group-hover:text-tasar-gold transition-colors">{p.name}</h3>
                        </div>
                        <div className="flex items-center gap-1 text-xs font-bold text-tasar-brown/40">
                          <Star size={14} className="text-tasar-gold fill-tasar-gold" />
                          <span>{p.rating || '4.5'}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-6">
                        <span className="text-xl font-bold text-tasar-brown">₹{p.price.toLocaleString()}</span>
                        <button className="w-10 h-10 bg-tasar-gold text-white rounded-full flex items-center justify-center hover:bg-tasar-brown transition-colors shadow-lg shadow-tasar-gold/20">
                          <ShoppingBag size={18} />
                        </button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
