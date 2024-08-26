export interface ProductImage {
    id: string;
    url: string;
    productId: string;
  }
  
export interface Color{
  id:number;
  name:string;
}
export interface Size{
  id:number;
  name:string;
}
export interface Review{
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