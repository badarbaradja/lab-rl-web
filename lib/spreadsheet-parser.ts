// lib/spreadsheet-parser.ts

const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRz0_YZj9vMHTYo3RWJXZMc4TazOkm_XQ4a9wAjlBZVoENs-x-REWIFyleHAPKAN2cOatJ-J9VoGyh5/pub?gid=1324104552&single=true&output=csv";

export type JadwalItem = {
  minggu: number;
  hari: string;
  shift: string;
  waktu: string;
  ruangan: string;
  kelompok: string;
  kode_asisten: string;
  peran: "JAGA" | "PENGGANTI";
};

// Helper Validasi (3 Huruf Kapital)
const isValidAsisten = (str: string) => {
  if (!str) return false;
  const clean = str.trim().toUpperCase();
  // Filter kata-kata sampah yang mungkin terbaca sebagai kode
  const blacklist = ["SEN", "SEL", "RAB", "KAM", "JUM", "SAB", "MIN", "HARI", "SHIFT", "WAKTU", "KEL", "PENGGANTI", "ASISTEN", "LIBUR", "---", "NAN"];
  return clean.length === 3 && /^[A-Z]+$/.test(clean) && !blacklist.includes(clean);
};

export const fetchAndParseSpreadsheet = async (): Promise<JadwalItem[]> => {
  try {
    const response = await fetch(SHEET_CSV_URL, { cache: 'no-store' });
    const text = await response.text();
    const rows = text.split("\n").map(row => row.split(",").map(cell => cell.replace(/\r/g, "").trim()));

    // HAPUS "MINGGU" DARI SINI AGAR TIDAK BENTROK DENGAN "MINGGU PERTAMA"
    const daysMap = ["SENIN", "SELASA", "RABU", "KAMIS", "JUMAT", "SABTU"];
    
    const allData: JadwalItem[] = [];
    let detectedWeek = 1;
    let currentHari = "";

    for (let r = 0; r < rows.length; r++) {
      const rowStr = rows[r].join(" ").toUpperCase();
      const firstCell = rows[r][0]?.toUpperCase();

      // 1. DETEKSI MINGGU (Header Besar)
      if (rowStr.includes("MINGGU PERTAMA")) detectedWeek = 1;
      else if (rowStr.includes("MINGGU KEDUA")) detectedWeek = 2;

      // 2. DETEKSI HARI
      // Cari apakah baris ini mengandung nama hari (SENIN, SELASA...)
      // Syarat: Bukan baris SHIFT
      const foundDay = daysMap.find(day => rowStr.includes(day));
      if (foundDay && !firstCell?.includes("SHIFT")) {
        currentHari = foundDay;
      }

      // 3. DETEKSI DATA SHIFT
      if (firstCell?.includes("SHIFT")) {
        const shiftName = firstCell; 
        
        // Ambil Waktu (Cari pola jam misal 06.30-09.00)
        const timeMatch = rowStr.match(/\((\d{2}[\.\:]\d{2}\s*-\s*\d{2}[\.\:]\d{2})\)/);
        const shiftTime = timeMatch ? timeMatch[1].replace(/:/g, '.') : "";

        // Mapping Baris Relatif
        const rowAsisten = r + 2;   // Baris Asisten Utama
        const rowKelompok = r + 3;  // Baris Kelompok
        const rowPengganti = r + 4; // Baris Pengganti

        // Pastikan tidak error array index out of bound
        if (rowPengganti < rows.length) {
            
            // --- LOOP KOLOM 1 s/d 10 ---
            // B-F (Index 1-5) = RUANG RL
            // G-K (Index 6-10) = RUANG ELKA
            for (let c = 1; c <= 10; c++) {
                const ruangan = c <= 5 ? "RL" : "ELKA"; 

                // Ambil Data Cell
                const codeUtama = rows[rowAsisten]?.[c]?.toUpperCase() || "";
                const codePengganti = rows[rowPengganti]?.[c]?.toUpperCase() || "";
                const kelompok = rows[rowKelompok]?.[c] || "-";

                let finalCode = "";
                let peran: "JAGA" | "PENGGANTI" = "JAGA";

                // LOGIKA PRIORITAS:
                // 1. Jika ada PENGGANTI valid -> Pakai Pengganti
                if (isValidAsisten(codePengganti)) {
                    finalCode = codePengganti;
                    peran = "PENGGANTI";
                } 
                // 2. Jika TIDAK ada pengganti, cek Asisten Utama
                else if (isValidAsisten(codeUtama)) {
                    finalCode = codeUtama;
                    peran = "JAGA";
                }

                // Simpan Data Valid
                if (finalCode) {
                    allData.push({
                        minggu: detectedWeek,
                        hari: currentHari, // Hari ini sudah otomatis ganti saat loop ketemu header SENIN/SELASA/dst
                        shift: shiftName,
                        waktu: shiftTime,
                        ruangan: ruangan,
                        kelompok: kelompok,
                        kode_asisten: finalCode,
                        peran: peran
                    });
                }
            }
        }
      }
    }

    return allData;

  } catch (error) {
    console.error("Error parsing spreadsheet:", error);
    return [];
  }
};