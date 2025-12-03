"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, MapPin, AlertCircle, CheckCircle2, BookOpen, Presentation, Users, Layers, Cpu, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext"; // Import Hook Bahasa

// --- TIPE DATA ---
type EventItem = {
  id: number;
  date: string;
  title: string;
  desc: string;
  status: "done" | "active" | "upcoming";
  type: string; // Tipe dinamis (String biasa karena bisa beda bahasa)
};

export default function JadwalPage() {
  const { t, lang } = useLanguage(); // Gunakan Hook Bahasa
  const [activeTab, setActiveTab] = useState<"FTE" | "TE">("TE");

  // --- DATA JADWAL MULTI-BAHASA (Content Updated) ---
  const eventsData = {
    id: {
      common: [
        // "TOT Eksternal Asisten" DIHAPUS sesuai permintaan
        { id: 2, date: "9 September 2024", title: "Registrasi Praktikum", desc: "Pengambilan jadwal shift dan pembagian kelompok praktikan via Sealabs.", status: "done", type: "Event" }
      ],
      fte: [
        { id: 101, date: "Minggu 1 - 2", title: "Modul 1: Pengenalan, Pembacaan, dan Pengukuran Komponen", desc: "Multimeter, Resistor, Kapasitor, Induktor.", status: "done", type: "Praktikum" },
        { id: 102, date: "Minggu 3 - 4", title: "Modul 2: Rangkaian Arus Searah", desc: "Mengukur arus, tegangan serta resistansi menggunakan multimeter.", status: "done", type: "Praktikum" },
        { id: 103, date: "Minggu 5 - 6", title: "Modul 3: Teorema Thevenin dan Norton", desc: "Menentukan tegangan dan arus pada rangkaian pengganti Thevenin dan Norton.", status: "done", type: "Praktikum" },
        { id: 104, date: "Minggu 7 - 8", title: "Modul 4: Impedansi dan Fungsi Transfer", desc: "Definisi Impedansi dan Fungsi Transfer.", status: "done", type: "Praktikum" },
        { id: 105, date: "Minggu 9 - 10", title: "Modul 5: Resonansi", desc: "Rangkaian resonansi seri, paralel, dan seri paralel.", status: "active", type: "Praktikum" },
        { id: 106, date: "Minggu 11 - 12", title: "Modul 6: Teorema Kutub Empat", desc: "Parameter Z, Y, H, dan Transmisi (ABCD).", status: "upcoming", type: "Praktikum" },
        // OPEN RECRUITMENT 2026 (FTE)
        { id: 199, date: "Januari 2026", title: "Open Recruitment Asisten 2026", desc: "Pendaftaran calon asisten baru laboratorium periode 2026/2027.", status: "upcoming", type: "Recruitment" },
      ],
      te: [
        { id: 201, date: "Minggu 1", title: "Modul 1: Pembacaan dan Pengukuran Resistor", desc: "Multimeter, Resistor, Kapasitor, Induktor.", status: "done", type: "Praktikum" },
        { id: 202, date: "Minggu 2", title: "Modul 2: Pengukuran Besaran Arus dan Tegangan", desc: "Mengoperasikan sumber tegangan DC dan multimeter.", status: "done", type: "Praktikum" },
        { id: 203, date: "Minggu 3", title: "Modul 3: Pengenalan Aplikasi Circuit Simulator", desc: "Menggunakan aplikasi circuit simulator.", status: "done", type: "Praktikum" },
        { id: 204, date: "Minggu 4", title: "Modul 4: Teorema Substitusi dan Superposisi", desc: "Membuktikan teorema substitusi dan superposisi dengan komponen resistor sumber DC.", status: "done", type: "Praktikum" },
        { id: 205, date: "Minggu 5", title: "Modul 5: Teorema Thevenin, Norton, dan TDM", desc: "Tegangan dan arus pada rangkaian pengganti Thevenin dan Norton dan TDM.", status: "done", type: "Praktikum" },
        { id: 206, date: "Minggu 6", title: "Modul 6: Pengukuran Kapasitor dan Induktor pada Rangkaian AC", desc: "Menghitung nilai tegangan bolak-balik dari sumber AC menggunakan multimeter dan osiloskop.", status: "done", type: "Praktikum" },
        { id: 207, date: "Minggu 7", title: "Modul 7: Pengukuran Arus, Tegangan, dan Impedansi pada AC", desc: "Mengoperasikan alat ukur osiloskop dan function generator.", status: "done", type: "Praktikum" },
        { id: 208, date: "Minggu 8", title: "Modul 8: Rangkaian Filter Sederhana RL dan RC", desc: "Perbedaan gelombang rangkaian differensiator dan integrator yang terjadi pada rangkaian RL dan RC.", status: "done", type: "Praktikum" },
        { id: 209, date: "Minggu 9", title: "Modul 9: Resonansi dan Pengukuran Bandwidth", desc: "Rangkaian resonansi seri, paralel dan seri paralel.", status: "done", type: "Praktikum" },
        { id: 210, date: "Minggu 10", title: "Modul 10: Rangkaian Kutub Empat", desc: "Parameter Z, Y, H, dan Transmisi (ABCD).", status: "active", type: "Praktikum" },
        { id: 211, date: "Minggu 11", title: "Asistensi Tugas Besar", desc: "Bimbingan intensif pengerjaan proyek akhir dengan asisten.", status: "upcoming", type: "Wajib" },
        { id: 212, date: "Minggu 12", title: "Final Presentasi Tubes", desc: "Demo alat dan presentasi hasil Tugas Besar di depan Dosen/Asisten.", status: "upcoming", type: "Final" },
        // OPEN RECRUITMENT 2026 (TE)
        { id: 299, date: "Januari 2026", title: "Open Recruitment Asisten 2026", desc: "Pendaftaran calon asisten baru laboratorium periode 2026/2027.", status: "upcoming", type: "Recruitment" },
      ]
    },
    // --- TERJEMAHAN INGGRIS ---
    en: {
      common: [
        { id: 2, date: "Sep 9, 2024", title: "Practicum Registration", desc: "Shift scheduling and group division via Sealabs.", status: "done", type: "Event" }
      ],
      fte: [
        { id: 101, date: "Week 1 - 2", title: "Module 1: Introduction, Reading, and Measuring Components", desc: "Multimeter, Resistor, Capacitor, Inductor.", status: "done", type: "Practicum" },
        { id: 102, date: "Week 3 - 4", title: "Module 2: Direct Current Circuits", desc: "Measuring current, voltage, and resistance using a multimeter.", status: "done", type: "Practicum" },
        { id: 103, date: "Week 5 - 6", title: "Module 3: Thevenin and Norton Theorems", desc: "Determining voltage and current in Thevenin and Norton equivalent circuits.", status: "done", type: "Practicum" },
        { id: 104, date: "Week 7 - 8", title: "Module 4: Impedance and Transfer Function", desc: "Definition of Impedance and Transfer Function.", status: "done", type: "Practicum" },
        { id: 105, date: "Week 9 - 10", title: "Module 5: Resonance", desc: "Series, parallel, and series-parallel resonance circuits.", status: "active", type: "Practicum" },
        { id: 106, date: "Week 11 - 12", title: "Module 6: Two-Port Network Theorem", desc: "Z, Y, H, and Transmission (ABCD) Parameters.", status: "upcoming", type: "Practicum" },
        { id: 199, date: "January 2026", title: "Open Recruitment 2026", desc: "Registration for new lab assistants for 2026/2027 period.", status: "upcoming", type: "Recruitment" },
      ],
      te: [
        { id: 201, date: "Week 1", title: "Module 1: Resistor Reading and Measurement", desc: "Multimeter, Resistor, Capacitor, Inductor.", status: "done", type: "Practicum" },
        { id: 202, date: "Week 2", title: "Module 2: Current and Voltage Measurement", desc: "Operating DC voltage source and multimeter.", status: "done", type: "Practicum" },
        { id: 203, date: "Week 3", title: "Module 3: Introduction to Circuit Simulator App", desc: "Using circuit simulator applications.", status: "done", type: "Practicum" },
        { id: 204, date: "Week 4", title: "Module 4: Substitution and Superposition Theorems", desc: "Proving substitution and superposition theorems with resistor components and DC source.", status: "done", type: "Practicum" },
        { id: 205, date: "Week 5", title: "Module 5: Thevenin, Norton, and Maximum Power Transfer", desc: "Voltage and current in Thevenin, Norton, and MPPT equivalent circuits.", status: "done", type: "Practicum" },
        { id: 206, date: "Week 6", title: "Module 6: Capacitor and Inductor Measurement in AC Circuits", desc: "Calculating AC voltage values from AC source using multimeter and oscilloscope.", status: "done", type: "Practicum" },
        { id: 207, date: "Week 7", title: "Module 7: AC Current, Voltage, and Impedance Measurement", desc: "Operating oscilloscope and function generator.", status: "done", type: "Practicum" },
        { id: 208, date: "Week 8", title: "Module 8: Simple Filter Circuits on RL and RC Circuits", desc: "Wave differences in differentiator and integrator circuits occurring in RL and RC circuits.", status: "done", type: "Practicum" },
        { id: 209, date: "Week 9", title: "Module 9: Resonance and Bandwidth Measurement", desc: "Series, parallel, and series-parallel resonance circuits.", status: "done", type: "Practicum" },
        { id: 210, date: "Week 10", title: "Module 10: Two-Port Networks", desc: "Z, Y, H, and Transmission (ABCD) Parameters.", status: "active", type: "Practicum" },
        { id: 211, date: "Week 11", title: "Final Project Assistance", desc: "Intensive guidance for final project work with assistants.", status: "upcoming", type: "Mandatory" },
        { id: 212, date: "Week 12", title: "Final Presentation", desc: "Tool demo and final project presentation in front of Lecturer/Assistant.", status: "upcoming", type: "Final" },
        { id: 299, date: "January 2026", title: "Open Recruitment 2026", desc: "Registration for new lab assistants for 2026/2027 period.", status: "upcoming", type: "Recruitment" },
      ]
    },
    // --- TERJEMAHAN ARAB ---
    ar: {
      common: [
        { id: 2, date: "9 سبتمبر 2024", title: "تسجيل العملي", desc: "تحديد الجداول وتقسيم المجموعات عبر Sealabs.", status: "done", type: "حدث" }
      ],
      fte: [
        { id: 101, date: "الأسبوع 1 - 2", title: "الوحدة 1: مقدمة وقراءة وقياس المكونات", desc: "المقياس المتعدد، المقاومة، المكثف، المحث.", status: "done", type: "عملي" },
        { id: 102, date: "الأسبوع 3 - 4", title: "الوحدة 2: دوائر التيار المستمر", desc: "قياس التيار والجهد والمقاومة باستخدام المقياس المتعدد.", status: "done", type: "عملي" },
        { id: 103, date: "الأسبوع 5 - 6", title: "الوحدة 3: نظريات ثيفينين ونورتون", desc: "تحديد الجهد والتيار في الدوائر المكافئة لثيفينين ونورتون.", status: "done", type: "عملي" },
        { id: 104, date: "الأسبوع 7 - 8", title: "الوحدة 4: المعاوقة ودالة التحويل", desc: "تعريف المعاوقة ودالة التحويل.", status: "done", type: "عملي" },
        { id: 105, date: "الأسبوع 9 - 10", title: "الوحدة 5: الرنين", desc: "دوائر الرنين المتسلسلة والمتوازية.", status: "active", type: "عملي" },
        { id: 106, date: "الأسبوع 11 - 12", title: "الوحدة 6: نظرية الشبكات ذات المنفذين", desc: "معلمات Z، Y، H، والإرسال (ABCD).", status: "upcoming", type: "عملي" },
        { id: 199, date: "يناير 2026", title: "التوظيف المفتوح 2026", desc: "تسجيل المساعدين الجدد للمختبر لفترة 2026/2027.", status: "upcoming", type: "توظيف" },
      ],
      te: [
        { id: 201, date: "الأسبوع 1", title: "الوحدة 1: قراءة وقياس المقاومة", desc: "المقياس المتعدد، المقاومة، المكثف، المحث.", status: "done", type: "عملي" },
        { id: 202, date: "الأسبوع 2", title: "الوحدة 2: قياس التيار والجهد", desc: "تشغيل مصدر الجهد المستمر والمقياس المتعدد.", status: "done", type: "عملي" },
        { id: 203, date: "الأسبوع 3", title: "الوحدة 3: مقدمة لتطبيق محاكي الدوائر", desc: "استخدام تطبيقات محاكاة الدوائر.", status: "done", type: "عملي" },
        { id: 204, date: "الأسبوع 4", title: "الوحدة 4: نظريات الاستبدال والتراكب", desc: "إثبات نظريات الاستبدال والتراكب باستخدام مكونات المقاومة ومصدر DC.", status: "done", type: "عملي" },
        { id: 205, date: "الأسبوع 5", title: "الوحدة 5: ثيفينين، نورتون، ونقل الطاقة القصوى", desc: "الجهد والتيار في الدوائر المكافئة لثيفينين ونورتون وTDM.", status: "done", type: "عملي" },
        { id: 206, date: "الأسبوع 6", title: "الوحدة 6: قياس المكثف والمحث في دوائر AC", desc: "حساب قيم الجهد المتردد من مصدر AC باستخدام المقياس المتعدد وراسم الذبذبات.", status: "done", type: "عملي" },
        { id: 207, date: "الأسبوع 7", title: "الوحدة 7: قياس التيار والجهد والمعاوقة في AC", desc: "تشغيل راسم الذبذبات ومولد الدوال.", status: "done", type: "عملي" },
        { id: 208, date: "الأسبوع 8", title: "الوحدة 8: دوائر التصفية البسيطة في RL و RC", desc: "اختلافات موجة التفاضل والتكامل في دوائر RL و RC.", status: "done", type: "عملي" },
        { id: 209, date: "الأسبوع 9", title: "الوحدة 9: الرنين وقياس عرض النطاق", desc: "دوائر الرنين المتسلسلة والمتوازية.", status: "done", type: "عملي" },
        { id: 210, date: "الأسبوع 10", title: "الوحدة 10: الشبكات ذات المنفذين", desc: "معلمات Z، Y، H، والإرسال (ABCD).", status: "active", type: "عملي" },
        { id: 211, date: "الأسبوع 11", title: "مساعدة المشروع النهائي", desc: "توجيه مكثف للمشروع النهائي مع المساعدين.", status: "upcoming", type: "إلزامي" },
        { id: 212, date: "الأسبوع 12", title: "العرض النهائي", desc: "عرض الأدوات وتقديم المشروع النهائي أمام المحاضر/المساعد.", status: "upcoming", type: "نهائي" },
        { id: 299, date: "يناير 2026", title: "التوظيف المفتوح 2026", desc: "تسجيل المساعدين الجدد للمختبر لفترة 2026/2027.", status: "upcoming", type: "توظيف" },
      ]
    }
  };

  // Pilih data berdasarkan bahasa aktif
  const currentEvents = [
    ...(eventsData[lang]?.common || []), 
    ...(activeTab === "TE" ? (eventsData[lang]?.te || []) : (eventsData[lang]?.fte || []))
  ];

  return (
    <main className="min-h-screen bg-rl-light dark:bg-[#050A18] pt-28 pb-20 overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Header Dinamis */}
        <div className="text-center mb-10">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-rl-navy dark:text-white mb-4"
          >
            {t.schedule_title}
          </motion.h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t.schedule_desc}
          </p>
        </div>

        {/* TAB SWITCHER Dinamis */}
        <div className="flex justify-center mb-16">
          <div className="p-1 bg-gray-200 dark:bg-white/5 rounded-full inline-flex relative">
            <motion.div 
              className="absolute top-1 bottom-1 bg-white dark:bg-rl-navy rounded-full shadow-md z-0"
              initial={false}
              animate={{ 
                // Logic untuk RTL (Arab) agar slider bergerak benar
                left: lang === 'ar' 
                    ? (activeTab === "TE" ? "50%" : "4px") 
                    : (activeTab === "TE" ? "4px" : "50%"), 
                width: "calc(50% - 4px)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
            <button
              onClick={() => setActiveTab("TE")}
              className={`relative z-10 px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition-colors ${
                activeTab === "TE" ? "text-rl-navy dark:text-white" : "text-gray-500"
              }`}
            >
              <Layers size={16} /> {t.schedule_tab_te}
            </button>
            <button
              onClick={() => setActiveTab("FTE")}
              className={`relative z-10 px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition-colors ${
                activeTab === "FTE" ? "text-rl-navy dark:text-white" : "text-gray-500"
              }`}
            >
              <Cpu size={16} /> {t.schedule_tab_fte}
            </button>
          </div>
        </div>

        {/* TIMELINE CONTAINER */}
        <div className="relative max-w-4xl mx-auto">
          
          {/* GARIS TENGAH (Support RTL) */}
          <div className={`absolute top-0 bottom-0 w-1 bg-gray-200 dark:bg-white/10 rounded-full
             left-6 md:left-1/2 md:-translate-x-1/2
             rtl:right-6 rtl:md:right-1/2 rtl:md:translate-x-1/2 rtl:left-auto
          `}>
            <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-rl-navy via-rl-red to-transparent opacity-50 dark:opacity-80" />
          </div>

          {/* ITEM JADWAL */}
          <div className="space-y-12">
            <AnimatePresence mode="wait">
              {currentEvents.map((item, index) => (
                <motion.div 
                  key={`${activeTab}-${item.id}-${lang}`} // Key unik biar animasi refresh saat ganti bahasa
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className={`relative flex flex-col md:flex-row gap-8 items-center ${
                      index % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  
                  {/* 1. BAGIAN KONTEN (CARD) */}
                  <div className={`flex-1 w-full pl-16 md:pl-0 rtl:pr-16 rtl:pl-0 md:rtl:pr-0`}>
                    <div className={`p-6 rounded-2xl border transition-all duration-300 hover:scale-[1.02] ${
                        item.status === 'active' 
                          ? "bg-white dark:bg-rl-navy/20 border-rl-red/50 shadow-[0_0_30px_rgba(211,17,69,0.15)]" 
                          : item.type === 'Recruitment' || item.type === 'توظيف' 
                            ? "bg-white dark:bg-white/5 border-rl-red border-2 shadow-lg" // Highlight Recruitment
                            : "bg-white dark:bg-white/5 border-gray-200 dark:border-white/10 hover:shadow-xl"
                    }`}>
                      {/* Header Card */}
                      <div className="flex justify-between items-start mb-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              item.type === 'Recruitment' || item.type === 'توظيف' ? 'bg-red-100 text-red-600' :
                              item.type === 'Final' || item.type === 'نهائي' ? 'bg-purple-100 text-purple-600' :
                              item.type === 'Wajib' || item.type === 'Mandatory' || item.type === 'إلزامي' ? 'bg-yellow-100 text-yellow-700' :
                              item.type === 'Event' || item.type === 'حدث' ? 'bg-blue-100 text-blue-600' :
                              'bg-gray-100 text-gray-600'
                          }`}>
                              {item.type}
                          </span>
                          
                          {item.status === 'active' && (
                              <span className="flex items-center gap-1 text-xs font-bold text-rl-red animate-pulse">
                                  <AlertCircle size={12} /> {t.schedule_status_active}
                              </span>
                          )}
                          {item.status === 'done' && (
                               <span className="flex items-center gap-1 text-xs font-bold text-green-500">
                                  <CheckCircle2 size={12} /> {t.schedule_status_done}
                               </span>
                          )}
                          {item.type === 'Recruitment' || item.type === 'توظيف' ? (
                               <span className="flex items-center gap-1 text-xs font-bold text-rl-red">
                                  <Sparkles size={12} /> Special Event
                               </span>
                          ) : null}
                      </div>

                      <h3 className="text-xl font-bold text-rl-navy dark:text-white mb-2">{item.title}</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 leading-relaxed">
                          {item.desc}
                      </p>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-white/10 pt-4">
                          <div className="flex items-center gap-2 font-mono text-xs">
                              <Calendar size={14} className="text-rl-red" />
                              {item.date}
                          </div>
                      </div>
                    </div>
                  </div>

                  {/* 2. TITIK TENGAH (NODE) */}
                  <div className={`absolute w-4 h-4 rounded-full border-4 border-white dark:border-[#050A18] z-10
                      left-6 -translate-x-2 
                      md:left-1/2 md:-translate-x-1/2
                      rtl:right-6 rtl:translate-x-2 rtl:left-auto
                      rtl:md:right-1/2 rtl:md:translate-x-1/2
                  `}>
                      <div className={`w-full h-full rounded-full ${
                          item.type === 'Recruitment' || item.type === 'توظيف' ? "bg-rl-red animate-bounce" :
                          item.status === 'active' ? "bg-rl-red animate-ping" : 
                          item.status === 'done' ? "bg-rl-navy" : "bg-gray-300"
                      }`} />
                      {(item.status === 'active' || item.type === 'Recruitment' || item.type === 'توظيف') && (
                          <div className="absolute inset-0 bg-rl-red rounded-full" />
                      )}
                  </div>

                  {/* 3. SPACER KOSONG */}
                  <div className="flex-1 w-full hidden md:block" />

                </motion.div>
              ))}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </main>
  );
}