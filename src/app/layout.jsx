import { Geist, Geist_Mono } from 'next/font/google';
import '../styles/globals.css';
import '../styles/icons.css';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import '../styles/grid.css';

import { NAME_APP } from '../config/env';
import { AppProvider } from '@sistec/context/AppContext';
import DivLoading from '@sistec/components/common/DivLoading';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  title: NAME_APP,
  description: 'Aplicación de gestión de residuos sólidos',
  icons: {
    icon: '/SAC/apple-icon.png',  
    shortcut: '/SAC/apple-icon.png',   
    apple: '/SAC/apple-icon.png',
  },  
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AppProvider>
          <div
            id="confirmBackdrop"
            className={`fixed h-screen w-screen bg-black/50 z-50 hidden`}
          ></div>
          <DivLoading />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
