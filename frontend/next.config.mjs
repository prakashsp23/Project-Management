/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ["images.unsplash.com", "unsplash.com", "example.com","github.com"],
    // can specify remote image patterns using the `domains` array
    // domains: ["images.unsplash.com", "unsplash.com"]
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8000/:path*", // Proxy to Backend
      },
    ];
  },
};

export default nextConfig;
