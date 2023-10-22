import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import NavBar from './components/NavBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'OpenTable',
  description: 'Restaurant Reservation App',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <main className='bg-gray-100 min-h-screen w-screen'>
          <main className='max-w-screen-2xl m-auto bg-white'>
            <NavBar />
            {children}
          </main>
        </main>
      </body>
    </html>
  );
}
