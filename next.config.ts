import type { NextConfig } from "next";

const legacyBlogSlugs = [
  "4-nejcastejsi-chyby-kvuli-kterym-lide-neudelaji-zkousku-v-autoskole",
  "autoskola-praha-8-jak-vybrat",
  "autoskola-testy-jak-zvladnout-teoretickou-zkousku",
  "co-komisar-sleduje",
  "co-sleduje-komisar-u-zaverecne-zkousky-v-autoskole",
  "darkovy-poukaz-na-ridicak-smysluplny-darek-ktery-ma-opravdovou-hodnotu",
  "hra-o-preziti-zimni-jizda-prahou-jako-boss",
  "jak-na-bezpecne-rizeni-praha-tipy-a-triky-pro-prahu-8",
  "jak-probiha-autoskola-skupiny-b-bez-stresu",
  "jak-probiha-kurz-v-autoskole-praha-8",
  "kolik-stoji-ridicak-v-roce-2026-v-praze-kompletni-prehled-cen",
  "nejlevnejsi-autoskola-praha-2026",
  "pozor-past-autoskoly-v-praze-jak-nenaletet-na-super-levne-kurzy-a-vybrat-kvalitu",
  "proc-se-v-autoskole-bojim-delat-chyby-a-je-to-normalni",
  "ridicak-na-motorku-priprava",
  "ridicak-skupiny-b-tvoje-cesta-ke-svobode-krok-za-krokem",
  "zdravotni-posudek-k-ridicskemu-opravneni-od-1-1-2026",
  "zlepsete-sve-ridicske-dovednosti-v-praze-8-bezpecne-rizeni-v-praze",
];

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  reactStrictMode: true,
  devIndicators: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      { source: "/autoskola-kladno", destination: "/kladno", permanent: true },
      { source: "/autoskola-statenice", destination: "/statenice", permanent: true },
      { source: "/autoskoly-praha-8", destination: "/strizkov", permanent: true },
      {
        source: "/doplnovaci-jizdy",
        destination: "/kurzy/kondicni-jizdy",
        permanent: true,
      },
      { source: "/motorky", destination: "/kurzy/ridicak-skupina-a", permanent: true },
      {
        source: "/motorky-a2",
        destination: "/kurzy/ridicak-skupina-a2",
        permanent: true,
      },
      {
        source: "/ridicak-na-automat",
        destination: "/kurzy/ridicak-skupina-b-automat",
        permanent: true,
      },
      {
        source: "/ridicak-skupina-b",
        destination: "/kurzy/ridicak-skupina-b",
        permanent: true,
      },
      { source: "/shop", destination: "/cenik", permanent: true },
      { source: "/kampane/jesen", destination: "/cenik", permanent: true },
      { source: "/student/:path*", destination: "/", permanent: true },
      { source: "/admin/:path*", destination: "/", permanent: true },
      { source: "/onboarding/:path*", destination: "/objednavka", permanent: true },
      {
        source: "/dekujeme-za-vyplneni-objednavky",
        destination: "/objednavka",
        permanent: true,
      },
      ...legacyBlogSlugs.map((slug) => ({
        source: `/blog/${slug}`,
        destination: "/blog",
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
