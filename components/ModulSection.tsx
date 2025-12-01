"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BookOpen, FileText, PenTool, PlayCircle, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext"; // Import Hook Bahasa

export default function MenuGrid() {
  const { t } = useLanguage(); // Ambil kamus bahasa (t)

  // Definisikan menu di dalam komponen agar bisa akses 't'
  const menus = [
    {
      title: t.menu_tata_tertib,
      desc: t.menu_tata_tertib_desc,
      icon: FileText,
      href: "/tata-tertib",
      color: "bg-orange-500",
      gradient: "from-orange-500 to-red-500"
    },
    {
      title: t.menu_modul,
      desc: t.menu_modul_desc,
      icon: BookOpen,
      href: "/modul",
      color: "bg-blue-600",
      gradient: "from-blue-600 to-cyan-500"
    },
    {
      title: t.menu_tp,
      desc: t.menu_tp_desc,
      icon: PenTool,
      href: "/tugas-pendahuluan",
      color: "bg-purple-600",
      gradient: "from-purple-600 to-pink-500"
    },
    {
      title: t.menu_video,
      desc: t.menu_video_desc,
      icon: PlayCircle,
      href: "https://www.youtube.com/@laboratoriumrangkaianlistr1117",
      color: "bg-red-600",
      gradient: "from-red-600 to-rose-500"
    },
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-[#050A18] relative">
      <div className="container mx-auto px-6">
        
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-rl-navy dark:text-white mb-2">
            {t.menu_title} {/* Judul Dinamis */}
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            {t.menu_subtitle} {/* Deskripsi Dinamis */}
          </p>
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {menus.map((item, index) => (
            <Link key={index} href={item.href} className="block group">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="relative h-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Background Gradient on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                {/* Icon Box */}
                <div className={`w-14 h-14 rounded-xl ${item.color} flex items-center justify-center text-white shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon size={28} />
                </div>

                {/* Text Content */}
                <h3 className="text-xl font-bold text-rl-navy dark:text-white mb-2 group-hover:text-rl-red transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
                  {item.desc}
                </p>

                {/* Arrow Bottom */}
                <div className="absolute bottom-6 right-6 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 rtl:right-auto rtl:left-6 rtl:translate-x-2"> {/* Support RTL untuk bahasa Arab */}
                  <div className={`p-2 rounded-full ${item.color} text-white`}>
                    <ArrowRight size={16} className="rtl:rotate-180" /> {/* Panah berbalik jika Arab */}
                  </div>
                </div>

              </motion.div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}