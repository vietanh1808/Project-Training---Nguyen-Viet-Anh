export interface IProduct {
  id: number;
  sku: string;
  name: string;
  category: string;
  price: number;
  vendor: string;
  arrivalDate: number;
  enabled: number;
  weight: number;
  description: string;
  created: number;
  vendorID: number;
  amount: number;
  participateSale: number;
  condition: string;
}

export interface ICategory {
  id: number;
  parentId: number;
  name: string;
  path: string;
  pos: number;
}
export interface IFormFilter {
  keyword: string;
  category: string;
  stock: string | 'in' | 'low' | 'out';
  name: boolean;
  sku: boolean;
  description: boolean;
  vendor: string;
  available: string | 'enable' | 'disable';
}

export interface IBrand {
  id: number;
  name: string;
  image: string;
  description: string;
}

export interface ICondition {
  id: number | null;
  name: string;
}

export interface IProductDetail {
  id: number;
  vendor_id: number;
  name: string;
  sku: string;
  sort_description: string;
  description: string;
  enabled: number;
  quantity: number;
  price: number;
  participate_sale: number;
  sale_price: number;
  tax_exempt: number;
  arrival_date: number;
  facebook_marketing_enabled: number;
  google_feed_enabled: number;
  og_tags_type: number;
  meta_desc_type: number;
  meta_keywords: string;
  meta_description: string;
  product_page_title: string;
  code: string;
  weight: number;
  inventory_tracking: number;
  og_tags: string;
  sale_price_type: number;
  cleanURL: string;
  brand_id: number;
  shipping: Array<{ id: number; zone_name: string; price: number }>;
  categories: Array<{ category_id: number; name: string }>;
  images: Array<{
    id: number;
    file: string;
    thumbs: Array<string>;
  }>;
  memberships: Array<any>;
}

export interface IVendor {
  id: number;
  companyName?: null | string;
  login?: string;
  name: string;
}

export interface IShipping {
  id: number | null;
  name: string;
}

export interface IProductUpdate {
  vendor_id: number;
  vendor: string;
  name: string;
  brand_id: number;
  condition_id: number | null;
  categories: Array<any>;
  description: string;
  enabled: number;
  memberships: Array<any>;
  shipping_to_zones: Array<{
    id: number;
    price: number;
  }>;
  tax_exempt: number;
  price: number;
  sale_price_type: number;
  arrival_date: number;
  inventory_tracking: number;
  quantity: number;
  sku: string;
  participate_sale: number;
  sale_price: number;
  og_tags_type: number;
  og_tags: string;
  enableOffers: number;
  minimum_offer_price: number;
  meta_desc_type: number;
  meta_description: string;
  meta_keywords: string;
  product_page_title: string;
  facebook_marketing_enabled: number;
  google_feed_enabled: number;
  imagesOrder: Array<any>;
  id: number;
  deleted_images: Array<any>;
}

export interface IProductValidation {
  name: string;
  categories: string;
  description: string;
  enabled?: string;
  memberships?: string;
  shipping_to_zones?: string;
  tax_exempt?: string;
  price: string;
  sale_price_type?: string;
  arrival_date?: string;
  inventory_tracking?: string;
  quantity: string;
  sku?: string;
  participate_sale?: string;
  sale_price?: string;
  og_tags_type?: string;
  og_tags?: string;
  enableOffers?: string;
  minimum_offer_price?: string;
  meta_desc_type?: string;
  meta_description?: string;
  meta_keywords?: string;
  product_page_title?: string;
  facebook_marketing_enabled?: string;
  google_feed_enabled?: string;
  imagesOrder: string;
  vendor_id: string;
  brand_id: string;
  condition_id?: string;
}

export const initProduct: IProductUpdate = {
  vendor_id: 0,
  vendor: '',
  name: '',
  brand_id: 0,
  condition_id: null,
  categories: [],
  description: '',
  enabled: 0,
  memberships: [],
  shipping_to_zones: [],
  tax_exempt: 0,
  price: 0,
  sale_price_type: 0,
  arrival_date: 0,
  inventory_tracking: 0,
  quantity: 0,
  sku: '',
  participate_sale: 0,
  sale_price: 0,
  og_tags_type: 0,
  og_tags: '',
  enableOffers: 0,
  minimum_offer_price: 0,
  meta_desc_type: 0,
  meta_description: '',
  meta_keywords: '',
  product_page_title: '',
  facebook_marketing_enabled: 0,
  google_feed_enabled: 0,
  imagesOrder: [],
  id: 0,
  deleted_images: [],
};
