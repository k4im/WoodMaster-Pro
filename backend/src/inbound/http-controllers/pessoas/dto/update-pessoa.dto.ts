import { PartialType } from '@nestjs/mapped-types';
import { PessoaEntity } from '../entities/pessoa.entity';

export class UpdatePessoaDto extends PartialType(PessoaEntity) {}
