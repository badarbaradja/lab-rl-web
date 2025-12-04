"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Eye, EyeOff, Fingerprint, AlertCircle, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function SipalLoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<"code" | "password">("code");
  const [assistantCode, setAssistantCode] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [assistantData, setAssistantData] = useState<any>(null);

  // 1. CEK KODE ASISTEN
  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Cek apakah kode ada di database
      const { data, error } = await supabase
        .from('assistants')
        .select('code, name, role')
        .eq('code', assistantCode.toUpperCase())
        .single();

      if (error || !data) {
        setError("Kode asisten tidak terdaftar.");
        setIsLoading(false);
        return;
      }

      setAssistantData(data); // Simpan data sementara
      setStep("password"); // Lanjut ke input password
    } catch (err) {
      setError("Gagal menghubungi server.");
    } finally {
      setIsLoading(false);
    }
  };

  // 2. CEK PASSWORD MANUAL
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulasi loading biar kerasa "mikir"
    setTimeout(() => {
      if (password === "admin123") {
        // SUKSES
        localStorage.setItem("user_code", assistantCode.toUpperCase());
        localStorage.setItem("user_role", assistantData?.role);
        localStorage.setItem("user_name", assistantData?.name);
        
        router.push("/sipal-secure-access/dashboard");
      } else {
        // GAGAL
        setError("Password salah!");
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen w-full flex bg-gradient-to-br from-blue-950 via-slate-900 to-black relative overflow-hidden">
      
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto flex flex-col justify-center px-6">
        
        {/* Header Logo */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-2xl shadow-blue-500/50">
            <ShieldCheck className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">SIPAL</h1>
          <p className="text-gray-400 text-sm">Sistem Informasi Praktikum Asisten Lab</p>
          <div className="mt-4 px-4 py-2 rounded-full bg-red-500/20 border border-red-500/30 inline-flex items-center gap-2">
            <Fingerprint className="w-4 h-4 text-red-400" />
            <span className="text-xs text-red-300 font-bold">RESTRICTED ACCESS</span>
          </div>
        </motion.div>

        {/* Login Form Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/10"
        >
          <AnimatePresence mode="wait">
            
            {/* STEP 1: KODE */}
            {step === "code" ? (
              <motion.form
                key="code"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleCodeSubmit}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-3">
                    Kode Asisten
                  </label>
                  <input
                    type="text"
                    value={assistantCode}
                    onChange={(e) => setAssistantCode(e.target.value.toUpperCase())}
                    placeholder="Contoh: BDR, YAN"
                    maxLength={3}
                    autoFocus
                    className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-center text-2xl font-bold tracking-widest uppercase"
                  />
                </div>

                {error && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/20 border border-red-500/30">
                    <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                    <p className="text-sm text-red-300">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading || assistantCode.length !== 3}
                  className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/30"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Lanjutkan →"}
                </button>
              </motion.form>
            ) : (
              
              /* STEP 2: PASSWORD */
              <motion.form
                key="password"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handlePasswordSubmit}
                className="space-y-6"
              >
                <div className="text-center mb-4">
                    <p className="text-gray-400 text-sm">Login sebagai</p>
                    <h3 className="text-white font-bold text-xl">{assistantData?.name}</h3>
                    <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded uppercase mt-1 inline-block">{assistantData?.role}</span>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-3">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Masukkan password"
                      autoFocus
                      className="w-full px-4 py-4 pr-12 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/20 border border-red-500/30">
                    <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                    <p className="text-sm text-red-300">{error}</p>
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => { setStep("code"); setPassword(""); setError(""); }}
                    className="px-6 py-4 bg-white/10 text-white rounded-xl font-bold hover:bg-white/20 transition-all"
                  >
                    Kembali
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 shadow-lg shadow-blue-500/30"
                  >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Masuk Dashboard"}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="text-center mt-8">
          <p className="text-xs text-gray-600">
            © 2025 Lab Rangkaian Listrik. Secure Access Only.
          </p>
        </div>
      </div>
    </div>
  );
}