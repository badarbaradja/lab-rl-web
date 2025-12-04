"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Users, Cpu, Wrench, ShieldCheck, UserCheck } from "lucide-react"; // Import Icons baru
import Image from "next/image"; 
import { useLanguage } from "@/context/LanguageContext"; 

// --- DATA ASISTEN (Tanpa WA) ---
const assistants = [
  { name: "Alfian Ramadhan Munthe ", code: "YAN", role: "INTI", line: "alfianmunthe24", instagram: "alfian.munthe24" },
  { name: "Daniel Parulian", code: "DPR", role: "INTI", line: "xanderfix", instagram: "danielprln76" },
  { name: "Hilaliyah Ayu Faoziyah", code: "HIL", role: "INTI", line: "hilaliyahafzh", instagram: "hilaliyahafzh_" },
  { name: "Mardianah Tanza", code: "NAN", role: "INTI", line: "mardianahtanzaa", instagram: "mardianahtanzaa" },
  { name: "Mahdiya Huda", code: "MHY", role: "INTI", line: "cocomlnn_", instagram: "hudakeleib" },
  { name: "Virgin Virana Paradise", code: "VYN", role: "INTI", line: "vrgnvprds", instagram: "vrgnv.prds_" },
  { name: "Ramzy Fawwaz ", code: "RZY", role: "ADMIN", line: "rmzyfwwz", instagram: "ramzy_fawwaz15" },
  { name: "Mutia Azzahra Rahmadhani", code: "MUT", role: "ADMIN", line: "Mutiar61", instagram: "mutiarrahmadhani" },
  { name: "Muhammad Nur Hidayatullah ", code: "DHO", role: "ADMIN", line: "dhoo05", instagram: "dhoo.xy" },
  { name: "Nabilatul Inayah", code: "NBA", role: "ADMIN", line: "@nabilatulinayah26205", instagram: "nabilatlnayah_" },
  { name: "Myanda Piyay Nabila Putri ", code: "MYN", role: "ADMIN", line: "myndapiyay", instagram: "myndapiyay" },
  { name: "Raissa Sadina Rendra", code: "ROR", role: "ADMIN", line: "raiisdn", instagram: "nrairui" },
  { name: "Muhamad Naufal Jauhar Amjad", code: "NPL", role: "ADMIN", line: "@noppall__", instagram: "noppall__" },
  { name: "Dinda Amalia Lestari", code: "DND", role: "PRAKTIKUM", line: "dindallestari_", instagram: "dindallstari" },
  { name: "Najwa Syafira Firdaus", code: "JUA", role: "PRAKTIKUM", line: "maruxzukky", instagram: "jeisforjua" },
  { name: "Rheira Nisrina Abiyah", code: "RHY", role: "PRAKTIKUM", line: "rheiranisrinaa", instagram: "rheiraa" },
  { name: "Rayhan Imannasywan Akbar", code: "HAN", role: "PRAKTIKUM", line: "Imannasywan27", instagram: "Rayhanakbar._" },
  { name: "Liony Syafitri", code: "ONY", role: "PRAKTIKUM", line: "onnyy_yii", instagram: "liony_sy" },
  { name: "Haifa Mohammad Adam", code: "DAM", role: "PRAKTIKUM", line: "haifaadam", instagram: "haifaadam_" },
  { name: "Sebastian Cahyaputra", code: "SCP", role: "PRAKTIKUM", line: "sozek58", instagram: "scpseb" },
  { name: "Kaysa Adara Karim", code: "KYS", role: "PRAKTIKUM", line: "kaysaspace", instagram: "kaysaa.karimm" },
  { name: "Zaed Al Musthofa", code: "ZAM", role: "PRAKTIKUM", line: "zaedalmusthofa", instagram: "zaedalmusthofa" },
  { name: "Raadhii Tsaqib Rabbanii", code: "RAA", role: "HARDWARE", line: "@raadhii", instagram: "raadhii_tsaq" },
  { name: "Iki Tayuhi", code: "IKI", role: "HARDWARE", line: "@raden_ikitayubi", instagram: "ikitayubi" },
  { name: "Ahzami Muhammad Averous", code: "AVE", role: "HARDWARE", line: "ahzami.averous", instagram: "ahzamiaverous" },
  { name: "Devin Marva Kusuma ", code: "DEV", role: "HARDWARE", line: "devin1345", instagram: "devinmrv" },
  { name: "Keisha Mesmeralda Louis Silalahi", code: "KEI", role: "HARDWARE", line: "keisha_mls", instagram: "keishalouiss" },
  { name: "Badar Zaki Baradja", code: "BDR", role: "HARDWARE", line: "badarbaraja", instagram: "badarbaraja" },
  { name: "Rakha Tantra", code: "AKA", role: "HARDWARE", line: "scrae", instagram: "rakhatantra_" },
  { name: "Haniyah Melati Utomo ", code: "HNY", role: "HARDWARE", line: "haniyah.m.u", instagram: "hmu_han" },
  { name: "Muhammad Raffi Ibrahim", code: "MRA", role: "HARDWARE", line: "raffi560", instagram: "muhrafibr" },
  { name: "Daffa Aryaputra ", code: "DAR", role: "HARDWARE", line: "daffaarya437", instagram: "daryutra_fxs24" },
  { name: "Arria Brata Sena Majid Budiyanto ", code: "SEN", role: "HARDWARE", line: "arrsky", instagram: "arriabs_" },
  { name: "Tasha airyn", code: "RYN", role: "RND", line: "caratland", instagram: "airynatasha" },
  { name: "Nisrina Putri Nadhira ", code: "RIN", role: "RND", line: "pocky55ba7", instagram: "mainlydeara" },
  { name: "Abdurrasyid Ridho", code: "ARD", role: "RND", line: "@ridhoavs", instagram: "aabdridho" },
  { name: "Zahra Ramadhina ", code: "ZAR", role: "RND", line: "zhrxwyt ", instagram: "zhrxwyt " },
  { name: "Agastya Pristyanto", code: "AGS", role: "RND", line: "@agastya.pristyanto", instagram: "agas.wisnu" },
  { name: "Najwa Bilqis Al Khalidah", code: "QIS", role: "RND", line: "bilqis047x", instagram: "najwabilll" },
  { name: "Mutia Maulida", code: "TEA", role: "RND", line: "@mtiiaz_", instagram: "_mutiamlda" },
  { name: "Patar Idaon Situmorang", code: "PIS", role: "RND", line: "pataridaon..", instagram: "pataridaon" },
  { name: "Indah Natalia Nadeak", code: "NDK", role: "RND", line: "indah_nadeak", instagram: "ind_ntlia" },
];

