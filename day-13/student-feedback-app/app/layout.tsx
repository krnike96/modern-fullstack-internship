import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Student Feedback App",
  description: "Feedbacks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  );
}
