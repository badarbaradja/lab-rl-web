"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PenTool, Calendar, CheckCircle2, AlertCircle, Clock, Layers, Cpu } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext"; 

// =================================================================================
// 1. LINK DATABASE (MASUKKAN LINK DRIVE ANDA DI SINI SATU KALI SAJA)
// =================================================================================
// Format: [ID_MODUL]: "LINK_GDRIVE"
const LINK_DATABASE: Record<number, string> = {
  // --- FTE (101 - 106) ---
  101: "https://drive.google.com/drive/folders/1hzx3mqVHRh6fZUls5I1apWZRndMvleeS?usp=sharing", 
  102: "https://drive.google.com/drive/folders/1QeFfHHE2eNR7gNDg-hUH8vJLe6O2b_IA?usp=sharing",
  103: "https://drive.google.com/drive/folders/16txQbAfO9cIM-0h5rnCCEK9pejqDxWaC?usp=sharing", // Masukkan link
  104: "https://drive.google.com/drive/folders/1lJIe6Ljx_51MXUwHe1fzNENPqJwzN3QF?usp=sharing", // Masukkan link
  105: "https://drive.google.com/drive/folders/1bl_rk2CltvYNlujENWkILZehvYn3gDiL?usp=sharing", // Masukkan link
  106: "https://drive.google.com/drive/folders/1zSZi30aCbv4rTW6kke6GCnKnPLfv8JNV?usp=sharing", // Masukkan link

  // --- TE (201 - 212) ---
  201: "https://drive.google.com/drive/folders/1yw6SN87KA5jIjAcZDO7wBel3euCMAZRH?usp=sharing",
  202: "https://drive.google.com/drive/folders/1MIkNwt09xsQiW3NL6nzF7c6GuYwGdnu0?usp=sharing", // Masukkan link
  203: "https://drive.google.com/drive/folders/1bC4OvS77wkWXZsq-3GbBYvQhHBEsSza9?usp=sharing",
  204: "https://drive.google.com/drive/folders/1ryEbmqTg-RD1OPpS1CEoel9NQV2GUUZW?usp=sharing",
  205: "https://drive.google.com/drive/folders/1qIHy1j8PBpXz2mVhBAZBxP3iOQSv6ZcV?usp=sharing",
  206: "https://drive.google.com/drive/folders/1bYALExgXvvj97ZwZm9pyBeM34niqq5Dy?usp=sharing",
  207: "https://drive.google.com/drive/folders/15rNmcX-FYlxERlTmuaYYuuPfw1igwWlA?usp=sharing",
  208: "https://drive.google.com/drive/folders/1-rdO452XMuPMoBa5bF-Z4eV7I4PkltgI?usp=sharing",
  209: "https://drive.google.com/drive/folders/1diAz2wZ8glk7M7O5fOHMSs31LGkhpacA?usp=sharing",
  210: "https://drive.google.com/drive/folders/1N8psJBp_w5PDhuBQCOtooo4z-YAT8FBQ?usp=sharing",
  211: "#",
  212: "#",
};

