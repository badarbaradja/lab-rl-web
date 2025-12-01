"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ZapOff, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-rl-light dark:bg-[#050A18] overflow-hidden relative">
      
      {/* Background Decor */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rl-red/10 rounded-full blur-[100px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-center px-6"
      >
        {/* Icon Listrik Putus */}
        <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-rl-red blur-2xl opacity-20 animate-pulse"></div>
            <ZapOff size={100} className="text-rl-navy dark:text-white relative z-10" />
        </div>

        <h1 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rl-navy to-rl-red dark:from-white dark:to-gray-500 mb-2">
          404
        </h1>
        
        <h2 className="text-2xl md:text-3xl font-bold text-rl-navy dark:text-white mb-4">
          Arus Terputus!
        </h2>
        
        <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-8">
          Halaman yang Anda cari tidak dapat ditemukan. Mungkin kabelnya putus atau tegangannya drop.
        </p>

        <Link 
          href="/"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-rl-navy text-white font-bold hover:bg-rl-red transition-all shadow-lg hover:shadow-rl-red/30 hover:-translate-y-1"
        >
          <Home size={18} />
          Kembali ke Beranda
        </Link>
      </motion.div>

    </div>
  );
}