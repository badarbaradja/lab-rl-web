"use client";
import { Wallet, DollarSign, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

type FinanceProps = {
  fine: number;
};

export default function FinanceTab({ fine }: FinanceProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <Wallet className="text-green-500" /> Rekapitulasi Keuangan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-10"><DollarSign size={100} /></div>
                <h3 className="text-sm font-bold text-slate-500 uppercase mb-4 tracking-wider">Estimasi Honorarium</h3>
                <div className="flex items-end justify-between relative z-10">
                    <div>
                        <p className="text-4xl font-black text-green-600 dark:text-green-400">Rp 1.250.000</p>
                        <p className="text-xs text-slate-400 mt-2">Bulan Ini (Estimasi)</p>
                    </div>
                </div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-10 text-red-500"><AlertCircle size={100} /></div>
                <h3 className="text-sm font-bold text-slate-500 uppercase mb-4 tracking-wider">Total Denda</h3>
                <div className="flex items-end justify-between relative z-10">
                    <div>
                        <p className="text-4xl font-black text-red-600 dark:text-red-400">Rp {fine.toLocaleString()}</p>
                        <p className="text-xs text-slate-400 mt-2">Akumulasi Semester Ini</p>
                    </div>
                </div>
            </div>
        </div>
    </motion.div>
  );
}