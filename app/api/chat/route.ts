import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// PENTING: Set timeout maksimal untuk Vercel (10 detik)
export const maxDuration = 10;

export async function POST(req: Request) {
  try {
    // 1. VALIDASI API KEY DENGAN LOGGING AMAN
    const apiKey = process.env.GEMINI_API_KEY;
    
    console.log("=== DEBUG INFO ===");
    console.log("Env Check:", {
      hasKey: !!apiKey,
      keyLength: apiKey?.length || 0,
      keyPrefix: apiKey?.substring(0, 10) || "NONE"
    });

    // CEK APAKAH API KEY ADA
    if (!apiKey) {
      console.error("❌ GEMINI_API_KEY tidak ditemukan di environment variables");
      return NextResponse.json(
        { 
          error: "Server Configuration Error",
          details: "API Key tidak terkonfigurasi. Hubungi administrator.",
          hint: "Periksa Environment Variables di Vercel Dashboard"
        }, 
        { status: 500 }
      );
    }

    // CEK FORMAT API KEY (Harus dimulai dengan "AIza")
    if (!apiKey.startsWith("AIza")) {
      console.error("❌ Format API Key salah - harus dimulai dengan 'AIza'");
      return NextResponse.json(
        { 
          error: "Invalid API Key Format",
          details: "API Key tidak valid. Format harus dimulai dengan 'AIza'"
        }, 
        { status: 500 }
      );
    }

    // 2. VALIDASI REQUEST BODY
    let body;
    try {
      body = await req.json();
    } catch (parseError) {
      console.error("❌ JSON Parse Error:", parseError);
      return NextResponse.json(
        { error: "Invalid Request Body", details: "Body harus berformat JSON valid" }, 
        { status: 400 }
      );
    }

    const { message } = body;
    console.log("📨 User Message:", message?.substring(0, 50) + "...");

    if (!message || typeof message !== 'string' || message.trim() === "") {
      return NextResponse.json(
        { error: "Pesan tidak boleh kosong" }, 
        { status: 400 }
      );
    }

    // 3. INISIALISASI GOOGLE AI DENGAN ERROR HANDLING
    let genAI;
    try {
      genAI = new GoogleGenerativeAI(apiKey);
    } catch (initError: any) {
      console.error("❌ Init Error:", initError);
      return NextResponse.json(
        { 
          error: "AI Initialization Failed", 
          details: initError.message 
        }, 
        { status: 500 }
      );
    }
    
    // GUNAKAN MODEL YANG STABIL
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      generationConfig: {
        maxOutputTokens: 500, // Batasi output agar lebih cepat
        temperature: 0.7,
      }
    });

    // 4. SYSTEM PROMPT YANG LEBIH SPESIFIK
    const systemPrompt = `Kamu adalah EREL yang merupakan Assistant Lab Rangkaian Listrik Telkom University. 
Jawab dengan singkat, jelas, dan informatif (maksimal 3-4 kalimat).
Jika ditanya tentang izin/sakit, arahkan ke LINE Seelabs dengan id line  @jit0659i.
Jika komplain nilai, arahkan ke LINE rl-laboratory dengan id line @kss3173p.`;

    const prompt = `${systemPrompt}\n\nUser: ${message}\nAssistant:`;
    
    // 5. PANGGIL API DENGAN TIMEOUT PROTECTION
    console.log("🚀 Mengirim request ke Gemini API...");
    
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error("Request timeout setelah 8 detik")), 8000)
    );

    const apiCallPromise = model.generateContent(prompt);

    const result = await Promise.race([apiCallPromise, timeoutPromise]) as any;
    
    const response = await result.response;
    const text = response.text();

    console.log("✅ Response berhasil:", text.substring(0, 50) + "...");
    
    return NextResponse.json({ text }, { 
      status: 200,
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      }
    });

  } catch (error: any) {
    console.error("!!! CRITICAL ERROR !!!", {
      name: error.name,
      message: error.message,
      stack: error.stack?.substring(0, 200)
    });
    
    // KATEGORISASI ERROR UNTUK USER
    let userMessage = "Terjadi kesalahan pada server AI";
    let statusCode = 500;

    if (error.message?.includes("timeout")) {
      userMessage = "Request timeout. Server sedang sibuk, coba lagi.";
      statusCode = 504;
    } else if (error.message?.includes("API key")) {
      userMessage = "Masalah konfigurasi API Key";
      statusCode = 401;
    } else if (error.message?.includes("quota")) {
      userMessage = "Quota API habis. Hubungi admin.";
      statusCode = 429;
    }
    
    return NextResponse.json(
      { 
        error: userMessage,
        details: error.message,
        type: error.name,
        timestamp: new Date().toISOString()
      }, 
      { status: statusCode }
    );
  }
}