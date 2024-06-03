import OrderCreatedDto from "./order-created.dto";

export default class OrderPricedDto extends OrderCreatedDto {
    deliveryPrice: number
}