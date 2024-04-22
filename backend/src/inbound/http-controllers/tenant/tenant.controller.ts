import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, Res } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Tenant } from './entities/tenant.entity';
import { TenantDoc } from './docs/tentant.doc';
import { ResponseDoc } from '../pessoas/doc/Reponse.doc';
import { Response } from 'express';

@Controller('tenant')
@ApiTags("Tenants")
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  // Begin Region       ----- Criar tenant
  @Post("novo/registro")
  @ApiOperation({summary: "A Rota será utilizada para a criação de um novo tenant dentro do sistema.", 
  description: `Esta rota poderá ser utilizada para a criação de um noo tenant dentro do sistema, para isto basta estar informando o nome do tenant
  que será registrado no banco.`})
  @ApiResponse({description: "Ao realizar a operação corretamente o sistema estará retornando o status 200", status: 200})
  create(@Body() createTenantDto: CreateTenantDto, @Res() res: Response) {
    try {
       let result = this.tenantService.create(createTenantDto);
       (result) ? res.status(200).send({message: "Tenant criado com sucesso"}) : res.status(500).send({message: "Não foi possivel efetuar a operação."}) ; 
    } catch (error) {
      res.status(500).send({message: "Houve um erro ao tentar realizar a operação."})
    }
  }
  // End Region       ----- Criar tenant

  // Begin Region       ----- Pagina resultados
  @Get()
  @ApiOperation({summary: "A rota poderá ser utilizada para a buscar todos os tenants de forma paginada."
  })
  @ApiResponse({status: 200, description: `Caso a operação seja realizada corretamente será encaminhado o status 200 contendo os dados de resposta`, 
  type: ResponseDoc})
  @ApiQuery({
    name: 'pagina',
    description: `O parametro será utilizado para efetuar a navegação entre as paginas.`
  })
  @ApiQuery({
    name: 'limit',
    description: "O parametro será utilizado para limitar a quantidade de resultados por pagina."
  })
  async findAll(@Query("pagina") pagina: number, @Query("limit") limit: number, @Res() res: Response) {
    try {
      let result = await this.tenantService.findAll(pagina, limit);
      (result) ? res.status(200).send(result): res.status(500).send({message: "Não foi possivel efetuar a operação."}) ;
    } catch (error) {
      res.status(500).send({message: "Houve um erro ao tentar realizar a operação."}) ;
    }
  }
  // End Region       ----- Paginar resultados


  // Begin Region       ----- Buscar tenant
  @Get('buscar')
  @ApiOperation({summary: "A rota poderá ser utilizada para a busca de um para realizar a busca de um tenant a partir do UUID do mesmo.",
  description: `Para efetuar a busca do tenant, basta estar repassando o UUID de identificação do tenant em questão, 
  onde será possivel estar realizando a busca a partir do valor fornecido.`
  })
  @ApiResponse({status: 200, description: `Caso a operação seja realizada corretamente será encaminhado o status 200 contendo os dados de resposta`, 
  type: TenantDoc})
  @ApiQuery({
    name: 'uuid',
    description: "Deverá ser encaminhado o UUID valido de um tenant existente."
  })
  async findOne(@Query('uuid') uuid: string, @Res() res: Response) {
    try {
      let result = await this.tenantService.findOne(uuid);
      (result) ? res.status(200).send(result): res.status(500).send({message: "Não foi possivel efetuar a operação."}) ;
    } catch (error) {
      res.status(500).send({message: "Houve um erro ao tentar realizar a operação."}) ;
    }  
  }
  // End Region       ----- Buscar tenant

  // Begin Region       ----- atualizar tenant
  @Put()
  @ApiOperation({summary: "A rota poderá ser utilizada para atualizar um usuario a partir do UUId fornecido."
  })
  @ApiResponse({status: 204, description: `Caso a operação seja realizada corretamente será encaminhado o status 204.`})
  @ApiQuery({
    name: 'uuid',
    description: "Deverá ser encaminhado um UUID valido de um tenant existente."
  })
  async update(
    @Query('uuid') uuid: string, 
    @Body() updateTenantDto: UpdateTenantDto,
    @Res() res: Response) {
    try {
      let result = await this.tenantService.update(uuid, updateTenantDto);
      (result) ? res.status(204).send({message: "Tenant atualizado com sucesso!"}) : res.status(500).send({message: "Tenant não pode ser atualizado."}) ;
    } catch (error) {
      res.status(500).send({message: "Houve um erro ao tentar realizar a operação."})
    }
  }
  // End Region       ----- atualizar tenant
  
  // Begin Region       ----- Remover tenant
  @Delete()
  @ApiOperation({summary: "A rota poderá ser utilizada para remoção um usuario a partir do UUId fornecido."
  })
  @ApiResponse({status: 204, description: `Caso a operação seja realizada corretamente será encaminhado o status 204.`})  
  @ApiQuery({
    name: 'uuid',
    description: "Deverá ser encaminhado um UUID valido de um tenant existente."
  })  
  remove(@Query('uuid') uuid: string) {
    // return this.tenantService.remove(+id);
  }
  // Begin Region       ----- Remover tenant

}
