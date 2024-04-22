import { Injectable } from '@nestjs/common';
import { Repository } from '../Repository';
import { IResponse } from 'src/interfaces/IResponse.interface';
import { DatabaseService } from 'src/outbound/database/database.service';
import { CustomLogger } from 'src/helpers/logger/logger.service';
import { Tenant } from 'src/inbound/http-controllers/tenant/entities/tenant.entity';

@Injectable()
export class TenantRepositoryService implements Repository {
    
    constructor(
        private readonly database: DatabaseService, 
        private readonly logger: CustomLogger) {}

    paginarResultados(pagina: number, limit: number): Promise<IResponse> {
        throw new Error('Method not implemented.');
    }
    
    /**
     * O metodo será utilizado para a criação de um novo tenant dentro do banco de dados.
     * @param registro Recebe um novo tenant que será utilizado para a criação
     * @returns true | false
     */
    async criarNovoRegistro(registro: Tenant): Promise<boolean> {
        try {
            let result = await this.database.tenant.create({
                data: {
                    Nome: registro.Nome
                }
            })
            this.logger.log(`Efetuado a criação do tenant: [Repository] - [Metodo] - [Novo Registro].`)
            return true;
        } catch (error) {
            this.logger.error(`Não foi possivel estar realizando a criação do tenant: [Repository] - [Metodo] - [Novo Registro] ${error}`)
        }
    }

    /**
     * O metodo será utilizado para efetuar a busca de um tenant por UUID.
     * @param uuid Recebe o UUID do tenant para que então seja possivel efetuar a busca do mesmo.
     * @returns Tenant
     */
    async buscarPorUUID(uuid: string): Promise<any> {
        try {
            let result = await this.database.tenant.findUnique({
                where: {
                    Uuid: uuid
                }
            });
            this.logger.log(`Efetuado busca do tenant a partir do UUID: [Repository] - [Metodo] - [Buscar por UUID].`)
            return result;
        } catch (error) {
            this.logger.error(`Não foi possivel estar realizando a busca do tenant: [Repository] - [Metodo] - [Buscar por UUID] ${error}`)
            
        }
    }
    
    /**
     * O metodo sera utilizado para atualização de um tenant a partir do UUID
     * @param registro Recebe o registro que será utilizado para atualização dos dados.
     * @param uuid Recebe o UUID pertencente ao tenant.
     */
    async atualizarRegistro(registro: any, uuid: string): Promise<any> {
        try {
            let result = await this.database.tenant.update({
                where: {
                    Uuid: uuid
                },
                data: {...registro}
            });
            this.logger.log(`Efetuado update do registro: [Repository] - [Metodo] - [Atualizar por UUID].`)

        } catch (error) {
            this.logger.error(`Efetuado update do registro: [Repository] - [Metodo] - [Atualizar por UUID].`)
            
        }
    }
    
    async deletarRegistro(uuid: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
}
