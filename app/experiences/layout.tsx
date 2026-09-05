export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div lang="en" suppressHydrationWarning>
      {children}
    </div>
  )
}
