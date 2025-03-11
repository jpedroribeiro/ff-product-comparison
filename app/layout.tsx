import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Product Comparison",
  description: "Compare products side by side",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`border-t-4 border-[var(--ff-green)] bg-gradient-to-b from-indigo-100 to-gray-100 bg-fixed`}>{children}</body>
    </html>
  )
}

