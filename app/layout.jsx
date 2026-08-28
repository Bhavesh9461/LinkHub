import { Orbitron, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { config } from "@/data/config";
import AppLoader from "@/components/ui/AppLoader";
import BackgroundVideo from "@/components/ui/BackgroundVideo";
import ToasterProvider from "@/components/ui/ToasterProvider";
import { ClerkProvider } from "@clerk/nextjs";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-orbitron",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://linkhub-ten-indol.vercel.app/"),

  title: {
    default: config.siteName,
    template: `%s | ${config.siteName}`,
  },

  description: config.siteDescription,

  icons: {
    icon: [
      { url: "/iconlogo.png", media: "(prefers-color-scheme: light)" },
      { url: "/iconlogo-dark.png", media: "(prefers-color-scheme: dark)" },
    ],
    apple: "/iconlogo2.png",
    shortcut: "/iconlogo2.png",
  },

  openGraph: {
    title: config.siteName,
    description: config.siteDescription,
    url: "https://linkhub-ten-indol.vercel.app/",
    siteName: config.siteName,
    images: [
      {
        url: "/og-image.png",
        width: 1086,
        height: 1448,
        alt: "Bhavesh Kumar",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: config.siteName,
    description: config.siteDescription,
    images: ["/og-image.png"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#55ADF8",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${orbitron.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      >
        <head>
          <link
            rel="preload"
            href="/video/bg.mp4"
            as="video"
            type="video/mp4"
          />
          <link
            rel="preload"
            href="/images/mypic.jpeg"
            as="image"
            type="image/jpeg"
          />
        </head>
        <body className="no-select h-[100svh] overflow-hidden antialiased">
          <AppLoader>
            <div
              id="app-scroll-container"
              className="relative h-[100svh] overflow-y-auto overflow-x-hidden"
            >
              <BackgroundVideo />

              <div className="relative z-10 min-h-full">{children}</div>
            </div>
          </AppLoader>

          <ToasterProvider />
        </body>
      </html>
    </ClerkProvider>
  );
}
