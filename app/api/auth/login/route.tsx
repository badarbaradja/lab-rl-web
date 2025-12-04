import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin"; // Gunakan admin untuk cek database aman
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Pastikan ada JWT_SECRET di .env.local, kalau tidak ada pakai default string
const JWT_SECRET = process.env.JWT_SECRET || "rahasia-dapur-lab-rl-2025";

export async function POST(req: Request) {
  try {
    const { code, password } = await req.json();

    if (!code || !password) {
      return NextResponse.json({ error: "Kode dan Password wajib diisi" }, { status: 400 });
    }

    // 1. Cari data asisten berdasarkan KODE
    // Kita pakai supabaseAdmin agar bisa baca data sensitif (password_hash)
    const { data: assistant } = await supabaseAdmin
      .from("assistants")
      .select("*")
      .eq("code", code.toUpperCase())
      .single();

    if (!assistant) {
      return NextResponse.json({ error: "Kode asisten tidak ditemukan" }, { status: 404 });
    }

    // 2. Cek Password (Bandingkan hash)
    // Ini membandingkan password yang diketik dengan hash di database
    const isValid = await bcrypt.compare(password, assistant.password_hash);
    
    if (!isValid) {
      return NextResponse.json({ error: "Password salah!" }, { status: 401 });
    }

    // 3. (Opsional) Buat Token JWT sendiri jika butuh sesi server-side custom
    const token = jwt.sign(
      { 
        id: assistant.id, 
        code: assistant.code, 
        role: assistant.role 
      },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 4. Sukses
    return NextResponse.json({
      success: true,
      message: "Login berhasil",
      token,
      user: {
        id: assistant.id,
        code: assistant.code,
        name: assistant.name,
        role: assistant.role
      }
    });

  } catch (error: any) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
  }
}