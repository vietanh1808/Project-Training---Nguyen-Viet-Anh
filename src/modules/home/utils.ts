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
  vendor: string,
  arrivalDate: number,
  enabled: number,
  weight: number,
  description: string,
  created: number,
  vendorID: number,
  amount: number,
  participateSale: number,
  condition: string  
}

export interface ICategory {
  id: number,
  parentId: number,
  name: string,
  path:string,
  pos: number
}
export interface IFormFilter {
  keyword: string,
  category: string,
  stock: ''|'in'|'low'|'out',
  name: boolean,
  sku: boolean,
  description: boolean,
  vendor: string,
  available: ''|'enable'|'disable'
}