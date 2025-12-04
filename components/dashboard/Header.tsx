"use client";
import { Menu, ChevronLeft, ShieldCheck, Sun, Moon } from "lucide-react";

type HeaderProps = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (v: boolean) => void;
  theme: string | undefined;
  setTheme: (t: string) => void;
  mounted: boolean;
};

export default function Header({ isSidebarOpen, setIsSidebarOpen, theme, setTheme, mounted }: HeaderProps) {
  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 z-40 transition-colors duration-300">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 hidden md:block transition-colors"
        >
          {isSidebarOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
        </button>
        <span className="md:hidden font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <ShieldCheck size={20} className="text-blue-500"/> SIPAL
        </span>
      </div>

      <div className="flex items-center gap-3">
        <button 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-yellow-400 hover:scale-110 transition-transform"
        >
          {mounted && theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
}