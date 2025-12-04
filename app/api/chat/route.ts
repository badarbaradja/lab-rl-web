import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // 1. CEK API KEY (Debug Log)
    const apiKey = process.env.GEMINI_API_KEY;
    console.log("--- DEBUG START ---");
    console.log("API Key Status:", apiKey ? "✅ Terdeteksi" : "❌ KOSONG/NULL");

    if (!apiKey) {
      return NextResponse.json(
        { error: "FATAL: API Key tidak terbaca oleh Vercel. Pastikan nama variabel 'GEMINI_API_KEY' benar." }, 
        { status: 500 }
      );
    }

    // 2. CEK REQUEST BODY
    const body = await req.json();
    const { message } = body;
    console.log("Pesan User:", message);

    if (!message) {
      return NextResponse.json({ error: "Pesan user kosong" }, { status: 400 });
    }

    // 3. INISIALISASI GOOGLE AI
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // PENTING: Gunakan 'gemini-1.5-flash' (Paling stabil & gratis)
    // Jangan gunakan '2.5' atau nama aneh lain karena akan menyebabkan crash 500.
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // 4. KIRIM KE GOOGLE
    const systemPrompt = `Kamu adalah Assistant Lab RL. Jawab singkat dan jelas.`;
    const prompt = `${systemPrompt}\n\nUser: ${message}\nAssistant:`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log("Respon sukses:", text.slice(0, 20) + "...");
    return NextResponse.json({ text });

  } catch (error: any) {
    console.error("!!! ERROR DETECTED !!!", error);
    
    // INI KUNCINYA: Kirim pesan error asli ke browser agar Anda bisa baca
    return NextResponse.json(
      { 
        error: "Terjadi Error di Server", 
        details: error.message, // Pesan error asli dari Google/Server
        type: error.name 
      }, 
      { status: 500 }
    );
  }
}