import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { CoreUserService } from './core-user.service';

@Module({
  imports: [],
  providers: [
    {
      provide: 'CORE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get('CORE_HOST'),
            port: configService.get('CORE_PORT')
          }
        })
      },
    },
    CoreUserService,
  ],
  exports: [
    CoreUserService
  ],
})
export class CoreModule {}
