import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/shared/Navbar';
import { ApolloWrapper } from '@/apollo/lib/ApolloProvider';
import { PokemonProvider } from '@/provider/PokemonProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pokepedia',
  description: 'A nice and simple pokemon app.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <ApolloWrapper>
          <PokemonProvider>
            <Navbar />
            <section className="px-4 lg:px-24 py-24 flex justify-center">{children}</section>
            <Toaster />
          </PokemonProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
