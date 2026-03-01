import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, ShoppingBag, Heart, Share2, ShieldCheck, 
  Truck, RotateCcw, Star, MapPin, User, Award, Loader2, Play, Camera
} from 'lucide-react';
import { motion } from 'motion/react';
import { useCart } from '../context/CartContext';
import { cn } from '../utils/cn';

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-tasar-ivory flex flex-col items-center justify-center">
        <Loader2 size={48} className="animate-spin text-tasar-gold mb-4" />
        <p className="text-tasar-brown/60">Unrolling the heritage...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-tasar-ivory flex flex-col items-center justify-center p-6">
        <h2 className="text-3xl font-serif font-bold mb-4">Heritage Not Found</h2>
        <p className="text-tasar-brown/60 mb-8">This piece of history seems to be missing from our archives.</p>
        <Link to="/marketplace" className="btn-primary px-8 py-3">Back to Marketplace</Link>
      </div>
    );
  }

  // Fallback values for seeded data that might lack some fields
  const displayProduct = {
    ...product,
    img: product.image_url || product.img || "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1000",
    artisan: product.artisan_name || "Lakshmi Devi",
    artisanBio: product.artisanBio || "A master weaver preserving the ancient handloom techniques of India.",
    rating: product.rating || 4.8,
    reviews: product.reviews || 124,
    region: product.region || "Bhagalpur"
  };

  return (
    <div className="min-h-screen bg-tasar-ivory pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <Link to="/marketplace" className="flex items-center gap-2 text-tasar-brown/60 hover:text-tasar-gold mb-8 transition-colors font-medium">
          <ArrowLeft size={20} /> Back to Marketplace
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img src={displayProduct.img} alt={displayProduct.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="aspect-square rounded-xl overflow-hidden border-2 border-white cursor-pointer hover:border-tasar-gold transition-all">
                  <img src={displayProduct.img} alt="Thumbnail" className="w-full h-full object-cover opacity-60 hover:opacity-100" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div className="mb-8">
              <div className="flex items-center gap-2 text-tasar-gold font-bold uppercase tracking-widest text-xs mb-2">
                <MapPin size={14} /> {displayProduct.region}, India
              </div>
              <h1 className="text-5xl font-serif font-bold mb-4">{displayProduct.name}</h1>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1 text-tasar-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} fill={i < 4 ? "currentColor" : "none"} />
                  ))}
                </div>
                <span className="text-sm text-tasar-brown/60 font-medium">({displayProduct.reviews} Verified Reviews)</span>
              </div>
              <p className="text-3xl font-bold text-tasar-brown">₹{displayProduct.price.toLocaleString()}</p>
            </div>

            <div className="space-y-6 mb-10">
              <p className="text-tasar-brown/70 leading-relaxed">
                This authentic {displayProduct.name} is hand-woven using 100% pure Tasar silk. Each thread is carefully selected and dyed using natural minerals, ensuring a unique texture and a subtle, heritage glow that only improves with age.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/50 border border-tasar-brown/5">
                  <ShieldCheck className="text-tasar-gold" />
                  <span className="text-xs font-bold uppercase tracking-wider">Authenticity Certified</span>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/50 border border-tasar-brown/5">
                  <Award className="text-tasar-gold" />
                  <span className="text-xs font-bold uppercase tracking-wider">Artisan Direct</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mb-12">
              <button 
                onClick={() => addToCart(displayProduct)}
                className="btn-primary flex-grow py-4 flex items-center justify-center gap-2 text-lg"
              >
                <ShoppingBag size={20} /> Add to Cart
              </button>
              <button className="w-16 h-16 rounded-full border-2 border-tasar-brown/10 flex items-center justify-center hover:bg-white hover:border-tasar-gold transition-all">
                <Heart size={24} className="text-tasar-brown/40" />
              </button>
              <button className="w-16 h-16 rounded-full border-2 border-tasar-brown/10 flex items-center justify-center hover:bg-white hover:border-tasar-gold transition-all">
                <Share2 size={24} className="text-tasar-brown/40" />
              </button>
            </div>

            {/* Artisan Story Card */}
            <div className="p-8 rounded-3xl bg-tasar-brown text-white relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-xs font-bold uppercase tracking-widest text-tasar-gold mb-4">Meet the Artisan</h3>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-tasar-gold/20 flex items-center justify-center border-2 border-tasar-gold">
                    <User size={32} className="text-tasar-gold" />
                  </div>
                  <div>
                    <h4 className="text-xl font-serif font-bold">{displayProduct.artisan}</h4>
                    <p className="text-white/60 text-sm">{displayProduct.region} Weaver</p>
                  </div>
                </div>
                <p className="text-white/70 text-sm leading-relaxed italic">
                  "{displayProduct.artisanBio}"
                </p>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-tasar-gold/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
            </div>
          </motion.div>
        </div>

        {/* Behind the Loom Stories */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32"
        >
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-tasar-gold/10 text-tasar-gold rounded-full text-xs font-bold uppercase tracking-widest mb-4">
              <Camera size={14} /> Behind the Loom
            </div>
            <h2 className="text-5xl font-serif font-bold mb-4">The Story of the Weave</h2>
            <p className="text-tasar-brown/60 max-w-2xl mx-auto leading-relaxed">
              Every piece in our collection carries the heartbeat of the artisan. Witness the 
              meticulous process of hand-weaving this {displayProduct.name}.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 relative aspect-video rounded-[40px] overflow-hidden group shadow-2xl">
              <img src="https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&q=80&w=1200" alt="Weaving Process" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <button className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-tasar-gold shadow-2xl hover:scale-110 transition-transform">
                  <Play size={32} fill="currentColor" />
                </button>
              </div>
              <div className="absolute bottom-8 left-8 text-white">
                <p className="text-xs font-bold uppercase tracking-widest mb-2">Bhagalpur, Bihar</p>
                <h3 className="text-2xl font-serif font-bold">The Art of Matka Weaving</h3>
              </div>
            </div>
            <div className="space-y-8">
              {[
                { title: "Natural Dyeing", desc: "Extracting indigo and pomegranate dyes.", img: "https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&q=80&w=400" },
                { title: "Hand-spinning", desc: "The rhythmic spinning of raw silk threads.", img: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=400" },
              ].map((story, i) => (
                <div key={i} className="flex gap-6 group cursor-pointer">
                  <div className="w-32 h-32 rounded-3xl overflow-hidden flex-shrink-0 shadow-lg">
                    <img src={story.img} alt={story.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h4 className="font-serif font-bold text-lg mb-1 group-hover:text-tasar-gold transition-colors">{story.title}</h4>
                    <p className="text-xs text-tasar-brown/60 leading-relaxed">{story.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Shipping & Returns */}
        <div className="grid md:grid-cols-2 gap-8 mt-20">
          <div className="flex gap-4 p-6 rounded-3xl bg-white shadow-sm border border-tasar-brown/5">
            <div className="w-12 h-12 bg-tasar-ivory rounded-2xl flex items-center justify-center text-tasar-gold">
              <Truck size={24} />
            </div>
            <div>
              <h4 className="font-bold mb-1">Global Shipping</h4>
              <p className="text-sm text-tasar-brown/60">Delivered within 7-12 business days worldwide. Fully tracked and insured.</p>
            </div>
          </div>
          <div className="flex gap-4 p-6 rounded-3xl bg-white shadow-sm border border-tasar-brown/5">
            <div className="w-12 h-12 bg-tasar-ivory rounded-2xl flex items-center justify-center text-tasar-gold">
              <RotateCcw size={24} />
            </div>
            <div>
              <h4 className="font-bold mb-1">Ethical Returns</h4>
              <p className="text-sm text-tasar-brown/60">14-day return policy. We ensure artisans are compensated for their work.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
