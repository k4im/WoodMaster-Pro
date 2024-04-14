import { PartialType } from '@nestjs/mapped-types';
import { Pessoa } from '../entities/pessoa.entity';

export class UpdatePessoaDto extends PartialType(Pessoa) {}
