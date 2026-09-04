import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'App de demonstração | OHFOME',
  description:
    'Protótipo navegável do aplicativo OHFOME para descobrir sabores e pequenos negócios de Teresina.',
};

export default function AppDemoLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
