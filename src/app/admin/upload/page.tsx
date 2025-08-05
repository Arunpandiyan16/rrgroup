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
import { db, storage } from '@/lib/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const uploadFormSchema = z.object({
  name: z.string().min(5, "Title must be at least 5 characters."),
  area: z.coerce.number().positive("Area must be a positive number."),
  location: z.string().min(3, "Location is required"),
  price: z.coerce.number().positive("Price must be a positive number."),
  description: z.string().min(20, "Description must be at least 20 characters."),
  photos: z.any().refine(files => files?.length > 0, 'At least one image is required.'),
});

export default function AdminUploadPage() {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof uploadFormSchema>>({
        resolver: zodResolver(uploadFormSchema),
        defaultValues: {
            name: "",
            area: '' as any,
            location: "",
            price: '' as any,
            description: "",
            photos: undefined,
        },
    });

    async function onSubmit(values: z.infer<typeof uploadFormSchema>) {
        setIsSubmitting(true);
        try {
            const imageFiles = values.photos as FileList;
            const imageUrls: string[] = [];

            for (const file of Array.from(imageFiles)) {
                const storageRef = ref(storage, `lands/${Date.now()}-${file.name}`);
                await uploadBytes(storageRef, file);
                const downloadURL = await getDownloadURL(storageRef);
                imageUrls.push(downloadURL);
            }
            
            const landId = values.name.toLowerCase().replace(/\s+/g, '-');

            await addDoc(collection(db, "lands"), {
                id: landId,
                name: values.name,
                area: values.area,
                location: values.location,
                price: values.price,
                description: values.description,
                photos: imageUrls,
            });

            toast({
                title: "Upload Successful!",
                description: `Property "${values.name}" has been listed.`,
            });

            form.reset();
        } catch (error) {
            console.error("Error uploading property:", error);
            toast({
                variant: 'destructive',
                title: "Upload Failed",
                description: "An error occurred while uploading the property.",
            });
        } finally {
            setIsSubmitting(false);
        }
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
                        name="name"
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
                     <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g., Napa Valley, CA" {...field} />
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
                                <FormLabel>Area (in acres)</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="e.g., 50" {...field} />
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
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="e.g., 2500000" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
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
                        name="photos"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Property Images</FormLabel>
                            <FormControl>
                                <Input type="file" multiple {...form.register('photos')} />
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
