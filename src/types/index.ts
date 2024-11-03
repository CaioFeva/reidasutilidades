export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  dimensions: string;
  weight: string;
  stock: number;
  category: string;
}

export interface Testimonial {
  id: string;
  name: string;
  content: string;
  rating: number;
  date: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
}