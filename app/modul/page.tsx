"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, Cpu, Download } from "lucide-react";
import Image from "next/image"; 
import { useLanguage } from "@/context/LanguageContext"; 

export default function ModulPage() {
  const { t, lang } = useLanguage(); 
  const [activeTab, setActiveTab] = useState<"TE" | "FTE">("TE");

  // --- DATA MODUL ---
  const moduleBooks = {
    TE: [
      { 
        id: 1, 
        type: "REGULER", 
        href: "https://drive.google.com/file/d/1egwCMyekW5EUJod8x9jmW7euTDpc1rkh/view?usp=drive_link",
        cover: "/img/cover-te-reg.jpg" 
      },
      { 
        id: 2, 
        type: "INTERNATIONAL", 
        href: "https://drive.google.com/file/d/1nqGRT87HzPyfT4WnLUOO9_ud_v48pHOG/view?usp=drive_link",
        cover: "/img/cover-te-int.jpg" 
      },
    ],
    FTE: [
      { 
        id: 3, 
        type: "REGULER", 
        href: "https://drive.google.com/file/d/1IWaGS1OYykupwUlGYdpNLkFMkG1lAEaw/view?usp=drive_link",
        cover: "/img/cover-fte-reg.jpg" 
      },
      { 
        id: 4, 
        type: "INTERNATIONAL", 
        href: "https://drive.google.com/file/d/1sIg3hcGqEY2_awcaBAzTuJpiaQHTi8mL/view?usp=drive_link",
        cover: "/img/cover-fte-int.jpg" 
      },
    ]
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-[#050A18] pt-28 pb-20">
      <div className="container mx-auto px-6 flex flex-col items-center"> {/* Flex Column + Center */}
        
        {/* Header Dinamis */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-rl-navy dark:text-white mb-4">
            {t.module_title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t.module_desc}
          </p>
        </div>

        {/* TAB SWITCHER */}
        <div className="flex justify-center mb-16 w-full">
          <div className="p-1 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full inline-flex relative shadow-sm">
            <motion.div 
              className="absolute top-1 bottom-1 bg-rl-navy rounded-full shadow-md z-0"
              initial={false}
              animate={{ 
                left: lang === 'ar' 
                    ? (activeTab === "TE" ? "50%" : "4px") 
                    : (activeTab === "TE" ? "4px" : "50%"), 
                width: "calc(50% - 4px)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
            <button onClick={() => setActiveTab("TE")} className={`relative z-10 px-8 py-3 rounded-full text-sm font-bold flex items-center gap-2 transition-colors ${activeTab === "TE" ? "text-white" : "text-gray-500 dark:text-gray-400 hover:text-rl-navy"}`}>
              <Layers size={18} /> {t.schedule_tab_te}
            </button>
            <button onClick={() => setActiveTab("FTE")} className={`relative z-10 px-8 py-3 rounded-full text-sm font-bold flex items-center gap-2 transition-colors ${activeTab === "FTE" ? "text-white" : "text-gray-500 dark:text-gray-400 hover:text-rl-navy"}`}>
              <Cpu size={18} /> {t.schedule_tab_fte}
            </button>
          </div>
        </div>

        {/* BOOK SHELF GRID (CENTERED) */}
        {/* Menggunakan 'justify-center' pada flex container untuk memastikan item di tengah */}
        <motion.div 
          layout 
          className="flex flex-wrap justify-center gap-8 md:gap-12 w-full max-w-5xl"
        >
          <AnimatePresence mode="wait">
            {moduleBooks[activeTab].map((book) => (
              <motion.div
                key={`${book.id}-${lang}`} 
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative w-full sm:w-[350px] aspect-[3/4]" // Ukuran Kartu Fixed Ratio Buku
              >
                {/* Link Pembungkus Seluruh Kartu */}
                <a 
                    href={book.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block w-full h-full relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-200 dark:border-white/10"
                >
                    {/* Gambar Cover Full */}
                    <Image 
                        src={book.cover} 
                        alt={`Modul ${book.type}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 350px"
                    />

                    {/* Overlay Hover Effect (Muncul saat mouse di atas gambar) */}
                    <div className="absolute inset-0 bg-rl-navy/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white backdrop-blur-sm">
                        <div className="p-4 bg-white/20 rounded-full mb-3 backdrop-blur-md">
                            <Download size={32} />
                        </div>
                        <span className="font-bold tracking-wide uppercase text-sm">Download PDF</span>
                    </div>

                    {/* Badge Label (Opsional, jika ingin tetap ada penanda tipe di pojok) */}
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider shadow-sm border border-white/20 group-hover:opacity-0 transition-opacity">
                        {book.type}
                    </div>
                </a>

                {/* Efek Bayangan/Glow di Bawah Kartu */}
                <div className="absolute -inset-4 bg-rl-navy/20 blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
                
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </main>
  );
}