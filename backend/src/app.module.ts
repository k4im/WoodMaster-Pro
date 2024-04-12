import { Module } from '@nestjs/common';
import { AppController } from './inbound/http-controllers/app.controller';
import { AppService } from './inbound/http-services/app.service';
import { CustomLogger } from './helpers/logger/logger.service';
import { DatabaseService } from './outbound/database/database.service';
import { RepositoryService } from './outbound/repository/repository.service';


@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, CustomLogger, DatabaseService, RepositoryService],
})
export class AppModule {}
