"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Globe, ChevronDown, ShieldCheck } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Mengambil data bahasa dari Context (Global)
  const { lang, setLang, t } = useLanguage(); 
  const [isLangOpen, setIsLangOpen] = useState(false);

  // Efek saat scroll & mount
  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;
  
  // Sembunyikan Navbar di halaman login atau admin
  if (pathname === "/login" || pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-rl-dark/80 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* LOGO AREA */}
        <Link href="/" className="flex items-center gap-3 group">
          {/* Background putih pada logo agar terlihat jelas di Dark Mode */}
          <div className="relative w-12 h-12 bg-white rounded-lg p-1 group-hover:scale-110 transition-transform duration-300 shadow-md">
             <Image 
                src="/img/logo-rl.png"  
                alt="Logo Lab RL"
                fill
                className="object-contain"
             />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-rl-navy dark:text-white leading-none">
              LAB Rangkaian Listrik
            </span>
            <span className="text-[10px] text-rl-red font-bold tracking-widest">
              TELKOM UNIVERSITY
            </span>
          </div>
        </Link>

        {/* DESKTOP MENU (Dynamic Language) */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="nav-link">{t.nav_home}</Link>
          <Link href="/modul" className="nav-link">{t.nav_modul}</Link>
          <Link href="/asisten" className="nav-link">{t.nav_asisten}</Link>
          <Link href="/jadwal" className="nav-link">{t.nav_jadwal}</Link>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex items-center gap-3">
          
          {/* 1. LANGUAGE SWITCHER */}
          <div className="relative">
            <button 
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors text-sm font-bold text-rl-navy dark:text-white"
            >
                <Globe size={16} />
                <span className="uppercase">{lang}</span>
                <ChevronDown size={14} className={`transition-transform ${isLangOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
                {isLangOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-full mt-2 right-0 w-40 bg-white dark:bg-[#0F172A] rounded-xl shadow-xl border border-gray-200 dark:border-white/10 overflow-hidden"
                    >
                        <button onClick={() => { setLang("id"); setIsLangOpen(false); }} className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-white/5 flex items-center gap-2 text-gray-700 dark:text-gray-200">
                            🇮🇩 Indonesia
                        </button>
                        <button onClick={() => { setLang("en"); setIsLangOpen(false); }} className="w-full text-left px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-white/5 flex items-center gap-2 text-gray-700 dark:text-gray-200">
                            🇺🇸 English
                        </button>
                        <button onClick={() => { setLang("ar"); setIsLangOpen(false); }} className="w-full text-right px-4 py-3 text-sm hover:bg-gray-50 dark:hover:bg-white/5 flex items-center gap-2 font-arabic justify-end text-gray-700 dark:text-gray-200" dir="rtl">
                            🇸🇦 العربية
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
          </div>

          {/* 2. THEME TOGGLE */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full bg-gray-100 dark:bg-white/10 text-rl-navy dark:text-white hover:scale-110 transition-transform"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>

        </div>
      </div>
      
      {/* Tambahan Style Global untuk Link Navigasi */}
      <style jsx global>{`
        .nav-link {
          @apply text-gray-600 dark:text-gray-300 hover:text-rl-navy dark:hover:text-white font-medium transition-colors relative group;
        }
        .nav-link::after {
          content: '';
          @apply absolute -bottom-1 left-0 w-0 h-0.5 bg-rl-red transition-all group-hover:w-full;
        }
      `}</style>
    </motion.nav>
  );
}