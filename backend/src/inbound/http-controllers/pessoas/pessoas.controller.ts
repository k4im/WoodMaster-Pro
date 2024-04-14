import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { PessoasService } from './pessoas.service';
import { CriarPessoaDto } from './dto/criar-pessoa.dto';

@Controller('person')
export class PessoasController {
  constructor(private readonly pessoasService: PessoasService) {}

  @Post("create")
  create(@Body() createPessoaDto: CriarPessoaDto) {
    return this.pessoasService.create(createPessoaDto);
  }

  @Get("list")
  findAll(@Param("page") pagina: number, @Param("limit") limit: number) {
    return this.pessoasService.findAll(pagina, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pessoasService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePessoaDto: UpdatePessoaDto) {
    return this.pessoasService.update(+id, updatePessoaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pessoasService.remove(+id);
  }
}
