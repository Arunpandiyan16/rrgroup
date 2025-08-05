// src/app/admin/reports/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Users, FileText } from 'lucide-react';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Land } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminReportsPage() {
  const [lands, setLands] = useState<Land[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLands = async () => {
      setIsLoading(true);
      const querySnapshot = await getDocs(collection(db, "lands"));
      const landsData = querySnapshot.docs.map(doc => ({ ...doc.data(), firebaseId: doc.id } as Land));
      setLands(landsData);
      setIsLoading(false);
    };

    fetchLands();
  }, []);

  return (
    <div className="flex flex-col">
       <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-6">
        <h1 className="text-lg font-semibold md:text-2xl">Reports</h1>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="grid gap-4 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5" /> Export Leads</CardTitle>
                    <CardDescription>Download a CSV file of all customer enquiries.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button><Download className="mr-2 h-4 w-4" /> Download Leads</Button>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5" /> Export Quotations</CardTitle>
                    <CardDescription>Download a CSV file of all quotation requests.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button><Download className="mr-2 h-4 w-4" /> Download Quotations</Button>
                </CardContent>
            </Card>
        </div>
        <Card className="mt-4">
            <CardHeader>
                <CardTitle>Uploaded Land History</CardTitle>
                <CardDescription>A log of all properties uploaded to the platform.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Property Name</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead className="text-right">Price</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                          Array.from({ length: 5 }).map((_, index) => (
                            <TableRow key={index}>
                              <TableCell><Skeleton className="h-5 w-3/4" /></TableCell>
                              <TableCell><Skeleton className="h-5 w-1/2" /></TableCell>
                              <TableCell className="text-right"><Skeleton className="h-5 w-1/4 ml-auto" /></TableCell>
                            </TableRow>
                          ))
                        ) : (
                          lands.map((land) => (
                              <TableRow key={land.firebaseId}>
                                  <TableCell className="font-medium">{land.name}</TableCell>
                                  <TableCell>{land.location}</TableCell>
                                  <TableCell className="text-right">${land.price.toLocaleString()}</TableCell>
                              </TableRow>
                          ))
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </main>
    </div>
  );
}
