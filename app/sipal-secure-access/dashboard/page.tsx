"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

// Import Parser dari file terpisah yang sudah diperbaiki logikanya
import { fetchAndParseSpreadsheet, JadwalItem } from "@/lib/spreadsheet-parser"; 

// Import Komponen UI (Asumsi file-file ini sudah dipisah di folder components/dashboard)
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import OverviewTab from "@/components/dashboard/OverviewTab";
import ScheduleTab from "@/components/dashboard/ScheduleTab";
import FinanceTab from "@/components/dashboard/FinanceTab";
import CalendarTab from "@/components/dashboard/CalendarTab";

const SHEET_EDIT_URL = "https://docs.google.com/spreadsheets/d/1KAofWgy4Z66H74uIQidgR_IgwonSTaf345bX6wj4Z2c/edit";
const START_DATE = new Date('2025-09-29'); 

// Definisi tipe CalendarEvent (Dipindahkan ke sini agar mudah diakses komponen lain)
type CalendarEvent = {
  id: string;
  title: string;
  description: string;
  start_date: string;
  created_by: string;
};

export default function AsistenDashboard() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // State Layout
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  
  // State User
  const [userCode, setUserCode] = useState("");
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");
  
  // State Data
  const [jadwalPribadi, setJadwalPribadi] = useState<JadwalItem[]>([]);
  const [semuaJadwal, setSemuaJadwal] = useState<JadwalItem[]>([]);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [fine, setFine] = useState(0);
  
  // FIX ERROR: Menambahkan state loading
  const [loading, setLoading] = useState(true); 
  
  // State Minggu
  const [currentWeek, setCurrentWeek] = useState(1); // Minggu Absolut

  // Init Data
  useEffect(() => {
    setMounted(true);
    const now = new Date();
    setCurrentTime(now);

    // 1. Hitung Siklus Minggu (Minggu 1 atau 2)
    const diffTime = Math.abs(now.getTime() - START_DATE.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    const absoluteWeek = Math.floor(diffDays / 7) + 1;
    const cycleWeek = absoluteWeek % 2 !== 0 ? 1 : 2;
    setCurrentWeek(absoluteWeek);

    const code = localStorage.getItem("user_code");
    const name = localStorage.getItem("user_name");
    const role = localStorage.getItem("user_role");

    if (!code) {
      router.push("/sipal-secure-access");
      return;
    }
    setUserCode(code);
    setUserName(name || "Asisten");
    setUserRole(role || "Member");
    
    // 2. Load Data
    loadData(code, cycleWeek);
    fetchEvents();

    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    if (confirm("Keluar dari SIPAL?")) {
        localStorage.removeItem("user_code");
        localStorage.removeItem("user_name");
        localStorage.removeItem("user_role");
        router.push("/sipal-secure-access");
    }
  };

  // Fungsi Load Data Menggunakan Parser Terpisah
  const loadData = async (myKode: string, weekCycle: number) => {
      setLoading(true); // <-- Sekarang sudah tidak error
      const data = await fetchAndParseSpreadsheet();
      
      setSemuaJadwal(data);

      // Filter Jadwal Pribadi (Hari Ini & Minggu Ini)
      const daysMap = ["MINGGU", "SENIN", "SELASA", "RABU", "KAMIS", "JUMAT", "SABTU"];
      const todayName = daysMap[new Date().getDay()];

      const mySchedule = data.filter(item => 
          item.kode_asisten === myKode.toUpperCase() && 
          item.hari === todayName &&
          item.minggu === weekCycle
      );

      // Urutkan berdasarkan waktu shift
      mySchedule.sort((a, b) => a.waktu.localeCompare(b.waktu));
      
      setJadwalPribadi(mySchedule);
      setLoading(false); // <-- Sekarang sudah tidak error
  };

  const fetchEvents = async () => {
    try {
        const res = await fetch('/api/events');
        const data = await res.json();
        if (Array.isArray(data)) setEvents(data as CalendarEvent[]);
    } catch (e) {
        console.error("Failed to fetch events", e);
    }
  };

  if (!mounted) return null;

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-900 font-sans overflow-hidden transition-colors duration-300">
      
      <Sidebar 
        isOpen={isSidebarOpen} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        userCode={userCode}
        userName={userName}
        userRole={userRole}
        onLogout={handleLogout}
      />

      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <Header 
          isSidebarOpen={isSidebarOpen} 
          setIsSidebarOpen={setIsSidebarOpen}
          theme={theme}
          setTheme={setTheme}
          mounted={mounted}
        />

        <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar scroll-smooth bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
            <div className="max-w-6xl mx-auto space-y-8 pb-20">
                {/* RENDER KOMPONEN SESUAI TAB */}
                {/* Anda mungkin ingin menampilkan loading state di sini jika data belum siap */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center h-96 text-slate-500 dark:text-slate-400">
                        <svg className="animate-spin h-8 w-8 text-blue-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        <p className="font-bold">Memuat Data Jadwal...</p>
                    </div>
                ) : (
                    <>
                        {activeTab === 'dashboard' && <OverviewTab userCode={userCode} jadwalList={jadwalPribadi} currentTime={currentTime} fine={fine} />}
                        {activeTab === 'spreadsheet' && <ScheduleTab semuaJadwal={semuaJadwal} userCode={userCode} SHEET_EDIT_URL={SHEET_EDIT_URL} />}
                        {activeTab === 'finance' && <FinanceTab fine={fine} />}
                        {activeTab === 'calendar' && <CalendarTab events={events} userCode={userCode} fetchEvents={fetchEvents} />}
                    </>
                )}
            </div>
        </div>
      </main>
    </div>
  );
}