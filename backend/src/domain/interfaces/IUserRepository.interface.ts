import { IUserDto } from "../dto/IUser.dto";
import UserDomanEntity from "../entities/user.domain";
import { IResponse } from "./IResponse.interface";

export default interface IUserRespository { 
    findById(id: string): Promise<IUserDto>;
    find(page: number, limit: number, tenatnId: string): Promise<IResponse<IUserDto>>;
    save(data: UserDomanEntity): Promise<boolean>;
    update(data: UserDomanEntity, uuid: string): Promise<boolean>;
    deactive(uuid: string): Promise<boolean>;
}