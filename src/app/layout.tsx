import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import InlineScript from "@/components/InlineScript";
import { SITE_URL, profile } from "@/data/site";
import { THEME_INIT_SCRIPT } from "@/lib/theme";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const description =
  "B.Tech Computer Science (AI) student and software developer building practical software powered by AI. Full-stack work with Next.js, Python and PostgreSQL.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${profile.name} — Software Developer`,
    template: `%s | ${profile.name}`,
  },
  description,
  applicationName: `${profile.name} — Portfolio`,
  authors: [{ name: profile.name }],
  creator: profile.name,
  keywords: [
    profile.name,
    "Software Developer",
    "Full-Stack Developer",
    "AI Developer",
    "Next.js",
    "Python",
    "Java",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: `${profile.name} — Portfolio`,
    title: `${profile.name} — Software Developer`,
    description,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — Software Developer`,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0b0e" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

// suppressHydrationWarning is needed because the pre-paint script mutates
// class/style on <html> before hydration, which React would otherwise flag.
//
// `dark` is rendered by the server as well, so the primary (dark) experience
// holds even with JavaScript disabled; the pre-paint script removes the class
// before paint when the visitor has stored a light preference.
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`dark ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <InlineScript html={THEME_INIT_SCRIPT} />
        {/* Scroll reveals are JS-driven; without JS, show everything. */}
        <noscript>
          <style>{`.reveal{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-full flex-col bg-canvas text-ink">
        <a
          href="#home"
          className="sr-only rounded-md bg-accent px-4 py-2 font-medium text-accent-ink focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60]"
        >
          Skip to content
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
