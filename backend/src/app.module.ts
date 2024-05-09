import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'process';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfigurations } from './infrastructure/config/database.config';
import { DatabaseMysqlAdapter } from './infrastructure/database/database.service';
import { CustomLogger } from './infrastructure/logger/logger.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: env.SECRET_KEY,
      signOptions: {expiresIn: '1h'}
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DatabaseConfigurations.host,
      port: parseInt(DatabaseConfigurations.port),
      username: DatabaseConfigurations.username,
      password: DatabaseConfigurations.pwd,
      database: DatabaseConfigurations.db_name,
      entities: DatabaseConfigurations.entities,
      synchronize: true,
    }),
  ],
  providers: [{provide: "DatabaseGateway", useClass: DatabaseMysqlAdapter}, {provide: "LoggerGateway", useClass: CustomLogger}],
})
export class AppModule {}
