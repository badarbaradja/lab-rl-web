import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Ambil Key dari Server Environment (Lebih Aman)
const API_KEY = process.env.GEMINI_API_KEY;

const SYSTEM_PROMPT = `
Kamu adalah "Assistant Lab RL".
Tugas: Membantu praktikan Lab Rangkaian Listrik Telkom University.

ATURAN FORMATTING (PENTING):
1. Gunakan tanda bintang dua (**) untuk menebalkan poin penting. Contoh: **Wajib membawa modul**.
2. Jangan berikan link panjang. Cukup sebutkan nama OA Line-nya.

ATURAN JAWABAN:
1. IZIN (Sakit/Hadir/5K):
   - Arahkan ke OA Line: https://line.me/ti/p/@jit0659i
   - Katakan "Silakan lapor ke OA Sealabs".

2. KOMPLAIN NILAI:
   - Arahkan ke OA Line: https://line.me/ti/p/@kss3173p
   - Katakan "Silakan hubungi OA RL Laboratory".

3. Pertanyaan Materi (Ohm/Thevenin/dll):
   - Jawab singkat, padat, jelas.

Jawablah dengan bahasa Indonesia yang santai tapi sopan.
`;

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!API_KEY) {
      return NextResponse.json({ error: "API Key not configured" }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `${SYSTEM_PROMPT}\n\nUser: ${message}\nAssistant:`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ text });
  } catch (error) {
    console.error("Backend AI Error:", error);
    return NextResponse.json({ error: "Failed to fetch response" }, { status: 500 });
  }
}