import type { Metadata, Viewport } from 'next';
import './globals.css';
import { OrientationGuard } from '@/components/ui/OrientationGuard';

export const metadata: Metadata = {
  title: 'Café AR Table Companion',
  description: 'A cinematic browser-based AR experience at your café table.',
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#080808',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="grain">
        <OrientationGuard />
        {children}
      </body>
    </html>
  );
}
