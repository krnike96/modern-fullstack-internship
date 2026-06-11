import { AuthProvider } from './context/AuthContext'

export const metadata = {
  title: 'Student profile Portal',
  description: 'Portal for students',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}