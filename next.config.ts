import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  experimental: {
    // Uploads d'images dans le formulaire d'offre (10 x 5 Mo max).
    serverActions: { bodySizeLimit: "55mb" },
  },
};

export default withNextIntl(nextConfig);
