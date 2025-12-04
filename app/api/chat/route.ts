import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const API_KEY = process.env.GEMINI_API_KEY;

const SYSTEM_PROMPT = `
Kamu adalah "Assistant Lab RL".
Tugas: Membantu praktikan Lab Rangkaian Listrik Telkom University.

ATURAN FORMATTING (PENTING):
1. Gunakan tanda bintang dua (**) untuk menebalkan poin penting.
2. Jangan berikan link panjang. Cukup sebutkan nama OA Line-nya.

ATURAN JAWABAN:
1. IZIN (Sakit/Hadir/5K):
   - Arahkan ke OA Line: https://line.me/ti/p/@jit0659i
   - Katakan "Silakan lapor ke OA Sealabs".

2. KOMPLAIN NILAI:
   - Arahkan ke OA Line: https://line.me/ti/p/@kss3173p
   - Katakan "Silakan hubungi OA RL Laboratory".

3. Pertanyaan Materi:
   - Jawab singkat, padat, jelas.

Jawablah dengan bahasa Indonesia yang santai tapi sopan.
`;

export async function POST(req: Request) {
  try {
    // --- DEBUGGING LOGS (Cek di Vercel Logs) ---
    console.log("1. Memulai request AI...");
    console.log("2. Cek API Key:", API_KEY ? "Ada (Terdeteksi)" : "TIDAK ADA (NULL)");
    
    if (!API_KEY) {
      throw new Error("API Key tidak ditemukan di Environment Variables Vercel");
    }

    const { message } = await req.json();
    console.log("3. Pesan user:", message);

    const genAI = new GoogleGenerativeAI(API_KEY);
    // Gunakan model flash yang gratis dan cepat
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `${SYSTEM_PROMPT}\n\nUser: ${message}\nAssistant:`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log("4. Berhasil dapat respon dari Google");
    return NextResponse.json({ text });

  } catch (error: any) {
    // Log error detail agar kelihatan di Vercel
    console.error("!!! ERROR BACKEND !!!", error);
    
    return NextResponse.json(
      { error: error.message || "Terjadi kesalahan internal server" }, 
      { status: 500 }
    );
  }
}