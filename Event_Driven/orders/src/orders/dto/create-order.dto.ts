import { IsArray, IsNotEmpty, IsObject, IsPositive } from 'class-validator';
import { CreateOrderItemDto } from './create-product.dto';
import { CreateShippingAddressDto } from './create-shipping-address.dto';
import { Type } from 'class-transformer';

export class CreateOrderDto {
  @IsArray()
  @Type(() => CreateOrderItemDto)
  orderItems: CreateOrderItemDto[];

  @IsObject()
  @Type(() => CreateShippingAddressDto)
  shippingAddress: CreateShippingAddressDto;

  @IsPositive()
  total: number;

  @IsNotEmpty()
  transactionId: string;
  
  @IsNotEmpty()  
  paymentMethod: string;  

  paymentConfirmationCode: string;
}
