import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, User, Bot, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";
import { cn } from '../utils/cn';

const SYSTEM_INSTRUCTION = `You are the Tasar Collective Heritage Assistant. Your goal is to educate buyers about Indian handloom heritage, specifically Tasar silk, weaving techniques (like pit loom, jacquard), and regional specialties (Bhagalpur, Champa, Raigarh, etc.). 
Be elegant, knowledgeable, and passionate about preserving artisan crafts. 
If asked about silk types:
- Tasar Silk: Wild silk from silkworms that feed on Asan and Arjun trees. Known for its rich texture and natural gold sheen.
- Gheecha Silk: A byproduct of Tasar, more textured and rustic.
- Mulberry Silk: Softer, smoother, and more uniform.
Always encourage supporting artisans directly. Keep responses concise and helpful.`;

type Message = {
  role: 'user' | 'bot';
  text: string;
};

export default function HeritageAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: "Namaste! I am your Heritage Assistant. How can I help you discover the magic of Indian handloom today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: userMsg,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      const botText = response.text || "I apologize, I'm having trouble connecting to the heritage archives. Please try again.";
      setMessages(prev => [...prev, { role: 'bot', text: botText }]);
    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages(prev => [...prev, { role: 'bot', text: "I'm currently resting my loom. Please try again in a moment." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-tasar-brown text-tasar-gold rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all z-50 group"
      >
        <Sparkles className="absolute -top-1 -right-1 animate-pulse" size={20} />
        <MessageSquare size={28} />
        <div className="absolute right-20 bg-white text-tasar-brown px-4 py-2 rounded-xl text-sm font-bold shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-tasar-brown/5">
          Ask Heritage Assistant
        </div>
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-28 right-8 w-[400px] max-w-[calc(100vw-4rem)] h-[600px] max-h-[calc(100vh-10rem)] bg-white rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden border border-tasar-brown/5"
          >
            {/* Header */}
            <div className="p-6 bg-tasar-brown text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-tasar-gold/20 rounded-xl flex items-center justify-center text-tasar-gold">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 className="font-serif font-bold">Heritage Assistant</h3>
                  <p className="text-[10px] text-tasar-gold font-bold uppercase tracking-widest">Powered by Gemini</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-4 bg-tasar-ivory/30">
              {messages.map((msg, i) => (
                <div key={i} className={cn(
                  "flex gap-3 max-w-[85%]",
                  msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
                )}>
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center",
                    msg.role === 'user' ? "bg-tasar-gold text-white" : "bg-tasar-brown text-tasar-gold"
                  )}>
                    {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={cn(
                    "p-4 rounded-2xl text-sm leading-relaxed",
                    msg.role === 'user' ? "bg-tasar-gold text-white rounded-tr-none" : "bg-white text-tasar-brown shadow-sm border border-tasar-brown/5 rounded-tl-none"
                  )}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-tasar-brown text-tasar-gold flex items-center justify-center">
                    <Bot size={16} />
                  </div>
                  <div className="p-4 rounded-2xl bg-white text-tasar-brown shadow-sm border border-tasar-brown/5 rounded-tl-none flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin" />
                    <span className="text-xs font-medium italic">Consulting archives...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-6 bg-white border-t border-tasar-brown/5">
              <div className="relative">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about Tasar silk or weaving..."
                  className="w-full pl-4 pr-12 py-3 bg-tasar-ivory/50 border border-tasar-brown/5 rounded-xl outline-none focus:border-tasar-gold transition-all text-sm"
                />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-tasar-gold hover:text-tasar-brown transition-colors disabled:opacity-30"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
