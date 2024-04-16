import { Controller, Get, Post, Body, Param, Delete, Put, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { PessoasService } from './pessoas.service';
import { CriarPessoaDto } from './dto/criar-pessoa.dto';

@Controller('person')
export class PessoasController {
  constructor(private readonly pessoasService: PessoasService) {}

  @Post("create")
  async create(@Body() createPessoaDto: CriarPessoaDto,  @Res() res: Response) {
    try {
      await this.pessoasService.create(createPessoaDto);
      return res.status(HttpStatus.CREATED).send({message: "Pessoa criada com sucesso!"})
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({message: "Houve um erro ao tentar criar a pessoa!"});
    }
  }

  @Get("list")
  findAll(@Param("page") pagina: number, @Param("limit") limit: number, @Res() res: Response) {
    return this.pessoasService.findAll(pagina, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pessoasService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePessoaDto: UpdatePessoaDto, @Res() res: Response) {
    return this.pessoasService.update(+id, updatePessoaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    return this.pessoasService.remove(+id);
  }
}
