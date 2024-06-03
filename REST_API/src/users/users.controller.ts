import { Controller, Get, Header, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../auth/user.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { QueryBus } from '@nestjs/cqrs';

import { GetUserQuery } from './queries/impl';

@Controller('users')
export class UsersController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Header('Content-Type', 'application/json')
  async getCurrentUser(@User('userId') userId: string): Promise<string> {
    return JSON.stringify(
      await this.queryBus.execute(new GetUserQuery(userId)),
    );
  }
}
