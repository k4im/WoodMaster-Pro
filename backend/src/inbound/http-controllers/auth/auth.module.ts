import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRepositoryService } from 'src/outbound/repository/auth-repository/auth-repository.service';
import { DatabaseService } from 'src/outbound/database/database.service';
import { CustomLogger } from 'src/outbound/logger/logger.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthRepositoryService, DatabaseService, {provide: "LoggerGateway", useClass: CustomLogger}],
})
export class AuthModule {}
