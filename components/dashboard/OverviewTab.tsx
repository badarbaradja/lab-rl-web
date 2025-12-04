"use client";
import { useState, useRef } from "react";
import Webcam from "react-webcam";
import { Camera, RefreshCw, Clock, CalendarCheck, DollarSign, ShieldCheck, AlertCircle, Activity, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type OverviewProps = {
  userCode: string;
  jadwalList: any[]; // Jadwal PRIBADI
  currentTime: Date | null;
  fine: number;
};

export default function OverviewTab({ userCode, jadwalList, currentTime, fine }: OverviewProps) {
  const webcamRef = useRef<Webcam>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "verifying" | "success" | "late">("idle");
  const [lateMinutes, setLateMinutes] = useState(0);

  const handleCapture = () => {
    const activeSchedule = jadwalList[0]; 
    if (!activeSchedule) { alert("Tidak ada jadwal aktif!"); return; }
    
    const imageSrc = webcamRef.current?.getScreenshot();
    setImgSrc(imageSrc || null);
    setStatus("verifying");

    setTimeout(() => {
        const timeMatch = activeSchedule.waktu.match(/(\d{2})[-.:](\d{2})/);
        if (timeMatch) {
            const jadwalMenitTotal = parseInt(timeMatch[1]) * 60 + parseInt(timeMatch[2]);
            const now = new Date();
            const sekarangMenitTotal = now.getHours() * 60 + now.getMinutes();
            if (sekarangMenitTotal > jadwalMenitTotal + 15) {
                setLateMinutes(sekarangMenitTotal - jadwalMenitTotal);
                setStatus("late");
            } else { setStatus("success"); }
        } else { setStatus("success"); }
    }, 1500);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      {/* Header & Stats */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">
            {currentTime ? currentTime.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : "Memuat..."}
          </p>
          <h1 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-white tracking-tight">
            Selamat Siang, {userCode}
          </h1>
        </div>
        <div className="flex items-center gap-3 bg-white dark:bg-slate-800 px-5 py-3 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
          <Clock size={20} className="text-blue-500" />
          <span className="font-mono text-2xl font-bold text-slate-700 dark:text-slate-200 tracking-widest">
            {currentTime ? currentTime.toLocaleTimeString('id-ID', { hour12: false }) : "--:--:--"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Jadwal Pribadi</p>
            <p className="text-3xl font-black text-slate-800 dark:text-white mt-1">{jadwalList.length}</p>
          </div>
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400">
            <CalendarCheck size={24} />
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Total Denda</p>
            <p className="text-3xl font-black text-slate-800 dark:text-white mt-1">Rp {fine.toLocaleString()}</p>
          </div>
          <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center text-red-600 dark:text-red-400">
            <DollarSign size={24} />
          </div>
        </div>
        <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-5 rounded-2xl shadow-lg text-white flex flex-col justify-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform"></div>
          <p className="text-xs text-blue-100 uppercase font-bold relative z-10 tracking-wider">Status Akun</p>
          <div className="flex items-center gap-2 mt-2 relative z-10">
            <ShieldCheck size={20} />
            <span className="font-bold text-lg">Active Verified</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* CAMERA SECTION */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-800 p-1.5 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="bg-slate-950 rounded-[20px] overflow-hidden relative aspect-video group shadow-inner">
              <div className="absolute top-4 left-4 z-20 flex gap-2">
                <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-bold text-white flex items-center gap-2 border border-white/10">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping" />
                  LIVE FEED
                </span>
              </div>
              {!imgSrc ? (
                <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" className="w-full h-full object-cover transform scale-x-[-1]" />
              ) : (
                <img src={imgSrc} alt="Captured" className="w-full h-full object-cover transform scale-x-[-1]" />
              )}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-20 flex justify-center">
                {!imgSrc ? (
                  <button onClick={handleCapture} disabled={jadwalList.length === 0} className="group relative px-8 py-3 bg-white text-black rounded-full font-bold flex items-center gap-3 hover:bg-blue-50 transition-all hover:scale-105 disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-95">
                    <Camera size={20} className="group-hover:text-blue-600 transition-colors" />
                    {jadwalList.length > 0 ? "ABSEN SEKARANG" : "TIDAK ADA JADWAL"}
                  </button>
                ) : (
                  <button onClick={() => { setImgSrc(null); setStatus("idle"); }} className="px-6 py-3 bg-slate-800/80 backdrop-blur-md text-white rounded-full font-bold flex items-center gap-2 hover:bg-slate-700 transition-all border border-slate-600 hover:border-slate-500 active:scale-95">
                    <RefreshCw size={18} /> AMBIL ULANG
                  </button>
                )}
              </div>
            </div>
          </div>
          
          <AnimatePresence>
            {status === 'late' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-red-500/5 border border-red-500/20 p-4 rounded-2xl flex items-start gap-4">
                <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-xl text-red-600 dark:text-red-400 mt-1"><AlertCircle size={20} /></div>
                <div>
                  <h4 className="font-bold text-red-600 dark:text-red-400">Terdeteksi Terlambat!</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Anda terlambat <span className="font-bold">{lateMinutes} menit</span>. Denda akan dihitung.</p>
                </div>
              </motion.div>
            )}
            {status === 'success' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-green-500/5 border border-green-500/20 p-4 rounded-2xl flex items-start gap-4">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-xl text-green-600 dark:text-green-400 mt-1"><CalendarCheck size={20} /></div>
                <div>
                  <h4 className="font-bold text-green-600 dark:text-green-400">Absensi Berhasil!</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Data kehadiran telah tercatat di sistem.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* TIMELINE SECTION */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-700 dark:text-white flex items-center gap-2">
              <Activity size={18} className="text-blue-500" /> Timeline Hari Ini
            </h3>
          </div>
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            {jadwalList.length > 0 ? (
              jadwalList.map((jadwal, index) => (
                <div key={index} className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 relative overflow-hidden group hover:border-blue-400 transition-colors">
                  <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${index === 0 ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-700'}`}></div>
                  <div className="flex justify-between items-start mb-2 pl-3">
                    <span className="font-mono text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded-md">{jadwal.waktu}</span>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${jadwal.peran === 'PENGGANTI' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' : 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'}`}>{jadwal.peran}</span>
                  </div>
                  <div className="pl-3 mt-3">
                    <h4 className="font-black text-slate-800 dark:text-white text-lg leading-none mb-1">{jadwal.shift}</h4>
                    <p className="text-xs text-slate-500 mb-2 font-medium">Kelompok {jadwal.kelompok}</p>
                    <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-700/50 p-2 rounded-lg border border-slate-100 dark:border-slate-700">
                      <MapPin size={14} className="text-purple-500" /><span className="font-semibold">Ruang {jadwal.ruangan}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center">
                <div className="w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center mb-3"><Activity size={24} className="text-slate-400" /></div>
                <p className="font-bold text-slate-600 dark:text-slate-300">Tidak ada jadwal</p>
                <p className="text-xs text-slate-400 mt-1">Anda tidak memiliki jadwal jaga.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}