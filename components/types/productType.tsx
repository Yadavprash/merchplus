interface ProductImage {
    id: string;
    url: string;
    productId: string;
  }
  
interface Color{
  id:number;
  name:string;
}
interface Size{
  id:number;
  name:string;
}
interface Review{
  id:string,
  rating:number,
  review:string,
  productId:string
}
export interface Product {
    id: string;
    name: string;
    description: string;
    color: Color[] | null;
    size: Size[] | null;
    price: number;
    image: string | null;
    categoryid: string | null;
    Image: ProductImage[] |null;
    reviews: Review[]
  }