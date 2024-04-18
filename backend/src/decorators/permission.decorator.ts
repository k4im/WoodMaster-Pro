import { SetMetadata } from '@nestjs/common';
import { Permissoes } from 'src/enum/permissoes.enum';

export const PERMISSION_KEY = 'permissions';
export const PermissionRequired = (...permission: Permissoes[]) => SetMetadata(PERMISSION_KEY, permission);