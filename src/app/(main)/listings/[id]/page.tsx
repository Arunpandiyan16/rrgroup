import { notFound } from 'next/navigation';
import Image from 'next/image';
import { lands } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { MapPin, SquareAsterisk, DollarSign } from 'lucide-react';
import { QuotationRequestDialog } from '@/components/QuotationRequestDialog';
import type { Metadata } from 'next';

type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const land = lands.find((l) => l.id === params.id);

  if (!land) {
    return {
      title: 'Property Not Found',
      description: 'The requested land listing could not be found.',
    }
  }

  return {
    title: `${land.name} | RR Group`,
    description: land.description,
    openGraph: {
        title: `${land.name} | RR Group`,
        description: land.description,
        images: [
            {
                url: land.photos[0],
                width: 1200,
                height: 800,
                alt: land.name,
            },
        ],
    },
  }
}

export default function LandDetailPage({ params }: { params: { id: string } }) {
  const land = lands.find((l) => l.id === params.id);

  if (!land) {
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