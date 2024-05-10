import { User } from "src/domain/databaseEntities/User.entity";
import IExtractor from "./abstraction/IExtractor.interface";
import IUserExtractor from "./abstraction/IUserExtractor.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export default class UserRoleExtractor implements IExtractor<User, IUserExtractor> {
    
    async process(data: User): Promise<IUserExtractor> {
        const roleWithPermissions: IUserExtractor = {Uuid: data.Uuid, 
            Role: data.Role.Name, 
            Permissions: data.Role.Permissions.map(perm => perm.Action)}
        return roleWithPermissions;
    };
};