import { Controller, Get, Post, Body, Param, Delete, Put, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { PessoasService } from './pessoas.service';
import { CriarPessoaDto } from './dto/criar-pessoa.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

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
  async findAll(@Param("page") pagina: number, @Param("limit") limit: number, @Res() res: Response) {
    return this.pessoasService.findAll(pagina, limit);
  }

  @Get(':uuid')
  async findOne(@Param('uuid') uuid: string) {
    
  }

  @Put(':uuid')
  async update(@Param('uuid') uuid: string, @Body() updatePessoaDto: UpdatePessoaDto, @Res() res: Response) {
    // return this.pessoasService.update(+id, updatePessoaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    return this.pessoasService.remove(+id);
  }
}
