"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { generateLandRecommendation, type LandRecommendationOutput } from '@/ai/flows/generate-land-recommendation';
import { Loader2, Sparkles, Wand2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const recommendationFormSchema = z.object({
  location: z.string().min(3, { message: 'Location should be at least 3 characters.' }),
  area: z.string().min(1, { message: 'Please specify an area.' }),
  price: z.string().min(1, { message: 'Please specify a price range.' }),
});

export default function RecommendationsPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<LandRecommendationOutput | null>(null);

  const form = useForm<z.infer<typeof recommendationFormSchema>>({
    resolver: zodResolver(recommendationFormSchema),
    defaultValues: {
      location: '',
      area: '',
      price: '',
    },
  });

  async function onSubmit(values: z.infer<typeof recommendationFormSchema>) {
    setIsLoading(true);
    setRecommendations(null);
    try {
      const result = await generateLandRecommendation(values);
      setRecommendations(result);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: "An error occurred",
        description: "Failed to generate recommendations. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center">
        <Wand2 className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 text-4xl lg:text-5xl font-headline font-bold text-primary">AI Land Recommender</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Describe your ideal property, and our AI will find the perfect match from our exclusive listings.
        </p>
      </div>

      <div className="mt-12 max-w-2xl mx-auto">
        <Card className="p-8 bg-card border">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Desired Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Napa Valley, CA" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="area"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Desired Area</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 50 acres" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price Range</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., around $2,000,000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Recommendations
                  </>
                )}
              </Button>
            </form>
          </Form>
        </Card>
      </div>
      
      {isLoading && (
        <div className="text-center mt-12">
            <p className="text-muted-foreground">Our AI is scanning properties for you...</p>
        </div>
      )}

      {recommendations && (
        <div className="mt-16">
          <h2 className="text-3xl font-headline font-bold text-center text-primary mb-8">Your Recommended Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recommendations.recommendations.map((rec) => (
              <Card key={rec.landId} className="bg-card flex flex-col">
                <CardHeader>
                  <CardTitle className="text-primary font-headline">{rec.landId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</CardTitle>
                  <CardDescription>Suitability Score</CardDescription>
                  <div className="flex items-center gap-2 pt-1">
                    <Progress value={rec.suitabilityScore * 100} className="w-full" />
                    <span className="font-bold text-primary">{Math.round(rec.suitabilityScore * 100)}%</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">{rec.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
