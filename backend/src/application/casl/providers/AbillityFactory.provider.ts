import { InferSubjects } from "nest-casl";
import UserDomanEntity from "src/domain/entities/user.domain";
import { 
    AbilityBuilder, 
    createMongoAbility,
    ExtractSubjectType
} 
from "@casl/ability";
import { UserFindDto } from "src/application/dto/userFind.dto";
import { jwtDecoded } from "src/application/dto/interfaces/jwtDecoded.dto";
import {Role as Roles} from '../../enum/roles.enum';
import { Actions } from "src/application/enum/permissoes.enum";
import { Injectable } from "@nestjs/common";
import CollaboratorDto from "src/application/dto/collaborator.dto";
import { OrderDto } from "src/application/dto/order.dto";
import { TenantDto } from "src/application/dto/tenant.dto";
import SupplierDto from "src/application/dto/supplier.dto";


export type Subjects = InferSubjects<typeof UserFindDto> | 
typeof UserDomanEntity | 
typeof CollaboratorDto | 
typeof OrderDto | 
typeof TenantDto |
typeof SupplierDto |
'all';
@Injectable()
export default class AbilityFactory { 
    defineAbality(Token: jwtDecoded) {
        const {can, cannot, build} = new AbilityBuilder(createMongoAbility);
        if(Token.Role === Roles.root) 
            can(Actions.manage, 'all');
        
        if(Token.Role === Roles.admin){
            can(Actions.manage, 'all', {Tenant: {$eq: Token.Tenant}});
        }
        
        if(Token.Role === Roles.operator) {
            can(Actions.read, OrderDto, {Tenant: {$eq: Token.Tenant}})
            can(Actions.update, OrderDto, ['Status'], {Tenant: {$eq: Token.Tenant}})
            
        }

        if(Token.Role === Roles.finance) {
            can([Actions.create, Actions.read], OrderDto, {Tenant: {$eq: Token.Tenant}})
            can(Actions.update, OrderDto, [
                'Status', 'OrderType', 
                'DeliveryAddress', 'Observations', 
                'OrderItens'], {Tenant: {$eq: Token.Tenant}})
            
        }
        
        return build({
            detectSubjectType: (item) => 
                item.constructor as ExtractSubjectType<Subjects>
        })  
    }
}
