import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "JWT",
  description: "Prisma + JWT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
