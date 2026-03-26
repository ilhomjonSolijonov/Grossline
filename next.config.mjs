/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: "/css/:path*", destination: "/mirror/css/:path*" },
      { source: "/js/:path*", destination: "/mirror/js/:path*" },
      { source: "/images/:path*", destination: "/mirror/images/:path*" },
      { source: "/fonts/:path*", destination: "/mirror/fonts/:path*" },
      { source: "/ru", destination: "/mirror/index.html" },
      { source: "/ru/:slug", destination: "/mirror/:slug.html" }
    ];
  }
};

export default nextConfig;
