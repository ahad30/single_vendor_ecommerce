/* eslint-disable @typescript-eslint/no-explicit-any */
export interface TProduct {
    id: number
    name: string
    slug: string
    product_uid: string
    category: string
    brand: string
    image: any
    weight: string
    list_type: string
    price: number
    quantity: number
    is_published: string
    created_at: string
    is_single_product: string
    variants: Variants
  }
  
  export interface Variants {
    total_variants: number
  }
  