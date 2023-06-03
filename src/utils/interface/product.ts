//---------------------------------- Product List
export interface SimpleProduct {
   id: string
   name: string
   selling_price: number
}

//---------------------------------- Product Add
export interface Product {
   name: string
   category: string
   portion_type: string
   selling_price: string
   weight: string
}

export interface ProductForAdd extends Product {
   admin: string
}

//---------------------------------- Product Detail
export interface ProductDetail {
   id: string
   name: string
   category: string
   portion_type: string
   portion: number
   purchase_price: number | null
   selling_price: number
   reseller_price: number | null
}
export interface ProductDetailAPI
   extends Omit<
      ProductDetail,
      'purchase_price' | 'selling_price' | 'reseller_price'
   > {
   purchase_price: {
      id: string
      product_id: string
      price: number | null
   }
   selling_price: {
      id: string
      portion_id: string
      price: number
   }
   reseller_price: {
      id: string
      portion_id: string
      price: number | null
   }
}

interface PurchasePrice {
   id: string
   product_id: string
   price: number
   createdAt: string
}

interface SellingPrice {
   id: string
   portion_id: string
   price: number
   createdAt: string
}

interface ResellerPrice {
   id: string
   porti: string
   price: number
   createdAt: string
}

export interface SingleProductPriceList {
   purchasePrice: Array<PurchasePrice>
   sellingPrice: Array<SellingPrice>
   resellerPrice: Array<ResellerPrice>
}
