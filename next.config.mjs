/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "sia-globall.test",
        pathname: "/**",
      },
    ],
    domains: ["localhost"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "frame-src 'self' https://www.google.com https://www.gstatic.com;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
