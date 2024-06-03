import { LocationDto } from "./location.dto"

export interface OriginDto {
    location: LocationDto
    street: string
    name: string
    code: string
    type: string
    phoneNumber: string
  }