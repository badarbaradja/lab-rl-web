"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Zap, Wifi, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

// --- KONFIGURASI JADWAL ---
const START_DATE = "2025-09-29"; 

const SCHEDULE_DATA = [
  { week: 1, title: "Pembacaan dan Pengukuran Resistor", code: "Modul 01" },
  { week: 2, title: "Pengukuran Besaran Arus dan Tegangan", code: "Modul 02" },
  { week: 3, title: "Pengenalan Aplikasi Circuit Simulator", code: "Modul 03" },
  { week: 4, title: "Teorema Substitusi dan Superposisi", code: "Modul 04" },
  { week: 5, title: "Teorema Thevenin, Norton, dan TDM", code: "Modul 05" },
  { week: 6, title: "Pengukuran Kapasitor dan Induktor (AC)", code: "Modul 06" },
  { week: 7, title: "Pengukuran Arus, Tegangan, Impedansi (AC)", code: "Modul 07" },
  { week: 8, title: "Rangkaian Filter Sederhana RL & RC", code: "Modul 08" },
  { week: 9, title: "Resonansi dan Pengukuran Bandwidth", code: "Modul 09" },
  { week: 10, title: "Rangkaian Kutub Empat", code: "Modul 10" },
  { week: 11, title: "Asistensi Tugas Besar", code: "Minggu Tenang" },
  { week: 12, title: "Final Presentasi", code: "Tugas Besar" },
];

