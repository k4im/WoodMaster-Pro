import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'process';
import { DatabaseMysqlAdapter } from './infrastructure/database/database.service';
import { CustomLogger } from './infrastructure/logger/logger.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: env.SECRET_KEY,
      signOptions: {expiresIn: '1h'}
    }),
  ],
  providers: [{provide: "DatabaseGateway", useClass: DatabaseMysqlAdapter}, {provide: "LoggerGateway", useClass: CustomLogger}],
})
export class AppModule {}
