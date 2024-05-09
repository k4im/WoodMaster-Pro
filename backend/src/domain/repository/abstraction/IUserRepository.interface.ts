import { IUserDto } from "../../dto/IUser.dto";
import UserDomanEntity from "../../entities/user.domain";
import { IResponse } from "../../interfaces/IResponse.interface";

export default interface IUserRespository { 
    findUserByUuid(uuid: string, tenantId: string): Promise<IUserDto>;
    paginateUsers(page: number, limit: number, tenatnId: string): Promise<IResponse<IUserDto>>;
    createNewUser(data: UserDomanEntity): Promise<boolean>;
    updateUser(data: UserDomanEntity, uuid: string): Promise<boolean>;
    deactiveUser(uuid: string): Promise<boolean>;
}