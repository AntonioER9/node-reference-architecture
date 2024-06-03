import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { QueryHandlers } from './queries/handlers';
import { User } from './core';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([User])],
  providers: [...QueryHandlers],
  controllers: [UsersController],
})
export class UsersModule {}
