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
  @ApiOperation({summary: "Rota será utilizada para efetuar a listagem de clientes de forma paginada."})
  @ApiResponse({status: 200, description: "Estará encaminhando um status 200 caso a operação seja bem sucedida.", type: ResponseDoc})
  @ApiQuery({
    name: "pagina",
  })
  @ApiQuery({
    name: "limit"
  })
  async findAll(@Query("pagina") pagina: number, @Query("limit") limit: number, @Res() res: Response) {
    try {
      let result = await this.pessoasService.findAll(parseInt(`${pagina}`), parseInt(`${limit}`));
      if(result.resultados.length === 0) return res.status(404).send({message: "Não encontram-se registros disponivel nesta pagina."})
      return res.status(200).send(result); 
    } catch (error) {
      return res.status(500).send({message: "Houve um erro ao tentar realizar a operação de paginação"})
    }
  }

  @Get(':uuid')
  @ApiOperation({summary: "Rota será utilizada para efetuar a busca de uma pessoa por um UUID."})
  @ApiResponse({status: 200, description: "Estará encaminhando um status 200 caso a operação seja bem sucedida.", type: CriarPessoaDto})
  async findOne(@Param('uuid') uuid: string) {
    
  }

  @Put(':uuid')
  @ApiOperation({summary: "Rota será utilizada para efetuar a atualizar uma pessoa baseando-se no UUID."})
  @ApiResponse({status: 204, description: "Estará encaminhando um status 204 caso a operação seja bem sucedida."})
  async update(@Param('uuid') uuid: string, @Body() updatePessoaDto: UpdatePessoaDto, @Res() res: Response) {
    // return this.pessoasService.update(+id, updatePessoaDto);
  }

  @Delete(':uuid')
  @ApiOperation({summary: "Rota será utilizada para efetuar a remoção de uma pessoa."})
  @ApiResponse({status: 200, description: "Estará encaminhando um status 200 caso a operação seja bem sucedida."})
  async remove(@Param('uuid') uuid: string, @Res() res: Response) {

  }
}
