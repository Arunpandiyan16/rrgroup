// src/app/sitemap.ts
import { MetadataRoute } from 'next';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Land } from '@/lib/types';

const URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://rr-group-d8j4y.web.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    '/',
    '/listings',
    '/recommendations',
    '/about',
    '/contact',
    '/admin/login',
  ].map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString(),
  }));

  const landsSnapshot = await getDocs(collection(db, 'lands'));
  const lands = landsSnapshot.docs.map(doc => doc.data() as Land);

  const dynamicRoutes = lands.map((land) => ({
    url: `${URL}/listings/${land.id}`,
    lastModified: new Date().toISOString(),
  }));

  return [...staticRoutes, ...dynamicRoutes];
}