// =================================================================================
// 2. DATA TERJEMAHAN (TEKS SAJA)
// =================================================================================
const tpData = {
  id: {
    FTE: [
      { id: 101, week: "Minggu 1 - 2", title: "Modul 1: Pengenalan, Pembacaan, dan Pengukuran Komponen", desc: "Multimeter, Resistor, Kapasitor, Induktor.", status: "done" },
      { id: 102, week: "Minggu 3 - 4", title: "Modul 2: Rangkaian Arus Searah", desc: "Mengukur arus, tegangan serta resistansi menggunakan multimeter.", status: "done" },
      { id: 103, week: "Minggu 5 - 6", title: "Modul 3: Teorema Thevenin dan Norton", desc: "Menentukan tegangan dan arus pada rangkaian pengganti Thevenin dan Norton.", status: "done" },
      { id: 104, week: "Minggu 7 - 8", title: "Modul 4: Impedansi dan Fungsi Transfer", desc: "Definisi Impedansi dan Fungsi Transfer.", status: "done" },
      { id: 105, week: "Minggu 9 - 10", title: "Modul 5: Resonansi", desc: "Rangkaian resonansi seri, paralel, dan seri paralel.", status: "active" }, 
      { id: 106, week: "Minggu 11 - 12", title: "Modul 6: Teorema Kutub Empat", desc: "Parameter Z, Y, H, dan Transmisi (ABCD).", status: "upcoming" },
    ],
    TE: [
      { id: 201, week: "Minggu 1", title: "Modul 1: Pembacaan dan Pengukuran Resistor", desc: "Multimeter, Resistor, Kapasitor, Induktor.", status: "done" },
      { id: 202, week: "Minggu 2", title: "Modul 2: Pengukuran Besaran Arus dan Tegangan", desc: "Mengoperasikan sumber tegangan DC dan multimeter.", status: "done" },
      { id: 203, week: "Minggu 3", title: "Modul 3: Pengenalan Aplikasi Circuit Simulator", desc: "Menggunakan aplikasi circuit simulator.", status: "done" },
      { id: 204, week: "Minggu 4", title: "Modul 4: Teorema Substitusi dan Superposisi", desc: "Membuktikan teorema substitusi dan superposisi dengan komponen resistor sumber DC.", status: "done" },
      { id: 205, week: "Minggu 5", title: "Modul 5: Teorema Thevenin, Norton, dan TDM", desc: "Tegangan dan arus pada rangkaian pengganti Thevenin, Norton dan TDM.", status: "done" },
      { id: 206, week: "Minggu 6", title: "Modul 6: Pengukuran Kapasitor & Induktor (AC)", desc: "Menghitung nilai tegangan bolak-balik dari sumber AC menggunakan multimeter dan osiloskop.", status: "done" },
      { id: 207, week: "Minggu 7", title: "Modul 7: Pengukuran Arus, Tegangan, Impedansi (AC)", desc: "Mengoperasikan alat ukur osiloskop dan function generator.", status: "done" },
      { id: 208, week: "Minggu 8", title: "Modul 8: Rangkaian Filter Sederhana RL & RC", desc: "Perbedaan gelombang rangkaian differensiator dan integrator.", status: "done" }, 
      { id: 209, week: "Minggu 9", title: "Modul 9: Resonansi dan Pengukuran Bandwidth", desc: "Rangkaian resonansi seri, paralel dan seri paralel.", status: "active" }, 
      { id: 210, week: "Minggu 10", title: "Modul 10: Rangkaian Kutub Empat", desc: "Analisis rangkaian kutub empat.", status: "upcoming" },
    ]
  },
  en: {
    FTE: [
      { id: 101, week: "Week 1 - 2", title: "Module 1: Introduction, Reading, and Measuring Components", desc: "Multimeter, Resistor, Capacitor, Inductor.", status: "done" },
      { id: 102, week: "Week 3 - 4", title: "Module 2: Direct Current Circuits", desc: "Measuring current, voltage, and resistance using a multimeter.", status: "done" },
      { id: 103, week: "Week 5 - 6", title: "Module 3: Thevenin and Norton Theorems", desc: "Determining voltage and current in Thevenin and Norton equivalent circuits.", status: "done" },
      { id: 104, week: "Week 7 - 8", title: "Module 4: Impedance and Transfer Function", desc: "Definition of Impedance and Transfer Function.", status: "done" },
      { id: 105, week: "Week 9 - 10", title: "Module 5: Resonance", desc: "Series, parallel, and series-parallel resonance circuits.", status: "active" },
      { id: 106, week: "Week 11 - 12", title: "Module 6: Two-Port Network Theorem", desc: "Z, Y, H, and Transmission (ABCD) Parameters.", status: "upcoming" },
    ],
    TE: [
      { id: 201, week: "Week 1", title: "Module 1: Resistor Reading and Measurement", desc: "Multimeter, Resistor, Capacitor, Inductor.", status: "done" },
      { id: 202, week: "Week 2", title: "Module 2: Current and Voltage Measurement", desc: "Operating DC voltage source and multimeter.", status: "done" },
      { id: 203, week: "Week 3", title: "Module 3: Introduction to Circuit Simulator App", desc: "Using circuit simulator applications.", status: "done" },
      { id: 204, week: "Week 4", title: "Module 4: Substitution and Superposition Theorems", desc: "Proving substitution and superposition theorems with resistor components and DC source.", status: "done" },
      { id: 205, week: "Week 5", title: "Module 5: Thevenin, Norton, and Maximum Power Transfer", desc: "Voltage and current in Thevenin, Norton, and MPPT equivalent circuits.", status: "done" },
      { id: 206, week: "Week 6", title: "Module 6: Capacitor and Inductor Measurement in AC Circuits", desc: "Calculating AC voltage values from AC source using multimeter and oscilloscope.", status: "done" },
      { id: 207, week: "Week 7", title: "Module 7: AC Current, Voltage, and Impedance Measurement", desc: "Operating oscilloscope and function generator.", status: "done" },
      { id: 208, week: "Week 8", title: "Module 8: Simple Filter Circuits on RL and RC Circuits", desc: "Wave differences in differentiator and integrator circuits occurring in RL and RC circuits.", status: "done" },
      { id: 209, week: "Week 9", title: "Module 9: Resonance and Bandwidth Measurement", desc: "Series, parallel, and series-parallel resonance circuits.", status: "active" },
      { id: 210, week: "Week 10", title: "Module 10: Two-Port Networks", desc: "Z, Y, H, and Transmission (ABCD) Parameters.", status: "upcoming" },
    ]
  },
  ar: {
    FTE: [
      { id: 101, week: "الأسبوع 1 - 2", title: "الوحدة 1: مقدمة وقراءة وقياس المكونات", desc: "المقياس المتعدد، المقاومة، المكثف، المحث.", status: "done" },
      { id: 102, week: "الأسبوع 3 - 4", title: "الوحدة 2: دوائر التيار المستمر", desc: "قياس التيار والجهد والمقاومة باستخدام المقياس المتعدد.", status: "done" },
      { id: 103, week: "الأسبوع 5 - 6", title: "الوحدة 3: نظريات ثيفينين ونورتون", desc: "تحديد الجهد والتيار في الدوائر المكافئة لثيفينين ونورتون.", status: "done" },
      { id: 104, week: "الأسبوع 7 - 8", title: "الوحدة 4: المعاوقة ودالة التحويل", desc: "تعريف المعاوقة ودالة التحويل.", status: "done" },
      { id: 105, week: "الأسبوع 9 - 10", title: "الوحدة 5: الرنين", desc: "دوائر الرنين المتسلسلة والمتوازية.", status: "active" },
      { id: 106, week: "الأسبوع 11 - 12", title: "الوحدة 6: نظرية الشبكات ذات المنفذين", desc: "معلمات Z، Y، H، والإرسال (ABCD).", status: "upcoming" },
    ],
    TE: [
      { id: 201, week: "الأسبوع 1", title: "الوحدة 1: قراءة وقياس المقاومة", desc: "المقياس المتعدد، المقاومة، المكثف، المحث.", status: "done" },
      { id: 202, week: "الأسبوع 2", title: "الوحدة 2: قياس التيار والجهد", desc: "تشغيل مصدر الجهد المستمر والمقياس المتعدد.", status: "done" },
      { id: 203, week: "الأسبوع 3", title: "الوحدة 3: مقدمة لتطبيق محاكي الدوائر", desc: "استخدام تطبيقات محاكاة الدوائر.", status: "done" },
      { id: 204, week: "الأسبوع 4", title: "الوحدة 4: نظريات الاستبدال والتراكب", desc: "إثبات نظريات الاستبدال والتراكب باستخدام مكونات المقاومة ومصدر DC.", status: "done" },
      { id: 205, week: "الأسبوع 5", title: "الوحدة 5: ثيفينين، نورتون، ونقل الطاقة القصوى", desc: "الجهد والتيار في الدوائر المكافئة لثيفينين ونورتون وTDM.", status: "done" },
      { id: 206, week: "الأسبوع 6", title: "الوحدة 6: قياس المكثف والمحث في دوائر AC", desc: "حساب قيم الجهد المتردد من مصدر AC باستخدام المقياس المتعدد وراسم الذبذبات.", status: "done" },
      { id: 207, week: "الأسبوع 7", title: "الوحدة 7: قياس التيار والجهد والمعاوقة في AC", desc: "تشغيل راسم الذبذبات ومولد الدوال.", status: "done" },
      { id: 208, week: "الأسبوع 8", title: "الوحدة 8: دوائر التصفية البسيطة في RL و RC", desc: "اختلافات موجة التفاضل والتكامل في دوائر RL و RC.", status: "done" },
      { id: 209, week: "الأسبوع 9", title: "الوحدة 9: الرنين وقياس عرض النطاق", desc: "دوائر الرنين المتسلسلة والمتوازية.", status: "active" },
      { id: 210, week: "الأسبوع 10", title: "الوحدة 10: الشبكات ذات المنفذين", desc: "معلمات Z، Y، H، والإرسال (ABCD).", status: "upcoming" },
    ]
  }
};

