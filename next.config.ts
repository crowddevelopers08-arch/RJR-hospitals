import type { NextConfig } from "next";

/* Common alternative spellings of the two inner pages all land on one canonical URL */
const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/thankyou", destination: "/thank-you", permanent: true },
      { source: "/thank-you.html", destination: "/thank-you", permanent: true },
      { source: "/thanks", destination: "/thank-you", permanent: true },
      { source: "/privacy", destination: "/privacy-policy", permanent: true },
      { source: "/privacy-policy.html", destination: "/privacy-policy", permanent: true },
      { source: "/privacypolicy", destination: "/privacy-policy", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
