"use client";

import Link from 'next/link';
import { MountainIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export function Header() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/listings', label: 'Land Listings' },
    { href: '/recommendations', label: 'AI Recommendations' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="px-4 lg:px-6 h-16 flex items-center bg-background/80 backdrop-blur-sm sticky top-0 z-50 border-b">
      <Link href="/" className="flex items-center justify-center" prefetch={false}>
        <MountainIcon className="h-6 w-6 text-primary" />
        <span className="ml-2 text-xl font-headline font-bold text-white">RR GROUP</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "text-sm font-medium hover:underline underline-offset-4",
              pathname === link.href ? "text-primary font-bold" : "text-gray-300"
            )}
            prefetch={false}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
