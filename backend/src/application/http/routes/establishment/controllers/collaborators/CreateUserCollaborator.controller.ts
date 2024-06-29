import { Body, Controller, HttpStatus, Inject, Post, Req, Res, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiParam, ApiTags } from "@nestjs/swagger";
import { Request, Response } from "express";
import { PermissionRequired } from "src/application/decorators/permission.decorator";
import { Roles } from "src/application/decorators/role.decorator";
import CollaboratorDto from "src/application/dto/collaborator.dto";
import UserDto from "src/application/dto/user.dto";
import { Actions } from "src/application/enum/permissoes.enum";
import { Role } from "src/application/enum/roles.enum";
import AuthGuard from "src/application/http/guards/auth.guard";
import { PermissionGuard } from "src/application/http/guards/permissions.guard";
import { RolesGuard } from "src/application/http/guards/role.guard";
import { ICommandInterface } from "src/application/usecases/Abstrations/ICoomands.interface";

@Controller('establishment')
@ApiTags('collaborators')
@ApiBearerAuth()
export default class CreateUserForCollaboratorController {

    constructor(
        @Inject('ICreateUserForCollaborator')
        private readonly createUserForCollabUseCase: ICommandInterface<UserDto>
    ) { }

    @Post('collaborators/:tenantId/user')
    @Roles(Role.admin, Role.root)
    @PermissionRequired({ Action: [Actions.create], Subject: CollaboratorDto })
    @UseGuards(AuthGuard, RolesGuard, PermissionGuard)
    @ApiParam({
        name: 'tenantId',
        description: 'Parametro para identificação do tenant.'
    })
    async handle(@Req() _req: Request, @Res() res: Response, @Body() user: UserDto) {
        const isUserCreated = await this.createUserForCollabUseCase
            .execute(user);
            
        isUserCreated ?
            res.status(HttpStatus.OK)
                .send({ message: 'User created.' }) :
            res.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .send({ message: 'An internal error has ocurred.' })
    }


}