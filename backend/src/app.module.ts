import { Module } from '@nestjs/common';
import { AppController } from './inbound/http-controllers/app.controller';
import { AppService } from './inbound/http-services/app.service';
import { CustomLogger } from './helpers/logger/logger.service';


@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, CustomLogger],
})
export class AppModule {}
