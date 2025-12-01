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
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <LanguageProvider> {/* <--- BUNGKUS DENGAN PROVIDER INI */}
            <Navbar />
            {children}
            <ChatWidget />
          </LanguageProvider>
        </ThemeProvider>    
      </body>
    </html>
    
  );
}
