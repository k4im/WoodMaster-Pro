import { IUserDto } from "src/application/dto/interfaces/IUser.dto";
import UserDomanEntity from "../../../domain/entities/user.domain";
import { IResponse } from "src/application/dto/interfaces/IResponse.interface";

export default interface IUserRespository { 
    findUserByUuid(uuid: string, tenantId: string): Promise<IUserDto>;
    findUserByEmail(email: string): Promise<IUserDto>;
    paginateUsers(page: number, limit: number, tenatnId: string): Promise<IResponse<IUserDto>>;
    createNewUser(data: UserDomanEntity): Promise<boolean>;
    updateUser(data: UserDomanEntity, uuid: string): Promise<boolean>;
    deactiveUser(uuid: string): Promise<boolean>;
}