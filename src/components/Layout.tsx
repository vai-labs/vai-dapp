import React from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  fixedNav?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title = 'VAI Ecosystem',
  description = 'Value AI Token Ecosystem - A decentralized platform for AI curation, governance, and skills certification.',
  fixedNav = false,
}) => {
  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar isFixed={fixedNav} />
      
      <div className="flex-grow">
        {children}
      </div>
      
      <Footer />
    </div>
  );
};

export default Layout;