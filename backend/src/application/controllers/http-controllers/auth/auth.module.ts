import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { DatabaseService } from 'src/adapters/framework/database/database.service';
import { CustomLogger } from 'src/adapters/out-adapters/logger/logger.service';
import { LoginUserUseCase } from 'src/application/usecases/auth/commands/login/auth.service';

@Module({
  controllers: [AuthController],
  providers: [{provide: "LoginUseCase", useClass: LoginUserUseCase}, DatabaseService, {provide: "LoggerGateway", useClass: CustomLogger}],
})
export class AuthModule {}
