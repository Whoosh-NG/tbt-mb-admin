export type MarketsRsp = {
  id: number;
  name: string;
  description: string | null;
  banner: string;
  address: string;
  latitude: string;
  longitude: string;
  agent_id: number;
  products_count: number;
};

export type CategoryRsp = {
  id: number;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  icon: string;
  type: string;
  banner: string;
  banner_description: string | null;
  products_count: number;
};

export type CategoryRspData = {
  data: CategoryRsp[];
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

export interface CartProduct extends Product {
  user_id: number;
  market_id: number;
  description: string;
  unit: string;
  minimum_purchase: number;
  views_count: number;
  user: User;
  tags: string[];
  country: string | null;
  state: string | null;
  city: string | null;
}
export interface CartRsp {
  id: number;
  user_id: number;
  product_id: number;
  quantity: number;
  amount: number;
  weight: string;
  product: CartProduct;
}

export type CartItems = Product & {
  quantity: number;
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

export type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  profile_picture: null;
  user_type: string;
  seller_id: string;
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
    featured_image: null;
    clicks: number;
    created_at: string;
    updated_at: string;
    deleted_at: null;
    is_top_ranking: number;
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

export type ShippingDetails = {
  first_name: string;
  // last_name: string;
  phone_number: string;
  delivery_address: string;
  delivery_address_latitude: string;
  delivery_address_longitude: string;
  delivery_date: string;
  country_id: number | string | undefined;
  state_id: number | string | undefined;
  local_govt_id: number | string | undefined;
  city_id: number | string | undefined;
  email: string;
  postal_code: string;
};

export type CreateOrder = {
  order_method?: string | undefined;
  buy_now_quantity?: string | undefined;
  product_id?: string | undefined;
  sub_total: number;
  delivery_location_option: string;
  anything_for_the_boys: number;
  total_weight: string;
  shipping_details: ShippingDetails;
};

export type Country = {
  id: number;
  sortname: string;
  name: string;
  phonecode: number;
};
export type State = {
  id: number;
  name: string;
  country_id: number;
};
export type City = {
  id: number;
  name: string;
  state_id: number;
  local_govt_id: number | string | null;
  status: string;
  created_at: string | null;
  updated_at: string | null;
};
export type LGA = {
  id: number;
  name: string;
  state_id: number;
  status: string;
  created_at: string;
  updated_at: string;
  cities_count: number;
  state_name: string;
};

export type TopSelling = {
  product_id: number;
  count: number;
  product: Product;
};

export type Combo = {
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
  featured_image: null;
  clicks: number;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  is_top_ranking: number;
  is_created_by: string;
  is_updated_by: string;
  market_type: string;
  brand_id: null;
  rating_avg: null;
  ratings_count: number;
  ratings: null;
  views_count: number;
  user: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    profile_picture: null;
    user_type: string;
    seller_id: string;
  };
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

export type CalcShipping = {
  dropoff_address: string;
  dropoff_latitude: string;
  dropoff_longitude: string;
  weight: string;
  delivery_location_option: string;
};

export type CalcShippingRsp = {
  error: boolean;
  message: string;
  data: {
    weight_in_kg: string;
    distance_in_km: string;
    delivery_fee: number;
  };
};

export type ServiceCharge = {
  data: {
    id: number;
    description: string;
    label: string;
    option: string;
    value: number;
    status: string;
    app_type: string;
  };
};
