// Type for a single cart item
export interface CartItem {
    id: string;
    cartId: string;
    productId: string;
    quantity: number;
    price: number;
  }
  
  // Type for the cart
 export  interface Cart {
    id: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    items: CartItem[];
  }
