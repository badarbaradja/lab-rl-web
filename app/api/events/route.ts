import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin"; 

// GET: Ambil semua event
export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('assistant_events')
      .select('*')
      .order('start_date', { ascending: true });

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST: Tambah event baru
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, start_date, end_date, created_by } = body;

    const { data, error } = await supabaseAdmin
      .from('assistant_events')
      .insert([{ title, description, start_date, end_date, created_by }])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE: Hapus event
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const { error } = await supabaseAdmin
      .from('assistant_events')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ message: "Deleted" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}