
// src/app/(main)/listings/[id]/page.tsx
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Land } from '@/lib/types';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import LandDetailClientPage from './LandDetailClientPage';

// This function is for server-side generation of metadata
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const landsRef = collection(db, "lands");
  const q = query(landsRef, where("id", "==", params.id));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return {
      title: 'Property Not Found',
      description: 'The property you are looking for does not exist.',
    };
  }

  const land = querySnapshot.docs[0].data() as Land;

  return {
    title: `${land.name} | RR Group`,
    description: `View details for ${land.name}, a ${land.area} acre property in ${land.location}. Price: $${land.price.toLocaleString()}. ${land.description.substring(0, 150)}...`,
    openGraph: {
      title: `${land.name} | RR Group`,
      description: `Explore this exclusive land listing.`,
      images: [
        {
          url: land.photos[0],
          width: 1200,
          height: 630,
          alt: land.name,
        },
      ],
    },
  };
}

async function getLandData(id: string): Promise<Land | null> {
    try {
        const landsRef = collection(db, "lands");
        const q = query(landsRef, where("id", "==", id));
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
          return null;
        } else {
          const landData = querySnapshot.docs[0].data() as Land;
          return { ...landData, firebaseId: querySnapshot.docs[0].id };
        }
    } catch (err) {
        console.error(err);
        return null;
    }
}


export default async function LandDetailPage({ params }: { params: { id: string } }) {
  const land = await getLandData(params.id);

  if (!land) {
    notFound();
  }

  return <LandDetailClientPage initialLand={land} />;
}
