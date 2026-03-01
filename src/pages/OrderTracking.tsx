import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, Package, Truck, MapPin, CheckCircle2, 
  Clock, ShieldCheck, User, ExternalLink
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../utils/cn';

export default function OrderTracking() {
  const { id } = useParams();

  const steps = [
    { title: "Order Placed", date: "Feb 24, 10:30 AM", status: "completed", desc: "We've received your order and notified the artisan." },
    { title: "Weaving Verification", date: "Feb 25, 02:15 PM", status: "completed", desc: "Master weaver Lakshmi Devi has verified the heritage quality." },
    { title: "Quality Check & Packaging", date: "Feb 26, 09:00 AM", status: "completed", desc: "Passed 12-point heritage quality inspection." },
    { title: "Shipped from Bhagalpur", date: "Feb 27, 11:45 AM", status: "current", desc: "Your collection is on its way via Global Express." },
    { title: "Out for Delivery", date: "Expected Mar 02", status: "upcoming", desc: "Final mile delivery in London." },
  ];

  return (
    <div className="min-h-screen bg-tasar-ivory pt-24 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <Link to="/buyer-dashboard" className="flex items-center gap-2 text-tasar-brown/60 hover:text-tasar-gold mb-8 transition-colors font-medium">
          <ArrowLeft size={20} /> Back to Dashboard
        </Link>

        <div className="bg-white rounded-3xl shadow-xl border border-tasar-brown/5 overflow-hidden">
          {/* Header */}
          <div className="p-8 bg-tasar-brown text-white">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <p className="text-tasar-gold font-bold text-xs uppercase tracking-widest mb-1">Order Tracking</p>
                <h1 className="text-3xl font-serif font-bold">Order {id || "#TC-9021"}</h1>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-4 py-2 bg-tasar-gold text-white rounded-xl text-sm font-bold shadow-lg shadow-tasar-gold/20">
                  In Transit
                </span>
                <button className="p-2 bg-white/10 rounded-xl hover:bg-white/20 transition-all">
                  <ExternalLink size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Tracking Timeline */}
          <div className="p-8 md:p-12">
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-tasar-brown/10" />

              <div className="space-y-12">
                {steps.map((step, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="relative flex gap-8"
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center z-10 shrink-0 transition-all duration-500",
                      step.status === 'completed' ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" : 
                      step.status === 'current' ? "bg-tasar-gold text-white shadow-lg shadow-tasar-gold/20 animate-pulse" : 
                      "bg-white border-2 border-tasar-brown/10 text-tasar-brown/20"
                    )}>
                      {step.status === 'completed' ? <CheckCircle2 size={20} /> : 
                       step.status === 'current' ? <Truck size={20} /> : 
                       <Clock size={20} />}
                    </div>
                    
                    <div className="flex-grow">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                        <h3 className={cn(
                          "text-lg font-bold",
                          step.status === 'upcoming' ? "text-tasar-brown/40" : "text-tasar-brown"
                        )}>
                          {step.title}
                        </h3>
                        <span className="text-xs font-bold text-tasar-gold uppercase tracking-widest">{step.date}</span>
                      </div>
                      <p className="text-sm text-tasar-brown/60 leading-relaxed max-w-lg">
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Details Footer */}
          <div className="p-8 bg-tasar-ivory/30 border-t border-tasar-brown/5 grid md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-tasar-gold shadow-sm">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-bold text-sm mb-1">Shipping Address</h4>
                <p className="text-xs text-tasar-brown/60 leading-relaxed">
                  Emma Richardson<br />
                  221B Baker Street, London<br />
                  NW1 6XE, United Kingdom
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-tasar-gold shadow-sm">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4 className="font-bold text-sm mb-1">Heritage Protection</h4>
                <p className="text-xs text-tasar-brown/60 leading-relaxed">
                  Your purchase is protected by our Heritage Guarantee. 100% authentic handloom or your money back.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
