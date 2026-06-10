import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dynamic Route",
  description: "Dynamic Routing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <h1>This is root layout</h1>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

/*
  username/page.tsx
  Nishchal -- hyperlink -- // usrs/Nishchal/blogs/101
  Rahul -- hyperlink -- users/Rahul/blogs/102
  John -- hyperlink

  users/username/page.tsx, blogs/page.tsx
  username & blogid
*/
