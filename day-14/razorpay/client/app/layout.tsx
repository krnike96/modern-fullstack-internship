import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Razor Pay Demo",
  description: "Razor Pay",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
