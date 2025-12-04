// app/sipal-secure-access/layout.tsx

export default function SipalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Di sini kita TIDAK memanggil <Navbar /> atau <Footer /> 
         sehingga halaman dashboard benar-benar bersih.
      */}
      {children}
    </div>
  );
}