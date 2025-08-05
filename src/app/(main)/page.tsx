import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { lands } from '@/lib/data';
import { LandCard } from '@/components/LandCard';

function HeroSection() {
  return (
    <section className="relative w-full h-[70vh] flex items-center justify-center text-center text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/60 z-10" />
      <Image
        src="https://placehold.co/1920x1080.png"
        alt="Lush valley"
        fill
        style={{objectFit: 'cover'}}
        className="z-0"
        data-ai-hint="lush valley"
      />
      <div className="relative z-20 container px-4 md:px-6 flex flex-col items-center">
        <h1 className="text-4xl font-headline font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="text-white">Find Your </span><span className="text-primary">Perfect Land</span>
        </h1>
        <p className="mt-4 max-w-[700px] text-lg md:text-xl text-gray-200">
          Discover exclusive land properties with RR Group. Your vision, our foundation.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" className="bg-primary hover:bg-accent text-primary-foreground">
            <Link href="/listings">Explore Listings</Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link href="/recommendations">Get AI Recommendation</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function FeaturedListings() {
  const featuredLands = lands.slice(0, 3);

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl text-primary">Featured Properties</h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            A handpicked selection of our finest land offerings. Explore premier locations and unparalleled opportunities.
          </p>
        </div>
        <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {featuredLands.map((land) => (
            <LandCard key={land.id} land={land} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <HeroSection />
      <FeaturedListings />
    </div>
  );
}
