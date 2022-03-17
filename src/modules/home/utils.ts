import { IProductUpdate, IProductValidation } from '../../models/product';

export const formatterPrice = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

export const formatterTime = (value?: number | string) => {
  if (typeof value === 'number') {
    const a = new Date(value);
    const year = a.getFullYear();
    const month = a.getMonth() + 1;
    const date = a.getDate();

    return year + '-' + (month < 10 ? '0' + month : month) + '-' + (date < 10 ? '0' + date : date);
  }

  return '';
};

const validStringFiled = (name: string, value: string) => {
  if (value) {
    return '';
  }
  switch (name) {
    case 'vendor':
      return 'vendorRequire';
    case 'name':
      return 'nameRequire';
    default:
      return '';
  }
};

const validArrayField = (name: string, value: any[]) => {
  if (value.length) {
    return '';
  }
  switch (name) {
    case 'images':
      return 'imagesRequire';
    case 'categories':
      return 'categoriesRequire';
    case 'shipping':
      return 'shippingRequire';
    default:
      return '';
  }
};

const validNumberFiled = (name: string, value: number) => {
  if (value) {
    return '';
  }
  switch (name) {
    case 'price':
      return 'priceRequire';
    case 'quantity':
      return 'quantityRequire';
    case 'vendor':
      return 'quantityRequire';
    case 'brand':
      return 'quantityRequire';
    case 'condition':
      return 'conditionRequire';
    default:
      return '';
  }
};

export const validateProduct = (product?: IProductUpdate): IProductValidation => {
  return {
    vendor_id: validNumberFiled('vendor', product?.vendor_id || 0),
    brand_id: validNumberFiled('brand', product?.brand_id || 0),
    quantity: validNumberFiled('quantity', product?.quantity || 0),
    price: validNumberFiled('price', product?.price || 0),
    condition_id: validNumberFiled('conditon', product?.condition_id || 0),
    name: validStringFiled('name', product?.name || ''),
    description: validStringFiled('description', product?.description || ''),
    imagesOrder: validArrayField('images', product?.imagesOrder || []),
    categories: validArrayField('catgories', product?.categories || []),
    shipping_to_zones: validArrayField('shipping', product?.shipping_to_zones || []),
  };
};

export const validSubmitUpdate = (values: IProductValidation) => {
  console.log(values);
  return (
    !values.vendor_id &&
    !values.name &&
    !values.brand_id &&
    !values.condition_id &&
    !values.imagesOrder &&
    !values.categories &&
    !values.quantity &&
    !values.shipping_to_zones &&
    !values.price &&
    !values.description
  );
};
