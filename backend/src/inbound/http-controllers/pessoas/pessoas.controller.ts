import { Controller, Get, Post, Body, Param, Delete, Put, Res, HttpStatus, Query } from '@nestjs/common';
import { Response } from 'express';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { PessoasService } from './pessoas.service';
import { CriarPessoaDto } from './dto/criar-pessoa.dto';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PessoaEntity } from './entities/pessoa.entity';
import { ResponseDoc } from './doc/Reponse.doc';

@Controller('person')
@ApiTags("Pessoas")
export class PessoasController {
  constructor(private readonly pessoasService: PessoasService) {}

  @Post("create")
  @ApiOperation({summary: "Rota utilizada para criação de novas pessoas."})
  @ApiResponse({status: 201, description: "Estará encaminhando um status 201 caso a operação seja bem sucedida."})
  async create(@Body() createPessoaDto: CriarPessoaDto,  @Res() res: Response) {
    try {
      await this.pessoasService.create(createPessoaDto);
      return res.status(HttpStatus.CREATED).send({message: "Pessoa criada com sucesso!"})
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message: "Houve um erro ao tentar criar a pessoa!"});
    }
  }

  @Get("list")
  @ApiOperation({
    summary: "Rota será utilizada para efetuar a listagem de clientes de forma paginada.",
    description: `Estará sendo realizado a paginação de todos os dados presentes no banco de dados.
    Atualmente ao utilizar esta rota será apresentado todos os campos contendo no banco de dados, assim como
    relacionamento existentes em tabelas externas a tabelas de pessoas.`
  })
  @ApiResponse({status: 200, description: "Estará encaminhando um status 200 caso a operação seja bem sucedida.", type: ResponseDoc})
  @ApiQuery({
    name: "pagina",
    description: "Deverá ser repassado o numero da pagina a qual deseja estar visualizando os resultado."
  })
  @ApiQuery({
    name: "limit",
    description: "O limit será utilizado para mostrar a quantidade de resultados desejado por pagina."
  })
  async findAll(@Query("pagina") pagina: number, @Query("limit") limit: number, @Res() res: Response) {
    try {
      let result = await this.pessoasService.findAll(parseInt(`${pagina}`), parseInt(`${limit}`));
      (result.resultados.length === 0) ?  res.status(404).send({message: "Não encontram-se registros disponivel nesta pagina."}) : res.status(200).send(result); 
    } catch (error) {
      return res.status(500).send({message: "Houve um erro ao tentar realizar a operação de paginação"})
    }
  }

  @Get(':uuid')
  @ApiOperation({
    summary: "Rota será utilizada para efetuar a busca de uma pessoa por um UUID.",
    description: `Estará efetuando a busca de uma pessoa baseando-se em seu UUID, onde estará retornando todos os campos presentes
    no banco de dados assim como relacionamentos existentes com este registro.`
  })
  @ApiResponse({status: 200, description: "Estará encaminhando um status 200 caso a operação seja bem sucedida.", type: CriarPessoaDto})
  @ApiQuery({
    name: "uuid",
    description: "O UUID será utilizado para efetuar a requisição de busca de uma pessoa."    
  })
  async findOne(@Query('uuid') uuid: string, @Res() res: Response) {
    try {
        let result = await this.pessoasService.findOne(uuid);
        (result === null) ? res.status(404).send({message: "UUID invalido."}) : res.status(HttpStatus.OK).send(result);
    } catch (error) {
      return res.status(500).send({message: "Houve um erro ao efetuar a consulta."})
      
    }
  }

  @Put(':uuid')
  @ApiOperation({
    summary: "Rota será utilizada para efetuar a atualizar uma pessoa baseando-se no UUID.",
    description: `Estará atualizando um registro no banco de dados, onde deverá ser repassado todos os campos presentes no modelo fornecido.
    Todos os campos deverão ser fornecidos para atualização do registro.`
})
  @ApiResponse({status: 204, description: "Estará encaminhando um status 204 caso a operação seja bem sucedida."})
  @ApiQuery({
    name: "uuid",
    description: "Deverá ser repassado o UUID para que então seja atualizado o registro que possui este UUID."
  })
  async update(@Query('uuid') uuid: string, @Body() updatePessoaDto: UpdatePessoaDto, @Res() res: Response) {
    try {
      let result = await this.pessoasService.update(uuid, updatePessoaDto);
      (result) ? res.status(204).send({message: "Pessoa atualizada com sucesso!"}) :  res.status(500).send({message: "Não foi possivel atualizar o registro!"})
    } catch (error) {
      return res.status(500).send({message: "Houve um erro ao tentar atualizar o registro!"})
    }
  }

  @Delete(':uuid')
  @ApiOperation({summary: "Rota será utilizada para efetuar a remoção de uma pessoa."})
  @ApiResponse({status: 200, description: "Estará encaminhando um status 200 caso a operação seja bem sucedida."})
  @ApiQuery({
    name: "uuid",
    description: "Deverá ser repassado o UUID para que então seja possivel efetuar a remoção do registro."
  })
  async remove(@Query('uuid') uuid: string, @Res() res: Response) {
    try {
      let result = await this.pessoasService.remove(uuid);
      (result) ? res.status(200).send({message: "Registro removido com sucesso!"}) : res.status(500).send({message: "Não foi possivel remover o registro."})
    } catch (error) {
      return res.status(500).send({message: "Houve um erro ao tentar remover o registro!"})

    }
  }
}
