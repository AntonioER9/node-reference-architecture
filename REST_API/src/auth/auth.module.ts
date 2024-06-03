import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { JwtStrategy } from './jwt.strategy';
import { OidcDiscoveryService } from './oidcdiscovery.service';
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [
    JwtStrategy,
    {
      provide: 'OidcDiscoveryService',
      useFactory: async (configService: ConfigService) => {
        return await OidcDiscoveryService.initialize(configService);
      },
      inject: [ConfigService],
    },
  ],
  exports: [],
})
export class AuthModule {}
