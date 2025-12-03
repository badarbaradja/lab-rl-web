import HeroSection from "@/components/HeroSection";
import ModulSection from "@/components/ModulSection";
import ActivityGallery from "@/components/ActivityGallery";
import Footer from "@/components/Footer";
import BumperSection from "@/components/BumperSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-rl-dark flex flex-col">
      {/* 1. Hero Section (Atas) */}
      <HeroSection />
      <BumperSection />
      {/* 2. Modul Section (Tengah) */}
      <ModulSection />
      {/* 3. Galeri */}
      <ActivityGallery />
      {/* 4. Footer (Bawah) */}
      <Footer />
    </main>
  );
}