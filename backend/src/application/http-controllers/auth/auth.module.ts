import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRepositoryService } from 'src/infraestrutura/repository/auth-repository/auth-repository.service';
import { DatabaseService } from 'src/infraestrutura/database/database.service';
import { CustomLogger } from 'src/application/out-adapters/logger/logger.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthRepositoryService, DatabaseService, {provide: "LoggerGateway", useClass: CustomLogger}],
})
export class AuthModule {}
