import { SetMetadata } from '@nestjs/common';
import { Permissoes } from 'src/domain/enum/permissoes.enum';

export const PERMISSION_KEY = 'Permissoes';
export const PermissionRequired = (...permission: Permissoes[]) => SetMetadata(PERMISSION_KEY, permission);