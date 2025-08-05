import Link from 'next/link';
import Image from 'next/image';
import type { Land } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, MapPin, SquareAsterisk, DollarSign } from 'lucide-react';

export function LandCard({ land }: { land: Land }) {
  return (
    <Card className="overflow-hidden bg-card border-border hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 group flex flex-col">
      <CardHeader className="p-0 relative">
        <Link href={`/listings/${land.id}`} className="block h-60 w-full overflow-hidden">
          <Image
            src={land.photos[0]}
            alt={`Photo of ${land.name}`}
            fill
            style={{objectFit: 'cover'}}
            className="group-hover:scale-105 transition-transform duration-500 ease-in-out"
            data-ai-hint="landscape property"
          />
        </Link>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardTitle className="font-headline text-2xl text-primary group-hover:text-accent transition-colors">
          <Link href={`/listings/${land.id}`}>{land.name}</Link>
        </CardTitle>
        <div className="mt-4 flex flex-col gap-2 text-muted-foreground">
            <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{land.location}</span>
            </div>
            <div className="flex items-center gap-2">
                <SquareAsterisk className="w-4 h-4 text-primary" />
                <span>{land.area} acres</span>
            </div>
            <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-primary" />
                <span>${land.price.toLocaleString()}</span>
            </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
         <Button asChild className="w-full">
            <Link href={`/listings/${land.id}`}>
              View Details <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
      </CardFooter>
    </Card>
  );
}
