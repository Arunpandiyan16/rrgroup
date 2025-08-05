
"use client";

import Link from 'next/link';
import { Menu, MountainIcon, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export function Header() {
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/listings', label: 'Land Listings' },
    { href: '/recommendations', label: 'AI Recommendations' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
  ];

  const handleLinkClick = () => {
    setIsSheetOpen(false);
  };

  return (
    <header className="px-4 lg:px-6 h-16 flex items-center bg-background/80 backdrop-blur-sm sticky top-0 z-50 border-b">
      <Link href="/" className="flex items-center justify-center" prefetch={false}>
        <MountainIcon className="h-6 w-6 text-primary" />
        <span className="ml-2 text-xl font-headline font-bold text-white">RR GROUP</span>
      </Link>
      <nav className="ml-auto hidden md:flex gap-4 sm:gap-6">
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
      <div className="ml-auto md:hidden">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0">
            <SheetHeader className="p-4 border-b">
               <SheetTitle>
                  <Link href="/" className="flex items-center gap-2 font-semibold" onClick={handleLinkClick}>
                      <MountainIcon className="h-6 w-6 text-primary" />
                      <span className="text-xl font-headline font-bold text-white">RR GROUP</span>
                  </Link>
               </SheetTitle>
               <SheetDescription className="sr-only">Main navigation menu</SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-6 px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  className={cn(
                    "text-lg font-medium p-4 rounded-md",
                    pathname === link.href ? "bg-muted text-primary" : "text-muted-foreground hover:bg-muted"
                  )}
                  prefetch={false}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
