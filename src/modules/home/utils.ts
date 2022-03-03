export const formatterPrice =  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })

export interface IProduct {
  id: number,
  sku: string,
  name: string,
  category: string,
  price: number,
  inStock: number,
  vendor: string,
  arrivalDate: number,
  enable: number,
  weight: number,
  description: string,
  created: number,
  vendorID: number,
  amount: number,
  participateSale: number,
  condition: string  
}