import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor() { }

  async getHello() {
    return 'Hello World!';
  }
}
