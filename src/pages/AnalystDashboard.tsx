import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts';
import { 
  TrendingUp, Users, ShoppingBag, DollarSign, 
  ArrowUpRight, ArrowDownRight, Globe, Download,
  Filter, Calendar
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../utils/cn';

const SALES_DATA = [
  { month: 'Jan', sales: 45000, growth: 2400 },
  { month: 'Feb', sales: 52000, growth: 1800 },
  { month: 'Mar', sales: 48000, growth: 2100 },
  { month: 'Apr', sales: 61000, growth: 3200 },
  { month: 'May', sales: 55000, growth: 2800 },
  { month: 'Jun', sales: 67000, growth: 3500 },
];

const REGIONAL_DEMAND = [
  { name: 'North America', value: 45 },
  { name: 'Europe', value: 30 },
  { name: 'India', value: 15 },
  { name: 'Rest of World', value: 10 },
];

const COLORS = ['#6B4423', '#C8A951', '#A67C52', '#D9C5B2'];

export default function AnalystDashboard() {
  return (
    <div className="min-h-screen bg-tasar-ivory p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-serif font-bold mb-2">Market Insights</h1>
            <p className="text-tasar-brown/60">Real-time data on global handloom demand and artisan growth.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-white border border-tasar-brown/5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-tasar-ivory transition-all">
              <Calendar size={18} /> Last 6 Months
            </button>
            <button className="btn-primary py-2 px-6 flex items-center gap-2">
              <Download size={18} /> Export Report
            </button>
          </div>
        </header>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Total Revenue", value: "₹3,28,500", trend: "+14.2%", up: true, icon: <DollarSign /> },
            { label: "Active Artisans", value: "1,240", trend: "+8.4%", up: true, icon: <Users /> },
            { label: "Avg. Order Value", value: "₹4,250", trend: "-2.1%", up: false, icon: <ShoppingBag /> },
            { label: "Global Reach", value: "12 Countries", trend: "+3", up: true, icon: <Globe /> },
          ].map((stat, i) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-3xl shadow-sm border border-tasar-brown/5"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-tasar-ivory rounded-2xl flex items-center justify-center text-tasar-gold">
                  {stat.icon}
                </div>
                <span className={cn(
                  "text-xs font-bold flex items-center gap-1 px-2 py-1 rounded-full",
                  stat.up ? "text-emerald-600 bg-emerald-50" : "text-red-600 bg-red-50"
                )}>
                  {stat.trend} {stat.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                </span>
              </div>
              <p className="text-sm font-medium text-tasar-brown/40 mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold text-tasar-brown">{stat.value}</h3>
            </motion.div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Sales Trend */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-tasar-brown/5">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-serif font-bold">Revenue Growth</h3>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-tasar-gold" />
                <span className="text-xs font-bold text-tasar-brown/40 uppercase">Monthly Sales</span>
              </div>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={SALES_DATA}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#C8A951" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#C8A951" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F6F1E8" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#6B4423', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B4423', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                  />
                  <Area type="monotone" dataKey="sales" stroke="#C8A951" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Regional Distribution */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-tasar-brown/5">
            <h3 className="text-xl font-serif font-bold mb-8">Global Demand Distribution</h3>
            <div className="h-[300px] flex items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={REGIONAL_DEMAND}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {REGIONAL_DEMAND.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-4 pr-8">
                {REGIONAL_DEMAND.map((entry, index) => (
                  <div key={entry.name} className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{backgroundColor: COLORS[index % COLORS.length]}} />
                    <div>
                      <p className="text-xs font-bold text-tasar-brown">{entry.name}</p>
                      <p className="text-xs text-tasar-brown/40">{entry.value}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Top Products Table */}
        <div className="bg-white rounded-3xl shadow-sm border border-tasar-brown/5 overflow-hidden">
          <div className="p-8 border-b border-tasar-brown/5 flex items-center justify-between">
            <h3 className="text-xl font-serif font-bold">Top Performing Collections</h3>
            <button className="text-tasar-gold text-sm font-bold flex items-center gap-2">
              View Detailed Analytics <ArrowUpRight size={16} />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-tasar-ivory/30">
                  <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-tasar-brown/40">Product Name</th>
                  <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-tasar-brown/40">Artisan</th>
                  <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-tasar-brown/40">Region</th>
                  <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-tasar-brown/40">Total Sales</th>
                  <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-tasar-brown/40">Conversion</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-tasar-brown/5">
                {[
                  { name: "Tasar Silk Saree", artisan: "Lakshmi Devi", region: "Bhagalpur", sales: "₹84,200", conv: "4.8%" },
                  { name: "Hand-woven Stole", artisan: "Ram Kumar", region: "Champa", sales: "₹32,500", conv: "5.2%" },
                  { name: "Heritage Dupatta", artisan: "Sita Bai", region: "Bishnupur", sales: "₹28,900", conv: "3.9%" },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-tasar-ivory/20 transition-colors">
                    <td className="px-8 py-5 font-bold text-sm">{row.name}</td>
                    <td className="px-8 py-5 text-sm font-medium">{row.artisan}</td>
                    <td className="px-8 py-5 text-sm text-tasar-brown/60">{row.region}</td>
                    <td className="px-8 py-5 text-sm font-bold">{row.sales}</td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <div className="flex-grow h-1.5 bg-tasar-ivory rounded-full overflow-hidden max-w-[100px]">
                          <div className="h-full bg-tasar-gold" style={{width: row.conv}} />
                        </div>
                        <span className="text-xs font-bold">{row.conv}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
