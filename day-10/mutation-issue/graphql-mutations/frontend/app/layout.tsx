

export default function RootLayout({children}:{children:React.ReactNode}){
  return (
    <div>
      <html>
        <body>
          {children}
        </body>
      </html>
    </div>
  )
}