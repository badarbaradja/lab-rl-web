"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// --- KAMUS BAHASA (DICTIONARY) ---
const dictionary = {
  id: {
    // Navbar
    nav_home: "Beranda",
    nav_modul: "Modul",
    nav_asisten: "Asisten",
    nav_jadwal: "Jadwal",
    
    // Hero Section
    hero_badge: "Open Recruitment 2025",
    hero_title: "Masa Depan",
    hero_subtitle: "Rangkaian Listrik",
    hero_desc: "Platform terintegrasi Laboratorium Rangkaian Listrik Universitas Telkom. Akses modul, jadwal, dan asisten dengan pengalaman digital baru.",
    hero_btn_start: "Mulai Praktikum",
    hero_btn_rule: "Tata Tertib",
    hero_card_assistant: "Asisten Jaga",
    hero_card_week: "Minggu ke-",
    
    // Menu Grid
    menu_title: "Menu Praktikan",
    menu_subtitle: "Akses cepat kebutuhan praktikum Anda di sini.",
    menu_tata_tertib: "Tata Tertib",
    menu_tata_tertib_desc: "Aturan & ketentuan praktikum yang wajib dipatuhi.",
    menu_modul: "Modul Praktikum",
    menu_modul_desc: "Unduh modul PDF untuk mempelajari materi mingguan.",
    menu_tp: "Tugas Pendahuluan",
    menu_tp_desc: "Lihat dan kerjakan soal tugas pendahuluan (TP).",
    menu_video: "Video Pembelajaran",
    menu_video_desc: "Tonton video penjelasan visual setiap percobaan.",

    // Gallery
    gallery_title: "Life at Lab RL",
    gallery_desc: "Intip keseruan dan suasana kondusif kegiatan praktikum serta riset di Laboratorium Rangkaian Listrik.",
    gallery_badge: "Dokumentasi 2025/2026",

    // Footer
    footer_desc: "Wadah pengembangan kompetensi mahasiswa Telkom University dalam bidang elektronika dan rangkaian listrik dengan standar industri modern.",
    footer_menu: "Menu Utama",
    footer_contact: "Hubungi Kami",
    footer_address: "Gedung TULT 10.07 & 10.06, Telkom University, Bandung, Indonesia.",
    footer_rights: "© 2025 Lab Rangkaian Listrik. All rights reserved.",

    // --- HALAMAN JADWAL ---
    schedule_title: "Timeline Praktikum",
    schedule_desc: "Jadwal kegiatan praktikum Laboratorium Rangkaian Listrik Periode 2025.",
    schedule_tab_te: "Teknik Elektro (12 Modul)",
    schedule_tab_fte: "FTE Lainnya (6 Modul)",
    schedule_type_event: "Event",
    schedule_type_practicum: "Praktikum",
    schedule_type_exam: "Ujian",
    schedule_type_final: "Final",
    schedule_type_mandatory: "Wajib",
    schedule_status_done: "SELESAI",
    schedule_status_active: "BERLANGSUNG",
    schedule_status_upcoming: "SEGERA",
    schedule_status_waiting: "Belum Tersedia",

    // --- HALAMAN MODUL ---
    module_title: "Repository Modul",
    module_desc: "Silakan pilih program studi Anda untuk mengunduh modul yang sesuai.",
    module_btn_download: "Download PDF",

    // --- HALAMAN ASISTEN ---
    asisten_title: "Tim Asisten",
    asisten_desc: "Siap membantu praktikan dalam memahami materi dan menjalankan praktikum dengan lancar.",
    asisten_search: "Cari asisten...",
    asisten_role_coord: "Koordinator",
    asisten_role_member: "Asisten Lab",

    // --- HALAMAN TATA TERTIB ---
    rules_title: "Tata Tertib Praktikum",
    rules_desc: "Seluruh praktikan wajib membaca dan mematuhi aturan yang berlaku.",
    rules_warning_title: "Penting!",
    rules_warning_desc: "Pelanggaran terhadap tata tertib dapat mengakibatkan pengurangan nilai, pengeluaran dari laboratorium, hingga diskualifikasi.",
    rules_section_before: "Sebelum Praktikum",
    rules_section_during: "Selama Praktikum",
    rules_btn_open: "Buka Dokumen Lengkap (PDF)",
    rules_list_before: [
      "Datang tepat waktu (toleransi keterlambatan 15 menit).", 
      "Mengenakan seragam kuliah rapi & jas lab terkancing.", 
      "Membawa Tugas Pendahuluan (TP) yang sudah dikerjakan.", 
      "Membawa kartu praktikum & alat tulis."
    ],
    rules_list_during: [
      "Dilarang makan, minum, dan merokok di dalam lab.", 
      "Menjaga kebersihan meja dan alat praktikum.", 
      "Dilarang memindahkan alat tanpa izin asisten.", 
      "HP harap disilent/dimatikan."
    ],

    // --- HALAMAN VIDEO ---
    video_title: "Video Pembelajaran",
    video_desc: "Kumpulan video panduan praktikum dan materi Rangkaian Listrik untuk membantu pemahaman Anda.",
    video_search: "Cari video...",
    video_views: "x ditonton",
  },
  
  en: {
    // Navbar
    nav_home: "Home",
    nav_modul: "Modules",
    nav_asisten: "Assistants",
    nav_jadwal: "Schedule",

    // Hero Section
    hero_badge: "Open Recruitment 2025",
    hero_title: "Future of",
    hero_subtitle: "Electrical Circuit",
    hero_desc: "Integrated platform of Electrical Circuit Laboratory Telkom University. Access modules, schedules, and assistants with a new digital experience.",
    hero_btn_start: "Start Practicum",
    hero_btn_rule: "Rules & Regulations",
    hero_card_assistant: "Assistant on Duty",
    hero_card_week: "Week-",

    // Menu Grid
    menu_title: "Student Menu",
    menu_subtitle: "Quick access to your practicum needs here.",
    menu_tata_tertib: "Rules & Regulations",
    menu_tata_tertib_desc: "Mandatory rules and regulations for practicum.",
    menu_modul: "Practicum Modules",
    menu_modul_desc: "Download PDF modules to study weekly materials.",
    menu_tp: "Preliminary Assignment",
    menu_tp_desc: "View and complete weekly preliminary assignments (TP).",
    menu_video: "Learning Videos",
    menu_video_desc: "Watch visual explanation videos for each experiment.",

    // Gallery
    gallery_title: "Life at Lab RL",
    gallery_desc: "Peek into the excitement and conducive atmosphere of practicum and research activities at the Electrical Circuit Laboratory.",
    gallery_badge: "Documentation 2025/2026",

    // Footer
    footer_desc: "A place for Telkom University students to develop competence in electronics and electrical circuits with modern industrial standards.",
    footer_menu: "Main Menu",
    footer_contact: "Contact Us",
    footer_address: "TULT 10.07 & 10.06 Building, Telkom University, Bandung, Indonesia.",
    footer_rights: "© 2025 Electrical Circuit Lab. All rights reserved.",

    // --- SCHEDULE PAGE ---
    schedule_title: "Practicum Timeline",
    schedule_desc: "Schedule of Electrical Circuit Laboratory practicum activities for 2025.",
    schedule_tab_te: "Electrical Eng. (12 Modules)",
    schedule_tab_fte: "Other FTE (6 Modules)",
    schedule_type_event: "Event",
    schedule_type_practicum: "Practicum",
    schedule_type_exam: "Exam",
    schedule_type_final: "Final",
    schedule_type_mandatory: "Mandatory",
    schedule_status_done: "DONE",
    schedule_status_active: "ONGOING",
    schedule_status_upcoming: "UPCOMING",
    schedule_status_waiting: "Not Available",

    // --- MODULE PAGE ---
    module_title: "Module Repository",
    module_desc: "Please select your study program to download the appropriate modules.",
    module_btn_download: "Download PDF",

    // --- ASSISTANT PAGE ---
    asisten_title: "Assistant Team",
    asisten_desc: "Ready to help students understand materials and run practicums smoothly.",
    asisten_search: "Search assistant...",
    asisten_role_coord: "Coordinator",
    asisten_role_member: "Lab Assistant",

    // --- RULES PAGE ---
    rules_title: "Rules & Regulations",
    rules_desc: "All students must read and comply with the rules applicable in the Laboratory.",
    rules_warning_title: "Important!",
    rules_warning_desc: "Violation of rules may result in grade reduction, expulsion from the laboratory, or disqualification.",
    rules_section_before: "Before Practicum",
    rules_section_during: "During Practicum",
    rules_btn_open: "Open Full Document (PDF)",
    rules_list_before: [
      "Arrive on time (15 minutes late tolerance).", 
      "Wear neat college attire & buttoned lab coat.", 
      "Bring completed Preliminary Assignment (TP).", 
      "Bring practicum card & stationery."
    ],
    rules_list_during: [
      "No eating, drinking, or smoking inside the lab.", 
      "Keep the table and practicum tools clean.", 
      "Do not move tools without assistant permission.", 
      "Mobile phones must be silenced/turned off."
    ],

    // --- VIDEO PAGE ---
    video_title: "Learning Videos",
    video_desc: "Collection of practicum guides and Electrical Circuit materials to help your understanding.",
    video_search: "Search video...",
    video_views: "x views",
  },

  ar: {
    // Navbar
    nav_home: "الرئيسية",
    nav_modul: "وحدات",
    nav_asisten: "المساعدون",
    nav_jadwal: "الجدول",

    // Hero Section
    hero_badge: "التوظيف المفتوح 2025",
    hero_title: "مستقبل",
    hero_subtitle: "الدوائر الكهربائية",
    hero_desc: "منصة متكاملة لمختبر الدوائر الكهربائية بجامعة تيلكوم. الوصول إلى الوحدات والجداول والمساعدين بتجربة رقمية جديدة.",
    hero_btn_start: "بدء العملي",
    hero_btn_rule: "القواعد",
    hero_card_assistant: "مساعد مناوب",
    hero_card_week: "الأسبوع-",

    // Menu Grid
    menu_title: "قائمة الطلاب",
    menu_subtitle: "وصول سريع إلى احتياجاتك العملية هنا.",
    menu_tata_tertib: "القواعد واللوائح",
    menu_tata_tertib_desc: "القواعد واللوائح الإلزامية للعملي.",
    menu_modul: "وحدات العملي",
    menu_modul_desc: "تنزيل وحدات PDF لدراسة المواد الأسبوعية.",
    menu_tp: "الواجب الأولي",
    menu_tp_desc: "عرض وإكمال الواجبات الأولية الأسبوعية.",
    menu_video: "فيديوهات تعليمية",
    menu_video_desc: "شاهد مقاطع فيديو توضيحية مرئية لكل تجربة.",

    // Gallery
    gallery_title: "الحياة في مختبر RL",
    gallery_desc: "ألق نظرة على الإثارة والجو الملائم لأنشطة العملي والبحث في مختبر الدوائر الكهربائية.",
    gallery_badge: "توثيق 2025/2026",

    // Footer
    footer_desc: "مكان لطلاب جامعة تيلكوم لتطوير الكفاءة في الإلكترونيات والدوائر الكهربائية بمعايير صناعية حديثة.",
    footer_menu: "القائمة الرئيسية",
    footer_contact: "اتصل بنا",
    footer_address: "مبنى TULT 10.07 & 10.06، جامعة تيلكوم، باندونغ، إندونيسيا.",
    footer_rights: "© 2025 مختبر الدوائر الكهربائية. جميع الحقوق محفوظة.",

    // --- SCHEDULE PAGE ---
    schedule_title: "الجدول الزمني",
    schedule_desc: "جدول أنشطة العملي لمختبر الدوائر الكهربائية لعام 2025.",
    schedule_tab_te: "هندسة كهربائية (12 وحدات)",
    schedule_tab_fte: "تخصصات أخرى (6 وحدات)",
    schedule_type_event: "حدث",
    schedule_type_practicum: "عملي",
    schedule_type_exam: "امتحان",
    schedule_type_final: "نهائي",
    schedule_type_mandatory: "إلزامي",
    schedule_status_done: "مكتمل",
    schedule_status_active: "جارٍ",
    schedule_status_upcoming: "قادم",
    schedule_status_waiting: "غير متاح",

    // --- MODULE PAGE ---
    module_title: "مستودع الوحدات",
    module_desc: "يرجى اختيار برنامجك الدراسي لتنزيل الوحدات المناسبة.",
    module_btn_download: "تنزيل PDF",

    // --- ASSISTANT PAGE ---
    asisten_title: "فريق المساعدين",
    asisten_desc: "جاهزون لمساعدة الطلاب في فهم المواد وتشغيل العملي بسلاسة.",
    asisten_search: "بحث عن مساعد...",
    asisten_role_coord: "منسق",
    asisten_role_member: "مساعد مختبر",

    // --- RULES PAGE ---
    rules_title: "القواعد واللوائح",
    rules_desc: "يجب على جميع الطلاب قراءة والامتثال للقواعد المعمول بها في المختبر.",
    rules_warning_title: "مهم!",
    rules_warning_desc: "قد يؤدي انتهاك القواعد إلى خصم الدرجات أو الطرد من المختبر أو الاستبعاد.",
    rules_section_before: "قبل العملي",
    rules_section_during: "أثناء العملي",
    rules_btn_open: "فتح المستند الكامل (PDF)",
    rules_list_before: [
      "الوصول في الوقت المحدد (سماح بالتأخير 15 دقيقة).", 
      "ارتداء ملابس جامعية أنيقة ومعطف مختبر بأزرار.", 
      "إحضار الواجب الأولي (TP) المكتمل.", 
      "إحضار بطاقة العملي والقرطاسية."
    ],
    rules_list_during: [
      "ممنوع الأكل والشرب والتدخين داخل المختبر.", 
      "الحفاظ على نظافة الطاولة وأدوات العملي.", 
      "ممنوع نقل الأدوات دون إذن المساعد.", 
      "يجب صمت/إيقاف تشغيل الهواتف المحمولة."
    ],

    // --- VIDEO PAGE ---
    video_title: "فيديوهات تعليمية",
    video_desc: "مجموعة من أدلة العملي ومواد الدوائر الكهربائية لمساعدتك في الفهم.",
    video_search: "بحث عن فيديو...",
    video_views: "مشاهدة",
  }
};

// --- CONTEXT SETUP ---
type LangKey = "id" | "en" | "ar";
type LanguageContextType = {
  lang: LangKey;
  setLang: (lang: LangKey) => void;
  t: typeof dictionary["id"];
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<LangKey>("id");

  useEffect(() => {
    if (lang === "ar") {
      document.documentElement.dir = "rtl";
      document.documentElement.lang = "ar";
    } else {
      document.documentElement.dir = "ltr";
      document.documentElement.lang = lang;
    }
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: dictionary[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}