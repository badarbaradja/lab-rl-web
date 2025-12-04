"use client";
import { useState } from "react";
import { CalendarDays, Plus, ChevronLeft, ChevronRight, Trash2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Types bisa di-export dari file terpisah jika mau, tapi disini saya define ulang biar simple
type CalendarEvent = {
  id: string;
  title: string;
  description: string;
  start_date: string;
  created_by: string;
};

type CalendarProps = {
  events: CalendarEvent[];
  userCode: string;
  fetchEvents: () => void;
};

export default function CalendarTab({ events, userCode, fetchEvents }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDateForEvent, setSelectedDateForEvent] = useState<Date | null>(null);
  const [newEvent, setNewEvent] = useState({ title: "", description: "", time: "08:00" });

  const getDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const changeMonth = (offset: number) => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));

  const handleDateClick = (day: number) => {
    const selected = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDateForEvent(selected);
    setNewEvent({ title: "", description: "", time: "08:00" });
    setIsModalOpen(true);
  };

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDateForEvent) return;
    const dateTime = new Date(selectedDateForEvent);
    const [hours, minutes] = newEvent.time.split(':');
    dateTime.setHours(parseInt(hours), parseInt(minutes));

    const payload = {
        title: newEvent.title, description: newEvent.description,
        start_date: dateTime.toISOString(), end_date: dateTime.toISOString(),
        created_by: userCode
    };

    const res = await fetch('/api/events', {
        method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(payload)
    });
    if (res.ok) { fetchEvents(); setIsModalOpen(false); }
  };

  const handleDeleteEvent = async (id: string) => {
    if(!confirm("Hapus agenda ini?")) return;
    const res = await fetch(`/api/events?id=${id}`, { method: 'DELETE' });
    if (res.ok) fetchEvents();
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const monthName = currentDate.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <CalendarDays className="text-purple-500" /> Agenda Asisten
            </h2>
            <button onClick={() => { setSelectedDateForEvent(new Date()); setIsModalOpen(true); }} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2"><Plus size={16} /> Tambah Agenda</button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-lg text-slate-800 dark:text-white capitalize">{monthName}</h3>
                    <div className="flex gap-2">
                        <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg dark:text-white"><ChevronLeft size={16}/></button>
                        <button onClick={() => changeMonth(1)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg dark:text-white"><ChevronRight size={16}/></button>
                    </div>
                </div>
                <div className="grid grid-cols-7 gap-2 text-center text-sm mb-2">
                    {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map(d => (<div key={d} className="font-bold text-slate-400 py-2">{d}</div>))}
                </div>
                <div className="grid grid-cols-7 gap-2 text-center text-sm">
                    {Array.from({length: firstDay}).map((_, i) => <div key={`empty-${i}`} />)}
                    {Array.from({length: daysInMonth}, (_, i) => i + 1).map(day => {
                        const dateStr = new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toISOString().split('T')[0];
                        const dayEvents = events.filter(e => e.start_date.startsWith(dateStr));
                        const isToday = new Date().getDate() === day && new Date().getMonth() === currentDate.getMonth() && new Date().getFullYear() === currentDate.getFullYear();
                        return (
                            <div key={day} onClick={() => handleDateClick(day)} className={`min-h-[80px] p-2 rounded-lg cursor-pointer border transition-all flex flex-col items-start gap-1 relative group ${isToday ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/10' : 'border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}>
                                <span className={`text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full ${isToday ? 'bg-blue-600 text-white' : 'text-slate-500 dark:text-slate-400'}`}>{day}</span>
                                <div className="w-full flex flex-col gap-1 overflow-hidden">
                                    {dayEvents.slice(0, 3).map(ev => (<div key={ev.id} className="w-full text-[10px] bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 px-1 rounded truncate text-left">{ev.title}</div>))}
                                </div>
                                <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 text-slate-400"><Plus size={14} /></div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                <h3 className="font-bold mb-4 text-slate-700 dark:text-white">Agenda Bulan Ini</h3>
                <div className="space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
                    {events.filter(e => new Date(e.start_date).getMonth() === currentDate.getMonth()).map(ev => (
                        <div key={ev.id} className="group flex gap-3 items-start bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-slate-100 dark:border-slate-700">
                            <div className="flex-1 min-w-0"><h4 className="font-bold text-slate-800 dark:text-white text-sm truncate">{ev.title}</h4></div>
                            {ev.created_by === userCode && (<button onClick={() => handleDeleteEvent(ev.id)} className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={16} /></button>)}
                        </div>
                    ))}
                </div>
            </div>
        </div>
        <AnimatePresence>
            {isModalOpen && (
                <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
                    <motion.div initial={{scale:0.95}} animate={{scale:1}} exit={{scale:0.95}} className="bg-white dark:bg-slate-800 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
                        <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                            <h3 className="font-bold text-lg dark:text-white">Tambah Agenda</h3>
                            <button onClick={() => setIsModalOpen(false)} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full dark:text-white"><X size={20}/></button>
                        </div>
                        <form onSubmit={handleAddEvent} className="p-6 space-y-4">
                            <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Judul</label><input required className="w-full p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 dark:text-white" value={newEvent.title} onChange={e => setNewEvent({...newEvent, title: e.target.value})} /></div>
                            <button type="submit" className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl">SIMPAN</button>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    </motion.div>
  );
}