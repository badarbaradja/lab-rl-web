"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulasi Loading 2 detik sebelum masuk
    setTimeout(() => {
      setIsLoading(false);
      router.push("/admin/dashboard"); // Nanti kita buat halaman ini
    }, 2000);
  };

  return (
    <div className="min-h-screen w-full flex bg-white dark:bg-rl-dark transition-colors duration-300">
      
      {/* 1. LEFT SIDE - ARTISTIC VISUAL (Hidden di HP) */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-rl-navy items-center justify-center">
        
        {/* Animated Background */}
        <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/30 rounded-full blur-[100px] mix-blend-screen animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-rl-red/30 rounded-full blur-[100px] mix-blend-screen" />
            {/* Pattern Overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        </div>

        {/* Content Tengah */}
        <div className="relative z-10 text-center px-12">
            <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-2xl mx-auto flex items-center justify-center mb-8 border border-white/20 shadow-2xl"
            >
                <Zap className="w-12 h-12 text-yellow-400" />
            </motion.div>
            <h2 className="text-4xl font-bold text-white mb-4">Welcome Back, Admin!</h2>
            <p className="text-gray-300 text-lg max-w-md mx-auto leading-relaxed">
                Kelola modul praktikum, jadwal asisten, dan data praktikan dalam satu dashboard terintegrasi.
            </p>
        </div>
      </div>

      {/* 2. RIGHT SIDE - LOGIN FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24 relative">
        
        {/* Tombol Balik ke Home (Pojok Kiri Atas) */}
        <Link href="/" className="absolute top-8 left-8 text-sm text-gray-500 hover:text-rl-navy dark:hover:text-white transition-colors flex items-center gap-2">
            &larr; Kembali ke Beranda
        </Link>

        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md space-y-8"
        >
            <div className="text-center lg:text-left">
                <h1 className="text-3xl font-bold text-rl-navy dark:text-white">Log in</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                    Masukan kredensial akun asisten atau admin Anda.
                </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
                {/* Email Input */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Email Kampus</label>
                    <div className="relative group">
                        <Mail className="absolute left-4 top-3.5 text-gray-400 w-5 h-5 group-focus-within:text-rl-navy dark:group-focus-within:text-white transition-colors" />
                        <input 
                            type="email" 
                            required
                            placeholder="nama@telkomuniversity.ac.id"
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-rl-navy dark:focus:ring-blue-500 transition-all text-rl-navy dark:text-white placeholder-gray-400"
                        />
                    </div>
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Password</label>
                        <a href="#" className="text-xs text-rl-navy dark:text-blue-400 hover:underline">Lupa password?</a>
                    </div>
                    <div className="relative group">
                        <Lock className="absolute left-4 top-3.5 text-gray-400 w-5 h-5 group-focus-within:text-rl-navy dark:group-focus-within:text-white transition-colors" />
                        <input 
                            type={showPassword ? "text" : "password"} 
                            required
                            placeholder="••••••••"
                            className="w-full pl-12 pr-12 py-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-rl-navy dark:focus:ring-blue-500 transition-all text-rl-navy dark:text-white placeholder-gray-400"
                        />
                        <button 
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                </div>

                {/* Submit Button */}
                <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-rl-navy hover:bg-rl-red text-white font-bold py-4 rounded-xl shadow-lg shadow-rl-navy/20 hover:shadow-rl-navy/40 transition-all transform active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <>
                            Masuk Dashboard <ArrowRight size={20} />
                        </>
                    )}
                </button>
            </form>

            <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                Bukan admin? <Link href="/" className="text-rl-navy dark:text-white font-bold hover:underline">Kembali ke Praktikum</Link>
            </div>
        </motion.div>
      </div>
    </div>
  );
}