export interface IUsersParams {
  access_level: string;
  created: string;
  fistName: string;
  lastName: string;
  last_login: string;
  order: { order_as_buyer: number; order_as_buyer_total: number };
  product: number;
  profile_id: string;
  storeName: string | null;
  vendor: string;
  vendor_id: string;
  wishlist: string;
}

export interface IDeleteParams {
  id: string;
  delete: number;
}

export interface IRoleParams {
  id: string;
  name: string;
}

export interface IFormFilterUser {
  page: number;
  count: number;
  search: string;
  memberships: any[];
  types: any[];
  status: any[];
  country: string;
  state: string;
  address: string;
  phone: string;
  date_type: string;
  date_range: any[];
  sort: string;
  order_by: string;
  tz: number;
}

export interface ICountryParams {
  code: string;
  currency_id: string;
  id: string;
  code3: string;
  enabled: string;
  active_currency: number | null;
  is_fraudlent: string;
  country: string;
}

export interface IUserDetailParams {
  access_level: string;
  companyName: string;
  default_card_id: string;
  earning: number;
  email: string;
  expense: string;
  firstName: string;
  first_login: string;
  forceChangePassword: string;
  income: string;
  joined: string;
  language: string;
  lastName: string;
  last_login: string;
  membership_id: null | string;
  order_as_buyer: number;
  order_as_buyer_total: string;
  paymentRailsId: string;
  paymentRailsType: string;
  pending_membership_id: null | string;
  products_total: string;
  profile_id: string;
  referer: string;
  roles: Array<string>;
  status: string;
  statusComment: string;
  taxExempt: string;
  vendor_id: string;
}

export interface IFormUpdateUser {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirm_password: string;
  membership_id: string;
  forceChangePassword: number;
  taxExempt: number;
  id: string;
  roles: Array<number>;
  status: string;
  statusComment: string;
  paymentRailsType?: string;
  access_level?: string;
}

export interface IFormUserValidate {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirm_password: string;
  membership_id: string;
  forceChangePassword: string;
  taxExempt: string;
  id: string;
  roles: string;
  status: string;
  statusComment: string;
  paymentRailsType?: string;
  access_level?: string;
}

export interface IFormAddUser {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirm_password: string;
  membership_id: string;
  forceChangePassword: number;
  taxExempt: number;
  paymentRailsType: string;
  access_level: string;
  roles?: Array<string>;
}
