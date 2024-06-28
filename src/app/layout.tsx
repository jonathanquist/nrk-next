import type { Metadata } from 'next';
import { SiteProvider } from '@/contexts/SiteContext';

import Menu from '@/components/Menu/Menu';
import MenuMobile from '@/components/Menu/MenuMobile';
import MenuHeader from '@/components/Menu/MenuHeader';
import Footer from '@/components/Footer';

import './styles/globals.css';
import './styles/calendar.css';
import './styles/wordpress.css';

export const metadata: Metadata = {
  title: 'Nybro Ridklubb',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="overflow-hidden lg:overflow-auto">
      <SiteProvider>
        <body className="min-h-screen lg:relative fixed">
          <div className="hidden lg:block">
            <header className="App-header">
              <Menu />
            </header>
            <div className="flex justify-center items-center pb-48">
              <div className="max-w-7xl w-full">{children}</div>
            </div>
            <Footer />
          </div>

          <div className="block lg:hidden">
            <header className="App-header h-20 overflow-y-scroll">
              <MenuHeader />
            </header>
            <div className="flex lg:hidden justify-center items-start h-[calc(100dvh-202px)] w-screen overflow-y-auto rounded-xl shadow-md">
              {children}
            </div>

            <MenuMobile />
          </div>
        </body>
      </SiteProvider>
    </html>
  );
}
