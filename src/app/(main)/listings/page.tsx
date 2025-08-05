"use client";

import { useState } from 'react';
import { LandCard } from '@/components/LandCard';
import { lands } from '@/lib/data';
import type { Land } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

const allLocations = [...new Set(lands.map((land) => land.location))];

export default function ListingsPage() {
  const [filteredLands, setFilteredLands] = useState<Land[]>(lands);
  const [location, setLocation] = useState('all');
  const [minArea, setMinArea] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000000);

  const handleLocationChange = (value: string) => {
    setLocation(value);
    filterLands(value, minArea, maxPrice);
  };

  const handleAreaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const area = Number(event.target.value) || 0;
    setMinArea(area);
    filterLands(location, area, maxPrice);
  };
  
  const handlePriceChange = (value: number[]) => {
    const price = value[0];
    setMaxPrice(price);
    filterLands(location, minArea, price);
  };
  
  const filterLands = (loc: string, area: number, price: number) => {
     let newFilteredLands = lands;

    if (loc !== 'all') {
      newFilteredLands = newFilteredLands.filter((land) => land.location === loc);
    }
    if (area > 0) {
      newFilteredLands = newFilteredLands.filter((land) => land.area >= area);
    }
    newFilteredLands = newFilteredLands.filter((land) => land.price <= price);

    setFilteredLands(newFilteredLands);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-headline font-bold text-center text-primary mb-4">
        Our Land Listings
      </h1>
      <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
        Browse our curated collection of premium land properties. Use the filters below to find the perfect match for your vision.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 p-6 bg-card rounded-lg border">
        <div>
          <Label htmlFor="location-filter" className="text-lg font-semibold mb-2 block text-primary">Location</Label>
          <Select value={location} onValueChange={handleLocationChange}>
            <SelectTrigger id="location-filter" className="w-full">
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {allLocations.map((loc) => (
                <SelectItem key={loc} value={loc}>
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="area-filter" className="text-lg font-semibold mb-2 block text-primary">Minimum Area (acres)</Label>
          <Input
            id="area-filter"
            type="number"
            placeholder="e.g. 10"
            value={minArea || ''}
            onChange={handleAreaChange}
            className="w-full"
          />
        </div>
        <div>
           <Label htmlFor="price-filter" className="text-lg font-semibold mb-2 block text-primary">
            Max Price: ${maxPrice.toLocaleString()}
           </Label>
           <Slider
            id="price-filter"
            max={5000000}
            step={100000}
            defaultValue={[5000000]}
            onValueChange={handlePriceChange}
           />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredLands.length > 0 ? (
          filteredLands.map((land) => <LandCard key={land.id} land={land} />)
        ) : (
          <p className="col-span-full text-center text-lg text-muted-foreground">No properties match your criteria.</p>
        )}
      </div>
    </div>
  );
}
