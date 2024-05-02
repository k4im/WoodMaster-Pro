import { Module } from '@nestjs/common';
import { DatabaseService } from './adapters/framework/database/database.service';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'process';
import { AuthModule } from './application/controllers/http-controllers/auth/auth.module';
import { TenantModule } from './application/controllers/http-controllers/tenant/tenant.module';
import { PessoasModule } from './application/controllers/http-controllers/pessoas/pessoas.module';
import { UsuariosModule } from './application/controllers/http-controllers/usuarios/usuarios.module';
import { UsecasesModule } from './application/usecases/usecases.module';
import { PersistenceModule } from './adapters/persistence/persistence.module';

@Module({
  imports: [PessoasModule, UsuariosModule,
    JwtModule.register({
      global: true,
      secret: env.SECRET_KEY,
      signOptions: {expiresIn: '1h'}
    }),
    AuthModule,
    TenantModule,
    UsecasesModule,
    PersistenceModule],
  providers: [DatabaseService],
})
export class AppModule {}
