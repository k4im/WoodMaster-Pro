import { PartialType } from '@nestjs/swagger';
import { CriarPessoaDto } from './criar-pessoa.dto';


export class UpdatePessoaDto extends PartialType(CriarPessoaDto) {
}
