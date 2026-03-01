import React, { useState } from 'react';
import { 
  ArrowLeft, CreditCard, Truck, CheckCircle2, 
  ShieldCheck, Lock, ShoppingBag, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { cn } from '../utils/cn';

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success
  const navigate = useNavigate();

  const handleComplete = () => {
    setStep(3);
    setTimeout(() => {
      clearCart();
    }, 500);
  };

  if (cart.length === 0 && step !== 3) {
    return (
      <div className="min-h-screen bg-tasar-ivory flex flex-col items-center justify-center p-6">
        <ShoppingBag size={64} className="text-tasar-brown/20 mb-6" />
        <h2 className="text-2xl font-serif font-bold mb-4">Your cart is empty</h2>
        <Link to="/marketplace" className="btn-primary">Back to Marketplace</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-tasar-ivory pt-24 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Progress Bar */}
        {step < 3 && (
          <div className="flex items-center justify-center mb-12">
            {[1, 2].map((i) => (
              <React.Fragment key={i}>
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all",
                  step >= i ? "bg-tasar-gold text-white" : "bg-white text-tasar-brown/40 border border-tasar-brown/5"
                )}>
                  {step > i ? <CheckCircle2 size={20} /> : i}
                </div>
                {i < 2 && <div className={cn("w-20 h-1 mx-2 rounded-full", step > i ? "bg-tasar-gold" : "bg-tasar-brown/10")} />}
              </React.Fragment>
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="shipping"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid lg:grid-cols-3 gap-12"
            >
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-tasar-brown/5">
                  <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-2">
                    <Truck size={24} className="text-tasar-gold" /> Shipping Details
                  </h2>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-widest text-tasar-brown/40 mb-2">Full Name</label>
                      <input type="text" placeholder="Emma Richardson" className="w-full px-4 py-3 bg-tasar-ivory/50 border border-tasar-brown/5 rounded-xl outline-none focus:border-tasar-gold transition-all" />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-widest text-tasar-brown/40 mb-2">Shipping Address</label>
                      <textarea placeholder="221B Baker Street, London..." className="w-full px-4 py-3 bg-tasar-ivory/50 border border-tasar-brown/5 rounded-xl outline-none focus:border-tasar-gold transition-all h-24" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-tasar-brown/40 mb-2">City</label>
                      <input type="text" placeholder="London" className="w-full px-4 py-3 bg-tasar-ivory/50 border border-tasar-brown/5 rounded-xl outline-none focus:border-tasar-gold transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-tasar-brown/40 mb-2">Postal Code</label>
                      <input type="text" placeholder="NW1 6XE" className="w-full px-4 py-3 bg-tasar-ivory/50 border border-tasar-brown/5 rounded-xl outline-none focus:border-tasar-gold transition-all" />
                    </div>
                  </div>
                </div>
                <button onClick={() => setStep(2)} className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-2">
                  Continue to Payment <ChevronRight size={20} />
                </button>
              </div>

              {/* Order Summary */}
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-tasar-brown/5">
                  <h3 className="font-serif font-bold text-lg mb-6">Order Summary</h3>
                  <div className="space-y-4 mb-6">
                    {cart.map(item => (
                      <div key={item.id} className="flex gap-4">
                        <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                          <img src={item.img} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div className="flex-grow">
                          <h4 className="text-sm font-bold">{item.name}</h4>
                          <p className="text-xs text-tasar-brown/40">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-sm font-bold">₹{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-tasar-brown/5 pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-tasar-brown/60">Subtotal</span>
                      <span className="font-medium">₹{totalPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-tasar-brown/60">Shipping</span>
                      <span className="text-emerald-600 font-bold">FREE</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold pt-2">
                      <span>Total</span>
                      <span className="text-tasar-gold">₹{totalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-tasar-brown/40 text-xs font-bold uppercase tracking-widest justify-center">
                  <ShieldCheck size={16} /> Secure Heritage Transaction
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="payment"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-tasar-brown/5 mb-8">
                <h2 className="text-2xl font-serif font-bold mb-6 flex items-center gap-2">
                  <CreditCard size={24} className="text-tasar-gold" /> Payment Method
                </h2>
                <div className="space-y-6">
                  <div className="p-4 rounded-2xl border-2 border-tasar-gold bg-tasar-gold/5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-8 bg-tasar-brown rounded flex items-center justify-center text-white font-bold text-[10px]">VISA</div>
                      <div>
                        <p className="font-bold text-sm">•••• •••• •••• 4242</p>
                        <p className="text-xs text-tasar-brown/40">Expires 12/28</p>
                      </div>
                    </div>
                    <CheckCircle2 className="text-tasar-gold" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-widest text-tasar-brown/40 mb-2">Cardholder Name</label>
                      <input type="text" placeholder="Emma Richardson" className="w-full px-4 py-3 bg-tasar-ivory/50 border border-tasar-brown/5 rounded-xl outline-none focus:border-tasar-gold transition-all" />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-widest text-tasar-brown/40 mb-2">Card Number</label>
                      <div className="relative">
                        <input type="text" placeholder="4242 4242 4242 4242" className="w-full px-4 py-3 bg-tasar-ivory/50 border border-tasar-brown/5 rounded-xl outline-none focus:border-tasar-gold transition-all" />
                        <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-tasar-brown/20" size={18} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-tasar-brown/40 mb-2">Expiry Date</label>
                      <input type="text" placeholder="MM/YY" className="w-full px-4 py-3 bg-tasar-ivory/50 border border-tasar-brown/5 rounded-xl outline-none focus:border-tasar-gold transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-tasar-brown/40 mb-2">CVV</label>
                      <input type="text" placeholder="•••" className="w-full px-4 py-3 bg-tasar-ivory/50 border border-tasar-brown/5 rounded-xl outline-none focus:border-tasar-gold transition-all" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <button onClick={() => setStep(1)} className="flex-grow btn-secondary py-4">Back</button>
                <button onClick={handleComplete} className="flex-[2] btn-primary py-4 text-lg">Pay ₹{totalPrice.toLocaleString()}</button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 size={48} />
              </div>
              <h2 className="text-4xl font-serif font-bold mb-4">Order Confirmed!</h2>
              <p className="text-tasar-brown/60 mb-12 max-w-md mx-auto">
                Thank you for supporting authentic Indian craftsmanship. Your order #TC-9021 is being prepared by our master weavers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/buyer-dashboard" className="btn-primary px-8">Track My Order</Link>
                <Link to="/marketplace" className="btn-secondary px-8">Continue Shopping</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
