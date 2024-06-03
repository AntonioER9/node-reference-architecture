import { Body, Controller, Inject, Logger, OnModuleInit, Post } from "@nestjs/common";
import { ClientKafka, Ctx, KafkaContext, MessagePattern, Payload } from "@nestjs/microservices";
import DispatchTypeStrategyFactory from "./strategies/dispatch-type-strategy.factory";
import OrderCreatedDto from "./dto/order-created.dto";

const topic = 'order-created'

@Controller()
export default class AppController implements OnModuleInit {

    constructor(
        @Inject('KAFKA_CLIENT') private readonly client: ClientKafka,
        private readonly strategyFactory: DispatchTypeStrategyFactory,
        private readonly logger: Logger
    ) { }

    @Post()
    publishMessage(@Body() message: any) {
        this.client.emit(topic, message)
        this.logger.log(`Message: ${JSON.stringify(message)} publish to: ${topic}`)
    }

    @MessagePattern(topic)
    handleMessage(@Payload() message: OrderCreatedDto, @Ctx() context: KafkaContext) {
        this.logger.log(`Message received: ${JSON.stringify(message)}, topic: ${context.getTopic()}`);
        const strategy = this.strategyFactory.getStrategy(message.dispatchType)
        return strategy.process(message)
    }

    async onModuleInit() {
        this.client.subscribeToResponseOf(topic)
    }

}