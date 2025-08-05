// src/app/(main)/listings/[id]/page.tsx
'use client'

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { MapPin, SquareAsterisk, DollarSign } from 'lucide-react';
import { QuotationRequestDialog } from '@/components/QuotationRequestDialog';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Land } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import type { Metadata } from 'next';

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


export default function LandDetailPage({ params }: { params: { id: string } }) {
  const [land, setLand] = useState<Land | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!params.id) return;
    
    const fetchLand = async () => {
      setIsLoading(true);
      setError(false);
      try {
        const landsRef = collection(db, "lands");
        const q = query(landsRef, where("id", "==", params.id));
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
          setError(true);
        } else {
          const landData = querySnapshot.docs[0].data() as Land;
          setLand({ ...landData, firebaseId: querySnapshot.docs[0].id });
        }
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchLand();
  }, [params.id]);

  if (isLoading) {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="grid md:grid-cols-2 gap-12 items-start">
                <div>
                    <Skeleton className="w-full aspect-video rounded-lg"/>
                </div>
                <div>
                    <Skeleton className="h-12 w-3/4 mb-4" />
                    <Skeleton className="h-8 w-1/2 mb-6" />
                    <Skeleton className="h-24 w-full mb-8" />
                    <Skeleton className="h-10 w-full" />
                </div>
            </div>
        </div>
    )
  }

  if (error || !land) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div>
          <Carousel className="w-full rounded-lg overflow-hidden border">
            <CarouselContent>
              {land.photos.map((photo, index) => (
                <CarouselItem key={index}>
                  <div className="aspect-video relative">
                     <Image
                        src={photo}
                        alt={`${land.name} photo ${index + 1}`}
                        fill
                        style={{objectFit: 'cover'}}
                        className="w-full h-full"
                        data-ai-hint="landscape property detail"
                      />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>
        <div>
          <h1 className="text-4xl lg:text-5xl font-headline font-bold text-primary">{land.name}</h1>
          <div className="mt-4 flex items-center gap-2 text-xl text-muted-foreground">
            <MapPin className="w-5 h-5 text-primary" />
            <span>{land.location}</span>
          </div>
          <Card className="mt-6 bg-card">
            <CardContent className="p-6 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                    <DollarSign className="w-8 h-8 text-primary" />
                    <div>
                        <p className="text-muted-foreground">Price</p>
                        <p className="text-2xl font-bold">${land.price.toLocaleString()}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <SquareAsterisk className="w-8 h-8 text-primary" />
                    <div>
                        <p className="text-muted-foreground">Area</p>
                        <p className="text-2xl font-bold">{land.area} acres</p>
                    </div>
                </div>
            </CardContent>
          </Card>
          <div className="mt-8">
             <h2 className="text-2xl font-headline font-bold text-primary">About this land</h2>
             <p className="mt-4 text-muted-foreground leading-relaxed">{land.description}</p>
          </div>
          <div className="mt-8">
            <QuotationRequestDialog landName={land.name} />
          </div>
        </div>
      </div>
    </div>
  );
}
