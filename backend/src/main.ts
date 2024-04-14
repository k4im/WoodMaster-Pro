import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomLogger } from './helpers/logger/logger.service';
import { CriarPessoaDto } from './inbound/http-controllers/pessoas/dto/criar-pessoa.dto';
import { Email } from './inbound/http-controllers/pessoas/entities/ValueObjects/email.value.object';
import { Endereco } from './inbound/http-controllers/pessoas/entities/ValueObjects/endereco.value.object';
import { Telefone } from './inbound/http-controllers/pessoas/entities/ValueObjects/telefone.value.object';
import { Pessoa } from './inbound/http-controllers/pessoas/entities/pessoa.entity';
async function bootstrap() {
  let logger = new CustomLogger();
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  logger.log("Listening on port: 3000")
}
bootstrap();
