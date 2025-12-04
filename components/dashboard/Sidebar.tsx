"use client";
import { LayoutDashboard, FileSpreadsheet, Wallet, CalendarDays, LogOut, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

type SidebarProps = {
  isOpen: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userCode: string;
  userName: string;
  userRole: string;
  onLogout: () => void;
};

export default function Sidebar({ isOpen, activeTab, setActiveTab, userCode, userName, userRole, onLogout }: SidebarProps) {
  const menus = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'spreadsheet', label: 'Jadwal Lengkap', icon: FileSpreadsheet },
    { id: 'finance', label: 'Keuangan', icon: Wallet },
    { id: 'calendar', label: 'Agenda', icon: CalendarDays },
  ];

  return (
    <aside className={`${isOpen ? 'w-64' : 'w-20'} bg-slate-900 text-white flex-shrink-0 hidden md:flex flex-col justify-between z-50 shadow-2xl relative transition-all duration-300`}>
      <div className="p-4">
        <div className={`flex items-center gap-3 mb-8 ${!isOpen && 'justify-center'}`}>
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 flex-shrink-0">
            <ShieldCheck size={24} />
          </div>
          {isOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
              <h1 className="text-xl font-bold tracking-tight">SIPAL</h1>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider">Assistant System</p>
            </motion.div>
          )}
        </div>

        <nav className="space-y-2">
          {menus.map((menu) => (
            <button 
              key={menu.id}
              onClick={() => setActiveTab(menu.id)} 
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${activeTab === menu.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' : 'text-slate-400 hover:bg-white/5 hover:text-white'} ${!isOpen && 'justify-center'}`}
              title={menu.label}
            >
              <menu.icon size={20} className="flex-shrink-0" />
              {isOpen && <span className="font-medium text-sm whitespace-nowrap">{menu.label}</span>}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-slate-800 bg-slate-950/30">
        {isOpen && (
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-sm font-bold shadow-inner border border-white/10">
              {userCode.substring(0,2)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate text-white">{userName}</p>
              <p className="text-xs text-slate-400 truncate">{userRole}</p>
            </div>
          </div>
        )}
        <button 
          onClick={onLogout}
          className={`w-full flex items-center justify-center gap-2 px-0 py-2.5 rounded-lg border border-slate-700 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/50 transition-all text-xs font-bold text-slate-400 ${!isOpen && 'border-0'}`}
          title="Keluar"
        >
          <LogOut size={18} /> {isOpen && "KELUAR"}
        </button>
      </div>
    </aside>
  );
}