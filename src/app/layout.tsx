import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/shared/Navbar';
import { ApolloWrapper } from '@/apollo/lib/ApolloProvider';
import { PokemonProvider } from '@/provider/PokemonProvider';
import { ThemeProvider } from '@/provider/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pokepedia',
  description: 'A nice and simple pokemon app.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <ApolloWrapper>
          <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange enableSystem={false}>
            <PokemonProvider>
              <Navbar />
              <main className="flex justify-center px-4 pt-24 pb-20">
                <section className="w-full lg:max-w-5xl">{children}</section>
              </main>
              <Toaster />
            </PokemonProvider>
          </ThemeProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
