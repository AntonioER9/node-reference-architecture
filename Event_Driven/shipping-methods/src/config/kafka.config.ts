import { ClientsModuleOptions, KafkaOptions, Transport } from "@nestjs/microservices";

export const kafkaConfig: KafkaOptions = {
    transport: Transport.KAFKA,
    options: {
        client: {
            clientId: 'shipping',
            brokers: ['localhost:9092'],
        },
        consumer: {
            groupId: 'shipping-consumer',
            allowAutoTopicCreation: true,
        },
        producer: {
            allowAutoTopicCreation: true
        }
    }
}
