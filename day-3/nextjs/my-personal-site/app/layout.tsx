import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Niket | Portfolio",
  description: "Personal portfolio of Niket, CS Student and Developer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Shared Layout Navigation */}
        <header>
          <nav>
            <Link href="/">Home</Link> |{" "}
            <Link href="/about">About</Link> |{" "}
            <Link href="/projects">Projects</Link> |{" "}
            <Link href="/contact">Contact</Link>
          </nav>
        </header>
        <hr />

        {/* This is where the specific page content will load */}
        <main>{children}</main>
      </body>
    </html>
  );
}