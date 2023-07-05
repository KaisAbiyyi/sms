import './globals.css'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="w-[100vw] h-[100vh] bg-slate-100">
          {children}
        </div>
      </body>
    </html>
  )
}
