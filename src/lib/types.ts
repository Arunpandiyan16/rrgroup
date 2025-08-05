export interface Land {
  firebaseId: string; // The document ID in Firestore
  id: string; // The URL-friendly slug
  name: string;
  location: string;
  area: number; // in acres
  price: number;
  description: string;
  photos: string[];
}
