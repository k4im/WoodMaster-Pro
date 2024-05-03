import { SetMetadata } from '@nestjs/common';
import { Actions } from 'src/domain/enum/permissoes.enum';

export const PERMISSION_KEY = 'Permissoes';
export const PermissionRequired = (...permission: Actions[]) => SetMetadata(PERMISSION_KEY, permission);