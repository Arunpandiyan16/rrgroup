// src/app/admin/reports/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { lands } from "@/lib/data";
import { Download, Users, FileText } from 'lucide-react';

export default function AdminReportsPage() {
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
                        {lands.map((land) => (
                            <TableRow key={land.id}>
                                <TableCell className="font-medium">{land.name}</TableCell>
                                <TableCell>{land.location}</TableCell>
                                <TableCell className="text-right">${land.price.toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
      </main>
    </div>
  );
}
