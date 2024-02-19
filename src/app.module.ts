import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: !process.env.NODE_ENV
        ? '.env'
        : `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
      validationSchema: Joi.object({
        CORE_PORT: Joi.number().required().default(8090),
        CORE_HOST: Joi.string().required().default('127.0.0.1'),
      }),
    }),
    AuthModule,
    CoreModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