export default function HeroSection() {
  const { t, lang } = useLanguage(); // Ambil data bahasa
  
  const [currentModul, setCurrentModul] = useState({
    title: "",
    code: "",
    week: 0,
    status: ""
  });

  // Efek berjalan saat komponen mount ATAU saat 'lang' berubah
  useEffect(() => {
    // Kamus Lokal untuk Status Dinamis (Agar bagian ini juga berubah bahasa)
    const statusText = {
        id: { not_started: "Praktikum Belum Dimulai", finished: "Praktikum Selesai", online: "Online", offline: "Offline", waiting: "Menunggu", upcoming: "Segera" },
        en: { not_started: "Practicum Not Started", finished: "Practicum Finished", online: "Online", offline: "Offline", waiting: "Waiting", upcoming: "Upcoming" },
        ar: { not_started: "لم يبدأ العملي", finished: "انتهى العملي", online: "متصل", offline: "غير متصل", waiting: "انتظار", upcoming: "قادم" }
    };

    const calculateSchedule = () => {
      const start = new Date(START_DATE).getTime();
      const now = new Date().getTime();
      const diff = now - start;
      const oneWeekInMs = 7 * 24 * 60 * 60 * 1000;
      
      const texts = statusText[lang]; // Pilih teks sesuai bahasa aktif

      // KASUS 1: Belum Mulai
      if (diff < 0) {
        setCurrentModul({ 
            title: texts.not_started, 
            code: texts.upcoming, 
            week: 0, 
            status: texts.offline 
        });
        return;
      }

      // KASUS 2: Sedang Berjalan
      const weekIndex = Math.floor(diff / oneWeekInMs);
      if (weekIndex >= 0 && weekIndex < SCHEDULE_DATA.length) {
        const activeData = SCHEDULE_DATA[weekIndex];
        setCurrentModul({
          title: activeData.title, // Judul Modul tetap sesuai data (biasanya nama teknis tidak diterjemahkan)
          code: activeData.code,
          week: activeData.week,
          status: texts.online
        });
      } else {
        // KASUS 3: Sudah Selesai
        setCurrentModul({ 
            title: texts.finished, 
            code: texts.finished, 
            week: 13, 
            status: texts.offline 
        });
      }
    };

    calculateSchedule();
  }, [lang]); // <--- PENTING: Jalankan ulang jika 'lang' berubah

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-rl-light dark:bg-[#050A18] transition-colors duration-300 pt-20">
      
      {/* 1. BACKGROUND EFFECTS */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-blue-600/40 rounded-full blur-[150px] mix-blend-screen animate-pulse" />
        <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-rl-red/30 rounded-full blur-[130px] mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* 2. TEXT CONTENT (Kiri) */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8 text-center lg:text-left"
        >
          {/* Badge Recruitment */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/80 dark:bg-white/5 border border-rl-navy/10 dark:border-white/10 backdrop-blur-md shadow-sm mx-auto lg:mx-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rl-red opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rl-red"></span>
            </span>
            <span className="text-xs font-bold text-rl-navy dark:text-gray-200 tracking-widest uppercase">
              {t.hero_badge} {/* <--- DATA DARI CONTEXT */}
            </span>
          </div>

          {/* Judul Besar */}
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-rl-navy dark:text-white">
            {t.hero_title} <br /> {/* <--- DATA DARI CONTEXT */}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-rl-red animate-gradient-x">
              {t.hero_subtitle} {/* <--- DATA DARI CONTEXT */}
            </span>
          </h1>

          {/* Deskripsi */}
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-lg mx-auto lg:mx-0 leading-relaxed">
            {t.hero_desc} {/* <--- DATA DARI CONTEXT */}
          </p>

          {/* Tombol CTA */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
            <Link href="/modul" className="group relative px-8 py-4 bg-rl-navy text-white rounded-2xl overflow-hidden shadow-xl shadow-rl-navy/30 hover:shadow-rl-navy/50 hover:scale-105 transition-all duration-300">
              <span className="relative z-10 flex items-center justify-center gap-2 font-bold">
                {t.hero_btn_start} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </Link>
            
            <Link href="/tata-tertib" className="flex items-center justify-center gap-2 px-8 py-4 border border-gray-300 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-2xl text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-white/10 transition-all font-medium">
              <Download className="w-5 h-5" />
              {t.hero_btn_rule} {/* <--- DATA DARI CONTEXT */}
            </Link>
          </div>
        </motion.div>

        {/* 3. VISUAL CARD YANG OTOMATIS BERUBAH (Kanan) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative h-[500px] hidden lg:flex items-center justify-center perspective-1000"
        >
           {/* Kartu Kaca */}
           <div className="relative w-[380px] h-[500px] 
             bg-gradient-to-b from-white/10 to-transparent 
             dark:from-white/10 dark:to-black/20 
             rounded-[2.5rem] 
             border border-white/20 dark:border-white/10 
             shadow-2xl backdrop-blur-xl 
             p-8 flex flex-col justify-between 
             transform transition-transform hover:scale-[1.02] duration-500
             group"
           >
              {/* Efek Glossy */}
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent rounded-t-[2.5rem] pointer-events-none" />

              {/* Header Kartu */}
              <div className="relative z-10 flex justify-between items-start">
                <div className="p-4 bg-rl-navy rounded-2xl shadow-lg shadow-rl-navy/40 group-hover:scale-110 transition-transform duration-300">
                    <Zap className="w-8 h-8 text-yellow-400 fill-yellow-400" />
                </div>
                <div className="text-right">
                    <div className="flex items-center justify-end gap-1 text-xs text-gray-400 mb-1 font-mono uppercase">
                      <Wifi size={12} className={currentModul.status.includes('Online') || currentModul.status.includes('متصل') ? "text-green-500 animate-pulse" : "text-gray-500"} /> 
                      {currentModul.status}
                    </div>
                    <p className="text-2xl font-bold text-rl-navy dark:text-white tracking-tight leading-none">
                      {currentModul.title}
                    </p>
                    <p className="text-sm text-rl-red font-bold mt-1">
                      {currentModul.code}
                    </p>
                </div>
              </div>

              {/* Grafik Dummy */}
              <div className="relative z-10 space-y-4 my-8">
                <div className="flex items-end justify-between h-32 gap-2 px-2">
                    {[30, 60, 45, 90, 50, 70, 40].map((h, i) => (
                        <motion.div 
                          key={i}
                          initial={{ height: "10%" }}
                          animate={{ height: `${h}%` }}
                          transition={{ duration: 1, delay: i * 0.1, repeat: Infinity, repeatType: "reverse" }}
                          className={`w-full rounded-t-lg transition-colors duration-500 ${
                            i === (currentModul.week % 7) 
                            ? 'bg-rl-red shadow-[0_0_15px_rgba(211,17,69,0.5)]' 
                            : 'bg-rl-navy/20 dark:bg-white/10'
                          }`} 
                        />
                    ))}
                </div>
                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </div>

              {/* Footer Kartu - Pake 't.hero_card_assistant' atau teks lain */}
              <div className="relative z-10 bg-white/80 dark:bg-black/40 backdrop-blur-md rounded-2xl p-4 flex items-center gap-4 border border-white/20 dark:border-white/5">
                 <div className="h-12 w-12 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center text-rl-navy dark:text-white shadow-inner">
                    <Calendar size={20} />
                 </div>
                 <div className="flex-1">
                    <p className="text-sm font-bold text-rl-navy dark:text-white">
                        {t.hero_card_week}{currentModul.week > 0 ? currentModul.week : "-"} {/* <--- DATA DARI CONTEXT */}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date().toLocaleDateString(lang === 'id' ? 'id-ID' : lang === 'ar' ? 'ar-SA' : 'en-US', { weekday: 'long', day: 'numeric', month: 'long' })}
                    </p>
                 </div>
                 <div className="p-2 rounded-xl bg-rl-navy/10 text-rl-navy dark:bg-white/10 dark:text-white">
                    <Clock size={16} />
                 </div>
              </div>
           </div>

           {/* Backlight Glow */}
           <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[400px] bg-rl-red rounded-full opacity-20 blur-[80px]"></div>
        </motion.div>

      </div>
    </section>
  );
}