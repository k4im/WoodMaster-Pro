/**
 * Decorador para estar configurando os papeis.
 * 
 * Neste decorador é possivel estar informando 
 * os papeis que serão utilizados pelo controller
 * para efetuar controle de acesso a determinadas rotas.
 * 
 * Estes papeis serão utilizados em conjunto com o 
 * CASLJS para estar realizando o permissionamento de
 * cada papel presente no sistema.
 * 
 * @author João Victor.
 */
import { SetMetadata } from '@nestjs/common';
import {Role} from 'src/application/enum/roles.enum'
export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);