import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/infrastructure/database/models/Role.entity';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);