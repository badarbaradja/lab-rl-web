"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, AlertCircle, User, Bot } from "lucide-react";

type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  // State Pesan (Default Chat)
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Halo! 👋 Ada kendala dengan nilai atau praktikum? Silakan sampaikan di sini.", sender: "bot" }
  ]);

  // Auto scroll ke bawah saat ada chat baru
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // LOGIKA KIRIM PESAN
  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // 1. Tambahkan pesan user
    const newUserMsg: Message = { id: Date.now(), text: inputText, sender: "user" };
    setMessages((prev) => [...prev, newUserMsg]);
    setInputText("");
    setIsTyping(true);

    // 2. Simulasi AI Membalas (Delay 2 detik)
    setTimeout(() => {
      const botResponse: Message = { 
        id: Date.now() + 1, 
        text: "Terima kasih laporannya. Pesan Anda sudah diteruskan ke Asisten Jaga. Mohon tunggu balasan via Email/WA dalam 1x24 jam.", 
        sender: "bot" 
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    // PERBAIKAN POSISI: Ganti 'right-6' jadi 'left-6' agar tidak menghalangi footer kanan
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start">
      
      {/* POPUP CHAT WINDOW */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9, transformOrigin: "bottom left" }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-[350px] bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-rl-navy p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <Bot className="text-white w-5 h-5" />
                </div>
                <div>
                    <h4 className="text-white font-bold text-sm">Layanan Bantuan</h4>
                    <p className="text-blue-200 text-xs flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"/> Online
                    </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white">
                <X size={20} />
              </button>
            </div>

            {/* Body Chat */}
            <div className="p-4 h-[300px] bg-gray-50 dark:bg-black/20 overflow-y-auto space-y-3">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-xl text-sm ${
                      msg.sender === 'user' 
                        ? 'bg-rl-navy text-white rounded-tr-none' 
                        : 'bg-white dark:bg-white/10 border border-gray-200 dark:border-transparent text-gray-800 dark:text-gray-200 rounded-tl-none'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                
                {/* Indikator mengetik */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-200 dark:bg-white/10 p-3 rounded-xl rounded-tl-none flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Footer */}
            <div className="p-3 border-t border-gray-200 dark:border-white/10 bg-white dark:bg-[#0F172A]">
                <form className="flex gap-2" onSubmit={handleSend}>
                    <input 
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        type="text" 
                        placeholder="Ketik pesan..."
                        className="flex-1 px-4 py-2 bg-gray-100 dark:bg-white/5 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-rl-navy dark:text-white"
                    />
                    <button type="submit" className="p-2 bg-rl-navy rounded-full text-white hover:bg-rl-red transition-colors disabled:opacity-50">
                        <Send size={18} />
                    </button>
                </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TRIGGER BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center w-14 h-14 bg-rl-red text-white rounded-full shadow-lg shadow-rl-red/30 hover:scale-110 transition-transform"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
    </div>
  );
}