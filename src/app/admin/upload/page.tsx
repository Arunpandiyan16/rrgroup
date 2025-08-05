// src/app/admin/upload/page.tsx
"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Loader2, Upload } from 'lucide-react';

const uploadFormSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters."),
  area: z.coerce.number().positive("Area must be a positive number."),
  areaUnit: z.enum(["sqft", "cents"]),
  district: z.string().min(3, "District is required."),
  taluk: z.string().min(3, "Taluk is required."),
  village: z.string().min(3, "Village is required."),
  price: z.coerce.number().positive("Price must be a positive number."),
  priceUnit: z.enum(["per-sqft", "per-cent"]),
  description: z.string().min(20, "Description must be at least 20 characters."),
  images: z.any().refine(files => files?.length > 0, 'At least one image is required.'),
});

export default function AdminUploadPage() {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof uploadFormSchema>>({
        resolver: zodResolver(uploadFormSchema),
        defaultValues: {
            title: "",
            area: undefined,
            areaUnit: "sqft",
            district: "",
            taluk: "",
            village: "",
            price: undefined,
            priceUnit: "per-sqft",
            description: "",
        },
    });

    async function onSubmit(values: z.infer<typeof uploadFormSchema>) {
        setIsSubmitting(true);
        console.log("Form Values:", values);

        // Simulate upload
        await new Promise(resolve => setTimeout(resolve, 2000));

        toast({
            title: "Upload Successful!",
            description: `Property "${values.title}" has been listed.`,
        });

        form.reset();
        setIsSubmitting(false);
    }


  return (
    <div className="flex flex-col">
      <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-6">
        <h1 className="text-lg font-semibold md:text-2xl">Upload New Land</h1>
      </header>
      <main className="flex-1 p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                     <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Property Title</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g., Serene 5 Acre Plot with Lake View" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid md:grid-cols-2 gap-8">
                        <FormField
                            control={form.control}
                            name="area"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Area</FormLabel>
                                <div className="flex gap-2">
                                <FormControl>
                                    <Input type="number" placeholder="e.g., 5000" {...field} />
                                </FormControl>
                                <FormField
                                    control={form.control}
                                    name="areaUnit"
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="w-[120px]">
                                                    <SelectValue placeholder="Unit" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="sqft">Sq.ft</SelectItem>
                                                <SelectItem value="cents">Cents</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                </div>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Price</FormLabel>
                                <div className="flex gap-2">
                                <FormControl>
                                    <Input type="number" placeholder="e.g., 75000" {...field} />
                                </FormControl>
                                 <FormField
                                    control={form.control}
                                    name="priceUnit"
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="w-[140px]">
                                                    <SelectValue placeholder="Unit" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="per-sqft">per Sq.ft</SelectItem>
                                                <SelectItem value="per-cent">per Cent</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                </div>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    
                    <div>
                        <FormLabel>Location</FormLabel>
                        <div className="grid md:grid-cols-3 gap-4 mt-2">
                             <FormField
                                control={form.control}
                                name="district"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormControl><Input placeholder="District" {...field} /></FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="taluk"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormControl><Input placeholder="Taluk" {...field} /></FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="village"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormControl><Input placeholder="Village" {...field} /></FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                     <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Detailed description of the property..." rows={6} {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />

                     <FormField
                        control={form.control}
                        name="images"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Property Images</FormLabel>
                            <FormControl>
                                <Input type="file" multiple {...form.register('images')} />
                            </FormControl>
                             <FormDescription>
                                You can upload multiple images at once.
                             </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" size="lg" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Upload className="mr-2 h-4 w-4" />
                        )}
                        Submit Property
                    </Button>

                </form>
            </Form>
        </div>
      </main>
    </div>
  );
}
