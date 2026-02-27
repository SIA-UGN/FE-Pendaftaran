/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.platform === "win32" ? undefined : "standalone",
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
      {
        protocol: "http",
        hostname: "be-ugn.test",
        pathname: "/**",
      },
    ],
    domains: ["localhost", "be-ugn.test"],
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
