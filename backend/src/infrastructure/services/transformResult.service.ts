import { User } from "src/adapters/framework/database/entities/User.entity";
import { IUserDto } from "src/domain/dto/IUser.dto";
import { IResponse } from "src/domain/interfaces/IResponse.interface";

export default class ResultTransformerService {
    
    transformResultsUser(queryResult: [User[], number], limit: number, page: number): IResponse<IUserDto> {
        const [users, totalCount] = queryResult;
        const totalPages = Math.ceil(totalCount / limit);

        const transformedUsers = users.map(user => ({
            Uuid: user.Uuid,
            Email: user.EmailAddr,
            IsActive: user.IsActive,
            Role: user.Role.Name,
            Permissions: user.Role.Permissions.map(permission => permission.Action)
        }));

        return {
            pagina_atual: page,
            total_itens: totalCount,
            total_paginas: totalPages,
            resultados: transformedUsers
        };
    }
}