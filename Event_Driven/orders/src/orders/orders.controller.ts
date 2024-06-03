import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @HttpCode(204)
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @MessagePattern('order-payment-completed')
  getMessageHello(@Payload() name: string) {    
    return this.ordersService.updatePaymentInformation(0, name);
  }

  @MessagePattern('order-shipped')
  updateShippingInfo(@Payload() data: any) {
    return this.ordersService.updateShippingInformation(0, data);
  }
}
