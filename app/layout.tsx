import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider"; 
import Navbar from "@/components/Navbar"; 
import ChatWidget from "@/components/ChatWidget";
import { LanguageProvider } from "@/context/LanguageContext"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lab Rangkaian Listrik",
  description: "Electrical Circuit Laboratory - Telkom University",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      {/* TAMBAHKAN CLASS 'overflow-x-hidden' DI SINI 
         Ini akan menghilangkan scrollbar bawah di seluruh website
      */}
      <body className={`${inter.className} overflow-x-hidden antialiased selection:bg-rl-red selection:text-white`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            <Navbar />
            {children}
            <ChatWidget />
          </LanguageProvider>
        </ThemeProvider>    
      </body>
    </html>
  );
}