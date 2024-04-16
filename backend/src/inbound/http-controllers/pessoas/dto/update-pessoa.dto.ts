import { PartialType } from '@nestjs/mapped-types';
import { PessoaEntity } from '../entities/pessoa.entity';
import { ApiProperty } from '@nestjs/swagger';


export class UpdatePessoaDto extends PartialType(PessoaEntity) {
}
