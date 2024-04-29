import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CustomLogger } from 'src/outbound/adapters/logger/logger.service';
import { AuthRepositoryService } from 'src/outbound/adapters/repository/auth-repository/auth-repository.service';
import { DatabaseService } from 'src/outbound/adapters/database/database.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthRepositoryService, DatabaseService, {provide: "LoggerGateway", useClass: CustomLogger}],
})
export class AuthModule {}
