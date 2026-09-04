import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ohfome-teresina-demo.buzzy-drake-5405.chatgpt.site'),
  title: 'OHFOME — Descubra os sabores de Teresina',
  description:
    'Uma demonstração de turismo gastronômico que conecta pessoas aos pequenos sabores de Teresina.',
  openGraph: {
    title: 'OHFOME — Coma como quem mora aqui',
    description:
      'Descubra pequenos restaurantes, barracas e sabores que contam a história de Teresina.',
    images: [{ url: '/og.png', width: 1672, height: 941, alt: 'OHFOME — Coma como quem mora aqui' }],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OHFOME — Coma como quem mora aqui',
    description:
      'Descubra pequenos restaurantes, barracas e sabores que contam a história de Teresina.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
