import { SetMetadata } from '@nestjs/common';
import { Actions } from 'src/application/enum/permissoes.enum';
import { Subjects } from '../casl/providers/AbillityFactory.provider';

export interface subject {
    Action: Actions[],
    Subject: Subjects
}
export const PERMISSION_KEY = 'Permissoes';
export const PermissionRequired = (permission: subject) => SetMetadata(PERMISSION_KEY, permission);