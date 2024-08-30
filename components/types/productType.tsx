// types.ts

// User model type
export interface User {
  id: string;
  email: string;
  name?: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  userCart: Cart[];
}

// Product model type
export interface Product {
  id: string;
  name: string;
  description?: string;
  size: string[];
  reviews: Review[];
  presentInCarts: CartItem[];
  category?: Category;
  categoryid?: string;
  styles: Style[];
}

// Style model type
export interface Style {
  id: string;
  name: string;
  price: number;
  images: Image[];
  productId: string;
  product: Product;
}

// Image model type
export interface Image {
  id: string;
  url: string;
  styleId: string;
  style: Style;
}

// Review model type
export interface Review {
  id: string;
  rating: number;
  review: string;
  product: Product;
  productId: string;
}

// Category model type
export interface Category {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  products: Product[];
}

// Cart model type
export interface Cart {
  id: string;
  userId: string;
  user: User;
  items: CartItem[];
  createdAt: Date;
  updatedAt: Date;
}

// CartItem model type
export interface CartItem {
  id: string;
  cartId: string;
  cart: Cart;
  productId: string;
  product: Product;
  quantity: number;
  styleIdx: number;
  sizeIdx: number
}
