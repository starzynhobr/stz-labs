import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/projects/game-xml-translator',
        destination: '/projects/stz-xml-translator',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
