/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com', // <--- PENTING: Izinkan domain ini
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com', // Ini buat foto asisten fallback tadi
      },
    ],
  },
};

export default nextConfig;