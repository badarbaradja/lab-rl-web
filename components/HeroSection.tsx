"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Zap, Wifi, Calendar, Clock, Activity, Layers } from "lucide-react"; // Changed Cpu to Activity
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

// --- KONFIGURASI JADWAL ---
const START_DATE_TE = "2025-09-29";
const START_DATE_FTE = "2025-10-06"; // FTE mulai seminggu setelah TE

const SCHEDULE_DATA_TE = [
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

const SCHEDULE_DATA_FTE = [
  { week: 1, title: "Pembacaan dan Pengukuran Resistor", code: "Modul 01" },
  { week: 2, title: "Pengukuran Besaran Arus dan Tegangan", code: "Modul 02" },
  { week: 3, title: "Pengenalan Aplikasi Circuit Simulator", code: "Modul 03" },
  { week: 4, title: "Teorema Substitusi dan Superposisi", code: "Modul 04" },
  { week: 5, title: "Resonansi dan Pengukuran Bandwidth", code: "Modul 05" },
  { week: 6, title: "Pengukuran Kapasitor dan Induktor (AC)", code: "Modul 06" },
  { week: 7, title: "Pengukuran Arus, Tegangan, Impedansi (AC)", code: "Modul 07" },
  { week: 8, title: "Rangkaian Filter Sederhana RL & RC", code: "Modul 08" },
  { week: 9, title: "Teorema Thevenin, Norton, dan TDM", code: "Modul 09" },
  { week: 10, title: "Rangkaian Kutub Empat", code: "Modul 10" },
  { week: 11, title: "Asistensi Tugas Besar", code: "Minggu Tenang" },
  { week: 12, title: "Final Presentasi", code: "Tugas Besar" },
];

export default function HeroSection() {
  const { t, lang } = useLanguage();
  
  const [currentModulTE, setCurrentModulTE] = useState({
    title: "",
    code: "",
    week: 0,
    status: ""
  });

  const [currentModulFTE, setCurrentModulFTE] = useState({
    title: "",
    code: "",
    week: 0,
    status: ""
  });

  useEffect(() => {
    const statusText: {
      id: { not_started: string; finished: string; online: string; offline: string; waiting: string; upcoming: string };
      en: { not_started: string; finished: string; online: string; offline: string; waiting: string; upcoming: string };
      ar: { not_started: string; finished: string; online: string; offline: string; waiting: string; upcoming: string };
    } = {
        id: { not_started: "Praktikum Belum Dimulai", finished: "Praktikum Selesai", online: "Online", offline: "Offline", waiting: "Menunggu", upcoming: "Segera" },
        en: { not_started: "Practicum Not Started", finished: "Practicum Finished", online: "Online", offline: "Offline", waiting: "Waiting", upcoming: "Upcoming" },
        ar: { not_started: "لم يبدأ العملي", finished: "انتهى العملي", online: "متصل", offline: "غير متصل", waiting: "انتظار", upcoming: "قادم" }
    };

    const calculateSchedule = (
      startDate: string, 
      scheduleData: typeof SCHEDULE_DATA_TE, 
      setModul: React.Dispatch<React.SetStateAction<{
        title: string;
        code: string;
        week: number;
        status: string;
      }>>
    ) => {
      const start = new Date(startDate).getTime();
      const now = new Date().getTime();
      const diff = now - start;
      const oneWeekInMs = 7 * 24 * 60 * 60 * 1000;
      
      const texts = statusText[lang];

      if (diff < 0) {
        setModul({ 
            title: texts.not_started, 
            code: texts.upcoming, 
            week: 0, 
            status: texts.offline 
        });
        return;
      }

      const weekIndex = Math.floor(diff / oneWeekInMs);
      if (weekIndex >= 0 && weekIndex < scheduleData.length) {
        const activeData = scheduleData[weekIndex];
        setModul({
          title: activeData.title,
          code: activeData.code,
          week: activeData.week,
          status: texts.online
        });
      } else {
        setModul({ 
            title: texts.finished, 
            code: texts.finished, 
            week: 13, 
            status: texts.offline 
        });
      }
    };

    calculateSchedule(START_DATE_TE, SCHEDULE_DATA_TE, setCurrentModulTE);
    calculateSchedule(START_DATE_FTE, SCHEDULE_DATA_FTE, setCurrentModulFTE);
  }, [lang]);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-[#050A18] transition-colors duration-300 pt-20">
      
      {/* Background Effects */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-blue-600/40 rounded-full blur-[150px] mix-blend-screen animate-pulse" />
        <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-red-600/30 rounded-full blur-[130px] mix-blend-screen" />
        <div className="absolute inset-0 opacity-20 mix-blend-overlay"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8 text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/80 dark:bg-white/5 border border-gray-900/10 dark:border-white/10 backdrop-blur-md shadow-sm mx-auto lg:mx-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
            </span>
            <span className="text-xs font-bold text-gray-900 dark:text-gray-200 tracking-widest uppercase">
              {t.hero_badge}
            </span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-gray-900 dark:text-white">
            {t.hero_title} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-red-600">
              {t.hero_subtitle}
            </span>
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-lg mx-auto lg:mx-0 leading-relaxed">
            {t.hero_desc}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
            <Link href="/modul" className="group relative px-8 py-4 bg-gray-900 text-white rounded-2xl overflow-hidden shadow-xl shadow-gray-900/30 hover:shadow-gray-900/50 hover:scale-105 transition-all duration-300">
              <span className="relative z-10 flex items-center justify-center gap-2 font-bold">
                {t.hero_btn_start} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </Link>
            
            <Link href="/tata-tertib" className="flex items-center justify-center gap-2 px-8 py-4 border border-gray-300 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-2xl text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-white/10 transition-all font-medium">
              <Download className="w-5 h-5" />
              {t.hero_btn_rule}
            </Link>
          </div>
        </motion.div>

        {/* Visual Card - Dual TE & FTE */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative h-[500px] hidden lg:flex items-center justify-center"
        >
           <div className="relative w-[700px] h-[500px] 
             bg-gradient-to-b from-white/10 to-transparent 
             dark:from-white/10 dark:to-black/20 
             rounded-[2.5rem] 
             border border-white/20 dark:border-white/10 
             shadow-2xl backdrop-blur-xl 
             flex flex-col justify-between 
             transform transition-transform hover:scale-[1.02] duration-500
             group"
           >
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent rounded-t-[2.5rem] pointer-events-none" />

              {/* Header - TE & FTE */}
              <div className="relative z-10 grid grid-cols-2 gap-6 p-8 pb-0">
                {/* TE */}
                <div className="space-y-4 border-r border-white/10 pr-6">
                  <div className="flex items-start gap-3">
                    <div className="p-3 bg-gray-900 rounded-xl shadow-lg shadow-gray-900/40 group-hover:scale-110 transition-transform duration-300">
                      <Zap className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-lg font-bold text-gray-900 dark:text-white tracking-tight leading-tight">
                        TE
                      </p>
                      <p className="text-xs text-red-600 font-bold">
                        {currentModulTE.code}
                      </p>
                    </div>
                  </div>
                  <div className="bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/20 dark:border-white/10">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2">
                      {currentModulTE.title}
                    </p>
                  </div>
                </div>

                {/* FTE */}
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <div className="p-3 bg-blue-600 rounded-xl shadow-lg shadow-blue-600/40 group-hover:scale-110 transition-transform duration-300">
                      <Activity className="w-6 h-6 text-white" /> {/* GANTI ICON JADI ACTIVITY (GELOMBANG) */}
                    </div>
                    <div className="flex-1">
                      <p className="text-lg font-bold text-gray-900 dark:text-white tracking-tight leading-tight">
                        FTE
                      </p>
                      <p className="text-xs text-blue-600 font-bold">
                        {currentModulFTE.code}
                      </p>
                    </div>
                  </div>
                  <div className="bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/20 dark:border-white/10">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2">
                      {currentModulFTE.title}
                    </p>
                  </div>
                </div>
              </div>

              {/* Grafik Progress (PASTI MUNCUL - z-10 di bawah footer z-20) */}
              <div className="relative z-10 space-y-4 my-6 px-8">
                <div className="grid grid-cols-2 gap-6">
                  {/* Grafik TE */}
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">TE Progress</p>
                    <div className="flex items-end justify-between h-24 gap-1.5 px-2">
                      {[30, 60, 45, 90, 50, 70, 40].map((h, i) => (
                          <motion.div 
                            key={i}
                            initial={{ height: "10%" }}
                            animate={{ height: `${h}%` }}
                            transition={{ duration: 1, delay: i * 0.1, repeat: Infinity, repeatType: "reverse" }}
                            className={`w-full rounded-t-lg transition-colors duration-500 ${
                              i === (currentModulTE.week % 7) 
                              ? 'bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.5)]' 
                              : 'bg-gray-900/20 dark:bg-white/10'
                            }`} 
                          />
                      ))}
                    </div>
                  </div>

                  {/* Grafik FTE */}
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">FTE Progress</p>
                    <div className="flex items-end justify-between h-24 gap-1.5 px-2">
                      {[40, 55, 70, 45, 80, 60, 35].map((h, i) => (
                          <motion.div 
                            key={i}
                            initial={{ height: "10%" }}
                            animate={{ height: `${h}%` }}
                            transition={{ duration: 1, delay: i * 0.15, repeat: Infinity, repeatType: "reverse" }}
                            className={`w-full rounded-t-lg transition-colors duration-500 ${
                              i === (currentModulFTE.week % 7) 
                              ? 'bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.5)]' 
                              : 'bg-blue-600/20 dark:bg-blue-400/10'
                            }`} 
                          />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </div>

              {/* Footer - Date Info (DIGABUNG & UPDATE TANGGAL LENGKAP & STATUS DI KIRI) */}
              <div className="relative z-20 p-6 pt-0 mt-auto">
                <div className="bg-white/80 dark:bg-black/60 backdrop-blur-md rounded-2xl p-4 flex items-center justify-between border border-white/20 dark:border-white/5 shadow-lg">
                   
                   {/* KIRI: Minggu & Status Online */}
                   <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center text-gray-900 dark:text-white shadow-inner">
                         <Calendar size={18} />
                      </div>
                      <div>
                         <p className="text-xs font-bold text-gray-900 dark:text-white">
                             {t.hero_card_week}{currentModulTE.week > 0 ? currentModulTE.week : "-"}
                         </p>
                         <div className="flex items-center gap-2 mt-0.5">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase">
                               {currentModulTE.status}
                            </p>
                         </div>
                      </div>
                   </div>

                   {/* KANAN: Tanggal Lengkap (Hari, Tanggal, Bulan, Tahun) */}
                   <div className="flex items-center gap-3 border-l border-white/10 pl-4">
                      <div className="text-right hidden sm:block">
                         <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-0.5">
                            {lang === 'id' ? 'Hari Ini' : lang === 'ar' ? 'اليوم' : 'Today'}
                         </p>
                         <p className="text-xs font-bold text-gray-900 dark:text-white">
                            {new Date().toLocaleDateString(lang === 'id' ? 'id-ID' : lang === 'ar' ? 'ar-SA' : 'en-US', { 
                               weekday: 'long', 
                               day: 'numeric', 
                               month: 'long', 
                               year: 'numeric' 
                            })}
                         </p>
                      </div>
                      <div className="p-1.5 rounded-lg bg-gray-900/10 text-gray-900 dark:bg-white/10 dark:text-white">
                         <Clock size={16} />
                      </div>
                   </div>

                </div>
              </div>

           </div>

           {/* Backlight Glow */}
           <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-r from-red-600 via-purple-500 to-blue-600 rounded-full opacity-20 blur-[100px]"></div>
        </motion.div>

      </div>
    </section>
  );
}