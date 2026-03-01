import React, { useState } from 'react';
import { 
  LayoutDashboard, ShoppingBag, Heart, User, 
  LogOut, Bell, Search, Package, MapPin, 
  ChevronRight, Star, Clock, CreditCard, MessageSquare, FileCheck, Upload, X,
  ShieldCheck, Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '../utils/cn';

export default function BuyerDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real app, clear tokens/session
    navigate('/');
  };

  const menuItems = [
    { id: 'dashboard', icon: <LayoutDashboard size={20} />, label: "Overview" },
    { id: 'orders', icon: <ShoppingBag size={20} />, label: "My Orders" },
    { id: 'messages', icon: <MessageSquare size={20} />, label: "Messages" },
    { id: 'wishlist', icon: <Heart size={20} />, label: "Wishlist" },
    { id: 'profile', icon: <User size={20} />, label: "Profile" },
  ];

  const recentOrders = [
    { id: "#TC-9021", date: "Feb 24, 2026", items: "Tasar Silk Saree", total: "₹12,499", status: "Shipped", statusColor: "text-emerald-600 bg-emerald-100" },
    { id: "#TC-8842", date: "Jan 15, 2026", items: "Hand-woven Stole", total: "₹2,850", status: "Delivered", statusColor: "text-blue-600 bg-blue-100" },
  ];

  return (
    <div className="min-h-screen bg-tasar-ivory flex">
      {/* Sidebar */}
      <aside className="w-64 bg-tasar-brown text-white p-6 hidden lg:flex flex-col border-r border-white/5">
        <Link to="/" className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 bg-tasar-gold rounded-lg flex items-center justify-center text-white font-serif font-bold text-xl">T</div>
          <span className="text-xl font-serif font-bold tracking-tight">Tasar Collective</span>
        </Link>

        <nav className="space-y-2 flex-grow">
          {menuItems.map((item) => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                activeTab === item.id ? "bg-tasar-gold text-white shadow-lg shadow-tasar-gold/20" : "text-white/60 hover:text-white hover:bg-white/5"
              )}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </nav>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 text-white/60 hover:text-white transition-all mt-auto"
        >
          <LogOut size={20} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8 overflow-y-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-3xl font-serif font-bold mb-1 capitalize">{activeTab.replace('-', ' ')}</h1>
            <p className="text-tasar-brown/60">Welcome back, Emma. Here's your collection status.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-2 bg-white rounded-xl border border-tasar-brown/5 text-tasar-brown/40 relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <Link to="/marketplace" className="btn-primary py-2 px-6 flex items-center gap-2">
              <ShoppingBag size={18} /> Shop More
            </Link>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div 
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-tasar-brown/5">
                  <div className="w-12 h-12 bg-tasar-gold/10 text-tasar-gold rounded-2xl flex items-center justify-center mb-4">
                    <ShoppingBag size={24} />
                  </div>
                  <p className="text-sm font-medium text-tasar-brown/40 mb-1">Total Orders</p>
                  <h3 className="text-2xl font-bold text-tasar-brown">08</h3>
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-tasar-brown/5">
                  <div className="w-12 h-12 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-4">
                    <Heart size={24} />
                  </div>
                  <p className="text-sm font-medium text-tasar-brown/40 mb-1">Wishlist Items</p>
                  <h3 className="text-2xl font-bold text-tasar-brown">14</h3>
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-tasar-brown/5">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-4">
                    <CreditCard size={24} />
                  </div>
                  <p className="text-sm font-medium text-tasar-brown/40 mb-1">Total Spent</p>
                  <h3 className="text-2xl font-bold text-tasar-brown">₹42,850</h3>
                </div>
              </div>

              {/* Recent Orders */}
              <div className="bg-white rounded-3xl shadow-sm border border-tasar-brown/5 overflow-hidden">
                <div className="p-6 border-b border-tasar-brown/5 flex items-center justify-between">
                  <h3 className="text-xl font-serif font-bold">Recent Orders</h3>
                  <button onClick={() => setActiveTab('orders')} className="text-tasar-gold text-sm font-bold hover:underline">View All</button>
                </div>
                <div className="divide-y divide-tasar-brown/5">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="p-6 flex items-center justify-between hover:bg-tasar-ivory/20 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-tasar-ivory rounded-xl flex items-center justify-center text-tasar-brown">
                          <Package size={24} />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm">{order.items}</h4>
                          <p className="text-xs text-tasar-brown/40">{order.id} • {order.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-8">
                        <span className="font-bold text-sm">{order.total}</span>
                        <span className={cn("px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider", order.statusColor)}>
                          {order.status}
                        </span>
                        <ChevronRight size={16} className="text-tasar-brown/20" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'orders' && (
            <motion.div 
              key="orders"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-3xl shadow-sm border border-tasar-brown/5 overflow-hidden"
            >
              <div className="p-6 border-b border-tasar-brown/5">
                <h3 className="text-xl font-serif font-bold">Order History</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-tasar-ivory/30">
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-tasar-brown/40">Order ID</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-tasar-brown/40">Date</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-tasar-brown/40">Items</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-tasar-brown/40">Total</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-tasar-brown/40">Status</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-tasar-brown/40">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-tasar-brown/5">
                    {[...recentOrders, { id: "#TC-7721", date: "Dec 12, 2025", items: "Raw Silk Fabric", total: "₹3,600", status: "Delivered", statusColor: "text-blue-600 bg-blue-100" }].map((order) => (
                      <tr key={order.id} className="hover:bg-tasar-ivory/20 transition-colors">
                        <td className="px-6 py-4 font-bold text-sm">{order.id}</td>
                        <td className="px-6 py-4 text-sm text-tasar-brown/60">{order.date}</td>
                        <td className="px-6 py-4 text-sm font-medium">{order.items}</td>
                        <td className="px-6 py-4 text-sm font-bold">{order.total}</td>
                        <td className="px-6 py-4">
                          <span className={cn("px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider", order.statusColor)}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <Link to={`/order-tracking/${order.id.replace('#', '')}`} className="text-tasar-gold text-xs font-bold hover:underline">Track</Link>
                            {order.status === 'Delivered' && (
                              <>
                                <button 
                                  onClick={() => {
                                    setSelectedOrder(order);
                                    setIsReviewModalOpen(true);
                                  }}
                                  className="text-emerald-600 text-xs font-bold hover:underline flex items-center gap-1"
                                >
                                  <Star size={12} /> Review
                                </button>
                                <button 
                                  onClick={() => {
                                    setSelectedOrder(order);
                                    setIsCertificateModalOpen(true);
                                  }}
                                  className="text-blue-600 text-xs font-bold hover:underline flex items-center gap-1"
                                >
                                  <FileCheck size={12} /> Certificate
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === 'profile' && (
            <motion.div 
              key="profile"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl space-y-8"
            >
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-tasar-brown/5">
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-24 h-24 rounded-full bg-tasar-gold/10 flex items-center justify-center border-4 border-white shadow-lg">
                    <User size={48} className="text-tasar-gold" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif font-bold">Emma Richardson</h3>
                    <p className="text-tasar-brown/60">Member since Jan 2026</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-tasar-brown/40 mb-2">Email Address</label>
                    <input type="email" readOnly value="emma.r@example.com" className="w-full px-4 py-3 bg-tasar-ivory/50 border border-tasar-brown/5 rounded-xl outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-tasar-brown/40 mb-2">Phone Number</label>
                    <input type="text" value="+44 7700 900000" className="w-full px-4 py-3 bg-white border border-tasar-brown/5 rounded-xl outline-none focus:border-tasar-gold transition-all" />
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-sm border border-tasar-brown/5">
                <h3 className="text-xl font-serif font-bold mb-6 flex items-center gap-2">
                  <MapPin size={20} className="text-tasar-gold" /> Shipping Address
                </h3>
                <div className="space-y-4">
                  <textarea 
                    className="w-full px-4 py-3 bg-white border border-tasar-brown/5 rounded-xl outline-none focus:border-tasar-gold transition-all h-32"
                    defaultValue="221B Baker Street, London, NW1 6XE, United Kingdom"
                  />
                  <button className="btn-primary py-2 px-8">Update Address</button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'messages' && (
            <motion.div 
              key="messages"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-3xl shadow-sm border border-tasar-brown/5 overflow-hidden flex h-[600px]"
            >
              {/* Chat List */}
              <div className="w-80 border-r border-tasar-brown/5 flex flex-col">
                <div className="p-6 border-b border-tasar-brown/5">
                  <h3 className="text-xl font-serif font-bold">Artisan Chats</h3>
                </div>
                <div className="flex-grow overflow-y-auto">
                  {[
                    { id: 1, name: "Lakshmi Devi", lastMsg: "Namaste Emma! All our dyes...", time: "10m ago", active: true },
                  ].map(chat => (
                    <button key={chat.id} className={cn("w-full p-6 text-left hover:bg-tasar-ivory/20 transition-all border-b border-tasar-brown/5", chat.active && "bg-tasar-gold/5")}>
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-bold text-sm">{chat.name}</span>
                        <span className="text-[10px] text-tasar-brown/40">{chat.time}</span>
                      </div>
                      <p className="text-xs text-tasar-brown/60 truncate">{chat.lastMsg}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Window */}
              <div className="flex-grow flex flex-col">
                <div className="p-6 border-b border-tasar-brown/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-tasar-gold/10 flex items-center justify-center text-tasar-gold font-bold">LD</div>
                    <div>
                      <h4 className="font-bold text-sm">Lakshmi Devi</h4>
                      <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">Active Now</p>
                    </div>
                  </div>
                </div>
                <div className="flex-grow p-6 space-y-4 overflow-y-auto bg-tasar-ivory/10">
                  <div className="flex justify-end">
                    <div className="max-w-[70%] bg-tasar-gold text-white p-4 rounded-2xl rounded-tr-none shadow-lg shadow-tasar-gold/20">
                      <p className="text-sm">Namaste! I'm interested in the Tasar Silk Saree. Is the indigo dye used natural or synthetic?</p>
                      <span className="text-[10px] text-white/60 mt-2 block">10:45 AM</span>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="max-w-[70%] bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-tasar-brown/5">
                      <p className="text-sm">Namaste Emma! All our dyes are 100% natural, extracted from indigo plants and pomegranate peels.</p>
                      <span className="text-[10px] text-tasar-brown/40 mt-2 block">10:48 AM</span>
                    </div>
                  </div>
                </div>
                <div className="p-6 border-t border-tasar-brown/5">
                  <div className="flex gap-4">
                    <input type="text" placeholder="Ask about customization..." className="flex-grow px-4 py-3 bg-tasar-ivory/50 border border-tasar-brown/5 rounded-xl outline-none focus:border-tasar-gold transition-all" />
                    <button className="btn-primary px-6">Send</button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'wishlist' && (
            <motion.div 
              key="wishlist"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              {[
                { name: "Raw Silk Fabric", price: "₹1,200", img: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&q=80&w=400" },
                { name: "Heritage Dupatta", price: "₹4,500", img: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=400" },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-tasar-brown/5 group">
                  <div className="relative aspect-square overflow-hidden">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                    <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-red-500 shadow-sm">
                      <Heart size={20} fill="currentColor" />
                    </button>
                  </div>
                  <div className="p-6">
                    <h4 className="font-serif font-bold text-lg mb-1">{item.name}</h4>
                    <p className="text-tasar-gold font-bold mb-4">{item.price}</p>
                    <button className="w-full btn-secondary py-2 text-sm">Add to Cart</button>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Review Modal */}
        <AnimatePresence>
          {isReviewModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsReviewModalOpen(false)} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative w-full max-w-lg bg-white rounded-[32px] p-8 shadow-2xl">
                <button onClick={() => setIsReviewModalOpen(false)} className="absolute top-6 right-6 p-2 hover:bg-tasar-ivory rounded-full transition-colors"><X size={20} /></button>
                <h3 className="text-2xl font-serif font-bold mb-2">Review Your Purchase</h3>
                <p className="text-sm text-tasar-brown/60 mb-8">Share your experience with the {selectedOrder?.items}.</p>
                
                <div className="space-y-6">
                  <div className="flex justify-center gap-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button key={star} className="text-tasar-gold hover:scale-110 transition-transform"><Star size={32} fill={star <= 4 ? "currentColor" : "none"} /></button>
                    ))}
                  </div>
                  <textarea placeholder="Tell us about the weave, the texture, and the craftsmanship..." className="w-full px-4 py-3 bg-tasar-ivory/50 border border-tasar-brown/5 rounded-2xl outline-none focus:border-tasar-gold transition-all h-32" />
                  <div className="border-2 border-dashed border-tasar-brown/10 rounded-2xl p-6 text-center hover:border-tasar-gold transition-all cursor-pointer">
                    <Upload size={24} className="text-tasar-brown/40 mx-auto mb-2" />
                    <p className="text-xs font-bold">Upload Photos of the Product</p>
                  </div>
                  <button className="w-full btn-primary py-3">Submit Verified Review</button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Certificate Modal */}
        <AnimatePresence>
          {isCertificateModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCertificateModalOpen(false)} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
              <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className="relative w-full max-w-2xl bg-[#fdfbf7] rounded-[40px] p-12 shadow-2xl border-[12px] border-tasar-gold/10">
                <button onClick={() => setIsCertificateModalOpen(false)} className="absolute top-6 right-6 p-2 hover:bg-tasar-ivory rounded-full transition-colors"><X size={20} /></button>
                
                <div className="text-center border-b-2 border-tasar-gold/20 pb-8 mb-8">
                  <div className="w-16 h-16 bg-tasar-gold rounded-2xl flex items-center justify-center text-white font-serif font-bold text-3xl mx-auto mb-4">T</div>
                  <h2 className="text-3xl font-serif font-bold tracking-widest uppercase">Certificate of Authenticity</h2>
                  <p className="text-[10px] font-bold text-tasar-gold uppercase tracking-[0.5em] mt-2">Tasar Collective Verified Heritage</p>
                </div>

                <div className="space-y-8 text-center">
                  <p className="font-serif italic text-xl text-tasar-brown/80">This document certifies that the following item is an authentic piece of Indian handloom heritage.</p>
                  
                  <div className="grid grid-cols-2 gap-8 text-left max-w-md mx-auto">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-tasar-brown/40 mb-1">Product</p>
                      <p className="font-bold">{selectedOrder?.items}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-tasar-brown/40 mb-1">Artisan</p>
                      <p className="font-bold">Lakshmi Devi</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-tasar-brown/40 mb-1">Region</p>
                      <p className="font-bold">Bhagalpur, Bihar</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-tasar-brown/40 mb-1">Order ID</p>
                      <p className="font-bold">{selectedOrder?.id}</p>
                    </div>
                  </div>

                  <div className="pt-8 flex justify-center gap-12">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-tasar-ivory rounded-full flex items-center justify-center mx-auto mb-2 border border-tasar-brown/5">
                        <ShieldCheck size={32} className="text-tasar-gold" />
                      </div>
                      <p className="text-[10px] font-bold uppercase tracking-widest">Silk Mark</p>
                    </div>
                    <div className="text-center">
                      <div className="w-20 h-20 bg-tasar-ivory rounded-full flex items-center justify-center mx-auto mb-2 border border-tasar-brown/5">
                        <Award size={32} className="text-tasar-gold" />
                      </div>
                      <p className="text-[10px] font-bold uppercase tracking-widest">Handloom Mark</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 flex justify-center">
                  <button className="btn-primary px-12 py-3 flex items-center gap-2">
                    <Upload size={18} /> Download PDF Certificate
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
