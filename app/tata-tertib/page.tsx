"use client";

import { motion } from "framer-motion";
import { FileText, AlertTriangle, ExternalLink, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext"; // Import Hook Bahasa

export default function TataTertibPage() {
  const { t } = useLanguage(); // Ambil Kamus Bahasa
  const pdfLink = "https://drive.google.com/file/d/1iXpETfmcRxtquZ_OVHhithK1nVimgJGw/view?usp=sharing"; 

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-[#050A18] pt-28 pb-20">
      <div className="container mx-auto px-6">
        
        {/* Header Dinamis */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-rl-navy dark:text-white mb-4">
            {t.rules_title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t.rules_desc}
          </p>
        </div>

        {/* Warning Card Dinamis */}
        <div className="max-w-4xl mx-auto mb-12 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700/50 p-6 rounded-2xl flex items-start gap-4 shadow-sm rtl:flex-row-reverse text-left rtl:text-right">
            <div className="p-3 bg-orange-100 dark:bg-orange-800/30 rounded-full text-orange-600 dark:text-orange-400">
               <AlertTriangle size={24} />
            </div>
            <div>
                <h3 className="text-lg font-bold text-orange-800 dark:text-orange-300 mb-1">{t.rules_warning_title}</h3>
                <p className="text-gray-700 dark:text-orange-100/80 leading-relaxed">
                    {t.rules_warning_desc}
                </p>
            </div>
        </div>

        {/* RINGKASAN POIN PENTING (DIAMBIL DARI KAMUS) */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            
            {/* Kolom 1: Sebelum Praktikum */}
            <div className="bg-white dark:bg-white/5 p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm text-left rtl:text-right">
                <h3 className="text-xl font-bold text-rl-navy dark:text-white mb-4 border-b pb-2 border-gray-100 dark:border-white/10">
                    {t.rules_section_before}
                </h3>
                <ul className="space-y-3">
                    {/* MAPPING DARI DATA BAHASA */}
                    {t.rules_list_before.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300 rtl:flex-row-reverse">
                            <CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" />
                            {item}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Kolom 2: Selama Praktikum */}
            <div className="bg-white dark:bg-white/5 p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm text-left rtl:text-right">
                <h3 className="text-xl font-bold text-rl-navy dark:text-white mb-4 border-b pb-2 border-gray-100 dark:border-white/10">
                    {t.rules_section_during}
                </h3>
                <ul className="space-y-3">
                    {/* MAPPING DARI DATA BAHASA */}
                    {t.rules_list_during.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300 rtl:flex-row-reverse">
                            <CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" />
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </div>

        {/* ACTION BUTTON */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex justify-center"
        >
            <a 
                href={pdfLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-rl-navy text-white font-bold rounded-full overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-rl-navy opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10 flex items-center gap-2">
                    <FileText size={20} />
                    {t.rules_btn_open}
                    <ExternalLink size={16} className="opacity-70 rtl:rotate-180" />
                </span>
            </a>
        </motion.div>

      </div>
    </main>
  );
}