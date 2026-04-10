import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // reactCompiler: true,
  async redirects() {
    return [
      {
        source: "/:lang/blog",
        destination: "/:lang/noticias",
        permanent: true,
      },
      {
        source: "/:lang/blog/:slug",
        destination: "/:lang/noticias/:slug",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "open-sdg.org",
        pathname: "/sdg-translations/assets/img/goals/**",
      },
    ],
  },
};

export default nextConfig;
