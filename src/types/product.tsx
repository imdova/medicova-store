export interface Product {
  id: string;
  brand: string;
  model: string;
  category: string;
  title: string;
  price: number;
  del_price: number;
  status: string;
  images: string[];
  rating: number;
  sale: string;
  isBestSaller: boolean;
  nudges: string[];
}
