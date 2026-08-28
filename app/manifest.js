import { config } from "@/data/config";

export default function manifest() {
  return {
    name: config.siteName,
    short_name: "LinkHub",
    description: config.siteDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#05060a",
    theme_color: "#55ADF8",
    icons: [
      {
        src: "/og-image.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/og-image.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/og-image.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}