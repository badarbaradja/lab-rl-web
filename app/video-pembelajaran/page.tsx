"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Play, Youtube, ArrowLeft, X } from "lucide-react"; // Added ArrowLeft/X
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext"; 

// =================================================================================
// DATABASE VIDEO MANUAL
// =================================================================================
const videoDatabase = [
  {
    id: 1,
    videoId: "5dxobd282ZY", 
    title: { 
        id: "Modul 1 TE & FTE - Hukum Ohm & Rangkaian Dasar", 
        en: "Module 1 TE & FTE - Ohm's Law & Basic Circuits", 
        ar: "الوحدة TE & FTE 1 - قانون أوم والدوائر الأساسية" 
    },
    desc: { 
        id: "Penjelasan lengkap mengenai penggunaan multimeter dan verifikasi Hukum Ohm.", 
        en: "Complete explanation on using a multimeter and verifying Ohm's Law.", 
        ar: "شرح كامل حول استخدام المقياس المتعدد والتحقق من قانون أوم." 
    }
  },
  {
    id: 2,
    videoId: "N7Vi_wgJ1rk", 
    title: { 
        id: "MODUL 2 TE & FTE - PENGUKURAN BESARAN ARUS DAN TEGANGAN", 
        en: "MODULE 2 TE & FTE - MEASUREMENT OF CURRENT AND VOLTAGE", 
        ar: "الوحدة 2 TE & FTE - قياس التيار والجهد" 
    },
    desc: { 
        id: "Tutorial langkah demi langkah menyederhanakan rangkaian kompleks.", 
        en: "Step-by-step tutorial on simplifying complex circuits.", 
        ar: "درس تعليمي خطوة بخطوة حول تبسيط الدوائر المعقدة." 
    }
  },
  {
    id: 3,
    videoId: "_FX3cSXw0tE", 
    title: { 
        id: "MODUL 3 TE - PENGENALAN APLIKASI CIRCUIT SIMULATOR", 
        en: "MODULE 3 TE - INTRODUCTION TO CIRCUIT SIMULATOR APPLICATIONS", 
        ar: "الوحدة 3 TE - مقدمة إلى تطبيقات محاكاة الدوائر" 
    },
    desc: { 
        id: "Panduan kalibrasi dan pembacaan sinyal pada osiloskop digital.", 
        en: "Guide to calibration and signal reading on a digital oscilloscope.", 
        ar: "دليل لمعايرة وقراءة الإشارات على راسم الذبذبات الرقمي." 
    }
  },
  {
    id: 4,
    videoId: "Wke3M7Ephrk", 
    title: { 
        id: "MODUL 4 TE & FTE - IMPEDANSI DAN FUNGSI TRANSFER", 
        en: "MODULE 4 TE & FTE - IMPEDANCE AND TRANSFER FUNCTION", 
        ar: "الوحدة 4 TE & FTE - المعاوقة ودالة النقل" 
    },
    desc: { 
        id: "Analisis respons transien pada rangkaian Resistor, Induktor, dan Kapasitor.", 
        en: "Transient response analysis on Resistor, Inductor, and Capacitor circuits.", 
        ar: "تحليل الاستجابة العابرة في دوائر المقاومة والمحث والمكثف." 
    }
  },
  {
    id: 5,
    videoId: "IzS0dgSR5E4", 
    title: { 
        id: "Modul 5 FTE - Resonansi", 
        en: "Module 5 FTE- Resonance", 
        ar: "الوحدة FTE 5 - الرنين" 
    },
    desc: { 
        id: "Analisis respons transien pada rangkaian Resistor, Induktor, dan Kapasitor.", 
        en: "Transient response analysis on Resistor, Inductor, and Capacitor circuits.", 
        ar: "تحليل الاستجابة العابرة في دوائر المقاومة والمحث والمكثف." 
    }
  },
  {
    id: 6,
    videoId: "rSuuwwzuPC8", 
    title: { 
        id: "MODUL 6 TE - PENGUKURAN KAPASITOR DAN INDUKTOR PADA RANGKAIAN AC", 
        en: "MODULE 6 TE - CAPACITOR AND INDUCTOR MEASUREMENTS IN AC CIRCUITS", 
        ar: "الوحدة 6 TE - قياسات المكثف والمحث في دوائر التيار المتردد" 
    },
    desc: { 
        id: "Analisis respons transien pada rangkaian Resistor, Induktor, dan Kapasitor.", 
        en: "Transient response analysis on Resistor, Inductor, and Capacitor circuits.", 
        ar: "تحليل الاستجابة العابرة في دوائر المقاومة والمحث والمكثف." 
    }
  },
  {
    id: 7,
    videoId: "wMalGHGcWdw", 
    title: { 
        id: "MODUL 7 TE - PENGUKURAN ARUS, TEGANGAN, DAN IMPEDANSI PADA AC", 
        en: "MODULE 7 TE - MEASUREMENT OF CURRENT, VOLTAGE, AND IMPEDANCE IN AC", 
        ar: "الوحدة 7 TE - قياس التيار والجهد والممانعة في التيار المتردد" 
    },
    desc: { 
        id: "Analisis respons transien pada rangkaian Resistor, Induktor, dan Kapasitor.", 
        en: "Transient response analysis on Resistor, Inductor, and Capacitor circuits.", 
        ar: "تحليل الاستجابة العابرة في دوائر المقاومة والمحث والمكثف." 
    }
  },
  {
    id: 8,
    videoId: "NOpb9HwAsuQ", 
    title: { 
        id: "MODUL 8 TE - RANGKAIAN FILTER SEDERHANA PADA RANGKAIAN RL DAN RC", 
        en: "MODULE 8 TE - SIMPLE FILTER CIRCUITS IN RL AND RC CIRCUITS", 
        ar: "الوحدة 8 TE - دوائر الترشيح البسيطة في دوائر RL وRC" 
    },
    desc: { 
        id: "Analisis respons transien pada rangkaian Resistor, Induktor, dan Kapasitor.", 
        en: "Transient response analysis on Resistor, Inductor, and Capacitor circuits.", 
        ar: "تحليل الاستجابة العابرة في دوائر المقاومة والمحث والمكثف." 
    }
  },
  {
    id: 9,
    videoId: "Rv-YMkFA-14", 
    title: { 
        id: "MODUL 9 TE - RESONANSI", 
        en: "Module 9: Resonance", 
        ar: "الوحدة 9 TE - الرنين" 
    },
    desc: { 
        id: "Analisis respons transien pada rangkaian Resistor, Induktor, dan Kapasitor.", 
        en: "Transient response analysis on Resistor, Inductor, and Capacitor circuits.", 
        ar: "تحليل الاستجابة العابرة في دوائر المقاومة والمحث والمكثف." 
    }
  },
  {
    id: 10,
    videoId: "h60a-fxpcjM", 
    title: { 
        id: "Modul 10 TE dan Modul 6 FTE: Kutub 4", 
        en: "Module 10: pole 4", 
        ar: "الوحدة 10: القطب 4" 
    },
    desc: { 
        id: "Analisis respons transien pada rangkaian Resistor, Induktor, dan Kapasitor.", 
        en: "Transient response analysis on Resistor, Inductor, and Capacitor circuits.", 
        ar: "تحليل الاستجابة العابرة في دوائر المقاومة والمحث والمكثف." 
    }
  },
];

