import { IUserDto } from "./interfaces/IUser.dto";

export class UserFindDto implements IUserDto {
    Uuid: string;
    Email: string;
    IsActive: boolean;
    Role: string;
    Hash?: string;
    Tenant?: string;
    Permissions: string[];
}