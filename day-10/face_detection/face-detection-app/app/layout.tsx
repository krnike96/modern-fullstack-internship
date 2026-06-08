import type { Metadata } from "next";
import Navbar from "./components/Navbar";

export const metadata: Metadata = {
  title: "Face Detection App",
  description: "Detect face from image",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <html
      lang="en">
      <body style={{ margin: 0, fontFamily: 'sans-serif' }}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
