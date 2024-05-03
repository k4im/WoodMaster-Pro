import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'process';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './adapters/framework/database/entities/Person.entity';
import { User } from './adapters/framework/database/entities/User.entity';
import { Permissions } from './adapters/framework/database/entities/Permissions.entity';
import { DatabaseConfigurations } from './application/config/database.config';
import { DatabaseMysqlAdapter } from './adapters/framework/database/database.service';
import { CustomLogger } from './adapters/out-adapters/logger/logger.service';
import { Tenant } from './adapters/framework/database/entities/Tenant.entity';
import { Role } from './adapters/framework/database/entities/Role.entity';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: env.SECRET_KEY,
      signOptions: {expiresIn: '1h'}
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: parseInt(DatabaseConfigurations.port),
      username: DatabaseConfigurations.username,
      password: 'Xaes@$1412',
      database: DatabaseConfigurations.db_name,
      entities: [Person, User, Permissions, Tenant, Role],
      synchronize: true,
    }),
  ],
  providers: [{provide: "DatabaseGateway", useClass: DatabaseMysqlAdapter}, {provide: "LoggerGateway", useClass: CustomLogger}],
})
export class AppModule {}
