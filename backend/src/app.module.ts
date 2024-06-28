import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseMysqlAdapter } from './infrastructure/database/database.service';
import { CustomLogger } from './infrastructure/logger/logger.service';
import { ConfigModule } from '@nestjs/config';
import { AdministrativeUseCaseModule } from './application/usecases/administrator/administrator.usecase.module';
import EstablishmentModule from './application/usecases/establishment/estabilishment.usecase.module';
import { APP_FILTER } from '@nestjs/core';
import GlobalFilter from './application/filters/errors.filters';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
      signOptions: {expiresIn: '1h'}
    }),
    AdministrativeUseCaseModule,
    EstablishmentModule,
  ],
  providers: [
    {provide: "DatabaseGateway", useClass: DatabaseMysqlAdapter}, 
    {provide: "LoggerGateway", useClass: CustomLogger},
    {provide: APP_FILTER, useClass: GlobalFilter}
  ],
})
export class AppModule {}
