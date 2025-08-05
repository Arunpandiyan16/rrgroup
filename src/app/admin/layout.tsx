// src/app/admin/layout.tsx
"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      // In a real app, you would verify a token on the server.
      // For this prototype, we'll use localStorage.
      const authed = localStorage.getItem('rr_admin_auth') === 'true';

      if (pathname === '/admin/login') {
        if (authed) {
          router.replace('/admin/dashboard');
        } else {
          setIsVerified(true);
        }
      } else {
        if (!authed) {
          router.replace('/admin/login');
        } else {
          setIsVerified(true);
        }
      }
    };
    checkAuth();
  }, [pathname, router]);

  if (!isVerified) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return <>{children}</>;
}