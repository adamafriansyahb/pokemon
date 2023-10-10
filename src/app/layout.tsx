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
            <main className="flex justify-center px-4 py-24">
              <section className="w-full lg:max-w-5xl">{children}</section>
            </main>
            <Toaster />
          </PokemonProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
