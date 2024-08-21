interface ProductImage {
    id: string;
    url: string;
    productId: string;
  }
  
export interface Product {
    id: string;
    name: string;
    description: string;
    color: string | null;
    size: string | null;
    price: number;
    image: string | null;
    categoryid: string | null;
    Image: ProductImage[] |null;
  }