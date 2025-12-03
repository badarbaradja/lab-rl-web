"use client";

import { motion } from "framer-motion";

export default function BumperSection() {
  return (
    // Margin 0 agar nempel sempurna
    <section className="relative w-full h-[350px] md:h-[500px] overflow-hidden my-0">
      
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }} // Durasi masuk lebih lambat biar elegan
        className="relative w-full h-full"
      >
        {/* VIDEO PLAYER */}
        <video
          autoPlay
          loop
          muted
          playsInline
          // Object-cover memastikan video memenuhi area tanpa distorsi
          // Object-center memastikan fokus tetap di tengah
          className="absolute top-0 left-0 w-full h-full object-cover object-center"
        >
          <source src="/videos/bumper.mp4" type="video/mp4" />
        </video>

        {/* OVERLAY GELAP: Dikurangi drastis biar video lebih cerah & teks terbaca */}
        {/* Dulu: bg-black/20 -> Sekarang: bg-black/5 (Hampir tidak terlihat, cuma untuk depth) */}
        <div className="absolute inset-0 bg-black/5 mix-blend-overlay" />
        

        {/* --- GRADASI "INVISIBLE SEAM" (SANGAT HALUS) --- */}
        {/* Triknya: Mulai dari warna solid (tanpa /opacity), 
           lalu langsung lompat ke via-.../5 (sangat transparan),
           baru ke transparent.
           Ini membuat efek "luntur" di pinggir saja.
        */}

        {/* GRADASI ATAS (Menyatu dengan Hero) */}
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-rl-light via-rl-light/5 to-transparent dark:from-[#050A18] dark:via-[#050A18]/5" />

        {/* GRADASI BAWAH (Menyatu dengan Menu Grid - Gray-50) */}
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-gray-50 via-gray-50/5 to-transparent dark:from-[#050A18] dark:via-[#050A18]/5" />

        {/* GRADASI SAMPING (Vignette sangat tipis) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10 pointer-events-none" />

        {/* CATATAN: Teks overlay React dihapus karena di dalam video sudah ada teksnya */}

      </motion.div>
    </section>
  );
}