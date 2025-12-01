"use client";

import { useState } from "react"; // <--- TAMBAH IMPORT INI
import { motion, AnimatePresence } from "framer-motion"; // Tambah AnimatePresence
import { Search } from "lucide-react";
import Image from "next/image"; 
import { useLanguage } from "@/context/LanguageContext"; 

// --- DATA ASISTEN ---
const assistants = [
  { name: "Alfian Ramadhan Munthe ", code: "YAN", role: "INTI", wa: "6282216635071", line: "alfianmunthe24", instagram: "alfian.munthe24" },
  { name: "Daniel Parulian", code: "DPR", role: "INTI", wa: "6282297216942", line: "xanderfix", instagram: "danielprln76" },
  { name: "Hilaliyah Ayu Faoziyah", code: "HIL", role: "INTI", wa: "6285800198942", line: "hilaliyahafzh", instagram: "hilaliyahafzh_" },
  { name: "Mardianah Tanza", code: "NAN", role: "INTI", wa: "6281220233976", line: "mardianahtanzaa", instagram: "-" },
  { name: "Mahdiya Huda", code: "MHY", role: "INTI", wa: "62895380055910", line: "cocomlnn_", instagram: "hudakeleib" },
  { name: "Virgin Virana Paradise", code: "VYN", role: "INTI", wa: "6285342762006", line: "vrgnvprds", instagram: "vrgnv.prds_" },
  { name: "Ramzy Fawwaz ", code: "RZY", role: "ADMIN", wa: "6289661804622", line: "rmzyfwwz", instagram: "ramzy_fawwaz15" },
  { name: "Mutia Azzahra Rahmadhani", code: "MUT", role: "ADMIN", wa: "6288746613735", line: "Mutiar61", instagram: "mutiarrahmadhani" },
  { name: "Muhammad Nur Hidayatullah ", code: "DHO", role: "ADMIN", wa: "6288212524030", line: "dhoo05", instagram: "dhoo.xy" },
  { name: "Nabilatul Inayah", code: "NBA", role: "ADMIN", wa: "6285343758509", line: "@nabilatulinayah26205", instagram: "nabilatlnayah_" },
  { name: "Myanda Piyay Nabila Putri ", code: "MYN", role: "ADMIN", wa: "62821214645628", line: "myndapiyay", instagram: "myndapiyay" },
  { name: "Raissa Sadina Rendra", code: "ROR", role: "ADMIN", wa: "6287776314665", line: "raiisdn", instagram: "nrairui" },
  { name: "Muhamad Naufal Jauhar Amjad", code: "NPL", role: "ADMIN", wa: "6282134265233", line: "@noppall__", instagram: "noppall__" },
  { name: "Dinda Amalia Lestari", code: "DND", role: "PRAKTIKUM", wa: "6287760230924", line: "dindallestari_", instagram: "dindallstari" },
  { name: "Najwa Syafira Firdaus", code: "JUA", role: "PRAKTIKUM", wa: "6285326700036", line: "maruxzukky", instagram: "jeisforjua" },
  { name: "Rheira Nisrina Abiyah", code: "RHY", role: "PRAKTIKUM", wa: "6281322749581", line: "rheiranisrinaa", instagram: "rheiraa" },
  { name: "Rayhan Imannasywan Akbar", code: "HAN", role: "PRAKTIKUM", wa: "6281348236756", line: "Imannasywan27", instagram: "Rayhanakbar._" },
  { name: "Liony Syafitri", code: "ONY", role: "PRAKTIKUM", wa: "6281277814821", line: "onnyy_yii", instagram: "liony_sy" },
  { name: "Haifa Mohammad Adam", code: "DAM", role: "PRAKTIKUM", wa: "6281214054509", line: "haifaadam", instagram: "haifaadam_" },
  { name: "Sebastian Cahyaputra", code: "SCP", role: "PRAKTIKUM", wa: "6281946971174", line: "sozek58", instagram: "scpseb" },
  { name: "Kaysa Adara Karim", code: "KYS", role: "PRAKTIKUM", wa: "6282113842513", line: "kaysaspace", instagram: "kaysaa.karimm" },
  { name: "Zaed Al Musthofa", code: "ZAM", role: "PRAKTIKUM", wa: "6281262506078", line: "zaedalmusthofa", instagram: "zaedalmusthofa" },
  { name: "Raadhii Tsaqib Rabbanii", code: "RAA", role: "HARDWARE", wa: "62813162832759", line: "@raadhii", instagram: "raadhii_tsaq" },
  { name: "Iki Tayuhi", code: "IKI", role: "HARDWARE", wa: "6281384495581", line: "@raden_ikitayubi", instagram: "ikitayubi" },
  { name: "Ahzami Muhammad Averous", code: "AVE", role: "HARDWARE", wa: "6281227003965", line: "ahzami.averous", instagram: "ahzamiaverous" },
  { name: "Devin Marva Kusuma ", code: "DEV", role: "HARDWARE", wa: "6282113838563", line: "devin1345", instagram: "devinmrv" },
  { name: "Keisha Mesmeralda Louis Silalahi", code: "KEI", role: "HARDWARE", wa: "6282314440003", line: "keisha_mls", instagram: "keishalouiss" },
  { name: "Badar Zaki Baradja", code: "BDR", role: "HARDWARE", wa: "6287886561627", line: "badarbaraja", instagram: "badarbaraja" },
  { name: "Rakha Tantra", code: "AKA", role: "HARDWARE", wa: "6281316169448", line: "scrae", instagram: "rakhatantra_" },
  { name: "Haniyah Melati Utomo ", code: "HNY", role: "HARDWARE", wa: "6285172389618", line: "haniyah.m.u", instagram: "hmu_han" },
  { name: "Muhammad Raffi Ibrahim", code: "MRA", role: "HARDWARE", wa: "6281211326836", line: "raffi560", instagram: "muhrafibr" },
  { name: "Daffa Aryaputra ", code: "DAR", role: "HARDWARE", wa: "6289603616044", line: "daffaarya437", instagram: "daryutra_fxs24" },
  { name: "Arria Brata Sena Majid Budiyanto ", code: "SEN", role: "HARDWARE", wa: "6285778567720", line: "arrsky", instagram: "arriabs_" },
  { name: "Tasha airyn", code: "Ryn", role: "RND", wa: "628974099972", line: "caratland", instagram: "airynatasha" },
  { name: "Nisrina Putri Nadhira ", code: "RIN", role: "RND", wa: "6285717182043", line: "pocky55ba7", instagram: "mainlydeara" },
  { name: "Abdurrasyid Ridho", code: "ARD", role: "RND", wa: "6281233756624", line: "@ridhoavs", instagram: "aabdridho" },
  { name: "Zahra Ramadhina ", code: "ZAR", role: "RND", wa: "628128659492", line: "zhrxwyt ", instagram: "zhrxwyt " },
  { name: "Agastya Pristyanto", code: "AGS", role: "RND", wa: "628994522840", line: "@agastya.pristyanto", instagram: "agas.wisnu" },
  { name: "Najwa Bilqis Al Khalidah", code: "QIS", role: "RND", wa: "6285715630420", line: "bilqis047x", instagram: "najwabilll" },
  { name: "Mutia Maulida", code: "TEA", role: "RND", wa: "6285870026055", line: "@mtiiaz_", instagram: "_mutiamlda" },
  { name: "Patar Idaon Situmorang", code: "PIS", role: "RND", wa: "6285711813079", line: "pataridaon..", instagram: "pataridaon" },
  { name: "Indah Natalia Nadeak", code: "NDK", role: "RND", wa: "6281268976906", line: "indah_nadeak", instagram: "ind_ntlia" },
];

