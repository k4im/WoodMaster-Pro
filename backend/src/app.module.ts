import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseMysqlAdapter } from './infrastructure/database/database.service';
import { CustomLogger } from './infrastructure/logger/logger.service';
import { ConfigModule } from '@nestjs/config';
import { AdministrativeUseCaseModule } from './application/usecases/administrator/administrator.usecase.module';
import AuthUseCaseModule from './application/usecases/authentication/auth.usecase.module';

@Module({
  imports: [
    AdministrativeUseCaseModule,
    AuthUseCaseModule,
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
      signOptions: {expiresIn: '1h'}
    }),
    ConfigModule.forRoot({
      envFilePath: '.env'
    })
  ],
  providers: [
    {provide: "DatabaseGateway", useClass: DatabaseMysqlAdapter}, 
    {provide: "LoggerGateway", useClass: CustomLogger}],
})
export class AppModule {}
