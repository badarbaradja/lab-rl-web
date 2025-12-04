"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, Sparkles, Loader2, ExternalLink } from "lucide-react";
import { usePathname } from "next/navigation"; // <--- 1. Import ini

type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
};

export default function ChatWidget() {
  const pathname = usePathname(); // <--- 2. Ambil path url
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Halo! 👋 Saya adalah EREL, Asisten AI Lab Rangkaian Listrik. Ada yang bisa dibantu?", sender: "bot" }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isOpen]);

  // --- 3. LOGIKA SEMBUNYIKAN CHATBOT DI SIPAL ---
  if (pathname?.startsWith("/sipal-secure-access")) {
    return null;
  }
  // ---------------------------------------------

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: Message = { id: Date.now(), text: inputText, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: inputText }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error("Gagal mengambil respon");

      const botMsg: Message = { id: Date.now() + 1, text: data.text, sender: "bot" };
      setMessages((prev) => [...prev, botMsg]);

    } catch (error) {
      console.error(error);
      let fallbackText = "Maaf, koneksi terganggu.";
      const lower = userMsg.text.toLowerCase();
      
      if (lower.includes("izin") || lower.includes("sakit")) {
        fallbackText = "Untuk perizinan, hubungi **@sealabs**: https://line.me/ti/p/@sealabs";
      } else if (lower.includes("nilai")) {
        fallbackText = "Komplain nilai ke **@rl-laboratory**: https://line.me/ti/p/@rl-laboratory";
      }

      setMessages((prev) => [...prev, { id: Date.now()+1, text: fallbackText, sender: "bot" }]);
    } finally {
      setIsTyping(false);
    }
  };

  // Render text helper (Sama seperti sebelumnya)
  const renderFormattedText = (text: string) => {
    const sealabsRegex = /https:\/\/line\.me\/ti\/p\/@sealabs/g;
    const rlRegex = /https:\/\/line\.me\/ti\/p\/@rl-laboratory/g;

    return text.split('\n').map((line, lineIndex) => {
      if (!line.trim()) return <br key={lineIndex} />;
      const words = line.split(" ");
      return (
        <p key={lineIndex} className="mb-1 last:mb-0">
          {words.map((word, wordIndex) => {
            if (word.startsWith("**") && word.endsWith("**")) {
                return <span key={wordIndex} className="font-bold text-rl-navy dark:text-white">{word.slice(2, -2)} </span>;
            }
            if (word.match(sealabsRegex)) {
                return <a key={wordIndex} href="https://line.me/ti/p/@jit0659i" target="_blank" className="text-blue-500 hover:underline">Chat Sealabs</a>;
            }
            if (word.match(rlRegex)) {
                return <a key={wordIndex} href="https://line.me/ti/p/@kss3173p" target="_blank" className="text-blue-500 hover:underline">Chat Admin RL</a>;
            }
            return word + " ";
          })}
        </p>
      );
    });
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9, transformOrigin: "bottom left" }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-[350px] md:w-[400px] bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="bg-gradient-to-r from-rl-navy to-blue-900 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                        <Sparkles className="text-yellow-400 w-5 h-5 animate-pulse" />
                    </div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-rl-navy rounded-full"></div>
                </div>
                <div>
                    <h4 className="text-white font-bold text-sm">Assistant Lab RL</h4>
                    <p className="text-blue-200 text-xs flex items-center gap-1">AI Powered Support</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-1.5 rounded-lg">
                <X size={18} />
              </button>
            </div>

            <div className="p-4 h-[350px] bg-gray-50 dark:bg-black/20 overflow-y-auto space-y-4 custom-scrollbar">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.sender === 'bot' && (
                        <div className="w-8 h-8 rounded-full bg-rl-navy/10 dark:bg-white/10 flex items-center justify-center mr-2 flex-shrink-0">
                            <Bot size={16} className="text-rl-navy dark:text-white" />
                        </div>
                    )}
                    <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                      msg.sender === 'user' 
                        ? 'bg-rl-navy text-white rounded-br-none' 
                        : 'bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-white/5 text-gray-700 dark:text-gray-200 rounded-bl-none'
                    }`}>
                      {msg.sender === 'user' ? msg.text : renderFormattedText(msg.text)}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start items-center">
                    <div className="w-8 h-8 rounded-full bg-rl-navy/10 dark:bg-white/10 flex items-center justify-center mr-2">
                        <Bot size={16} className="text-rl-navy dark:text-white" />
                    </div>
                    <div className="bg-white dark:bg-[#1E293B] border border-gray-200 dark:border-white/5 p-3 rounded-2xl rounded-bl-none flex gap-1.5 items-center shadow-sm">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100" />
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-3 border-t border-gray-200 dark:border-white/10 bg-white dark:bg-[#0F172A]">
                <form className="flex gap-2 items-center" onSubmit={handleSend}>
                    <input 
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        type="text" 
                        placeholder="Tanya EREL..."
                        disabled={isTyping}
                        className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-white/5 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-rl-navy/50 dark:focus:ring-blue-500/50 dark:text-white transition-all disabled:opacity-50"
                    />
                    <button 
                        type="submit" 
                        disabled={!inputText.trim() || isTyping}
                        className="p-2.5 bg-rl-navy rounded-full text-white hover:bg-rl-red transition-all shadow-lg hover:shadow-rl-red/30 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95"
                    >
                        {isTyping ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                    </button>
                </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center w-14 h-14 bg-gradient-to-br from-rl-navy to-blue-600 text-white rounded-full shadow-xl shadow-rl-navy/30 hover:shadow-2xl hover:shadow-rl-navy/50 transition-all border border-white/20"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </motion.button>
    </div>
  );
}