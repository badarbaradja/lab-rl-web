"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Book, Download, Globe, Layers, Cpu } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext"; // Import Hook Bahasa

export default function ModulPage() {
  const { t, lang } = useLanguage(); // Ambil Kamus & Bahasa Aktif
  const [activeTab, setActiveTab] = useState<"TE" | "FTE">("TE");

  // --- DATA MODUL DINAMIS ---
  // Judul disesuaikan dengan bahasa yang dipilih (ID/EN/AR)
  const moduleBooks = {
    TE: [
      { 
        id: 1, 
        title: lang === 'id' ? "Modul Praktikum 2025" : lang === 'ar' ? "وحدة العملي 2025" : "Practicum Module 2025", 
        subtitle: lang === 'id' ? "Program Studi Teknik Elektro" : lang === 'ar' ? "برنامج هندسة كهربائية" : "Electrical Engineering Program", 
        type: "Reguler", 
        lang: lang === 'id' ? "Bahasa Indonesia" : lang === 'ar' ? "الإندونيسية" : "Indonesian",
        color: "bg-rl-navy",
        href: "https://drive.google.com/file/d/1egwCMyekW5EUJod8x9jmW7euTDpc1rkh/view?usp=drive_link" 
      },
      { 
        id: 2, 
        title: lang === 'id' ? "Modul Praktikum (Int)" : lang === 'ar' ? "وحدة العملي (دولي)" : "Practical Module 2025", 
        subtitle: lang === 'id' ? "Kelas Internasional" : lang === 'ar' ? "الفصل الدولي" : "International Class", 
        type: "International", 
        lang: lang === 'id' ? "Bahasa Inggris" : lang === 'ar' ? "الإنجليزية" : "English",
        color: "bg-yellow-600",
        href: "https://drive.google.com/file/d/1nqGRT87HzPyfT4WnLUOO9_ud_v48pHOG/view?usp=drive_link" 
      },
    ],
    FTE: [
      { 
        id: 3, 
        title: lang === 'id' ? "Modul Praktikum 2025" : lang === 'ar' ? "وحدة العملي 2025" : "Practicum Module 2025", 
        subtitle: lang === 'id' ? "Fakultas Teknik Elektro (Umum)" : lang === 'ar' ? "كلية الهندسة الكهربائية" : "School of Electrical Engineering", 
        type: "Reguler", 
        lang: lang === 'id' ? "Bahasa Indonesia" : lang === 'ar' ? "الإندونيسية" : "Indonesian",
        color: "bg-blue-700",
        href: "https://drive.google.com/file/d/1IWaGS1OYykupwUlGYdpNLkFMkG1lAEaw/view?usp=drive_link" 
      },
      { 
        id: 4, 
        title: lang === 'id' ? "Modul Praktikum (Int)" : lang === 'ar' ? "وحدة العملي (دولي)" : "Practical Module 2025", 
        subtitle: lang === 'id' ? "Kelas Internasional" : lang === 'ar' ? "الفصل الدولي" : "International Class", 
        type: "International", 
        lang: lang === 'id' ? "Bahasa Inggris" : lang === 'ar' ? "الإنجليزية" : "English",
        color: "bg-orange-600",
        href: "https://drive.google.com/file/d/1sIg3hcGqEY2_awcaBAzTuJpiaQHTi8mL/view?usp=drive_link" 
      },
    ]
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-[#050A18] pt-28 pb-20">
      <div className="container mx-auto px-6">
        
        {/* Header Dinamis */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-rl-navy dark:text-white mb-4">
            {t.module_title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t.module_desc}
          </p>
        </div>

        {/* TAB SWITCHER Dinamis */}
        <div className="flex justify-center mb-16">
          <div className="p-1 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full inline-flex relative shadow-sm">
            <motion.div 
              className="absolute top-1 bottom-1 bg-rl-navy rounded-full shadow-md z-0"
              initial={false}
              animate={{ 
                // Logic RTL untuk Tab
                left: lang === 'ar' 
                    ? (activeTab === "TE" ? "50%" : "4px") 
                    : (activeTab === "TE" ? "4px" : "50%"), 
                width: "calc(50% - 4px)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
            <button
              onClick={() => setActiveTab("TE")}
              className={`relative z-10 px-8 py-3 rounded-full text-sm font-bold flex items-center gap-2 transition-colors ${
                activeTab === "TE" ? "text-white" : "text-gray-500 dark:text-gray-400 hover:text-rl-navy"
              }`}
            >
              <Layers size={18} /> {t.schedule_tab_te} {/* Pake variabel tab TE dari jadwal aja biar konsisten */}
            </button>
            <button
              onClick={() => setActiveTab("FTE")}
              className={`relative z-10 px-8 py-3 rounded-full text-sm font-bold flex items-center gap-2 transition-colors ${
                activeTab === "FTE" ? "text-white" : "text-gray-500 dark:text-gray-400 hover:text-rl-navy"
              }`}
            >
              <Cpu size={18} /> {t.schedule_tab_fte} {/* Pake variabel tab FTE dari jadwal */}
            </button>
          </div>
        </div>

        {/* BOOK SHELF GRID */}
        <div className="flex justify-center">
          <motion.div 
            layout 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-4xl w-full"
          >
            <AnimatePresence mode="wait">
              {moduleBooks[activeTab].map((book) => (
                <motion.div
                  key={`${book.id}-${lang}`} // Key unik biar animasi refresh saat ganti bahasa
                  initial={{ opacity: 0, y: 20, rotateX: -10 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4 }}
                  className="group relative"
                >
                  {/* Efek Glow di Belakang Buku */}
                  <div className={`absolute inset-0 ${book.color} blur-[40px] opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />

                  {/* KARTU BUKU */}
                  <div className="relative flex flex-col md:flex-row bg-white dark:bg-[#0F172A] border border-gray-200 dark:border-white/10 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-full">
                    
                    {/* BAGIAN COVER (Kiri/Atas) */}
                    <div className={`w-full md:w-2/5 ${book.color} p-6 flex flex-col justify-between text-white relative overflow-hidden rtl:order-last`}> {/* RTL support: Cover pindah kanan */}
                        <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
                        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
                        
                        <div className="relative z-10">
                            {book.type === "International" ? <Globe size={24} className="mb-4 opacity-80" /> : <Book size={24} className="mb-4 opacity-80" />}
                            <p className="text-xs font-bold tracking-widest opacity-70 mb-1">2025</p>
                            <h3 className="text-xl font-bold leading-tight">{book.type}</h3>
                        </div>

                        <div className="relative z-10 mt-8">
                            <div className="w-8 h-1 bg-white/50 rounded-full mb-2"></div>
                            <div className="w-12 h-1 bg-white/30 rounded-full"></div>
                        </div>
                    </div>

                    {/* BAGIAN DETAIL (Kanan/Bawah) */}
                    <div className="flex-1 p-6 md:p-8 flex flex-col justify-center text-left rtl:text-right">
                        <h2 className="text-2xl font-bold text-rl-navy dark:text-white mb-2 group-hover:text-rl-red transition-colors">
                            {book.title}
                        </h2>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-6">
                            {book.subtitle}
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-white/5 p-3 rounded-lg rtl:flex-row-reverse">
                                {book.type === "International" ? <Globe size={18} className="text-blue-500" /> : <Book size={18} className="text-rl-navy" />}
                                <span>{book.lang}</span>
                            </div>

                            <a 
                                href={book.href} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-rl-navy hover:bg-rl-red text-white font-bold transition-all shadow-lg hover:shadow-rl-red/30 active:scale-95"
                            >
                                <Download size={18} />
                                {t.module_btn_download} {/* Tombol Dinamis */}
                            </a>
                        </div>
                    </div>

                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

      </div>
    </main>
  );
}