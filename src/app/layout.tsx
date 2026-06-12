import type { Metadata } from "next";
import { Libre_Caslon_Text, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/app-shell";

const libreCaslonText = Libre_Caslon_Text({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-libre-caslon",
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-hanken-grotesk",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Boardroom - Your AI Executive Team",
  description: "Venture VC Executive Dashboard by Nimbus AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${libreCaslonText.variable} ${hankenGrotesk.variable} ${jetbrainsMono.variable} dark`}
    >
      <body className="min-h-screen bg-black text-foreground antialiased font-body">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
