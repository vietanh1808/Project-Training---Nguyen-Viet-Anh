export const formatterPrice = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

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
  stock: '' | 'in' | 'low' | 'out';
  name: boolean;
  sku: boolean;
  description: boolean;
  vendor: string;
  available: '' | 'enable' | 'disable';
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
  meta_desc_type: string;
  meta_keywords: string;
  meta_description: string;
  product_page_title: string;
  code: string;
  weight: number;
  inventory_tracking: number;
  og_tags: string;
  sale_price_type: string;
  cleanURL: string;
  brand_id: number;
  shipping: Array<any>;
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
