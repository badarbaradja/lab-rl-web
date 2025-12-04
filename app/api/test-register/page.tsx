"use client";
import { useState } from "react";

export default function TestRegister() {
  const [form, setForm] = useState({ 
    code: "", 
    name: "", 
    password: "", 
    role: "ADMIN" // Default role
  });
  const [status, setStatus] = useState("");

  const handleRegister = async () => {
    setStatus("Loading...");
    try {
      const res = await fetch("/api/register-assistant", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || "Gagal registrasi");
      
      setStatus("SUKSES! Akun " + form.code + " berhasil dibuat. Silakan login.");
    } catch (err: any) {
      setStatus("ERROR: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4 border p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Registrasi Asisten (Test Mode)</h1>
        
        <div>
          <label className="block text-sm font-bold mb-1">Kode Asisten</label>
          <input 
            className="w-full border p-2 rounded uppercase" 
            placeholder="Misal: BDR" 
            maxLength={3}
            onChange={e => setForm({...form, code: e.target.value})} 
          />
        </div>

        <div>
          <label className="block text-sm font-bold mb-1">Nama Lengkap</label>
          <input 
            className="w-full border p-2 rounded" 
            placeholder="Nama Asisten" 
            onChange={e => setForm({...form, name: e.target.value})} 
          />
        </div>

        <div>
          <label className="block text-sm font-bold mb-1">Password</label>
          <input 
            className="w-full border p-2 rounded" 
            placeholder="Password Login" 
            type="password" 
            onChange={e => setForm({...form, password: e.target.value})} 
          />
        </div>

        <button 
          onClick={handleRegister} 
          className="w-full bg-blue-600 text-white font-bold py-3 rounded hover:bg-blue-700 transition"
        >
          DAFTARKAN SEKARANG
        </button>

        {status && (
          <div className={`p-3 rounded text-sm font-bold ${status.includes("ERROR") ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}>
            {status}
          </div>
        )}
      </div>
    </div>
  );
}