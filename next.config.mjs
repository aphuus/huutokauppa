/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-3e9dd4ff09044102be30f78a507c651d.r2.dev",
        port: "",
      },
    ],
  },
};

export default nextConfig;
