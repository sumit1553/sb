'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, Megaphone, User, Quote, Store, QrCode, BarChart3, ArrowLeft } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Campaigns', href: '/admin/campaigns', icon: Megaphone },
  { label: 'Characters', href: '/admin/characters', icon: User },
  { label: 'Quotes', href: '/admin/quotes', icon: Quote },
  { label: 'Brands', href: '/admin/brands', icon: Store },
  { label: 'Tables & QRs', href: '/admin/tables', icon: QrCode },
  { label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="admin-layout bg-neutral-950 text-white min-h-screen">
      {/* Top Admin Header */}
      <header className="border-b border-white/10 bg-neutral-900/80 backdrop-blur-md sticky top-0 z-30 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors"
              title="Return to Experience"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-[#c8852a]/20 text-[#c8852a]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h1 className="font-display text-lg font-medium text-white leading-none">
                  TableCompanion Admin
                </h1>
                <p className="text-[11px] text-white/50">Campaign & AR Table Management</p>
              </div>
            </div>
          </div>

          {/* Navigation Bar */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (pathname === '/admin' && item.href === '/admin/campaigns');
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-[#c8852a]/20 text-[#c8852a] border border-[#c8852a]/30'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Mobile Navigation bar */}
        <nav className="flex md:hidden items-center justify-between pt-4 overflow-x-auto gap-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs whitespace-nowrap ${
                  isActive
                    ? 'bg-[#c8852a] text-black font-semibold'
                    : 'text-white/60 bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6">{children}</main>
    </div>
  );
}
