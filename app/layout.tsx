'use client'
import { Inter } from "next/font/google";
import "./globals.css";

import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import { ToastProvider } from './_hooks/useToast'

import theme from '../theme'

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <ToastProvider>
              {children}
            </ToastProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