// --- LIST DIVISI & ICON ---
const DIVISIONS = [
  { id: "ALL", label: "Semua", icon: Users },
  { id: "INTI", label: "Pengurus Inti", icon: ShieldCheck },
  { id: "ADMIN", label: "Administrasi", icon: UserCheck },
  { id: "PRAKTIKUM", label: "Praktikum", icon: Wrench },
  { id: "HARDWARE", label: "Hardware", icon: Cpu },
  { id: "RND", label: "R & D", icon: Search }, // Research & Development
];

// --- LOGO ICONS ---
const LineIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.6-.066.02-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.174-.51.432-.6.066-.02.132-.031.199-.031.211 0 .391.09.51.25l2.443 3.317V8.108c0-.345.279-.63.631-.63.346 0 .626.285.626.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M12.003 0C5.381 0 .012 4.706.012 10.5c0 2.633 1.14 5.036 3.029 6.861.455.487.428 1.13.091 1.707-.245.42-.813 1.551-.941 1.868-.078.224-.038.384.093.484.144.108.369.092.651.048 2.723-.591 3.522-1.204 3.737-1.393.18-.161.41-.249.65-.246.883.097 1.791.155 2.682.155 6.622 0 11.99-4.706 11.99-10.5S18.624 0 12.003 0"/>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

