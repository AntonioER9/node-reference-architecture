import { DispatchTypeCodeEnum } from "src/enum/dispatch-type-code.enum"
import { DeliveryWindowDto } from "./delivery-window.dto"
import { DestinationDto } from "./destination.dto"
import { OriginDto } from "./origin.dto"
import { PackageDto } from "./package.dto"
import { TagDto } from "./tag.dto"

export default class OrderCreatedDto {
    createdAt: number
    dispatchType: DispatchTypeCodeEnum
    orderCode: string
    origin: OriginDto
    destination: DestinationDto
    packages: PackageDto[]
    deliveryWindow: DeliveryWindowDto
    tags: TagDto[]
}