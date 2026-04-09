export interface Category {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  image_url: string;
  category_id: string;
  is_published: boolean;
  stock: number;
  categories?: { name: string };
  rating: number;
  created_at?: string;
}

export interface ProductCardType {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
}

export interface Review {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  comment: string;
  created_at: string;
  profiles?: {
    full_name: string;
    avatar_url: string;
  };
}
