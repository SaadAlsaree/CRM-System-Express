import '../css/globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';

import ThemeProviders from '@/Providers/ThemeProviders';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
   title: 'نظام أدارة التذاكر',
   description: 'Saad',
   icons: '/logoINSS.png'
};

export default function RootLayout({
   children
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang='ar' dir='rtl'>
         <body className={inter.className}>
            <ThemeProviders>
               {children}
               <Toaster />
            </ThemeProviders>
         </body>
      </html>
   );
}
