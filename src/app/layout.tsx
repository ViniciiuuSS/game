"use client";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { NavbarComponent } from "@/components/navbar";
import { ThemeProvider } from "flowbite-react";
import { Score } from "@/components/Score";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
        <SessionProvider>
          <ThemeProvider>
            <div className="min-h-screen flex flex-col">
              <NavbarComponent />
              <Score />
              <div className="flex-grow flex flex-col">
                <div className="w-full bg-gray-100 dark:bg-gray-800 py-2">
                  <Score />
                </div>
                <main className="flex-grow flex items-center justify-center">{children}</main>
              </div>
            </div>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
