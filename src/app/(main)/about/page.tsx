import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const services = [
    'Land Acquisition & Sales',
    'Property Valuation',
    'Development Consulting',
    'AI-Powered Market Analysis',
    'Exclusive Off-Market Deals',
    'Personalized Client Advisory',
];

export default function AboutPage() {
  return (
    <div className="bg-background text-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl lg:text-5xl font-headline font-bold text-primary">About RR Group</h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            Pioneering the future of real estate by connecting discerning clients with exclusive land opportunities.
          </p>
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-12 items-center">
          <div className="relative aspect-square rounded-lg overflow-hidden shadow-2xl">
            <Image
              src="https://placehold.co/800x800.png"
              alt="RR Group office building"
              fill
              style={{objectFit: 'cover'}}
              data-ai-hint="modern office"
            />
          </div>
          <div>
            <h2 className="text-3xl font-headline font-bold text-primary">Our Mission</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              At RR Group, our mission is to redefine the land acquisition experience. We leverage deep market expertise, cutting-edge technology, and a client-centric approach to unlock value and potential in every transaction. We believe that land is more than an asset; it's the foundation for dreams, legacies, and groundbreaking ventures.
            </p>
             <p className="mt-4 text-muted-foreground leading-relaxed">
              Our team of dedicated professionals is committed to providing unparalleled service, ensuring a seamless and transparent process from discovery to closing. We are not just agents; we are partners in building your future.
            </p>
          </div>
        </div>
        
        <div className="mt-24">
            <div className="text-center">
                <h2 className="text-3xl font-headline font-bold text-primary">Our Services</h2>
                 <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    Comprehensive solutions for all your land-related needs.
                 </p>
            </div>
            <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, index) => (
                    <Card key={index} className="bg-card">
                        <CardContent className="p-6 flex items-center gap-4">
                            <CheckCircle className="w-8 h-8 text-primary" />
                            <span className="font-semibold">{service}</span>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
