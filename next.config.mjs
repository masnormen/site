// @ts-check

/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
!process.env.SKIP_ENV_VALIDATION && (await import("./src/env.mjs"));

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    domains: ["www.notion.so"],
  },
  async rewrites() {
    return [
      {
        source: "/go/:path*",
        destination: "https://go.nourman.com/:path*",
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "SameSite",
            value: "Strict",
          },
        ],
      },
    ];
  },
};
export default config;