export default function VideoPage() {
  const { t, lang } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [playingVideoId, setPlayingVideoId] = useState<number | null>(null);

  // Filter Logic
  const filteredVideos = videoDatabase.filter((video) => {
    // @ts-ignore
    const currentTitle = video.title[lang] || video.title.id; 
    return currentTitle.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Cari Video yang sedang aktif
  const activeVideoData = videoDatabase.find(v => v.id === playingVideoId);

  // Fungsi Reset (Kembali ke Grid)
  const closePlayer = () => setPlayingVideoId(null);

  return (
    <main className="min-h-screen bg-rl-light dark:bg-[#050A18] pt-28 pb-20 transition-all duration-500">
      <div className="container mx-auto px-6">
        
        {/* === HEADER & SEARCH (Hanya tampil jika TIDAK ada video yang diputar) === */}
        <AnimatePresence>
            {!playingVideoId && (
                <motion.div 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-center mb-12 space-y-4 overflow-hidden"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-rl-navy dark:text-white">
                        {t.video_title}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        {t.video_desc}
                    </p>

                    {/* Search Bar */}
                    <div className="mt-8 max-w-md mx-auto relative group">
                        <Search className="absolute left-5 top-4 text-gray-400 w-5 h-5 group-focus-within:text-rl-navy transition-colors rtl:right-5 rtl:left-auto" />
                        <input 
                            type="text" 
                            placeholder={t.video_search}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-14 pr-6 py-4 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-rl-navy dark:focus:ring-blue-500 dark:text-white transition-all shadow-lg shadow-gray-200/50 dark:shadow-none rtl:pr-14 rtl:pl-6"
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

        {/* ================================================================================== */}
        {/* LAYOUT YOUTUBE STYLE (JIKA VIDEO DIPILIH) */}
        {/* ================================================================================== */}
        {playingVideoId && activeVideoData ? (
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col lg:flex-row gap-8 items-start"
            >
                {/* 1. KOLOM KIRI (PLAYER UTAMA) */}
                <div className="w-full lg:flex-1">
                    <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl relative">
                        <iframe 
                            src={`https://www.youtube.com/embed/${activeVideoData.videoId}?autoplay=1&rel=0`} 
                            title="YouTube video player" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                            className="w-full h-full"
                        />
                    </div>
                    
                    {/* Judul & Deskripsi Aktif */}
                    <div className="mt-6 p-6 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl text-left rtl:text-right">
                        <h2 className="text-2xl font-bold text-rl-navy dark:text-white mb-2 leading-snug">
                            {/* @ts-ignore */}
                            {activeVideoData.title[lang]}
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                            {/* @ts-ignore */}
                            {activeVideoData.desc[lang]}
                        </p>
                        
                        <button 
                            onClick={closePlayer}
                            className="mt-6 flex items-center gap-2 px-4 py-2 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors rtl:flex-row-reverse"
                        >
                            <X size={18} /> {lang === 'ar' ? 'إغلاق المشغل' : lang === 'id' ? 'Tutup Video' : 'Close Video'}
                        </button>
                    </div>
                </div>

                {/* 2. KOLOM KANAN (PLAYLIST SCROLLABLE) */}
                <div className="w-full lg:w-[400px] flex flex-col gap-4">
                    <div className="flex items-center justify-between px-2">
                        <h3 className="font-bold text-rl-navy dark:text-white">
                            {lang === 'ar' ? 'قائمة التشغيل' : lang === 'id' ? 'Daftar Video' : 'Playlist'}
                        </h3>
                        {/* Tombol Search Kecil di Sidebar jika diperlukan */}
                    </div>

                    {/* Scroll Container */}
                    <div className="h-[600px] overflow-y-auto pr-2 custom-scrollbar space-y-4">
                        {filteredVideos.map((video) => (
                            <div 
                                key={video.id}
                                onClick={() => setPlayingVideoId(video.id)}
                                className={`flex gap-3 p-2 rounded-xl cursor-pointer transition-all ${
                                    playingVideoId === video.id 
                                    ? "bg-rl-navy/10 dark:bg-white/10 ring-1 ring-rl-navy/20" 
                                    : "hover:bg-gray-100 dark:hover:bg-white/5"
                                }`}
                            >
                                {/* Thumbnail Kecil */}
                                <div className="relative w-32 h-20 shrink-0 rounded-lg overflow-hidden bg-black">
                                    <Image 
                                        src={`https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`}
                                        alt="Thumb"
                                        fill
                                        className="object-cover"
                                    />
                                    {playingVideoId !== video.id && (
                                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                            <Play size={20} className="text-white fill-white" />
                                        </div>
                                    )}
                                </div>

                                {/* Info Kecil */}
                                <div className="flex-1 text-left rtl:text-right">
                                    <h4 className={`text-sm font-bold line-clamp-2 leading-snug mb-1 ${
                                        playingVideoId === video.id ? "text-rl-navy dark:text-white" : "text-gray-700 dark:text-gray-300"
                                    }`}>
                                        {/* @ts-ignore */}
                                        {video.title[lang]}
                                    </h4>
                                    <p className="text-xs text-gray-500 line-clamp-1">Lab Rangkaian Listrik</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        ) : (
            // ==================================================================================
            // LAYOUT GRID NORMAL (JIKA BELUM PILIH VIDEO)
            // ==================================================================================
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence>
                    {filteredVideos.map((video, index) => (
                    <motion.div
                        key={video.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
                        onClick={() => setPlayingVideoId(video.id)} // KLIK UNTUK BUKA PLAYER
                    >
                        
                        {/* THUMBNAIL AREA */}
                        <div className="relative aspect-video bg-black w-full">
                            <Image 
                                src={`https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`}
                                alt="Video Thumbnail"
                                fill
                                className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 bg-rl-red/90 rounded-full flex items-center justify-center pl-1 shadow-2xl group-hover:scale-110 transition-transform duration-300">
                                    <Play fill="white" className="text-white w-8 h-8" />
                                </div>
                            </div>
                            <div className="absolute top-4 left-4 bg-black/60 px-3 py-1 rounded-full text-xs text-white flex items-center gap-2 backdrop-blur-sm">
                                <Youtube size={14} className="text-red-500" /> YouTube
                            </div>
                        </div>

                        {/* Content Info */}
                        <div className="p-6 text-left rtl:text-right">
                            <h3 className="text-lg font-bold text-rl-navy dark:text-white mb-2 line-clamp-2 leading-snug">
                                {/* @ts-ignore */}
                                {video.title[lang]}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                                {/* @ts-ignore */}
                                {video.desc[lang]}
                            </p>
                        </div>

                    </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        )}

        {/* Empty State */}
        {filteredVideos.length === 0 && (
            <div className="text-center py-20 text-gray-500">
                <p>Video tidak ditemukan.</p>
            </div>
        )}

      </div>
    </main>
  );
}