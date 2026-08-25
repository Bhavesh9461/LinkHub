/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Local /public assets only — no remote domains needed.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
