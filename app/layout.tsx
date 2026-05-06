import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Scribe | Fast & Fun Typing Test",
  description:
    "Improve your typing speed with Scribe. A minimalist, high-performance typing test designed for developers and keyboard enthusiasts.",
  openGraph: {
    type: "website",
    title: "Scribe | Fast & Fun Typing Test",
    description:
      "Improve your typing speed with Scribe. A minimalist, high-performance typing test designed for developers and keyboard enthusiasts.",
    images: ["/images/OG.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Scribe | Fast & Fun Typing Test",
    description:
      "Improve your typing speed with Scribe. A minimalist, high-performance typing test designed for developers and keyboard enthusiasts.",
    images: ["/images/OG.png"],

  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
