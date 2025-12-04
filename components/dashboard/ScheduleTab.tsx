"use client";
import { useState } from "react";
import { FileSpreadsheet, ExternalLink, Search, Filter } from "lucide-react";
import { motion } from "framer-motion";

// Import tipe dari parser kita
import { JadwalItem } from "@/lib/spreadsheet-parser"; 

type ScheduleProps = {
  semuaJadwal: JadwalItem[];
  userCode: string;
  SHEET_EDIT_URL: string;
};

export default function ScheduleTab({ semuaJadwal, userCode, SHEET_EDIT_URL }: ScheduleProps) {
  const [filterMinggu, setFilterMinggu] = useState<number>(1);
  const [filterHari, setFilterHari] = useState("SENIN");
  const [searchKode, setSearchKode] = useState("");

  const filteredJadwal = semuaJadwal.filter(item => {
    const matchMinggu = item.minggu === filterMinggu;
    // Jika filterHari "SEMUA", tampilkan semua hari, jika tidak cocokkan
    const matchHari = filterHari === "SEMUA" || item.hari === filterHari;
    const matchKode = searchKode === "" || item.kode_asisten.includes(searchKode.toUpperCase());
    
    return matchMinggu && matchHari && matchKode;
  });

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <FileSpreadsheet className="text-green-600" /> Jadwal Lengkap
          </h2>
          <p className="text-slate-500 text-sm mt-1">Data realtime (Minggu 1 & 2)</p>
        </div>
        <a 
          href={SHEET_EDIT_URL} 
          target="_blank" 
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-green-600/20 transition-all"
        >
          <ExternalLink size={16} /> Edit Spreadsheet
        </a>
      </div>

      {/* FILTER BAR */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-4">
        
        {/* Toggle Minggu 1 / 2 */}
        <div className="flex gap-2 bg-slate-100 dark:bg-slate-900 p-1 rounded-lg w-full md:w-fit">
            <button 
                onClick={() => setFilterMinggu(1)}
                className={`flex-1 md:flex-none px-6 py-2 rounded-md text-sm font-bold transition-all ${filterMinggu === 1 ? 'bg-white dark:bg-slate-700 shadow text-blue-600 dark:text-blue-400' : 'text-slate-500'}`}
            >
                Minggu 1 (Ganjil)
            </button>
            <button 
                onClick={() => setFilterMinggu(2)}
                className={`flex-1 md:flex-none px-6 py-2 rounded-md text-sm font-bold transition-all ${filterMinggu === 2 ? 'bg-white dark:bg-slate-700 shadow text-purple-600 dark:text-purple-400' : 'text-slate-500'}`}
            >
                Minggu 2 (Genap)
            </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 flex-1">
                <Search size={18} className="text-slate-400" />
                <input 
                    type="text" 
                    placeholder="Cari Kode (misal: BDR)" 
                    className="bg-transparent outline-none text-sm w-full dark:text-white uppercase"
                    value={searchKode}
                    onChange={(e) => setSearchKode(e.target.value)}
                />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 custom-scrollbar">
                {["SENIN", "SELASA", "RABU", "KAMIS", "JUMAT", "SABTU"].map(hari => (
                    <button
                        key={hari}
                        onClick={() => setFilterHari(hari)}
                        className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                            filterHari === hari 
                            ? "bg-blue-600 text-white shadow-md" 
                            : "bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                        }`}
                    >
                        {hari}
                    </button>
                ))}
            </div>
        </div>
      </div>

      {/* TABEL HASIL */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 font-bold uppercase text-xs">
              <tr>
                <th className="p-4">Minggu</th>
                <th className="p-4">Hari</th>
                <th className="p-4">Shift/Waktu</th>
                <th className="p-4">Kode</th>
                <th className="p-4">Ruangan</th>
                <th className="p-4">Kelompok</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {filteredJadwal.length > 0 ? (
                filteredJadwal.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                    <td className="p-4 text-slate-600 dark:text-slate-400 font-bold text-xs">M-{item.minggu}</td>
                    <td className="p-4 font-bold text-slate-700 dark:text-slate-200">{item.hari}</td>
                    <td className="p-4">
                        <div className="font-bold text-slate-700 dark:text-slate-200">{item.shift}</div>
                        <div className="text-xs text-slate-500 font-mono">{item.waktu}</div>
                    </td>
                    <td className="p-4">
                        <span className={`font-bold px-2 py-1 rounded text-xs ${
                            item.kode_asisten === userCode ? "bg-blue-100 text-blue-700 border border-blue-200" : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                        }`}>
                            {item.kode_asisten}
                        </span>
                    </td>
                    <td className="p-4">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${item.ruangan === 'RL' ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20' : 'text-purple-600 bg-purple-50 dark:bg-purple-900/20'}`}>
                            {item.ruangan}
                        </span>
                    </td>
                    <td className="p-4 text-slate-600 dark:text-slate-300 font-mono">{item.kelompok}</td>
                    <td className="p-4">
                        {item.peran === "PENGGANTI" ? (
                            <span className="text-[10px] font-bold bg-yellow-100 text-yellow-700 px-2 py-1 rounded border border-yellow-200 shadow-sm">
                                PENGGANTI
                            </span>
                        ) : (
                            <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-1 rounded border border-green-200">
                                JAGA
                            </span>
                        )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-slate-400 italic">
                    <div className="flex flex-col items-center gap-2">
                        <Search size={24} className="opacity-50" />
                        <p>Tidak ada jadwal ditemukan.</p>
                        <p className="text-xs">Coba ubah filter Minggu atau Hari.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}