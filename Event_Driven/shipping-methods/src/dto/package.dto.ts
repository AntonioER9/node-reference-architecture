import { ProductDto } from "./product.dto"

export interface PackageDto {
    packageCode: string
    products: ProductDto[]
  }