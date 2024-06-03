import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from 'src/users/core';
import { NasaImagesSearchCache } from 'src/nasa-images/core';
import { NasaImagesModule } from 'src/nasa-images/nasa-images.module';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';
import { AuthorModule } from './author/author.module';
import { Author } from './author/models/author.model';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    HealthModule,
    NasaImagesModule,
    AuthorModule,
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: './sqlite/starter.db',
      entities: [User, NasaImagesSearchCache, Author],
      synchronize: true,
      logging: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
