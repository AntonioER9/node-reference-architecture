import { LocationDto } from "./location.dto"

export interface DestinationDto {
    location: LocationDto
    street: string
    name: string
    code: string
    type: string
    phoneNumber: string
}