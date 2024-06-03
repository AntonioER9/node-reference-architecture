import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ClientKafka } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './order.model';
import { OrderStatus } from './order-status';

@Injectable()
export class OrdersService {

  constructor(
    @Inject('orders') private readonly client: ClientKafka,
    @InjectModel(Order) private orderModel: typeof Order) { }

  async create(request: CreateOrderDto) {

    const orderCreated = await this.orderModel.create({
      items: request.orderItems,
      shippingAddress: request.shippingAddress,
      numberOfItems: request.orderItems.length,
      total: request.total,
      transactionId: request.transactionId,
      paymentMethod: request.paymentMethod,
      paymentConfirmationCode: request.paymentConfirmationCode,
      status: OrderStatus.Created,
    });

    const producer = await this.client.connect();
    const response = await producer.send({
      topic: 'order-registered',
      messages: [
        {
          value: JSON.stringify(orderCreated),
        },
      ],
    });

    return {
      status: 'Order created successfully',
      response,
    };
  }

  findAll() {
    return this.orderModel.findAll();
  }

  findOne(id: number) {
    return this.orderModel.findOne({ where: { id } });
  }

  async updatePaymentInformation(id: number, paymentConfirmationCode: string) {

    const order = await this.orderModel.findOne({ where: { id } });

    if (!order) {
      return {
        status: 'Order not found',
      };
    }

    if (order.status == OrderStatus.AwaitingPayment || order.status == OrderStatus.Created) {
      order.status = OrderStatus.PaymentCompleted;
    }

    return await this.orderModel.update(
      { paymentConfirmationCode, status: order.status },
      { where: { id } },
    );
  }

  async updateShippingInformation(id: number, trackingCode: string) {

    const order = await this.orderModel.findOne({ where: { id } });

    if (!order) {
      return {
        status: 'Order not found',
      };
    }

    if (order.status != OrderStatus.Completed) {
      order.status = OrderStatus.Shipped;
    }

    return await this.orderModel.update(
      { shippingAddress: { trackingCode }, status: order.status },
      { where: { id } },
    );
  }

}
