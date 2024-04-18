import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, Res } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CriarUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { query } from 'express';
import { ResponseDoc } from '../pessoas/doc/Reponse.doc';
import { Usuario } from './entities/usuario.entity';
import { Response } from 'express';
import { PermissionRequired } from 'src/decorators/permission.decorator';
import { Permissoes } from 'src/enum/permissoes.enum';
import { Role } from 'src/enum/roles.enum';

@ApiTags("Usuários")
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post("create")
  @ApiOperation({
    summary: "Rota será utilizada para estar efetuando a criação de um novo usuario.",
    description: `Uma pessoa poderá ter **apenas um usuario.**`
  })
  @ApiResponse({status: 201, description: "Caso seja criado o usuario corretamente estara encaminhando um retorno HTTP 201"})
  @PermissionRequired(Permissoes.create)
  async create(@Body() createUsuarioDto: CriarUsuarioDto, @Res() res: Response) {
    try {
        let result = await this.usuariosService.create(createUsuarioDto);
        (result) ? res.status(201).send({message: "Usuario criado com sucesso!"}): res.status(500).send({message: "Não foi possivel criar usuario!"});
    } catch (error) {
      return res.status(500).send({message: "Houve um erro ao tentar criar usuario!"})
    }
  }

  @Get("list")
  @ApiOperation({
    summary: "Rota será utilizada para buscar usuarios de forma paginada.",
    description: `Estará sendo realizado a paginação de todos os dados presentes no banco de dados.
    Atualmente ao utilizar esta rota será apresentado todos os campos contendo no banco de dados.`
  })
  @ApiResponse({status: 200, description: "Estará retornando os usuarios de forma paginada", type: ResponseDoc})
  @ApiQuery({
    name: "pagina",
    description: "A pagina sera utilizada para navegação."
  })
  @ApiQuery({
    name: "limit",
    description: "O limite estará limitando o resultado apresentado por pagina."
  })
  @PermissionRequired(Permissoes.read)
  async findAll(@Query("pagina") pagina: number, @Query("limit") limit: number, @Res() res: Response) {
    try {
      let result = await this.usuariosService.findAll(parseInt(`${pagina}`), parseInt(`${limit}`));
      (result.resultados.length === 0) ? res.status(404).send({message: "Não existe resultados nesta pagina"}): res.status(200).send(result); 
    } catch (error) {
      return res.status(500).send({message: "Houve um erro ao efetuar o processo de busca."})
    }
  }

  @Get(':uuid')
  @ApiOperation({
    summary: "Rota será utilizada para buscar um usuario em especifico.",
    description: `Estará sendo efetuada a busca de um usuario que possui o **UUID** fornecido
    onde caso o mesmo não seja encontrado será retornando um status HHTP de acordo com o resultado 
    produzido pelos processos internos do software.`
  })
  @ApiResponse({status: 200, description: "Estará retornando um usuario em especifico", type: Usuario})
  @ApiQuery({
    name: "uuid",
    description: "O UUID será utilizado para buscar um registro em especifico."
  })
  @PermissionRequired(Permissoes.read)
  async findOne(@Query('uuid') uuid: string, @Res() res: Response) {
    try {
        let result = await this.usuariosService.findOne(uuid);
        return res.status(200).send(result)
    } catch (error) {
      return res.status(500).send({message: "Houve um erro ao efetuar o processo de busca."})
    }
  }

  @Put(':uuid')
  @ApiOperation({
    summary: "A rota estará atualizando um usuario em especifico.",
    description: `Esta rota sera utilizada para efetuar a atualização de um registro no banco de dados,
    onde poderá ser atualizado todos os campos presentes no modelo fornecido nesta rota.`
  })
  @ApiResponse({status: 204, description: "Estará retornando 204 ao efetuar a operação corretamente."})
  @ApiQuery({
    name: "uuid",
    description: "O UUID será utilizado para buscar um registro em especifico."
  })
  @PermissionRequired(Permissoes.update)
  async update(@Query('uuid') uuid: string, @Body() updateUsuarioDto: UpdateUsuarioDto, @Res() res: Response) {
    try {
      let result = await this.usuariosService.update(uuid, updateUsuarioDto);
      (result) ? res.status(200).send({message: "Usuario atualizado com sucesso!"}) : res.status(500).send({message: "Não foi possivel atualizar o usuario."});
    } catch (error) {
       return res.status(500).send({message: "Houve um erro ao efetuar o processo de atualização."})
    }
  }

  @Post(':uuid')
  @ApiOperation({
    summary: "Rota será utilizada para desativar um usuario em especifico.",
    description: `O software estará realizando a operação de inativação de um usuario, portanto o atributo(campo) **Inativo** no banco de dados será setado para **true**
    fazendo com que no momento do login seja realizado uma verificação neste campo e caso o mesmo encontra-se como true, sera negado o login para este usuario`
  })
  @ApiResponse({status: 200, description: "Estará retornando 200 ao finalizar a operação corretamente."})
  @ApiQuery({
    name: "uuid",
    description: "O UUID será utilizado para remover um registro em especifico."
  })
  @PermissionRequired(Permissoes.remove)
  async remove(@Query('uuid') uuid: string, @Res() res: Response) {
    try {
      let result = await this.usuariosService.remove(uuid);
      (result) ? res.status(200).send({message: "Usuario desativado!"}) : res.status(500).send({message: "Não foi possivel atualizar o usuario."});
    } catch (error) {
       return res.status(500).send({message: "Houve um erro ao efetuar o processo de atualização."})
    }  
  }
}
