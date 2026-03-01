import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  LayoutDashboard, Package, ShoppingCart, BarChart3, 
  Settings, LogOut, Plus, Search, Bell, TrendingUp, 
  Users, DollarSign, ArrowUpRight, MoreVertical, X, Upload, Image as ImageIcon,
  ChevronRight, User, MessageSquare, ShieldCheck, MapPin, FileCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../utils/cn';

export default function ArtisanDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState('dashboard');
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [newProduct, setNewProduct] = React.useState({
    name: '',
    category: 'Sarees',
    price: '',
    description: '',
  });
  const [selectedImages, setSelectedImages] = React.useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: string[] = [];
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newImages.push(reader.result as string);
          if (newImages.length === files.length) {
            setSelectedImages(prev => [...prev, ...newImages]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedImages.length === 0) {
      alert('Please upload at least one image.');
      return;
    }
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...newProduct,
          price: parseFloat(newProduct.price),
          stock: 10,
          image_url: selectedImages[0] // For now, use the first image as the main one
        }),
      });

      if (response.ok) {
        setIsAddModalOpen(false);
        setNewProduct({
          name: '',
          category: 'Sarees',
          price: '',
          description: '',
        });
        setSelectedImages([]);
        alert('Product listed successfully!');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const stats = [
    { label: "Total Sales", value: "₹1,24,500", icon: <DollarSign />, trend: "+12.5%", color: "bg-emerald-100 text-emerald-600" },
    { label: "Active Orders", value: "12", icon: <ShoppingCart />, trend: "+2", color: "bg-blue-100 text-blue-600" },
    { label: "Product Views", value: "2,840", icon: <Users />, trend: "+18%", color: "bg-purple-100 text-purple-600" },
    { label: "Growth", value: "24%", icon: <TrendingUp />, trend: "+4%", color: "bg-tasar-gold/10 text-tasar-gold" },
  ];

  return (
    <div className="min-h-screen bg-tasar-ivory flex">
      {/* Sidebar */}
      <aside className="w-64 bg-tasar-brown text-white p-6 hidden lg:flex flex-col">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 bg-tasar-gold rounded-lg flex items-center justify-center text-white font-serif font-bold text-xl">T</div>
          <span className="text-xl font-serif font-bold tracking-tight">Tasar Collective</span>
        </div>

        <nav className="space-y-2 flex-grow">
          {[
            { id: 'dashboard', icon: <LayoutDashboard size={20} />, label: "Dashboard" },
            { id: 'products', icon: <Package size={20} />, label: "My Products" },
            { id: 'orders', icon: <ShoppingCart size={20} />, label: "Orders" },
            { id: 'messages', icon: <MessageSquare size={20} />, label: "Messages" },
            { id: 'analytics', icon: <BarChart3 size={20} />, label: "Analytics" },
            { id: 'settings', icon: <Settings size={20} />, label: "Settings" },
          ].map((item) => (
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
          onClick={() => navigate('/')}
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
            <p className="text-tasar-brown/60">Manage your heritage business and global collections.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-tasar-brown/30" size={18} />
              <input type="text" placeholder="Search..." className="pl-12 pr-4 py-2 bg-white border border-tasar-brown/5 rounded-xl outline-none focus:border-tasar-gold transition-all" />
            </div>
            <button className="p-2 bg-white rounded-xl border border-tasar-brown/5 text-tasar-brown/40 relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="btn-primary py-2 px-6 flex items-center gap-2"
            >
              <Plus size={18} /> Add Product
            </button>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div 
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                  <div 
                    key={stat.label}
                    className="bg-white p-6 rounded-3xl shadow-sm border border-tasar-brown/5"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className={cn("p-3 rounded-2xl", stat.color)}>
                        {stat.icon}
                      </div>
                      <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                        {stat.trend} <ArrowUpRight size={12} />
                      </span>
                    </div>
                    <p className="text-sm font-medium text-tasar-brown/40 mb-1">{stat.label}</p>
                    <h3 className="text-2xl font-bold text-tasar-brown">{stat.value}</h3>
                  </div>
                ))}
              </div>

              {/* Recent Orders Table */}
              <div className="bg-white rounded-3xl shadow-sm border border-tasar-brown/5 overflow-hidden">
                <div className="p-6 border-b border-tasar-brown/5 flex items-center justify-between">
                  <h3 className="text-xl font-serif font-bold">Recent Orders</h3>
                  <button onClick={() => setActiveTab('orders')} className="text-tasar-gold text-sm font-bold hover:underline">View All</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-tasar-ivory/30">
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-tasar-brown/40">Order ID</th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-tasar-brown/40">Product</th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-tasar-brown/40">Customer</th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-tasar-brown/40">Amount</th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-tasar-brown/40">Status</th>
                        <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-tasar-brown/40"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-tasar-brown/5">
                      {[
                        { id: "#TC-8492", product: "Tasar Silk Saree", customer: "Emma R.", amount: "₹12,499", status: "Shipped", statusColor: "text-emerald-600 bg-emerald-100" },
                        { id: "#TC-8493", product: "Hand-woven Stole", customer: "Rahul S.", amount: "₹2,850", status: "Processing", statusColor: "text-blue-600 bg-blue-100" },
                        { id: "#TC-8494", product: "Heritage Dupatta", customer: "Sarah J.", amount: "₹4,500", status: "Pending", statusColor: "text-amber-600 bg-amber-100" },
                      ].map((order) => (
                        <tr key={order.id} className="hover:bg-tasar-ivory/20 transition-colors">
                          <td className="px-6 py-4 font-bold text-sm">{order.id}</td>
                          <td className="px-6 py-4 text-sm font-medium">{order.product}</td>
                          <td className="px-6 py-4 text-sm text-tasar-brown/60">{order.customer}</td>
                          <td className="px-6 py-4 text-sm font-bold">{order.amount}</td>
                          <td className="px-6 py-4">
                            <span className={cn("px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider", order.statusColor)}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button className="p-2 hover:bg-tasar-ivory rounded-lg transition-colors">
                              <MoreVertical size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'products' && (
            <motion.div 
              key="products"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              {[
                { id: 1, name: "Tasar Silk Saree", price: "₹12,499", stock: 10, views: 1240, img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=400" },
                { id: 2, name: "Hand-woven Stole", price: "₹2,850", stock: 25, views: 860, img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=400" },
                { id: 3, name: "Raw Silk Fabric", price: "₹1,200/m", stock: 100, views: 450, img: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&q=80&w=400" },
              ].map((p) => (
                <div key={p.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-tasar-brown/5 group">
                  <div className="relative aspect-square overflow-hidden">
                    <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                    <div className="absolute top-4 right-4 flex gap-2">
                      <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-tasar-brown/40 hover:text-tasar-gold transition-colors">
                        <Settings size={18} />
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="font-serif font-bold text-lg mb-1">{p.name}</h4>
                    <p className="text-tasar-gold font-bold mb-4">{p.price}</p>
                    <div className="flex items-center justify-between text-xs font-bold text-tasar-brown/40 uppercase tracking-widest">
                      <span>Stock: {p.stock}</span>
                      <span>Views: {p.views}</span>
                    </div>
                  </div>
                </div>
              ))}
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
                <h3 className="text-xl font-serif font-bold">All Orders</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-tasar-ivory/30">
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-tasar-brown/40">Order ID</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-tasar-brown/40">Product</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-tasar-brown/40">Customer</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-tasar-brown/40">Amount</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-tasar-brown/40">Status</th>
                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-tasar-brown/40">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-tasar-brown/5">
                    {[
                      { id: "#TC-8492", product: "Tasar Silk Saree", customer: "Emma R.", amount: "₹12,499", status: "Shipped", statusColor: "text-emerald-600 bg-emerald-100" },
                      { id: "#TC-8493", product: "Hand-woven Stole", customer: "Rahul S.", amount: "₹2,850", status: "Processing", statusColor: "text-blue-600 bg-blue-100" },
                      { id: "#TC-8494", product: "Heritage Dupatta", customer: "Sarah J.", amount: "₹4,500", status: "Pending", statusColor: "text-amber-600 bg-amber-100" },
                      { id: "#TC-8495", product: "Silk Scarf", customer: "David L.", amount: "₹1,800", status: "Delivered", statusColor: "text-emerald-600 bg-emerald-100" },
                    ].map((order) => (
                      <tr key={order.id} className="hover:bg-tasar-ivory/20 transition-colors">
                        <td className="px-6 py-4 font-bold text-sm">{order.id}</td>
                        <td className="px-6 py-4 text-sm font-medium">{order.product}</td>
                        <td className="px-6 py-4 text-sm text-tasar-brown/60">{order.customer}</td>
                        <td className="px-6 py-4 text-sm font-bold">{order.amount}</td>
                        <td className="px-6 py-4">
                          <span className={cn("px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider", order.statusColor)}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-tasar-gold text-xs font-bold hover:underline">Update Status</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
                  <h3 className="text-xl font-serif font-bold">Inquiries</h3>
                </div>
                <div className="flex-grow overflow-y-auto">
                  {[
                    { id: 1, name: "Emma R.", lastMsg: "Is the indigo dye natural?", time: "10m ago", active: true },
                    { id: 2, name: "Rahul S.", lastMsg: "Can I get this in 6 meters?", time: "2h ago", active: false },
                    { id: 3, name: "Sarah J.", lastMsg: "When will the raw silk be back?", time: "1d ago", active: false },
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
                    <div className="w-10 h-10 rounded-full bg-tasar-gold/10 flex items-center justify-center text-tasar-gold font-bold">ER</div>
                    <div>
                      <h4 className="font-bold text-sm">Emma R.</h4>
                      <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">Online</p>
                    </div>
                  </div>
                </div>
                <div className="flex-grow p-6 space-y-4 overflow-y-auto bg-tasar-ivory/10">
                  <div className="flex justify-start">
                    <div className="max-w-[70%] bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-tasar-brown/5">
                      <p className="text-sm">Namaste! I'm interested in the Tasar Silk Saree. Is the indigo dye used natural or synthetic?</p>
                      <span className="text-[10px] text-tasar-brown/40 mt-2 block">10:45 AM</span>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="max-w-[70%] bg-tasar-gold text-white p-4 rounded-2xl rounded-tr-none shadow-lg shadow-tasar-gold/20">
                      <p className="text-sm">Namaste Emma! All our dyes are 100% natural, extracted from indigo plants and pomegranate peels.</p>
                      <span className="text-[10px] text-white/60 mt-2 block">10:48 AM</span>
                    </div>
                  </div>
                </div>
                <div className="p-6 border-t border-tasar-brown/5">
                  <div className="flex gap-4">
                    <input type="text" placeholder="Type your message..." className="flex-grow px-4 py-3 bg-tasar-ivory/50 border border-tasar-brown/5 rounded-xl outline-none focus:border-tasar-gold transition-all" />
                    <button className="btn-primary px-6">Send</button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'analytics' && (
            <motion.div 
              key="analytics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-tasar-brown/5">
                <h3 className="text-xl font-serif font-bold mb-8">Revenue Growth</h3>
                <div className="h-[300px] w-full flex items-end gap-4 px-4">
                  {[40, 60, 45, 80, 55, 90, 70].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        className="w-full bg-tasar-gold/20 rounded-t-lg relative group"
                      >
                        <div className="absolute inset-0 bg-tasar-gold opacity-0 group-hover:opacity-100 transition-opacity rounded-t-lg" />
                      </motion.div>
                      <span className="text-[10px] font-bold text-tasar-brown/40">Day {i+1}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-tasar-brown/5">
                  <h3 className="text-xl font-serif font-bold mb-6">Top Categories</h3>
                  <div className="space-y-4">
                    {[
                      { label: "Sarees", value: 65, color: "bg-tasar-gold" },
                      { label: "Accessories", value: 20, color: "bg-emerald-500" },
                      { label: "Fabrics", value: 15, color: "bg-blue-500" },
                    ].map(item => (
                      <div key={item.label}>
                        <div className="flex justify-between text-sm font-bold mb-2">
                          <span>{item.label}</span>
                          <span>{item.value}%</span>
                        </div>
                        <div className="h-2 bg-tasar-ivory rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${item.value}%` }}
                            className={cn("h-full", item.color)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-tasar-brown/5">
                  <h3 className="text-xl font-serif font-bold mb-6">Customer Regions</h3>
                  <div className="space-y-4">
                    {[
                      { label: "North America", value: 45 },
                      { label: "Europe", value: 30 },
                      { label: "India", value: 25 },
                    ].map(item => (
                      <div key={item.label} className="flex items-center justify-between p-4 rounded-2xl bg-tasar-ivory/30">
                        <span className="font-bold text-sm">{item.label}</span>
                        <span className="text-tasar-gold font-bold">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div 
              key="settings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl space-y-8"
            >
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-tasar-brown/5">
                <h3 className="text-xl font-serif font-bold mb-8">Shop Profile</h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-3xl bg-tasar-gold/10 flex items-center justify-center border-4 border-white shadow-lg relative group">
                      <User size={48} className="text-tasar-gold" />
                      <button className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl flex items-center justify-center text-white">
                        <Upload size={20} />
                      </button>
                    </div>
                    <div>
                      <h4 className="text-xl font-serif font-bold">Lakshmi Devi</h4>
                      <p className="text-tasar-brown/60 text-sm">Bhagalpur Heritage Weaver</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-tasar-brown/40 mb-2">Shop Name</label>
                      <input type="text" defaultValue="Lakshmi Heritage Silks" className="w-full px-4 py-3 bg-white border border-tasar-brown/5 rounded-xl outline-none focus:border-tasar-gold transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-tasar-brown/40 mb-2">Contact Email</label>
                      <input type="email" defaultValue="lakshmi@example.com" className="w-full px-4 py-3 bg-white border border-tasar-brown/5 rounded-xl outline-none focus:border-tasar-gold transition-all" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-tasar-brown/40 mb-2">Artisan Bio</label>
                    <textarea className="w-full px-4 py-3 bg-white border border-tasar-brown/5 rounded-xl outline-none focus:border-tasar-gold transition-all h-32" defaultValue="4th generation weaver from Bhagalpur, specializing in natural-dyed Tasar silk." />
                  </div>

                  <button className="btn-primary py-3 px-8">Save Changes</button>
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-sm border border-tasar-brown/5">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-serif font-bold">Artisan Verification</h3>
                  <span className="px-3 py-1 bg-amber-100 text-amber-600 rounded-full text-[10px] font-bold uppercase tracking-wider">Pending Verification</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 rounded-2xl bg-tasar-ivory/30 border border-tasar-brown/5 text-center">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-tasar-gold mx-auto mb-4 shadow-sm">
                      <ShieldCheck size={24} />
                    </div>
                    <h4 className="font-bold text-sm mb-1">Identity Verified</h4>
                    <p className="text-[10px] text-tasar-brown/40">Aadhar/ID submitted</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-tasar-ivory/30 border border-tasar-brown/5 text-center">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-tasar-gold mx-auto mb-4 shadow-sm">
                      <MapPin size={24} />
                    </div>
                    <h4 className="font-bold text-sm mb-1">Cluster Mapping</h4>
                    <p className="text-[10px] text-tasar-brown/40">Bhagalpur Cluster #42</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-tasar-ivory/30 border border-tasar-brown/5 text-center">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-tasar-gold mx-auto mb-4 shadow-sm">
                      <FileCheck size={24} />
                    </div>
                    <h4 className="font-bold text-sm mb-1">Silk Mark</h4>
                    <p className="text-[10px] text-tasar-brown/40">Certificate Pending</p>
                  </div>
                </div>
                <div className="mt-8 p-6 border-2 border-dashed border-tasar-brown/10 rounded-2xl text-center hover:border-tasar-gold transition-all cursor-pointer group">
                  <Upload size={24} className="text-tasar-brown/40 group-hover:text-tasar-gold mx-auto mb-2" />
                  <p className="text-sm font-bold">Upload Loom Photos or Certificates</p>
                  <p className="text-xs text-tasar-brown/40">Help us verify your heritage craft</p>
                </div>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-sm border border-tasar-brown/5">
                <h3 className="text-xl font-serif font-bold mb-6">Security</h3>
                <div className="space-y-4">
                  <button className="w-full text-left p-4 rounded-2xl bg-tasar-ivory/30 hover:bg-tasar-ivory/50 transition-all flex items-center justify-between group">
                    <div>
                      <p className="font-bold text-sm">Change Password</p>
                      <p className="text-xs text-tasar-brown/40">Last changed 3 months ago</p>
                    </div>
                    <ChevronRight size={18} className="text-tasar-brown/20 group-hover:text-tasar-gold transition-colors" />
                  </button>
                  <button className="w-full text-left p-4 rounded-2xl bg-tasar-ivory/30 hover:bg-tasar-ivory/50 transition-all flex items-center justify-between group">
                    <div>
                      <p className="font-bold text-sm">Two-Factor Authentication</p>
                      <p className="text-xs text-tasar-brown/40">Currently disabled</p>
                    </div>
                    <ChevronRight size={18} className="text-tasar-brown/20 group-hover:text-tasar-gold transition-colors" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isAddModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsAddModalOpen(false)}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden"
              >
                <div className="p-8 border-b border-tasar-brown/5 flex items-center justify-between">
                  <h2 className="text-2xl font-serif font-bold">List New Heritage Product</h2>
                  <button onClick={() => setIsAddModalOpen(false)} className="p-2 hover:bg-tasar-ivory rounded-full transition-colors">
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleAddProduct} className="flex flex-col h-full">
                  <div className="p-8 space-y-6 max-h-[60vh] overflow-y-auto">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="col-span-2">
                        <label className="block text-xs font-bold uppercase tracking-widest text-tasar-brown/40 mb-2">Product Name</label>
                        <input 
                          type="text" 
                          required
                          value={newProduct.name}
                          onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                          placeholder="e.g. Hand-woven Matka Silk Saree" 
                          className="w-full px-4 py-3 bg-tasar-ivory/50 border border-tasar-brown/5 rounded-xl outline-none focus:border-tasar-gold transition-all" 
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-tasar-brown/40 mb-2">Category</label>
                        <select 
                          value={newProduct.category}
                          onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                          className="w-full px-4 py-3 bg-tasar-ivory/50 border border-tasar-brown/5 rounded-xl outline-none focus:border-tasar-gold transition-all"
                        >
                          <option>Sarees</option>
                          <option>Fabrics</option>
                          <option>Accessories</option>
                          <option>Home Decor</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-tasar-brown/40 mb-2">Price (INR)</label>
                        <input 
                          type="number" 
                          required
                          value={newProduct.price}
                          onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                          placeholder="0.00" 
                          className="w-full px-4 py-3 bg-tasar-ivory/50 border border-tasar-brown/5 rounded-xl outline-none focus:border-tasar-gold transition-all" 
                        />
                      </div>

                      <div className="col-span-2">
                        <label className="block text-xs font-bold uppercase tracking-widest text-tasar-brown/40 mb-2">Product Story & Description</label>
                        <textarea 
                          required
                          value={newProduct.description}
                          onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                          placeholder="Describe the weaving technique, the inspiration, and the heritage..." 
                          className="w-full px-4 py-3 bg-tasar-ivory/50 border border-tasar-brown/5 rounded-xl outline-none focus:border-tasar-gold transition-all h-32" 
                        />
                      </div>

                      <div className="col-span-2">
                        <label className="block text-xs font-bold uppercase tracking-widest text-tasar-brown/40 mb-2">Product Images</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          {selectedImages.map((img, index) => (
                            <div key={index} className="relative aspect-square rounded-xl overflow-hidden border border-tasar-brown/10 group">
                              <img src={img} alt="Preview" className="w-full h-full object-cover" />
                              <button 
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X size={12} />
                              </button>
                            </div>
                          ))}
                          <label className="aspect-square border-2 border-dashed border-tasar-brown/10 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-tasar-gold transition-all group">
                            <Upload size={20} className="text-tasar-brown/40 group-hover:text-tasar-gold mb-1" />
                            <span className="text-[10px] font-bold text-tasar-brown/40 uppercase">Add Image</span>
                            <input 
                              type="file" 
                              multiple 
                              accept="image/*" 
                              className="hidden" 
                              onChange={handleImageChange}
                            />
                          </label>
                        </div>
                        <p className="text-[10px] text-tasar-brown/30">Upload high-quality images of your heritage product. You can select multiple files.</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-8 bg-tasar-ivory/30 border-t border-tasar-brown/5 flex gap-4 mt-auto">
                    <button type="button" onClick={() => setIsAddModalOpen(false)} className="flex-grow btn-secondary py-3">Cancel</button>
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="flex-[2] btn-primary py-3 disabled:opacity-50"
                    >
                      {isSubmitting ? 'Listing...' : 'List Product Globally'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
