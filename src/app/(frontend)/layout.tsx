import type { Metadata, Viewport } from "next";
import "../globals.css";

export const viewport: Viewport = {
  themeColor: "#4A148C",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Otolaryngology Head & Neck 3D Simulation Models | ProGuide",
  description:
    "ProGuide by KnowledgeBridge International: 3D temporal bone, paranasal sinus and larynx simulation models, hands-on ENT workshops and training courses.",
  icons: {
    icon: "/images/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased font-sans text-ink bg-white min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
