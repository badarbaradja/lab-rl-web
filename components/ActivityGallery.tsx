"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Camera } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext"; 

const photos = [
  "/img/gallery/1.jpg",
  "/img/gallery/2.jpg",
  "/img/gallery/3.jpg",
  "/img/gallery/4.jpg", 
  "/img/gallery/5.jpg",
  "/img/gallery/6.jpg",
];

export default function ActivityGallery() {
  const { t } = useLanguage();

  return (
    <section className="py-24 bg-white dark:bg-[#050A18] border-t border-gray-100 dark:border-white/5 overflow-hidden">
      <div className="container mx-auto px-6 mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Header Text (Tetap Support RTL) */}
        <div className="text-center md:text-left rtl:md:text-right">
          <h2 className="text-3xl font-bold text-rl-navy dark:text-white flex items-center gap-3 justify-center md:justify-start rtl:md:justify-start">
            <Camera className="text-rl-red" />
            {t.gallery_title}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-lg">
            {t.gallery_desc}
          </p>
        </div>

        {/* Badge */}
        <div className="px-6 py-2 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm font-semibold text-rl-navy dark:text-white flex items-center gap-2">
           <span>📸</span>
           <span>{t.gallery_badge}</span>
        </div>
      </div>

      {/* INFINITE SCROLLING GALLERY */}
      {/* PERBAIKAN: Tambahkan dir="ltr" di sini agar urutan gambar tidak terbalik saat mode Arab */}
      <div className="relative w-full flex" dir="ltr">
        
        {/* Gradient Fade */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-white dark:from-[#050A18] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-white dark:from-[#050A18] to-transparent z-10" />

        <motion.div
          className="flex gap-6 px-6"
          animate={{ x: ["0%", "-50%"] }} // Gerakan tetap ke kiri (Standard Marquee)
          transition={{ 
            duration: 40, 
            ease: "linear", 
            repeat: Infinity 
          }}
        >
          {/* Render foto 2 kali untuk looping seamless */}
          {[...photos, ...photos].map((src, index) => (
            <div 
              key={index} 
              className="relative w-[300px] h-[200px] md:w-[400px] md:h-[280px] shrink-0 rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
            >
              <Image
                src={src}
                alt={`Kegiatan Lab ${index}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 300px, 400px"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}