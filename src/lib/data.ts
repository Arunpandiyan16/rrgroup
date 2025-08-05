import type { Land } from './types';

// This file is now a fallback or for testing purposes.
// The main application fetches data from Firebase Firestore.
export const lands: Land[] = [
  {
    firebaseId: 'placeholder-1',
    id: 'golden-valley-estate',
    name: 'Golden Valley Estate',
    location: 'Napa Valley, CA',
    area: 50,
    price: 2500000,
    description: 'A sprawling 50-acre estate in the heart of Napa Valley, perfect for vineyards or a luxury residence. Features rolling hills and panoramic views.',
    photos: [
      'https://placehold.co/1200x800.png',
      'https://placehold.co/1200x800.png',
      'https://placehold.co/1200x800.png',
    ],
  },
  {
    firebaseId: 'placeholder-2',
    id: 'aspen-meadows',
    name: 'Aspen Meadows',
    location: 'Aspen, CO',
    area: 10,
    price: 1800000,
    description: 'A pristine 10-acre plot surrounded by Aspen trees, offering seclusion and stunning mountain views. Ideal for a private mountain retreat.',
    photos: [
      'https://placehold.co/1200x800.png',
      'https://placehold.co/1200x800.png',
      'https://placehold.co/1200x800.png',
    ],
  },
];
