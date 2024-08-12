/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['ekysnlflgtyyzfcuhefj.supabase.co'], // 허용된 도메인 추가
  },
};

export default nextConfig;
