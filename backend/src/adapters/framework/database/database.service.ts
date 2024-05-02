import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Pessoa, PrismaClient } from '@prisma/client';
import { ITenantDto } from 'src/domain/dto/ITenant.dto';
import { IPessoaDto } from 'src/domain/dto/Pessoas.dto';
import { DatabaseGateway } from 'src/ports/out-ports/database.gateway';
import { LoggerGateway } from 'src/ports/out-ports/logger.gateway';

@Injectable()
export class PrismaService extends PrismaClient  implements OnModuleInit, OnModuleDestroy, DatabaseGateway{
    
   constructor(@Inject("LoggerGateway") private readonly logger: LoggerGateway) {
        super()
   } 


   // =============================== Pessoas ====================================//
   //============================================================================//
   
   /**
    * Metodo podera ser utilizado para criar um novo registro de funcionario, 
    * cliente ou fornecedor.
    * @param data Recebe os dados para criação de um novo registro.
    * @returns true | false
    */ 
   async criarNovaPessoa(data: any) {
        try {
            await this.pessoa.create({
                data: {
                    ...data,
                    Email: data.Email.email,
                    PessoaEndereco: {create: [...data.PessoaEndereco]},
                    PessoaTelefones: {create: [...data.PessoaTelefones]},
                    TenantId: data.TenantId,        
                }
            });
            return true;
        } catch (error) {
            
        }
    }

    /**
     * metodo será utilizado para atualizar um funcionario, cliente ou fornecedor.
     * @param data Recebe os dados para atualização.
     * @param uuid Recebe o uuid da pessoa para atualização.
     * @returns true | false
     */
    async atualizarPessoa(data: any, uuid: string) {
        try {
            await this.pessoa.update({
                where: {Uuid: uuid},
                data: {
                    ...data,
                    Email: data.Email.email,
                    PessoaEndereco: {create: [...data.PessoaEndereco]},
                    PessoaTelefones: {create: [...data.PessoaTelefones]}
                }
            })
            return true;
        } catch (error) {
            return false;
        }
    }
    /**
     * Efetua o processo de desativação de uma pessoa que encontra-se
     * vinculada a determinado uuid.
     * @param uuid Recebe o uuid para efetuar desativação.
     * @returns true | false
     */
    async desativarPessoa(uuid: string) {
        try {
            await this.pessoa.update({
                where: {Uuid: uuid},
                data: {Inativo: true}
            });
            return true;
        } catch (error) {
            return false;
        }
    }

    /**
     * Metodo podera estar utilizado para efetuar a listagem de funcionarios
     * clientes e fornecedores. 
     * @param pagina pagina para navegação
     * @param limit limite de resultados por pagina.
     * @param whereClausula recebe a where clausula para efetuar a busca.
     * @returns retorna uma lista de pessoas conforme os dados de paginação.
     */
    async buscarResultados(pagina: number, limit: number, whereClausula: any): Promise<IPessoaDto[]>{
        try {
            let resultado = await this.pessoa.findMany({
                select: {
                    Uuid: true,
                    Nome: true,
                    Matricula: true,
                    Codigo: true,
                    Email: true,
                    dataCriacao: true
                },
                where: whereClausula,
                skip: pagina,
                take: limit
            });
            return resultado;
        } catch (error) {
            
        }
    }

    /**
     * Metodo estara efetuando a busca de uma pessoa que possui determinado
     * uuid.
     * @param uuid Recebe o uuid da pessoa para efetuar a busca.
     * @returns Retorna a pessoa buscada.
     */
    async buscarPessoa(uuid: string) {
        try {
            return await this.pessoa.findFirst({
                where: {
                    Uuid: uuid
                }
            })
        } catch (error) {
            return null;
        }
    }

    // =============================== Tenants ====================================//
    //============================================================================//
   /**
    * Metodo podera ser utilizado para efetuar a listagem de estabelecimentos presentes no banco dados.
    * @param pagina recebe a pagina para navegação.
    * @param limit recebe o limite por pagina
    * @returns retorna um lista contendo todos os estabelecimentos.
    */
   async buscarEstabelecimentos(pagina: number, limit: number): Promise<ITenantDto[]>{
        try {
            let resultado = await this.tenant.findMany({
                select: {
                    Uuid: true,
                    Nome: true,
                    dataCriacao: true,
                    Inativo: true
                },
                skip: pagina,
                take: limit
            });
            return resultado;
        } catch (error) {
            
        }
    }

    /**
     * Busca um estabelecimento a partir de um uuid.
     * @param uuid uuid
     * @returns retorna o estabeleciomento pertencente ao UUID.
     */
    async buscarEstabelecimento(uuid: string): Promise<ITenantDto> {
        try {
            return  await this.tenant.findUnique({
                select: {
                    Uuid: true, 
                    Nome: true,
                    Inativo: true,
                    dataCriacao: true,
                },
                where: {
                    Uuid: uuid
                }
            });
        } catch (error) {
            return null;
        }
    }
    /**
     * Metodo podera ser utilizado para criar um novo estabelecimento no banco de dados
     * 
     * @param data Recebe os dados para criação de um novo registro.
     * @returns true | false
     */
    async criarNovoEstabelecimento(data: any) {
        try {
            await this.tenant.create({
                data: {
                    Nome: data.Nome
                }
            })
            return true;    
        } catch (error) {
            return false;
        }
    }
    
    /**
     * O metodo podera ser utilizado para atualização de um estabelecimento.
     * @param data Recebe os dados para atualização
     * @param uuid recebe o uuid pertencente ao cliente.
     * @returns true | false
     */
    async atualizarEstabelecimento(data: any, uuid: string) {
        try {
            await this.tenant.update({
                where: {
                    Uuid: uuid
                },
                data: {...data}
            });
            return true;
        } catch (error) {
            return false;
        }
    }
    
    /**
     * Metodo podera ser utilizado para efetuar a desativação de um estabelecimento.
     * @param uuid recebe o UUId do estabelecimento.
     * @returns true | false
     */
    async desativarEstabelecimento(uuid: any) {
        try {
            await this.tenant.update({
                where: {
                    Uuid: uuid
                },
                data: {Inativo: true}
            });
            return true;
        } catch (error) {
            return false;
        }

    }


    // ======================== Modulos de inicialização e destruição ====================== // 
    async onModuleInit() {
        await this.$connect();
    }
    async onModuleDestroy() {
        await this.$disconnect();
    }
}
