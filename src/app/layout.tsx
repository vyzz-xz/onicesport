import type { Metadata } from "next";
import { Figtree } from "next/font/google"; // Removed Inter
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { cn } from "@/lib/utils";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Onic Esport",
  description: "Official landing page for Onic Esport team.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-black" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={cn(
          "min-h-screen bg-black font-body text-foreground antialiased selection:bg-primary selection:text-black",
          figtree.variable
        )}>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
