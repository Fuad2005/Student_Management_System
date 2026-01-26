import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ThemeInitializer from '@/components/ThemeInitializer';
import Sidebar from "@/components/layout/Sidebar";
import { cookies } from 'next/headers'
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Student Management System",
  description: "Student Management System",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  const cookieStore = await cookies()
  const isLoggedIn = cookieStore.has('jwt')


  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeInitializer />
        {isLoggedIn && <Sidebar />}
        {children}
      </body>
    </html>
  );
}
