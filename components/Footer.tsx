"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Instagram, Linkedin, Youtube } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext"; // Import Hook Bahasa

export default function Footer() {
  const { t } = useLanguage(); // Ambil kamus bahasa (t)

  return (
    <footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-white/10 transition-colors duration-300 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4 col-span-1 md:col-span-2">
            <div className="flex items-center gap-3">
               {/* Logo dengan Background Putih agar terlihat di Dark Mode */}
               <div className="relative w-12 h-12 bg-white rounded-lg p-1 shadow-sm">
                 <Image 
                    src="/img/logo-rl.png" 
                    alt="Logo Lab RL" 
                    fill 
                    className="object-contain"
                 />
               </div>
               <span className="text-xl font-bold text-rl-navy dark:text-white">
                 Rangkaian Listrik
               </span>
            </div>
            
            {/* Deskripsi Dinamis */}
            <p className="text-gray-500 dark:text-gray-400 max-w-sm leading-relaxed text-sm">
              {t.footer_desc} 
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-rl-navy dark:text-white mb-6">
                {t.footer_menu} {/* Judul Menu Dinamis */}
            </h4>
            <ul className="space-y-3">
              {/* Menu Links Dinamis */}
              <li><Link href="/modul" className="footer-link">{t.nav_modul}</Link></li>
              <li><Link href="/jadwal" className="footer-link">{t.nav_jadwal}</Link></li>
              <li><Link href="/asisten" className="footer-link">{t.nav_asisten}</Link></li>
              <li><Link href="/tata-tertib" className="footer-link">{t.menu_tata_tertib}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-rl-navy dark:text-white mb-6">
                {t.footer_contact} {/* Judul Kontak Dinamis */}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-500 dark:text-gray-400">
                <MapPin className="w-5 h-5 text-rl-red shrink-0" />
                <span className="text-sm">{t.footer_address}</span> {/* Alamat Dinamis */}
              </li>
              <li className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                <Mail className="w-5 h-5 text-rl-red shrink-0" />
                <span className="text-sm">labrangkaianlistrikte@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 dark:border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            {t.footer_rights} {/* Copyright Dinamis */}
          </p>
          
          <div className="flex gap-4">
             <Link href="https://www.instagram.com/rangkaianlistriklab/" target="_blank" className="social-icon">
                <Instagram size={18} />
             </Link>
             <Link href="https://share.google/piFNbtufq1RstleMk" target="_blank" className="social-icon">
                <Linkedin size={18} />
             </Link>
             <Link href="https://www.youtube.com/@laboratoriumrangkaianlistr1117" target="_blank" className="social-icon">
                <Youtube size={18} />
             </Link>
          </div>
        </div>
      </div>

      {/* Styles Helper */}
      <style jsx>{`
        .footer-link {
            @apply text-gray-500 dark:text-gray-400 hover:text-rl-red transition-colors text-sm;
        }
        .social-icon {
            @apply p-2 rounded-full bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-rl-navy hover:text-white transition-colors;
        }
      `}</style>
    </footer>
  );
}