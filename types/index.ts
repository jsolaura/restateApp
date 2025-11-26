import { Models } from "react-native-appwrite";

type Facilities = 'Laundry' | 'Car Parking' | 'Sports Center' | 'Cutlery' | 'Gym' | 'Swimming Pool' | 'Wifi' | 'Pet Center';
type PropertyType = 'House' | 'Townhouse' | 'Condo' | 'Duplex' | 'Studio' | 'Villa' | 'Apartment' | 'Other';

interface Property extends Models.Document  {
  name: string;
  type: PropertyType;
  description: string;
  address: string;
  price: number;
  area: number;
  bedrooms: number;
  bathrooms: number;
  rating: number;
  facilities: Facilities[];
  image: string;
  geolocation: string;
  agents: string;
  reviews: Review[];
}

interface Review extends Models.Document {
  name: string;
  avatar: string;
  review: string;
  rating: number;
  likes: number;
}

interface Filter {
  priceRange: {
    min: number;
    max: number;
  };
  propertyType: string[];
  bedrooms: number;
  bathrooms: number;
  buildingSize: {
    min: number;
    max: number;
  }
}

export type { Filter, Property, Review };