export default function TugasPendahuluanPage() {
  const { t, lang } = useLanguage();
  const [activeTab, setActiveTab] = useState<"TE" | "FTE">("TE");

  // Ambil data sesuai bahasa
  const currentData = tpData[lang] ? tpData[lang][activeTab] : [];

  return (
    <main className="min-h-screen bg-rl-light dark:bg-[#050A18] pt-28 pb-20">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-rl-navy dark:text-white mb-4">
            {t.menu_tp}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t.menu_tp_desc}
          </p>
        </div>

        {/* TAB SWITCHER */}
        <div className="flex justify-center mb-12">
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

        {/* Grid TP Cards */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {currentData.map((item) => (
              <motion.div
                key={`${activeTab}-${item.id}-${lang}`} 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`group relative bg-white dark:bg-white/5 border rounded-2xl p-6 transition-all duration-300 hover:shadow-lg ${
                    item.status === 'active' 
                    ? "border-rl-red/50 ring-1 ring-rl-red/20 shadow-[0_0_20px_rgba(211,17,69,0.1)]" 
                    : "border-gray-200 dark:border-white/10"
                }`}
              >
                {/* Badge Status */}
                <div className="flex justify-between items-start mb-4">
                    <span className="flex items-center gap-2 text-xs font-mono text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-white/10 px-3 py-1 rounded-full">
                        <Calendar size={12} /> {item.week}
                    </span>
                    
                    {item.status === 'done' && (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                            <CheckCircle2 size={12} /> {t.schedule_status_done}
                        </span>
                    )}
                    {item.status === 'active' && (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-white bg-rl-red px-2 py-1 rounded-full animate-pulse">
                            <AlertCircle size={12} /> {t.schedule_status_active}
                        </span>
                    )}
                    {item.status === 'upcoming' && (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
                            <Clock size={12} /> {t.schedule_status_upcoming}
                        </span>
                    )}
                </div>

                {/* Content */}
                <h3 className={`text-lg font-bold mb-2 leading-snug ${
                    item.status === 'active' ? "text-rl-red" : "text-rl-navy dark:text-white"
                }`}>
                    {item.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 line-clamp-2">
                    {item.desc}
                </p>
                
                {/* Action Button dengan LINK DATABASE */}
                <a 
                    // AMBIL LINK DARI LINK_DATABASE MENGGUNAKAN ID
                    href={item.status === 'upcoming' ? undefined : LINK_DATABASE[item.id] || "#"}
                    target={item.status === 'upcoming' ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className={`w-full py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                        item.status === 'upcoming'
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed pointer-events-none"
                        : "bg-rl-navy text-white hover:bg-rl-red shadow-lg hover:shadow-rl-red/30 cursor-pointer"
                    }`}
                >
                    {item.status === 'upcoming' ? (
                        <>{t.schedule_status_waiting}</>
                    ) : (
                        <> <PenTool size={16} /> {lang === 'id' ? "Buka Folder TP" : lang === 'ar' ? "فتح مجلد الواجب" : "Open TP Folder"}</>
                    )}
                </a>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </main>
  );
}