// --- LOGO ICONS (SVG ASLI) ---
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

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
  const { t } = useLanguage(); // <--- Ambil Kamus Bahasa
  const [searchQuery, setSearchQuery] = useState(""); // <--- State Pencarian

  // Logic Pencarian (Filter by Name or Code)
  const filteredAssistants = assistants.filter((ast) =>
    ast.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ast.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-rl-light dark:bg-[#050A18] pt-28 pb-20">
      <div className="container mx-auto px-6">
        
        {/* Header Dinamis */}
        <div className="text-center mb-16 space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-rl-navy dark:text-white"
          >
            {t.asisten_title} {/* Judul Dinamis */}
          </motion.h1>
          <motion.p 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.2 }}
             className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto"
          >
            {t.asisten_desc} {/* Deskripsi Dinamis */}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 max-w-md mx-auto relative group"
          >
            <Search className="absolute left-5 top-4 text-gray-400 w-5 h-5 group-focus-within:text-rl-navy transition-colors rtl:right-5 rtl:left-auto" />
            <input 
                type="text" 
                placeholder={t.asisten_search} // Placeholder Dinamis
                value={searchQuery} // Binding Value
                onChange={(e) => setSearchQuery(e.target.value)} // Binding onChange
                className="w-full pl-14 pr-6 py-4 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-rl-navy dark:focus:ring-blue-500 dark:text-white transition-all shadow-lg shadow-gray-200/50 dark:shadow-none rtl:pr-14 rtl:pl-6"
            />
          </motion.div>
        </div>

        {/* Grid Asisten */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* GUNAKAN FILTERED LIST */}
          <AnimatePresence>
            {filteredAssistants.map((ast, index) => (
                <motion.div
                key={ast.code}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                className="group relative h-[450px] rounded-2xl overflow-hidden shadow-xl bg-gray-200"
                >
                {/* 1. FOTO BACKGROUND (Next Image) */}
                <div className="absolute inset-0">
                    <Image 
                        src={`/img/${ast.code}.jpg`} // Pastikan ekstensi .jpg
                        alt={ast.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:filter group-hover:grayscale-[20%]"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        onError={(e) => {
                            // Fallback jika error (opsional)
                        }}
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
                    <p className="text-gray-300 text-sm">{ast.role}</p>
                </div>

                {/* 4. TOMBOL KONTAK */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-white/10 backdrop-blur-md border-t border-white/20">
                    <div className="flex gap-2 justify-center">
                        
                        {/* WA Button */}
                        <a 
                        href={`https://wa.me/${ast.wa}`} 
                        target="_blank"
                        className="p-3 rounded-xl bg-[#25D366] hover:bg-[#1faa53] text-white transition-all hover:scale-110 shadow-lg"
                        title="WhatsApp"
                        >
                            <WhatsAppIcon />
                        </a>
                        
                        {/* Line Button */}
                        <a 
                        href={`https://line.me/ti/p/~${ast.line}`} 
                        target="_blank"
                        className="p-3 rounded-xl bg-[#06C755] hover:bg-[#05a546] text-white transition-all hover:scale-110 shadow-lg"
                        title="LINE"
                        >
                            <LineIcon />
                        </a>

                        {/* Instagram Button */}
                        {ast.instagram !== "-" && (
                            <a 
                            href={`https://instagram.com/${ast.instagram.replace('@', '')}`} 
                            target="_blank"
                            className="p-3 rounded-xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white transition-all hover:scale-110 shadow-lg"
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
        
        {/* Empty State jika pencarian tidak ketemu */}
        {filteredAssistants.length === 0 && (
            <div className="text-center py-20 text-gray-500">
                <p>Tidak ditemukan asisten dengan nama "{searchQuery}"</p>
            </div>
        )}

      </div>
    </main>
  );
}