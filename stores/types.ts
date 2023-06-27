export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
      rate: number;
      count: number;
    };
  }
  
  export interface Coupon {
    code: string;
    discount: number;
    minimumPurchase: number;
    maxPrice: number;
    redeemed: boolean;
  }
  
  export interface Order {
    items: Product[];
    coupon?: Coupon;
  }