export default function AsistenPage() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState(""); 
  const [selectedDivisi, setSelectedDivisi] = useState("ALL"); // State untuk filter divisi

  // Logic Pencarian (Filter by Name, Code, AND Division)
  const filteredAssistants = assistants.filter((ast) => {
    const matchesSearch = ast.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          ast.code.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDivisi = selectedDivisi === "ALL" || ast.role === selectedDivisi;

    return matchesSearch && matchesDivisi;
  });

  return (
    <main className="min-h-screen bg-rl-light dark:bg-[#050A18] pt-28 pb-20">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-10 space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-rl-navy dark:text-white"
          >
            {t.asisten_title}
          </motion.h1>
          <motion.p 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.2 }}
             className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto"
          >
            {t.asisten_desc}
          </motion.p>
        </div>

        {/* --- FILTER & SEARCH BAR --- */}
        <div className="max-w-4xl mx-auto mb-12 space-y-6">
            
            {/* 1. FILTER DIVISI (TAB SCROLLABLE) */}
            <div className="flex justify-center flex-wrap gap-3">
                {DIVISIONS.map((div) => (
                    <button
                        key={div.id}
                        onClick={() => setSelectedDivisi(div.id)}
                        className={`px-5 py-2.5 rounded-full flex items-center gap-2 text-sm font-bold transition-all shadow-sm ${
                            selectedDivisi === div.id
                            ? "bg-rl-navy text-white scale-105 shadow-rl-navy/30"
                            : "bg-white dark:bg-white/5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10"
                        }`}
                    >
                        <div.icon size={16} />
                        {div.label}
                    </button>
                ))}
            </div>

            {/* 2. SEARCH INPUT */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative group max-w-md mx-auto"
            >
                <Search className="absolute left-5 top-4 text-gray-400 w-5 h-5 group-focus-within:text-rl-navy transition-colors rtl:right-5 rtl:left-auto" />
                <input 
                    type="text" 
                    placeholder={t.asisten_search}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-14 pr-6 py-4 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-rl-navy dark:focus:ring-blue-500 dark:text-white transition-all shadow-lg shadow-gray-200/50 dark:shadow-none rtl:pr-14 rtl:pl-6"
                />
            </motion.div>
        </div>

        {/* Grid Asisten */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredAssistants.map((ast) => (
              <motion.div
                key={ast.code}
                layout // Animasi saat filter berubah
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="group relative h-[420px] rounded-2xl overflow-hidden shadow-xl bg-gray-200"
              >
                {/* 1. FOTO BACKGROUND */}
                <div className="absolute inset-0">
                    <Image 
                        src={`/img/${ast.code}.jpg`}
                        alt={ast.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:filter group-hover:grayscale-[20%]"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        onError={(e) => {}}
                    />
                </div>

                {/* 2. GRADIENT OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-rl-navy via-transparent to-transparent opacity-90" />

                {/* 3. INFO ASISTEN */}
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:-translate-y-20 transition-transform duration-300 rtl:text-right">
                    <div className="flex items-center justify-between mb-1 rtl:flex-row-reverse">
                        <h3 className="text-xl font-bold text-white truncate pr-2 rtl:pl-2 rtl:pr-0">{ast.name}</h3>
                        <span className="bg-rl-red text-white text-xs font-bold px-2 py-1 rounded-md shrink-0">
                            {ast.code}
                        </span>
                    </div>
                    {/* Badge Role Kecil */}
                    <div className="flex items-center gap-2 mt-1">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/20 text-white backdrop-blur-sm border border-white/10 uppercase tracking-wide">
                            {ast.role}
                        </span>
                    </div>
                </div>

                {/* 4. TOMBOL KONTAK (Line & IG Saja) */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-white/10 backdrop-blur-md border-t border-white/20">
                    <div className="flex gap-3 justify-center">
                        
                        {/* Line Button */}
                        <a 
                        href={`https://line.me/ti/p/~${ast.line}`} 
                        target="_blank"
                        className="p-3 rounded-xl bg-[#06C755] hover:bg-[#05a546] text-white transition-all hover:scale-110 shadow-lg flex-1 flex justify-center"
                        title="LINE"
                        >
                            <LineIcon />
                        </a>

                        {/* Instagram Button */}
                        {ast.instagram !== "-" && (
                            <a 
                            href={`https://instagram.com/${ast.instagram.replace('@', '')}`} 
                            target="_blank"
                            className="p-3 rounded-xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white transition-all hover:scale-110 shadow-lg flex-1 flex justify-center"
                            title="Instagram"
                            >
                                <InstagramIcon />
                            </a>
                        )}

                    </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {/* Empty State */}
        {filteredAssistants.length === 0 && (
            <div className="text-center py-20 text-gray-500">
                <p>Tidak ditemukan asisten dengan filter tersebut.</p>
            </div>
        )}

      </div>
    </main>
  );
}