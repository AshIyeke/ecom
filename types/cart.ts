export interface CartItem {
  id: string;
  quantity: number;
  product_id: string;
  products: {
    id: string;
    name: string;
    price: number;
    image_url: string;
  };
}

export interface Cart {
  id: string;
  cart_items: CartItem[];
}
