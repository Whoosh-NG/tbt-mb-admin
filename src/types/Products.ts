import { User } from "./Markets";

export type AddNewProductData = {
  product_id?: string;
  name: string;
  location: string;
  sale_price?: string;
  tbt_price?: string;
  description: string;
  unit: string;
  minimum_purchase: string;
  category_id: string;
  quantity: string;
  other_info: string;
  weight: string;
  images?: File[] | null;
  market_type: string;
  market_id: string;
  featured_image?: File | null;
  brand_id: string;
  is_top_deal: string;
};

export type AddNewProductRsp = {
  error: boolean;
  message: string;
  data: SingleProducts;
};

export type ProductIamges = {
  id?: number | undefined;
  image_url?: string | undefined;
  imageable_type?: string | undefined;
  imageable_id?: number | undefined;
};

export type ProductMarket = {
  id?: number | undefined;
  name?: string | undefined;
  banner?: string | undefined;
};

export type Product = {
  id?: number | undefined;
  name?: string | undefined;
  slug?: string | undefined;
  sale_price?: number | undefined;
  tbt_price?: number | undefined;
  market_id?: number | undefined;
  brand_id: number | string | undefined | null;
  weight: string | undefined;
  quantity: number | undefined;
  category_id?: number | undefined;
  views_count?: number | undefined;
  category?: {
    id?: number | undefined;
    name?: string | undefined;
  };
  market?: ProductMarket;
  images?: ProductIamges[];
};

export type ProductsRspData = {
  data: {
    current_page: number;
    data: Product[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: null;
    path: string;
    per_page: number;
    prev_page_url: null;
    to: number;
    total: number;
  };
};

export type SingleProducts = {
  data: {
    id: number;
    user_id: number;
    name: string;
    slug: string;
    location: string;
    status: string;
    sale_price: number;
    tbt_price: number;
    description: string;
    quantity: number;
    unit: string;
    size: string;
    weight: string;
    minimum_purchase: number;
    category_id: number;
    market_id: number;
    country_id: number;
    state_id: number;
    city_id: number;
    other_info: string;
    featured_image: string;
    clicks: number;
    created_at: string;
    updated_at: string;
    deleted_at: null;
    is_top_ranking: number;
    is_top_deal: number;
    is_created_by: string;
    is_updated_by: string;
    market_type: string;
    brand_id: null;
    rating_avg: null;
    ratings_count: number;
    ratings: null;
    views_count: number;
    user: User;
    category: {
      id: number;
      name: string;
    };
    images: ProductIamges[];

    country: {
      id: number;
      name: string;
    };

    state: {
      id: number;
      country_id: number;
      name: string;
    };
    city: {
      id: number;
      state_id: number;
      name: string;
    };
    market: ProductMarket;
  };
};
