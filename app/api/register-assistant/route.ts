import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin"; // <--- PENTING: Pakai supabase-admin
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { code, name, email, password, role, phone, line_id, instagram } = body;

    // Validasi input dasar
    if (!code || !name || !password || !role) {
      return NextResponse.json(
        { error: "Data wajib (Kode, Nama, Password, Role) tidak lengkap" },
        { status: 400 }
      );
    }

    // 1. Cek apakah kode asisten sudah ada
    const { data: existing } = await supabaseAdmin
      .from('assistants')
      .select('code')
      .eq('code', code.toUpperCase())
      .single();

    if (existing) {
      return NextResponse.json(
        { error: "Kode asisten sudah terdaftar" },
        { status: 409 }
      );
    }

    // 2. Hash password (untuk simpan di tabel assistants)
    const passwordHash = await bcrypt.hash(password, 10);

    // 3. Format email internal untuk Supabase Auth
    // Trik: Kita buat email palsu berbasis kode agar user login pakai Kode saja
    const internalEmail = `${code.toLowerCase()}@lab-rl.internal`;

    // 4. Buat user di Supabase Auth (Pakai supabaseAdmin)
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: internalEmail,
      password: password,
      email_confirm: true, // Otomatis verifikasi email
      user_metadata: { name: name, role: role }
    });

    if (authError) {
      console.error("Auth Error:", authError);
      return NextResponse.json(
        { error: "Gagal membuat akun autentikasi: " + authError.message },
        { status: 500 }
      );
    }

    if (!authData.user) {
        return NextResponse.json({ error: "Gagal generate User ID" }, { status: 500 });
    }

    // 5. Insert data lengkap ke tabel assistants
    const { error: dbError } = await supabaseAdmin
      .from('assistants')
      .insert({
        id: authData.user.id, // Sambungkan ID Auth dengan ID Tabel
        code: code.toUpperCase(),
        name,
        email: email || internalEmail, // Simpan email asli atau internal
        password_hash: passwordHash,
        role,
        phone,
        line_id,
        instagram,
        is_active: true,
      });

    if (dbError) {
      console.error("DB Error:", dbError);
      
      // Rollback: Hapus user di Auth jika gagal simpan di Tabel agar tidak nyangkut
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
      
      return NextResponse.json(
        { error: "Gagal menyimpan data ke database" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Registrasi berhasil",
      assistant: {
        code: code.toUpperCase(),
        name: name,
        role: role,
      }
    });

  } catch (error: any) {
    console.error("Registration Server Error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server internal", details: error.message },
      { status: 500 }
    );
  }
}