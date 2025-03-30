import React from "react";
import  { Inter } from "next/font/google";
import "./globals.css";
import DashboardNav from "../components/dashboardNav";
import { ClerkProvider } from '@clerk/nextjs'

const inter = Inter({ subsets : ["latin"]});

export const metadata = {
  title: "Admin Dashboard",
  description: "Super admin dashboard",
}

export default function RootLayout({children, }: {children: React.ReactNode}){
  return (
    <ClerkProvider>
    <html>
        <body className={inter.className}>
            <div className="flex min-h-screen flex-col">
              <div className="flex min-h">
                <DashboardNav />
                <main className="flex w-full flex-col overflow-hidden">{children}</main>
              </div>
            </div>
        </body>
    </html>
    </ClerkProvider>
  );
}