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
      {
        protocol: "https",
        hostname: "be-pendaftaran.trisuladana.com",
        pathname: "/**",
      },
    ],
    domains: ["localhost", "be-ugn.test", "be-pendaftaran.trisuladana.com"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "frame-src 'self' https://www.google.com https://www.gstatic.com https://app.sandbox.midtrans.com https://app.midtrans.com",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://app.sandbox.midtrans.com https://app.midtrans.com",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
